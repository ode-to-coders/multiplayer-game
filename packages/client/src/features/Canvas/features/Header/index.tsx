import { ChangeEvent, useState } from 'react';
import { CanvasScenes } from '../../canvasScenes';
import { ssd } from '../../storeSessionData';

import classNames from 'classnames';
import { cards, source } from '../../../../shared/const/gameLibrary/dataLibrary';

import s from './index.module.scss';
import { helperBorderColor } from '../../utils';

export const Header = (props: {canvasScenes: CanvasScenes, scene: number, canvasSize: {width: number, height: number}}) => {
  const {canvasScenes, scene, canvasSize} = props;
  const [stateVolume, setStateVolume] = useState(0);

  const [showGameInfo, useShowGameInfo] = useState(false);
  const handleShowGameInfo = () => {
    useShowGameInfo(!showGameInfo);
  }
  const handleToggleVolume = () => {
    const value = stateVolume ? 0 : 1;
    setStateVolume(value);
    canvasScenes.audio.setVolume(value);
  }
  const handleChangeVolume = (e: ChangeEvent) => {
    const value = (e.target as HTMLInputElement)?.value;
    setStateVolume(+value)
    canvasScenes.audio.setVolume(+value);
  }

  return (
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
          height: canvasSize.height*0.1,
          border: `1px solid ${helperBorderColor(ssd.mainGamer.entourage)}`
      }}></div>
      <div className={s.gameInfoCont}>
        <div className={s.entourage}>Антураж:<br/> {scene > 1 ? ssd.mainGamer.nameEntourage : ''}</div>
        {scene > 2 && (<div className={s.gamerName}>{                  
          (cards[ssd.mainGamer.entourage].profession[ssd.mainGamer.selectedCards[0]]
            ? 'я: ' + cards[ssd.mainGamer.entourage].profession[ssd.mainGamer.selectedCards[0]]
              : '')
          + (cards[ssd.mainGamer.entourage].secrets[ssd.mainGamer.selectedCards[1]]
            ? ', ' + cards[ssd.mainGamer.entourage].secrets[ssd.mainGamer.selectedCards[1]] 
            : '')
        }</div>)}
        {scene > 3 && (
        <div className={s.cardsCont}>
          <div
            className={s.cards}
            style={{
              backgroundImage: `url('${source.game.cards[ssd.mainGamer.entourage].profession[ssd.mainGamer.selectedCards[0]]}')`,
              border: `2px solid ${helperBorderColor(ssd.mainGamer.entourage)}`
            }}
          >моя профессия</div>
          <div
            className={s.cards}
            style={{backgroundImage: `url('${source.game.cards[ssd.mainGamer.entourage].secrets[ssd.mainGamer.selectedCards[1]]}')`,
            border: `2px solid ${helperBorderColor(ssd.mainGamer.entourage)}`
          }}
          >{scene > 4 && 'моя тайна'}
          </div>
        </div>)}
        {scene > 3 && (<div className={s.offCardsCont}>
          <div
            className={s.offCards}
            style={{backgroundImage: `url('${source.game.cards[ssd.mainGamer.entourage].profession[ssd.mainGamer.selectedCards[2]]}')`,
            border: `2px solid ${helperBorderColor(ssd.mainGamer.entourage)}`
          }}
          >профессия исключена</div>
          <div
            className={s.offCards}
            style={{backgroundImage: `url('${source.game.cards[ssd.mainGamer.entourage].secrets[ssd.mainGamer.selectedCards[3]]}')`,
            border: `2px solid ${helperBorderColor(ssd.mainGamer.entourage)}`
          }}
          >{scene > 4 && 'тайна исключена'}</div>
        </div>)}
      </div>
      <div className={s.soundCont}>
        <div className={s.soundElem}>
          <input className={s.soundPointer}
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={stateVolume}
            onChange={handleChangeVolume}
          />
        </div>
        <div
          className={classNames(s.soundElem, s.soundPointer, s.soundToggle)}
          onClick={handleToggleVolume}>{stateVolume ? '🔊' : '🔈'}
        </div>
      </div>
    </div> 
  )
}
