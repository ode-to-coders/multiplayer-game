import { RefObject, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { EndPage } from '../../pages/EndPage/EndPage';
import { ws } from '../../pages/StartPage/StartPage';

import { useGetUserInfoQuery } from '../../app/store/api/auth/authApi';

import { isOpen } from '../../shared/utils/helpers';

import { CanvasScenes } from './canvasScenes';

import styles from './index.module.scss';



// TODO в будущем при запуске.. внести в компонент и динамически решать какие нужны размеры взависимости от экрана клиента
const canvasSize = {width: 1280  , height: 768};

export const Canvas = () => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);
  const [scene, setScene] = useState(1);
  const [showModalResult, setShowModalResult] = useState(false);
  const [frameRender, goFrameRender] = useState<number>(1);
  const [winEntourage, setWinEntourage] = useState<'england' | 'modern' | 'fantasy'>('england');

  const { gameId } = useParams();
  const { data } = useGetUserInfoQuery();

  const handleWin = useCallback(() => {
    console.log(1);
    return {
      winEntourage,
    }
  }, [winEntourage]);

  const handleChoose = useCallback(async(type: string, vote: string, key: string): Promise<void> => {
    if (isOpen(ws)) {
      await ws.send(
        JSON.stringify({
          event: type,
          payload: {
            gameId,
            login: data?.login,
            answers: {
              [key]: vote
            },
          }
        })
      );
    }
  }, [gameId, data]);

  ws.onmessage = function (response: any) {
    const { type, payload } = JSON.parse(response.data);
    console.log(payload);

    switch (type) {
      case 'play': {
        setWinEntourage(payload.winEntourage);
        break;
      }

      default:
        break;
    }
  };

  const canvasScenes = useMemo(() => {
    return new CanvasScenes(
      setScene,
      setShowModalResult,
      goFrameRender,
      {width: canvasSize.width, height: canvasSize.height},
      handleChoose,
      handleWin,
    );
  }, [handleChoose]);

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
      <div className={styles.wrapCont}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          width={canvasSize.width}
          height={canvasSize.height}
        />
      </div>
      {showModalResult && <EndPage />}
    </div>
  )
}
