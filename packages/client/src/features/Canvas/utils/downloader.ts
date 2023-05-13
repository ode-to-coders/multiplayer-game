import { JSCOLORS } from '../const';
import { ssd } from '../storeSessionData';
import { drawText } from './drawText';

export const firstDownloader = (
  ctx: CanvasRenderingContext2D,
  canvasRef: HTMLCanvasElement,
  numsElem: number
) => {
  drawText(ctx, {
    left: canvasRef.width / 2 - 5,
    top: canvasRef.height / 2 - 5,
    width: 10,
    height: 10,
    text: `ЗАГРУЗКА\n${Math.round(ssd.arrLoadedImgSrc.length / numsElem * 100)} %`,
    fontSize: 45,
    textColor: JSCOLORS.orange
  })
  return true;
}
