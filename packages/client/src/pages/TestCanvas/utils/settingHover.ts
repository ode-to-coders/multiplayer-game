import { IRect } from './types';

/**
 * Функция установки State при наведении на объект в канвасе (например, тени при наведении)
 * Помещать в обработчик mousemove, click канваса.
 * @param arrHovered 
 * @param e 
 * @param state ?
 * @param setState ?
 * @return индекс объекта из массива, на котором сейчас мышка
 */

export const settingHover = (
  arrRect: IRect[], 
  e: MouseEvent, 
  state?: number | null, 
  setState?: (index: number | null) => void
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
