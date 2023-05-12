import { ssd } from '@/pages/TestCanvas/storeSessionData';
import { KEYS } from 'shared/const/constants';

import { FONTS, JSCOLORS } from 'pages/TestCanvas/const';

import { IobjHelpOffset, IobjLogBack, TObjParamsDrawText, TWritingsTextParams } from './types';

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
  e: KeyboardEvent, 
  state: {
    objText: TObjParamsDrawText,
    set: (objText: TObjParamsDrawText) => void, 
  },
  params: TWritingsTextParams
) => {

  if (notWriteKeys.includes(e.key)) { // исключаем логические клавиши клавиатуры
    return -1;
  }
  const {key, left, top, width, height} = params;
  const fontSize = params.fontSize ?? 20;
  const textColor = params.textColor ?? JSCOLORS.white;

  if (!ssd.logWritings[key]) {
    ssd.logWritings[key] = '';
  }

  let text = ssd.logWritings[key]; 

  if (params.validate && !params.validate.test(text + e.key)) { // если не прошло валидацию
    return -1;
  }

  ctx.font = `bold ${fontSize}px ${FONTS.mainCanvas}`;
  
  if (e.key === KEYS.Backspace) {
    if (!text) {
      return -1;
    }
    text = text.slice(0, text.length-1)
    ssd.logWritings[key] = text;
    state.set({
      ...state.objText, 
      [key]: {left, top, width, height, text, textColor, fontSize}
    })
    return text;
  }
  
  const arrTxt = text.split('\n');

  if (e.key === KEYS.Enter) {
    if (fontSize*(arrTxt.length + 1) > height) {
      return -1;
    }
    text += '\n';
    ssd.logWritings[key] = text;
    state.set({
      ...state.objText,
      [key]: {left, top, width, height, text, textColor, fontSize}
    })
    return text;
  }
  
  const widthLastStr = ctx.measureText(arrTxt[arrTxt.length-1] + e.key).width;
  
  if (widthLastStr > width) {
    if (fontSize*(arrTxt.length + 1) <= height) {
      console.log('c')
      text += `\n${e.key}`;
    }
  } else text += e.key;
  
  ssd.logWritings[key] = text;
  state.set({
    ...state.objText,
    [key]: {left, top, width, height, text, textColor, fontSize}
  })
  return text;
}

// функция, если нужно написать что-то временно (сотрется при перерендере)

const logBack: IobjLogBack = {};
const helpOffset: IobjHelpOffset = {}

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
  
  ctx.font = `${fontSize}px ${FONTS.mainCanvas}`;
  ctx.fillStyle = JSCOLORS.white;
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
