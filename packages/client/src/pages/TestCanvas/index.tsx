import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { EndPage } from '../EndPage/EndPage';

import { wss } from '../StartPage/StartPage';
import { isOpen } from 'shared/utils/helpers';
import { useGetUserInfoQuery } from 'app/store/api/auth/authApi';

import CanvasScenes from './canvasScenes';

import styles from './index.module.scss';

// компонент только для Тестирования командой

const TestCanvas = () => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);
  const [scene, setScene] = useState(1);
  const [showModalResult, setShowModalResult] = useState(false);
  const [frameRender, goFrameRender] = useState<number>(1);
  const [profession, setProfession] = useState<string>('');

  const { gameId } = useParams();
  const { data } = useGetUserInfoQuery();

  const handleChoose = useCallback((type: string, vote: string, key: string): void => {
    if (isOpen(wss)) {
      wss.send(
        JSON.stringify({
          event: type,
          payload: {
            gameId,
            [key]: vote,
            login: data?.login,
          }
        })
      );
    }
  }, [gameId, data]);

  const canvasScenes = useMemo(() => {
    return new CanvasScenes(
      setScene,
      setShowModalResult,
      goFrameRender,
      handleChoose,
    );
  }, [handleChoose])

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
  }, [scene, frameRender,  canvasScenes]);


  wss.onmessage = function (response) {
    const { type, payload } = JSON.parse(response.data);

    switch (type) {
      case 'selectedProfession':
        setProfession(payload.vote);
        break;

      default:
        break;
    }
  };

  console.log(profession, 'p');

  return (
    <div>
      <div className={styles.wrapCont}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          width='1024'
          height='640'
        />
      </div>
      {showModalResult && <EndPage />}
    </div>
  )
}

export default TestCanvas;
