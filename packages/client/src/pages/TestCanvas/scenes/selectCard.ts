import { CanvasScenes } from '../canvasScenes';
import { ssd } from '../storeSessionData';

import { drawAndStartTimer, drawImgBorderText, drawText, helperBorderColor } from 'pages/TestCanvas/utils';

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
    
export class SelectCard {
  private that: CanvasScenes;
  
  constructor(that: CanvasScenes) {
    this.that = that;
    m = ssd.ratio.multiple;
    lofs = ssd.ratio.leftOffset;
  }
  
  public render(
    text: string,
    indexForSelect: number[],
    profOrSecrets: string[],
    timerData: TTimerData
  ) {
    const ctx = this.that.canvasCtx;
    ssd.rectsForScene = ssd.hoverRects[NAMESCENES.select];

    // запускаем таймер
    drawAndStartTimer(ctx, {
      nameTimer: timerData.nameId,
      numsSeconds: timerData.seconds,
      left: this.that.canvasRef.width / 2 - 45 *m,
      top: 304 *m,
      width: 70 *m,
      height: 35 *m,
      fontSize: 32 *m,
      textColor: JSCOLORS.white,
      cback: timerData.cback
    })
    
    drawText(ctx, {
      left: 450 *m+lofs, top: 28 *m, width: 124 *m, height: 32 *m, 
      text: text, 
      fontSize: 25 *m, 
      textColor: JSCOLORS.white});

    if (this.that.hoveredIndexRect !== null) {      
      this.that.canvasRef.style.cursor = 'pointer';
    } else {
      this.that.canvasRef.style.cursor = '';
    }

    for (let index = 0; index < 2; index++) {
      const {
        left, top, width, height
      } = ssd.hoverRects[NAMESCENES.select][index]
      drawImgBorderText(ctx, profOrSecrets[indexForSelect[index]], {
        left: left + 5 *m,
        top: top + 5 *m,
        width: width - 10 *m,
        height: height - 10 *m,
        color: this.that.clickIndexRect === index
          ? JSCOLORS.green
          : JSCOLORS.black,
        borderPadding: 5 *m,
        borderColor: helperBorderColor(ssd.mainGamer.entourage),
        shadowOn: 
          this.that.hoveredIndexRect === index
          || this.that.clickIndexRect === index,
        radius: 5 *m
      })
    }
  }
} 
