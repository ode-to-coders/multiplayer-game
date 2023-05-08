import { CanvasScenes } from '../canvasScenes';
import { ssd } from '../storeSessionData';

import { drawAndStartTimer, drawImgBorderText, drawRoundedRect, drawText, helperBorderColor, transformStrByWidth } from 'shared/utils/canvas';

import { source } from 'shared/const/gameLibrary/dataLibrary';
import { JSCOLORS } from '../const';

import { TTimerData } from '../types';

/**
 * множитель под динамический размер канваса
 */
let m: number;
/**
 * левый сдвиг под динамический размер канваса
 */
let lofs: number;
    
export class AnswersAndThink {
  private that: CanvasScenes;
  
  constructor(that: CanvasScenes) {
    this.that = that;
    m = ssd.ratio.multiple;
    lofs = ssd.ratio.leftOffset;
  }

  public render(
    nameScene: string,
    timerData: TTimerData
  ){
    const ctx = this.that.canvasCtx;
    const userCoords = ssd.arrPlaceUsersAnswer; 
    // в usersAndAnswer сюда c предыдущей сцены должен прийти ответ с объектом в формате {имя Соперника: егоОтвет}
    const usersAndAnswer: {[key in string]: string} = ssd.answersOfGamers;
    const myAnswers = ssd.mainGamer.notes;
    const type = ssd.mainGamer.entourage;

    // запускаем таймер
    drawAndStartTimer(ctx, {
      nameTimer: timerData.nameId,
      numsSeconds: timerData.seconds,
      left: 487 *m,
      top: 45 *m,
      width: 85 *m,
      height: 35 *m,
      fontSize: 25 *m,
      textColor: JSCOLORS.white,
      cback: timerData.cback
    })

    // отрисовка памятки
    drawImgBorderText(ctx, source.memory[type], {
      left: 460 *m+lofs,
      top: 105 *m,
      width: 530 *m,
      height: 265 *m,
      color: JSCOLORS.null,
      borderPadding: 5 *m,
      borderColor: helperBorderColor(type),
      radius: 5 *m
    })

    // КОЛБЕК для отрисовки текста поверх блокнота--------------------------------
    const textTopNotebook = () => {
      Object.keys(usersAndAnswer).forEach((nameGamer, index) => {
        // имяИгроков на блокноте
        drawText(ctx, {
          left: (ssd.objCoordsNotes.left + (2*ssd.objCoordsNotes.width*index)) *m+lofs, 
          top: ssd.objCoordsNotes.topName *m,
          width: 2*ssd.objCoordsNotes.width *m,
          fontSize: 16 *m,
          textColor: JSCOLORS.black,
          text: nameGamer
        })
      })

      // логика наведения и кликов
      // подготовка массива с координатами и размерами полей 'инпутов' (создается один раз на игру)
      if (ssd.hoverRects[nameScene][1] === undefined) { // если только первый запуск (есть только элемент [0] с данными для разворачивания)
        const {
          left, top, width, height
        } = ssd.hoverRects[nameScene][0] // достаем начальные данные
        ssd.hoverRects[nameScene] = []; // подготавливаем его (очищаем)
        const lengthLine = ssd.mainGamer.notes[0].length
        for (let indexLine = 0; indexLine < 6; indexLine++) { // разворачиваем данные (запушиваем массив 'инпутов')
          for (let i = 0; i < lengthLine; i++) {
            ssd.hoverRects[nameScene].push({
              key: `notebook${i + indexLine*lengthLine}`,
              left: (left + width*i),
              top: top + height*indexLine,
              width: width,
              height: indexLine === 5 ? height*2 : height,
              validate: /^[1-9]\d?$|Backspace$/ // можно только 2 цифры и удалять
            })
          }
        }
      }
      // можно и без ифа - так как внутри просто передача ссылки на массив (так себе оптимизация)
      if (ssd.rectsForScene[0].left !== ssd.hoverRects[nameScene][0].left) {
        ssd.rectsForScene = ssd.hoverRects[nameScene]
      }
      // наведение и клики на 'инпуты' в блокноте
      this.that.canvasRef.style.cursor = '';
      // если клик
      if (this.that.clickIndexRect !== null) {
        let {left, top, width, height} = ssd.rectsForScene[this.that.clickIndexRect];
        let radius = 2 *m;
        if (this.that.clickIndexRect >= ssd.rectsForScene.length/6*5) {
          height /= 2,
          left += (width/2 - height/2),
          width = height,
          top += 7 *m,
          radius = 10 *m
        }
        drawRoundedRect(ctx, {
          left: left,
          top: top,
          width: width,
          height: height,
          radius: radius,
          color: JSCOLORS.green_30,
          borderColor: JSCOLORS.green
          }, true
        )
        if (
          ssd.objText[`notebook${this.that.clickIndexRect}`]?.text === undefined
          && this.that.clickIndexRect < ssd.rectsForScene.length/6*5
        ) {
          drawText(ctx, {
            left: left,
            top: top,
            width: width,
            height: height,
            text: 'число',
            fontSize: 12 *m,
            textColor: JSCOLORS.black_40
          })
        }
      }
      // если наведение
      if (this.that.hoveredIndexRect !== null) {
        this.that.canvasRef.style.cursor = 'text';
        if (this.that.hoveredIndexRect !== this.that.clickIndexRect) {
          let {left, top, width, height} = ssd.rectsForScene[this.that.hoveredIndexRect];
          let radius = 2 *m;
          if (this.that.hoveredIndexRect >= ssd.rectsForScene.length/6*5) {
            height /= 2,
            left += (width/2 - height/2),
            width = height,
            top += 7 *m,
            radius = 10 *m
          }
          drawRoundedRect(ctx, {
            left: left,
            top: top,
            width: width,
            height: height,
            radius: radius,
            color: JSCOLORS.orange_20,
            borderColor: JSCOLORS.black
            }, true
          )
        }
      }

      // вставка набранного текста в объект
      if (this.that.clickIndexRect !== null) {
        const obj = ssd.objText[`notebook${this.that.clickIndexRect}`];
        const indexLine = Math.floor( this.that.clickIndexRect / myAnswers[0].length );
        const index = this.that.clickIndexRect % myAnswers[0].length;
        myAnswers[indexLine][index] = obj?.text
      }

      // ответы игрока на блокноте
      myAnswers.forEach((line, indexLine) => {
        line.forEach((answer, index) => {
          if (!answer) return;
          const odd = index % 2 !== 0 ? true : false;          
          const color = 
            answer === '✔'
            ? JSCOLORS.green
            : answer === '✖' 
              ? JSCOLORS.red
              : JSCOLORS.black;
          drawText(ctx, {
            left: (
              ssd.objCoordsNotes.left
              + (ssd.objCoordsNotes.width*index)
              + (indexLine === 6
                ? odd
                  ? -13 
                  : 13
                : 0)
            ) *m+lofs,
            top: (
              ssd.objCoordsNotes.top
              + (ssd.objCoordsNotes.height*indexLine)
              + (indexLine === 5 ? 5 : 0) 
              + (indexLine === 6 ? -1 : 0)
            ) *m,
            width: ssd.objCoordsNotes.width *m,
            fontSize: 16 *m,
            textColor: color,
            text: answer.toString()
          })
        })
      })
    } //------------------------------------------------------------

    // отрисовка блокнота
    drawImgBorderText(ctx, source.notebookSmall2, {
      left: 460 *m+lofs,
      top: 400 *m,
      width: 530 *m,
      height: 205 *m,
      color: JSCOLORS.null,
      borderPadding: 5 *m,
      borderColor: helperBorderColor(type),
      radius: 5 *m,
      cback: textTopNotebook // колбек для отрисовки текста поверх
    })

    Object.keys(usersAndAnswer).forEach((nameGamer, index) => {
      // область сообщения игроков
      drawRoundedRect(ctx, {
        left: (userCoords.left - 20) *m+lofs,
        top: (userCoords.top + userCoords.topOffset*index) *m,
        width: (userCoords.width + 40) *m,
        height: userCoords.height *m,
        borderColor: helperBorderColor(type),
        radius: 10 *m
      })
      // текст сообщения игроков
      drawText(ctx, {
        left: userCoords.left *m+lofs, 
        top: (userCoords.top + userCoords.topOffset*index) *m, 
        width: userCoords.width *m, 
        height: userCoords.height *m,
        fontSize: 15 *m,
        text: transformStrByWidth(
          ctx, 
          usersAndAnswer[nameGamer], 
          userCoords.width *m,
          15 *m
        )
      })
      // имяИгроков вверху сообщения
      drawText(ctx, {
        left: userCoords.left *m+lofs, 
        top: (userCoords.topName + userCoords.topOffset*index) *m,
        // width: user.width *m,
        height: (userCoords.top - userCoords.topName) *m,
        fontSize: 20 *m,
        text: nameGamer
      })
    })
  }
} 
