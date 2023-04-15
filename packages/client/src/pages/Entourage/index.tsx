import { Fragment, useEffect, useState } from 'react';
import {StyledDescribe, StyledTitle } from '../../shared/ui/Styled';

import { getWinnerEnthourage } from '../../utils';

import participants from '../../mocks/participants.json';

import fantasy from '../../images/fantasy.jpg';
import modernity from '../../images/modernity.jpg';
import victorian from '../../images/victorian.jpg';

import { IUserVote } from './types';

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
  const members = participants;
  const currentUser = 'Ringo Starr';

  const [timer, setTimer] = useState(45);
  const [over, setOver] = useState(false);

  const handleClick = (vote: string) => {
    console.log(vote);
    const user = members.filter(enthourage => enthourage.name === currentUser);
    if (user.length > 0) {
      user[0].votes = vote;
    }

    const winner = getWinnerEnthourage(members);

    setWinnerEnthourage(winner);
    setOver(true);
  };

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
  }, [timer]);

  useEffect(() => {
    if (winnerEnthourage) {
      updateWinnerSrc(enthourageVariants.filter((enthourage: IUserVote) =>
        enthourage.name === winnerEnthourage.name)[0].src);
    }
  }, [winnerEnthourage]);

  return (
    <div className={styles.wrapper}>
      {!over &&
        <Fragment>
          <StyledTitle variant="h3" className={styles.headline}>
            Голосование за антураж
          </StyledTitle>
          <div className={styles.enthourages}>
            {enthourageVariants.map((variant, i) => {
              return (
                <label className={styles.label} key={variant.id}>
                  <input
                    type='radio'
                    className={styles.input}
                    onInput={() => handleClick(variant.name)}
                  />
                  <div className={styles.enthourage}>
                    <img src={variant.src} />
                  </div>
                  {i === 0 &&
                    <StyledDescribe variant="body1" extendClass={styles.timer}>
                      {timer}
                    </StyledDescribe>
                  }
                </label>
              )
            })}
          </div>
        </Fragment>
      }
      {over &&
        <Fragment>
          <StyledTitle variant='h5' className={styles.headline}>
            {winnerEnthourage &&
              `${winnerEnthourage.value} из ${participants.length}
              игроков проголосовали за антураж ${winnerEnthourage.name}!`
            }
          </StyledTitle>
            <div className={styles.enthourage}>
              <img src={winnerSrc} />
            </div>
        </Fragment>
      }
    </div>
  );
}
