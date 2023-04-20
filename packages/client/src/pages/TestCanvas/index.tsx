import { KeyboardEvent, MouseEvent, RefObject, useEffect, useMemo, useRef, useState } from 'react';

import { mockRects } from './canvasScenes';

import { settingHover, writingsText } from 'shared/utils/canvas/utilsDrawCanvas';
import { paramsDrawText } from 'shared/utils/canvas/types';
import { CanvasScenes } from './canvasScenes';

import s from './index.module.scss';

// компонент только для Тестирования командой

export const TestCanvas = () => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);
  const [hoveredRect, setHoveredRect] = useState<number | null>(null);
  //const [arrRect, setArrRect] = useState(mockRects)
  const [arrText, setArrText] = useState<paramsDrawText | null>(null)
  const [keys, setKeys] = useState(-1)

  const handlerMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    settingHover(mockRects, e, hoveredRect, setHoveredRect);
  }
  
  const handlerClick = (e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>) => {
    setKeys(settingHover(mockRects, e) ?? -1); // по клику функция вовзращает индекс элемента в массиве, над которым произошел клик
    //пример тогла между разными данными для отрисовки
    //setArrRect(arrRect.length === mockRects.length ? mockRects2 : mockRects)
  }

  const handlerKeyDown = (e: KeyboardEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef?.current?.getContext('2d');
    if (!ctx) return;

    if (keys !== -1) {
      writingsText(ctx, setArrText, e, {...mockRects[keys], fontSize: 35})
    }
  }
  
  const canvasScenes = useMemo(() => {
    return new CanvasScenes();
  }, [])

  // основная логика отрисовки здесь
  useEffect(() => {
    let frameId: number;
  
    const animation = () => {
      
      // запуск!
      canvasScenes.startGame(canvasRef.current, hoveredRect, arrText);
      
      frameId = window.requestAnimationFrame(animation);
    }  
    frameId = window.requestAnimationFrame(animation);
  
    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [arrText, hoveredRect]);

  return (
    <div className={s.wrapCont}>
      <canvas
        ref={canvasRef}
        className={s.canvas}
        width='1024'
        height='640'
        onMouseMove={handlerMouseMove}
        onClick={handlerClick}
        onKeyDown={handlerKeyDown}
      />
    </div>
  )
}
