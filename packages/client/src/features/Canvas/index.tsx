import { RefObject, useEffect, useMemo, useRef, useState } from 'react';

import { CanvasScenes } from './canvasScenes';

import s from './index.module.scss';
import { EndPage } from '../../pages/EndPage/EndPage';
import { ssd } from './storeSessionData';
import { cards } from '@/shared/const/gameLibrary/dataLibrary';

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

  const [showGameInfo, useShowGameInfo] = useState(false);
  const handleShowGameInfo = () => {
    useShowGameInfo(!showGameInfo);
  }

  return (
    <div>
      <div className={s.wrapCont}>
        <div className={s.contCanvas}>
          <canvas
            ref={canvasRef}
            className={s.canvas}
            width={canvasSize.width}
            height={canvasSize.height}
          />
          {scene > 0 && 
            <div 
              className={s.headerCanvas}
              style={{
                width: canvasSize.width,
                height: canvasSize.height*0.1 
            }}>
              <div
                onClick={handleShowGameInfo}
                className={s.checkGameInfo}
                style={{
                  width: canvasSize.height*0.1,
                  height: canvasSize.height*0.1 
              }}></div>
              {/* showGameInfo && */ (
                <div
                  className={s.gameInfo}
                >
                  хаха
                </div>
              )}
              {/* <span>
                {'Антураж ' + ssd.mainGamer.nameEntourage}                
              </span>
              <span>
                {' Моя профессия ' + (cards[ssd.mainGamer.entourage].profession[ssd.mainGamer.selectedCards[0]] ?? ' ')}
              </span>
              <span>
                {' Моя тайна ' + (cards[ssd.mainGamer.entourage].secrets[ssd.mainGamer.selectedCards[1]] ?? ' ')}
              </span> */}
            </div>          
          }
        </div>
      </div>
      {showModalResult && <EndPage />}
    </div>
  )
}
