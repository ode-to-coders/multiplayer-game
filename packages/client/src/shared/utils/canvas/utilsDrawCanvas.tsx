import { Dispatch, KeyboardEvent, MouseEvent, SetStateAction } from 'react';
import { KEYS } from 'shared/const/constants';
import { IRect, TText, TImgBord, paramsDrawText, IobjLogWritingsText, TWritingsTextParams, IobjLogBack, IobjHelpOffset } from './types'
/**
 * Функция установки State при наведении на объект в канвасе (например, тени при наведении)
 * Помещать в обработчик onMouseMove канваса.
 * @param arrHovered 
 * @param e 
 * @param state ?
 * @param setState ?
 * @return индекс объекта из массива, на котором сейчас мышка
 */

export const settingHover = (
  arrRect: IRect[], 
  e: MouseEvent<HTMLCanvasElement>, 
  state?: number | null, 
  setState?: Dispatch<SetStateAction<number | null>>
) => {
  const target = e.target as HTMLCanvasElement;
  const x = e.pageX - target.offsetLeft;
  const y = e.pageY - target.offsetTop;
  let checkHovered = false;
  for (let i = 0; i < arrRect.length; i++) {
    const item = arrRect[i];
    if (
      x > item.left 
      && x < (item.left+item.width) 
      && y > item.top 
      && y < (item.top+item.height)
    ) {
      if (
        setState 
        && state !== i
      ) {
        setState(i)
      }
      checkHovered = true;
      return i;
    }
  }
  if (
    setState 
    && !checkHovered
  ) {
    setState(null);
  }
}

/**
 * Нарисовать прямоугольник на канвасе (скругленные углы опционально)
 * @param ctx контекст канваса
 * @param rect объект с параметрами прямоугольника (см.типизацию)
 * @param checkShadow опциональный boolean, чтобы включить тень, отправить true
 * @param shadowColor опционально цвет тени ?? цвет border ?? 'transparent'
 */

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
    color = rect.color ?? 'transparent',
    borderColor = rect.borderColor ?? 'transparent';

  if (checkShadow) {
    ctx.shadowColor = shadowColor ?? borderColor ?? 'transparent';
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
    ctx.shadowColor = 'transparent';
  }
}

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

export const drawImgBorderText = async(
  ctx: CanvasRenderingContext2D, 
  src: string, 
  rect: TImgBord, 
  textObj?: TText
) => {
  const {left, top, width, height, radius, color, borderColor, shadowOn, shadowColor} = rect;
  const padding = rect.borderPadding ?? 0;
  const img = new Image();
  img.src = src;
  ctx.drawImage(img, left, top, width, height);
  // return new Promise(resolve => {
  // const anim = () => {
    if (img.complete) {     
      //resolve(() => {
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
        // resolve('');
      //});
    } else {
      // console.log('не готов'); 
      // setTimeout(() => anim(), 1000/10)
    }
  // }
  // anim()
  // })
}

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
  ctx.fillStyle = params.textColor ?? 'white';
  ctx.font = `bold ${sizeText}px Arial Narrow`;
  
  const arrTxt = text.split('\n');
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

const logWritings: IobjLogWritingsText = {};
const notWriteKeys: string[] = [
  KEYS.Control, KEYS.Shift, KEYS.Alt, KEYS.Meta, KEYS.Win,
  KEYS.PageUp, KEYS.PageDown, KEYS.Home, KEYS.End,
  KEYS.Delete, KEYS.Insert, 
  KEYS.F1, KEYS.F2, KEYS.F3, KEYS.F4, KEYS.F5, KEYS.F6,
  KEYS.F7, KEYS.F8, KEYS.F9, KEYS.F10, KEYS.F11, KEYS.F12, 
  KEYS.PrintScreen, KEYS.Scroll, KEYS.Escape, KEYS.CapsLock,
  KEYS.Tab, KEYS.Left, KEYS.Right, KEYS.Up, KEYS.Down
];

