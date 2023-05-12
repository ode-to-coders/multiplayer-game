import { CanvasScenes } from '../canvasScenes';
import { ssd } from '../storeSessionData';

import { drawAndStartTimer, drawImgBorderText, drawText, helperBorderColor } from 'pages/TestCanvas/utils';

import { source } from 'shared/const/gameLibrary/dataLibrary';
import { JSCOLORS, NAMESCENES } from '../const';

import { TMainGamer, TTimerData } from '../types';

/**
 * множитель под динамический размер канваса
 */
let m: number;
/**
 * левый сдвиг под динамический размер канваса
 */
let lofs: number;
    
export class SelectWishEntourage {
  private that: CanvasScenes;
  
  constructor(that: CanvasScenes) {
    this.that = that;
    m = ssd.ratio.multiple;
    lofs = ssd.ratio.leftOffset;
  }
  
  public render(
    text: string,
    timerData: TTimerData
  ) {
    const ctx = this.that.canvasCtx;
    ssd.rectsForScene = ssd.hoverRects[NAMESCENES.selectWishEntourage];

    console.log(ssd.ratio.multiple)
    // запускаем таймер
    drawAndStartTimer(ctx, {
      nameTimer: timerData.nameId,
      numsSeconds: timerData.seconds,
      left: this.that.canvasRef.width / 2 - 35 *m,
      top: 324 *m,
      width: 64 *m,
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
    
    ssd.mainGamer.entourage = this.that.clickIndexRect === 0
      ? 'modern'
      : this.that.clickIndexRect === 1
       ? 'england'
       : 'fantasy';

    const arrEntourage: TMainGamer['entourage'][] = [
      'modern', 'england', 'fantasy'
    ]
    arrEntourage.forEach((
      entourage,
      index
    ) => {
      const {
        left, top, width, height
      } = ssd.hoverRects[NAMESCENES.selectWishEntourage][index]

      drawImgBorderText(ctx, source.game.memory[entourage], {
        left: left + 5 *m,
        top: top + 5 *m,
        width: width - 10 *m,
        height: height - 10 *m,
        color: JSCOLORS.black,
        borderPadding: 5 *m,
        borderColor: this.that.clickIndexRect === index
        ? JSCOLORS.lightGreen
        : helperBorderColor(entourage),
        shadowOn:
          this.that.hoveredIndexRect === index
          || this.that.clickIndexRect === index,
        radius: 5 *m
      })
    })
  }
} 
