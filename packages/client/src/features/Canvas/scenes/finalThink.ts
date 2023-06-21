import { CanvasScenes } from '../canvasScenes';
import { ssd } from '../storeSessionData';

import {
  drawAndStartTimer,
  drawImgBorderText,
  drawRoundedRect,
  drawText,
  helperBorderColor
} from '../utils';

import { cards, source } from '../../../shared/const/gameLibrary/dataLibrary';
import { JSCOLORS, NAMESCENES } from '../const';

import { TTimerData } from '../types';

/**
 * множитель под динамический размер канваса
 */
let m: number;
/**
 * левый сдвиг под динамический размер канваса
 */
let lofs: number;
    
export class FinalThink {
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
    // на самом деле из usersAndAnswer в сцене нужны только имена (объект из предыдущих сцен в формате {имя Соперника: егоОтвет})
    const usersAndAnswer: {[key in string]: string} = ssd.answersOfGamers;
    const myAnswers = ssd.mainGamer.notes;
    const type = ssd.mainGamer.entourage;

    // запускаем таймер
    drawAndStartTimer(ctx, {
      nameTimer: timerData.nameId,
      numsSeconds: timerData.seconds, // нужное количество секунд
      drawOff: timerData.drawOff,
      left: 487 *m+lofs,
      top: 45 *m,
      width: 70 *m,
      height: 35 *m,
      fontSize: 25 *m,
      textColor: JSCOLORS.white,
      cback: timerData.cback
    })
    
    // КОЛБЕК для отрисовки текста поверх блокнота -------------------------------------
    const textTopNotebook = () => {
      Object.keys(usersAndAnswer).forEach((nameGamer, index) => {      
        // имяИгроков на блокноте
        drawText(ctx, {
          left: (ssd.objFinalCoordsNotes.left + (2*ssd.objFinalCoordsNotes.width*index)) *m+lofs, 
          top: ssd.objFinalCoordsNotes.topName *m,
          width: 2*ssd.objFinalCoordsNotes.width *m,
          fontSize: 16 *m,
          textColor: JSCOLORS.black,
          text: nameGamer
        })
      })      
      
      this.that.canvasRef.style.cursor = '';
      if (nameScene === NAMESCENES.finalAnswer) {
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
                left: left + width*i,
                top: top + height*indexLine,
                width: width,
                height: indexLine === 5 ? height*2 : height,
                validate: /^[1-9]\d?$|Backspace$/ // можно только 2 цифры и удалять
              })
            }
          }
        }
        ssd.rectsForScene = ssd.hoverRects[nameScene]
        // наведение и клики на 'инпуты' в блокноте
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
            let {
              left, top, width, height
            } = ssd.rectsForScene[this.that.hoveredIndexRect];
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
      } else {
        ssd.rectsForScene = [];
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
              ssd.objFinalCoordsNotes.left 
              + (ssd.objFinalCoordsNotes.width*index) 
              + (indexLine === 6
                ? odd
                  ? -13 
                  : 13
                : 0)
              + (indexLine === 7
                ? index < 5
                  ? 87 
                  : 169
                : 0)
            ) * (indexLine === 7 ? 0.365 : 1)
            *m+lofs,
            top: (
              ssd.objFinalCoordsNotes.top
              + (ssd.objFinalCoordsNotes.height*indexLine)
              + (indexLine === 5 ? 4 : 0)
              + (indexLine === 6 ? -3 : 0)
              + (indexLine === 7 ? 69 : 0)
            ) *m,
            width: ssd.objFinalCoordsNotes.width *m,
            fontSize: 16 *m,
            textColor: color,
            text: answer.toString()
          })
        })
      })
      // выбранные и исключенные профессии и секреты игрока на блокноте
      ssd.mainGamer.selectedCards.forEach((card, index) => {
        const typeCards = index % 2 === 0 ? 'profession' : 'secrets';
        const color = index < 2 ? JSCOLORS.green : JSCOLORS.red;
        drawText(ctx, {
          left: (
            ssd.objFinalCoordsNotes.left
            + ssd.objFinalCoordsNotes.offsetProfAndSecrets*index
          ) *m+lofs,
          top: ssd.objFinalCoordsNotes.topProfAndSecrets *m,
          width: 124 *m,
          height: 50 *m,
          fontSize: 15 *m,
          textColor: color,
          text: cards[type][typeCards][card]
        })
      })
    } // -----------------------------------------------------------------------

    // отрисовка блокнота
    drawImgBorderText(ctx, source.game.notebook.small, {
      left: 34 *m+lofs,
      top: 105 *m,
      width: 556 *m,
      height: 293 *m,
      color: JSCOLORS.null,
      borderPadding: 4 *m,
      borderColor: helperBorderColor(type),
      radius: 5 *m,
      cback: textTopNotebook // отдаем сюда колбек для отрисовки поверх блокнота
    })

    // отрисовка памятки
    drawImgBorderText(ctx, source.game.memory[`${type}H`], {
      left: 610 *m+lofs,
      top: 105 *m,
      width: 380 *m,
      height: 500 *m,
      color: JSCOLORS.null,
      borderPadding: 5 *m,
      borderColor: helperBorderColor(type),
      radius: 5 *m
    })

    // отрисовка карт
    ssd.mainGamer.selectedCards.forEach((card, index) => {
      const typeCards = index % 2 === 0 ? 'profession' : 'secrets';
      const color = index < 2 ? JSCOLORS.green : JSCOLORS.red;
      drawImgBorderText(ctx, source.game.cards[type][typeCards][card], {
        left: (ssd.objFinalCoordsCards.left + ssd.objFinalCoordsCards.offset*index) *m+lofs,
        top: ssd.objFinalCoordsCards.top *m,
        width: ssd.objFinalCoordsCards.width *m,
        height: ssd.objFinalCoordsCards.height *m,
        color: color,
        borderColor: color,
        borderPadding: 2 *m,
        radius: 5 *m,
        shadowOn: true,
        shadowColor: color
      },
        (index > 1 ? {
          text: '✖',
          textColor: JSCOLORS.red,
          fontSize: 100 *m
        } : undefined))
    })
  }
} 
