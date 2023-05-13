import { CanvasScenes } from '../canvasScenes';
import { ssd } from '../storeSessionData';

import {
  drawAndStartTimer,
  drawImgBorderText,
  drawRoundedRect,
  drawText,
  helperBorderColor
} from '../utils';

import { questions, source } from '../../../shared/const/gameLibrary/dataLibrary';
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
    
export class WriteAnswer {
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
    const cardQuestion = ssd.dataFiveQuestions[ssd.counterFiveQuestions.openFive - 1];

    drawAndStartTimer(ctx, {
      nameTimer: timerData.nameId,
      numsSeconds: timerData.seconds,
      left: this.that.canvasRef.width / 2 - 35 *m,
      top: 472 *m,
      width: 70 *m,
      height: 25 *m,
      fontSize: 25 *m,
      textColor: JSCOLORS.white,
      cback: timerData.cback
    })

    drawImgBorderText(ctx, source.game.question[`${cardQuestion.type}`], {
      left: 222 *m+lofs,
      top: 85 *m,
      width: 580 *m,
      height: 362 *m,
      color: JSCOLORS.black_95,
      borderPadding: 20 *m,
      borderColor: helperBorderColor(cardQuestion.type),
      radius: 30 *m,
      shadowOn: true
    },{
      text: questions[ cardQuestion.type ][ cardQuestion.index ]
    })

    // логика наведения и кликов на инпуте -------------------------
    const numAnswer = ssd.counterFiveQuestions.openFive-1;
    
    if (ssd.hoverRects[`${nameScene}${numAnswer}`] === undefined) {
      const {
        left, top, width, height
      } = ssd.hoverRects[NAMESCENES.myAnswer][0];
      
      ssd.hoverRects[`${nameScene}${numAnswer}`] = [{
        key: `${nameScene}${numAnswer}`,
        left: left,
        top: top,
        width: width,
        height: height,
        fontSize: 35 *m // этот размер шрифта не используется, но влияет на расчет количества строк и символов в строке
      }]
    }

    if (this.that.hoveredIndexRect !== null) {      
      this.that.canvasRef.style.cursor = 'text';
    } else {
      this.that.canvasRef.style.cursor = '';
    }
    
    ssd.rectsForScene = ssd.hoverRects[`${nameScene}${numAnswer}`];

    drawRoundedRect(
      ctx, {
        ...ssd.rectsForScene[0],
        radius: 10 *m,
        color: JSCOLORS.manyGrey,
        borderColor: helperBorderColor(cardQuestion.type)
      }, 
      this.that.hoveredIndexRect === 0
    );
    if (this.that.clickIndexRect === 0) {
      drawRoundedRect(
        ctx, {
          ...ssd.rectsForScene[0],
          radius: 10 *m,
          color: JSCOLORS.green_05
        }
      );
    }
    if (ssd.objText[`${nameScene}${numAnswer}`]) {
      drawText(
        ctx, {
          ...ssd.objText[`${nameScene}${numAnswer}`],
          fontSize: 30 *m
        }
      );
    }
  }
} 
