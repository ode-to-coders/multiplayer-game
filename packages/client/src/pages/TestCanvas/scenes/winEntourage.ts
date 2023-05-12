import { CanvasScenes } from '../canvasScenes';
import { ssd } from '../storeSessionData';

import { drawImgBorderText, drawText, helperBorderColor } from 'pages/TestCanvas/utils';

import { source } from 'shared/const/gameLibrary/dataLibrary';
import { JSCOLORS } from '../const';

/**
 * множитель под динамический размер канваса
 */
let m: number;
/**
 * левый сдвиг под динамический размер канваса
 */
let lofs: number;
    
export class WinEntourage {
  private that: CanvasScenes;
  
  constructor(that: CanvasScenes) {
    this.that = that;
    m = ssd.ratio.multiple;
    lofs = ssd.ratio.leftOffset;
  }
  
  public render() {
    const ctx = this.that.canvasCtx;
    const data = ssd.mainGamer;
        
    const entourage = data.entourage
    drawText(ctx, {
      left: 450 *m+lofs, top: 28 *m, width: 124 *m, height: 32 *m, 
      text: `${data.numsVoicesWinEntourage} из ${data.numsRivals+1} проголосовали за антураж "${data.nameEntourage}"!`, 
      fontSize: 25 *m,
      textColor: JSCOLORS.white});
    drawImgBorderText(ctx, source.game.memory[entourage], {
      left: 150 *m+lofs, top: 132 *m, width: 715 *m, height: 364 *m,
      color: JSCOLORS.black,
      borderPadding: 10 *m,
      borderColor: helperBorderColor(entourage),
      radius: 10 *m,
      shadowOn: true
    })
  }
} 
