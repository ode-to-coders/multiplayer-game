import { CanvasScenes } from '../canvasScenes';
import { ssd } from '../storeSessionData';

import { drawImgBorderText, helperBorderColor } from 'shared/utils/canvas';

import { questions, source } from 'shared/const/gameLibrary/dataLibrary';
import { JSCOLORS } from '../const';

/**
 * множитель под динамический размер канваса
 */
let m: number;
/**
 * левый сдвиг под динамический размер канваса
 */
let lofs: number;
    
export class FiveQuestions {
  private that: CanvasScenes;
  
  constructor(that: CanvasScenes) {
    this.that = that;
    m = ssd.ratio.multiple;
    lofs = ssd.ratio.leftOffset;
  }
   
  public render() {
    const ctx = this.that.canvasCtx;
    const arrQuest = ssd.dataFiveQuestions;

    ssd.arrCardBack.forEach((elem, index) => {
      drawImgBorderText(
        ctx, 
        arrQuest[index].open
          ? source[`q${arrQuest[index].type}`] 
          : elem.src, 
        {
        left: elem.left *m+lofs,
        top: elem.top *m,
        width: elem.width *m,
        height: elem.height *m,
        color: JSCOLORS.black,
        borderPadding: 1 *m,
        borderColor: helperBorderColor(arrQuest[index].type),
        radius: 5 *m
        }, {
        text: arrQuest[index].open
          ? questions[ arrQuest[index].type ][ arrQuest[index].index ]
          : ''
      })
    })    
  }
} 
