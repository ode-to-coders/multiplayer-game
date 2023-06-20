import { RefObject, useEffect, useMemo, useRef, useState } from 'react';

import { CanvasScenes } from './canvasScenes';

import s from './index.module.scss';
import { EndPage } from '../../pages/EndPage/EndPage';
import { useGetUserInfoQuery } from '@/app/store/api/auth/authApi';
import { source } from '@/shared/const/gameLibrary/dataLibrary';
import { ssd } from './storeSessionData';
import classNames from 'classnames';

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
  
  const { data: userData } = useGetUserInfoQuery();

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
              <div className={s.gameInfoCont}>
                  <div className={s.entourage}>Антураж:<br/> {ssd.mainGamer.nameEntourage}</div>
                  <div className={s.gamerName}>{userData?.display_name}</div>
                  <div className={s.cardsCont}>
                    <div
                      className={s.cards}
                      style={{backgroundImage: `url('${source.game.cards[ssd.mainGamer.entourage].profession[ssd.mainGamer.selectedCards[0]]}')`}}
                    >моя профессия</div>
                    <div
                      className={s.cards}
                      style={{backgroundImage: `url('${source.game.cards[ssd.mainGamer.entourage].secrets[ssd.mainGamer.selectedCards[1]]}')`}}                    
                    >моя тайна</div>
                    <div className={s.offCardsCont}>
                      <div
                        className={classNames(s.offCards, s.cards)}
                        style={{backgroundImage: `url('${source.game.cards[ssd.mainGamer.entourage].profession[ssd.mainGamer.selectedCards[2]]}')`}}                    
                      >профессия исключена</div>
                      <div
                        className={classNames(s.offCards, s.cards)}
                        style={{backgroundImage: `url('${source.game.cards[ssd.mainGamer.entourage].secrets[ssd.mainGamer.selectedCards[3]]}')`}}                    
                      >тайна исключена</div>
                    </div>
                  </div>
                  <div>asdf</div>
                  <div>asdf</div>
              </div>
            </div>          
          }
        </div>
      </div>
      {showModalResult && <EndPage />}
    </div>
  )
}
