/**
 * Нарисовать прямоугольник на канвасе (скругленные углы опционально)
 * @param ctx контекст канваса
 * @param rect объект с параметрами прямоугольника (см.типизацию)
 * @param checkShadow опциональный boolean, чтобы включить тень, отправить true
 * @param shadowColor опционально цвет тени ?? цвет border ?? 'transparent'
 */

import { JSCOLORS } from 'pages/TestCanvas/const';
import { IRect } from './types';

export const drawRoundedRect = (
  ctx: CanvasRenderingContext2D, 
  rect: IRect, 
  checkShadow = false, 
  shadowColor?: string
) => {  
  const 
    l = rect.left,
    t = rect.top,
    w = rect.width,
    h = rect.height,
    r = rect.radius ?? 0,
    color = rect.color ?? JSCOLORS.null,
    borderColor = rect.borderColor ?? JSCOLORS.null;

  if (checkShadow) {
    ctx.shadowColor = shadowColor ?? borderColor ?? JSCOLORS.null;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 15;
  }

  ctx.strokeStyle = borderColor;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(l + r, t);
  ctx.lineTo(l + w - r, t);
  ctx.arcTo(l + w, t, l + w, t + r, r);
  ctx.lineTo(l + w, t + h - r);
  ctx.arcTo(l + w, t + h, l + w - r, t + h, r);
  ctx.lineTo(l + r, t + h);
  ctx.arcTo(l, t + h, l, t + h - r, r);
  ctx.lineTo(l, t + r);
  ctx.arcTo(l, t, l + r, t, r);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  if (checkShadow) {
    ctx.shadowColor = JSCOLORS.null;
  }
}