/**
 * Функция написания текста в канвасе, помещать в обработчик onKeyDown канваса
 * @param ctx контекст канваса
 * @param setState получает сеттер нужного стейта для изменения
 * @param e keyboardEvent
 * @param params принимает разные параметры области для отображения (см.типы)
 * @returns 
 */

export const writingsText = (
  ctx: CanvasRenderingContext2D, 
  setState: Dispatch<SetStateAction<paramsDrawText | null>>, 
  e: KeyboardEvent<HTMLCanvasElement>, 
  params: TWritingsTextParams
) => {

  if (notWriteKeys.includes(e.key)) { // исключаем логические клавиши клавиатуры
    return -1;
  }
  const {key, left, top, width, height} = params;
  const fontSize = params.fontSize ?? 20;
  const textColor = params.textColor ?? 'white';

  if (!logWritings[key]) {
    logWritings[key] = '';
  }
  let text = logWritings[key];
  ctx.font = `bold ${fontSize}px Arial Narrow`;
  
  if (e.key === KEYS.Backspace) {
    if (!text) {
      return -1;
    }
    text = text.slice(0, text.length-1)
    logWritings[key] = text;
    setState({left, top, width, height, text, textColor, fontSize})
    return text;
  }
  
  const arrTxt = text.split('\n');

  if (e.key === KEYS.Enter) {
    if (fontSize*(arrTxt.length + 1) > height) {
      return -1;
    }
    text += '\n';
    logWritings[key] = text;
    setState({left, top, width, height, text, textColor, fontSize})
    return text;
  }
  
  const widthLastStr = ctx.measureText(arrTxt[arrTxt.length-1] + e.key).width;
  
  if (widthLastStr > width) {
    if (fontSize*(arrTxt.length + 1) < height) {
      text += `\n${e.key}`;
    }
  } else text += e.key;
  
  logWritings[key] = text;
  setState({left, top, width, height, text, textColor, fontSize})
  return text;
}

const logBack: IobjLogBack = {};
const helpOffset: IobjHelpOffset = {}

// функция, если нужно написать что-то временно (сотрется при перерендере)

export const tempWritingsText = (
  ctx: CanvasRenderingContext2D, 
  e: KeyboardEvent, 
  params: TWritingsTextParams
) => {
  
  if (notWriteKeys.includes(e.key)) {
    return;
  }
  const {key, left, top, width, height} = params;
  const fontSize = params.fontSize ?? 20;
  
  if (!helpOffset[key]) {
    helpOffset[key] = {
      left: null,
      top: null
    }
  }
  const offset = helpOffset[key];
  offset.left = offset.left ?? left;
  offset.top = offset.top ?? top+fontSize;  
  
  if (e.key === 'Backspace') {
    if (!logBack[key]) {
      return;
    }
    const objImage = logBack[key].pop();
    if (!objImage) {
      return;
    }
    offset.left = objImage.l, offset.top = objImage.t;
    ctx.putImageData(objImage.img, objImage.l, objImage.h);
    return;
  }

  if (offset.top >= top+height) {
    return;
  }
  
  ctx.font = `${fontSize}px Arial Narrow`;
  ctx.fillStyle = 'white';
  const widthSymbol = ctx.measureText(e.key).width;

  const savedBeforeWrite = ctx.getImageData(
    offset.left, 
    offset.top - fontSize, 
    1.2*widthSymbol, 
    fontSize + fontSize*0.4
  )

  if (!logBack[key]) {
    logBack[key] = [];
  }
  logBack[key].push({
    img: savedBeforeWrite, 
    l: offset.left, 
    t: offset.top, 
    h: offset.top - fontSize, 
  });
  if (logBack[key].length > 300) {
    logBack[key][logBack[key].length - 300] = null;
  }

  ctx.fillText(e.key, offset.left, offset.top)
  offset.top = (
    offset.left+3*widthSymbol >= left+width) 
    ? offset.top += fontSize 
    : offset.top;
  offset.left = (
    offset.left+3*widthSymbol >= left+width) 
    ? left 
    : offset.left += 1.1*widthSymbol;
}
