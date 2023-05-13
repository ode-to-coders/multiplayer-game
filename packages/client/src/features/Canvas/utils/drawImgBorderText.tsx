
import { ssd } from '../storeSessionData';
import { drawRoundedRect } from './drawRect';
import { drawText } from './drawText';
import { TText, TImgBord } from '../types'

export const drawImageOnload = (
  ctx: CanvasRenderingContext2D, 
  src: string, 
  left: number, 
  top: number, 
  width = 0, 
  height = 0
) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    ctx.drawImage(img, left, top, width, height)
  }
}

/**
 * Отрисовка изображения. Опционально - рамка и текст
 * @param ctx контекст канваса
 * @param src путь к изображению
 * @param rect параметры изображения и области отображения (см. типизацию)
 * @param textObj опционально текст и его параметры
 */

export const drawImgBorderText = (
  ctx: CanvasRenderingContext2D, 
  src: string, 
  rect: TImgBord, 
  textObj?: TText
) => {
  const { left, top, width, height, radius, color, borderColor, shadowOn, shadowColor, cback} = rect;
  const padding = rect.borderPadding ?? 0;
  let checkCashImage = false;  
  let img: HTMLImageElement;
  for (let i = 0; i < ssd.arrLoadedImgSrc.length; i++) {
    if (ssd.arrLoadedImgSrc[i] === src) {
      img = ssd.arrLoadedImg[i];
      checkCashImage = true;
      break;
    }
  }

  const draw = () => {
    drawRoundedRect(
        ctx,
        {
          left: left-padding,
          top: top-padding,
          width: width+(2*padding),
          height: height+(2*padding),
          radius,
          color,
          borderColor
        },
        shadowOn,
        shadowColor
    );
    ctx.drawImage(img, left, top, width, height);
    if (textObj) {
      const {text, textColor, fontSize} = textObj;
      drawText(ctx, {left, top, width, height, text, textColor, fontSize});
    }
    if (cback) {
      // в колбек можно добавить постпрорисовки, если что-то надо поверх еще нарисовать/сделать, то есть так можно бесконечно создавать слой на слое
      cback()
    }
  } 

  if (checkCashImage) {    
    // отрисовка из кеша
    draw()
  } else {
    img = new Image();
    img.src = src;
    img.onload = () => {  
      ssd.arrLoadedImgSrc.push(src);
      ssd.arrLoadedImg.push(img);
      // Onload отрисовка  
      draw();
    }
  }
}
