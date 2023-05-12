import { FONTS, JSCOLORS } from 'pages/TestCanvas/const';

import { paramsDrawText } from './types';

/**
 * Отрисовка текста по центру поля заданных размеров
 * текст передавать строкой с \n в нужных местах для перехода на другую строку, пример 'Ode\nTo\nCode';
 * @param ctx контекст канваса
 * @param params объект с параметрами отрисовки (см. типизацию) отступ слева, сверху, ширина, высота (размеры поля), сам текст, опционально цвет и размер
*/

export const drawText = (
  ctx: CanvasRenderingContext2D, 
  params: paramsDrawText
) => {
  const {left, top, width, height, text} = params;

  const sizeText = params.fontSize ?? (width ? width/18 : 20);
  ctx.fillStyle = params.textColor ?? JSCOLORS.white;
  ctx.font = `bold ${sizeText}px ${FONTS.mainCanvas}`;
  
  const arrTxt = text ? text.toString().split('\n') : ['']; // возможно если Null то лучше return
  const topText = 
    top + (
      height 
      ? height/2 + 0.3*sizeText - ((arrTxt.length-1)*0.5*sizeText) 
      : 0
    )
  for (let i = 0; i < arrTxt.length; i++)
    ctx.fillText(
      arrTxt[i], 
      left + (width ? width/2 - ctx.measureText(arrTxt[i]).width/2 : 0), 
      topText + (i*sizeText)
    );
}
