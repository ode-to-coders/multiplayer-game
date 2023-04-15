import { KeyboardEvent, MouseEvent, RefObject, useEffect, useRef, useState } from 'react';

import { settingHover, drawRoundedRect, writingsText, drawText, drawImgBorderText } from 'shared/utils/canvas/utilsDrawCanvas';
import { paramsDrawText } from 'shared/utils/canvas/types';

import s from './index.module.scss';
import { source, questions } from 'shared/const/gameLibrary/dataLibrary';

// компонент только для Тестирования командой

// можно поместить / импортировать все нужные данные всей логики игры в нужное состояние и перерисовывать в процессе, меняя
const mockRects = [
  {key: '0', left: 74, top: 30, width: 390, height: 570, radius: 20, color: '#242729', borderColor: 'yellow'},
  {key: '1', left: 540, top: 30, width: 450, height: 270, radius: 20, color: '#242729', borderColor: 'red'},
  {key: '2', left: 540, top: 350, width: 450, height: 150, radius: 10, color: '#242729', borderColor: 'orange'}
]

export const TestCanvas = () => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);
  const requestRef = useRef<number>();
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

    if (keys !== -1) writingsText(ctx, setArrText, e, {...mockRects[keys], fontSize: 35})
  }

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#343739';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    drawImgBorderText(ctx, source.cardFantasyMage, {
      left: 94,
      top: 50,
      width: 350,
      height: 530,
      color: 'black',
      borderPadding: 20,
      borderColor: 'blue',
      shadowOn: hoveredRect === 0,
      radius: 20
    })

    drawImgBorderText(ctx, source.qFantasy, {
      left: 540,
      top: 30,
      width: 450,
      height: 270,
      color: 'black',
      borderColor: 'orange',
      shadowOn: hoveredRect === 1,
      radius: 20
    }, {
      text: questions.fantasy[0]
    })
    //отрисовываем весь массив mock-прямоугольников-областей
    mockRects.forEach((rect, i) => {
      if (i == 2) drawRoundedRect(ctx, rect, hoveredRect === i)
    })

    //TODO drawText еще поменять чтобы тоже был массивом полей
    if (arrText) drawText(ctx, arrText);   
    
    drawText(ctx, {left: 830, top: 550, width: 100, height: 100, text: 'Testing Draw\nby @odetocoders\n', fontSize: 25, textColor: 'orange'});

    requestRef.current = requestAnimationFrame(draw);
  };

  // основная логика отрисовки здесь
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setAttribute('tabIndex', '0');
    canvas.focus();

    draw();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
    
  }, [arrText, /* arrRect,  */hoveredRect]);

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
