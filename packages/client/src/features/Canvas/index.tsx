import { RefObject, useEffect, useMemo, useRef, useState } from 'react';

import { CanvasScenes } from './canvasScenes';

import s from './index.module.scss';
import { EndPage } from '../../pages/EndPage/EndPage';

const canvasSize = {width: 1280  , height: 768}; // TODO в будущем при запуске.. внести в компонент и динамически решать какие нужны размеры взависимости от экрана клиента

export const Canvas = () => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);
  const [scene, setScene] = useState(1);
  const [showModalResult, setShowModalResult] = useState(false);
  const [frameRender, goFrameRender] = useState<number>(1);

  const canvasScenes = useMemo(() => {
    return new CanvasScenes(
      setScene,
      setShowModalResult,
      goFrameRender,
      {width: canvasSize.width, height: canvasSize.height}
    );
  }, [])

  // основная логика отрисовки здесь
  useEffect(() => {
    let frameId: number | null = null;
    let next = false; // нужен ли следующий кадр?
    
    const animation = () => { 
      if(!canvasRef.current) {
        // Компонент был размонтирован
        return;
      }

      // запуск!
      next = canvasScenes.startGame(canvasRef.current, scene);
      
      if (next) {
        frameId = window.requestAnimationFrame(animation);
      } else {
        if (frameId !== null) {
          window.cancelAnimationFrame(frameId);
          frameId = null;
        }
      }
    }

    animation()
  
    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
    };
  }, [canvasRef.current, scene, frameRender]);

  return (
    <div>
      <div className={s.wrapCont}>
        <canvas
          ref={canvasRef}
          className={s.canvas}
          width={canvasSize.width}
          height={canvasSize.height}
        />
      </div>
      {showModalResult && <EndPage />}
    </div>
  )
}
