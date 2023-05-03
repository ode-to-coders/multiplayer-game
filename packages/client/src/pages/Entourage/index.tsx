import { Fragment, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {StyledDescribe, StyledTitle } from '../../shared/ui/Styled';

import { selectGameMembers } from 'app/store/game/gameSlice';
import { useGetUserInfoQuery } from 'app/store/api/auth/authApi';
import { useAppDispatch } from 'app/store/store';
import { setVoice } from 'app/store/game/gameSlice';

import { getWinnerEnthourage, isOpen } from 'shared/utils/helpers';

import { wss } from '../StartPage/StartPage';

import fantasy from '../../images/fantasy.jpg';
import modernity from '../../images/modernity.jpg';
import victorian from '../../images/victorian.jpg';

import { IEnthourage } from './types';
import { UserChoice } from 'app/store/game/types';

import styles from './index.module.scss';


const enthourageVariants = [
  {
    id: 0,
    name: 'Фэнтэзи',
    src: fantasy,
  },
  {
    id: 1,
    name: 'Современность',
    src: modernity,
  },
  {
    id: 2,
    name: 'Викторианская Англия',
    src: victorian,
  }
];


//Todo. Карточки будут отрисованы на канвасе.

export function Enthourage() {
  const [winnerEnthourage, setWinnerEnthourage] = useState<Record<string, unknown> | undefined >();
  const [winnerSrc, updateWinnerSrc] = useState('');
  const members = useSelector(selectGameMembers);

  const { gameId } = useParams();
  const { data } = useGetUserInfoQuery();
  const dispatch = useAppDispatch();

  const [timer, setTimer] = useState(30);
  const [over, setOver] = useState(false);

  const handleClick = useCallback((vote: string | undefined) => {
    if (isOpen(wss)) {
      wss.send(
        JSON.stringify({
          event: 'chooseEnthourage',
          payload: {
            gameId,
            vote,
            login: data?.login,
          }
        })
      );
    }
  }, [data?.login, gameId]);

  wss.onmessage = function (response) {
    const { type, payload } = JSON.parse(response.data);

    switch (type) {
      case 'selectedEnthourage':
        dispatch(setVoice({
          login: payload.login,
          vote: payload.vote,
        }))
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const isVoted = members.every((user: UserChoice) => user.enthourage !== '');
    
    if (isVoted) {
      const winner = getWinnerEnthourage(members);

      setWinnerEnthourage(winner);
      setOver(true);
    }
  }, [members]);

  useEffect(() => {
    if (over) return;

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, over]);

  useEffect(() => {
    if (timer === 0) {
      setOver(true);

      const randomIndex = Math.floor(Math.random() * (enthourageVariants.length - 1));
      handleClick(enthourageVariants[randomIndex].name);
    }
  }, [timer, handleClick]);

  useEffect(() => {
    if (winnerEnthourage) {
      updateWinnerSrc(enthourageVariants.filter((enthourage: IEnthourage) =>
        enthourage.name === winnerEnthourage.name)[0].src);
    }
  }, [winnerEnthourage]);

  return (
    <div className={styles.wrapper}>
      {!over && (
        <Fragment>
          <StyledTitle variant="h3" className={styles.headline}>
            Голосование за антураж
          </StyledTitle>
          <div className={styles.enthourages}>
            {enthourageVariants.map((variant, index) => {
              return (
                <Fragment key={variant.id}>
                  <label className={styles.label}>
                    <input
                      type='radio'
                      className={styles.input}
                      onInput={() => handleClick(variant.name)}
                    />
                    <div className={styles.enthourage}>
                      <img src={variant.src} />
                    </div>
                  </label>
                  {!index && (
                    <StyledDescribe variant="body1" extendClass={styles.timer}>
                      {timer}
                    </StyledDescribe>
                  )}
                </Fragment>
              )
            })}
          </div>
        </Fragment>
      )}
      {over && (
        <Fragment>
          <StyledTitle variant='h5' className={styles.headline}>
            {winnerEnthourage &&
              `${winnerEnthourage.value} из ${members.length}
              игроков проголосовали за антураж ${winnerEnthourage.name}!`
            }
          </StyledTitle>
            <div className={styles.enthourage}>
              {winnerSrc && <img src={winnerSrc} />}
            </div>
        </Fragment>
      )}
    </div>
  );
}
