import { useCallback, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetUserInfoQuery } from 'app/store/api/auth/authApi';
import { setGameMemebers } from 'app/store/game/gameSlice';
import { useAppDispatch } from 'app/store/store';

import {
  StyledButton,
  StyledContainer,
  StyledDescribe,
  StyledGridItem,
} from 'shared/ui/Styled';
import { DataLoader } from 'shared/ui/DataLoader/DataLoader';

import logo from './logo.png';

import styles from './index.module.scss';


export const wss = new WebSocket('ws://localhost:3002/game/rooms/');

export const StartPage = () => {
  const { 
    data,
    isError,
    isFetching,
  } = useGetUserInfoQuery();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gamers, setGamers] = useState([]);
  const [count, setCount] = useState(1);
  const { gameId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    wss.send(
      JSON.stringify({
        event: 'connect',
        payload: {
          login: data?.login,
          gameId: gameId,
        },
      })
    );
  }, [gameId, data?.login]);

  useEffect(() => {
    if (count >= 2) {
      wss.send(
        JSON.stringify({
          event: 'ready',
          payload: {
            gameId,
          },
        })
      );
    }
  }, [gameId, count]);

  const handleChangeFullscreen = useCallback(() => {
    const page = document.getElementById('root') as HTMLElement;
    if (!document.fullscreenElement) {
      setIsFullscreen(true);
      return page.requestFullscreen();
    } else {
      setIsFullscreen(false);
      return document.exitFullscreen();
    }
  }, []);

  const handleChangeButton = useCallback(() => {
    wss.send(
      JSON.stringify({
        event: 'logout',
        payload: {
          gameId, 
        },
      })
    );
    navigate('/rooms');
  }, [gameId, navigate]);

  wss.onmessage = function (response) {
    const { type, payload } = JSON.parse(response.data);

    const {
      rivalName,
      canStart,
      login,
      count
    } = payload;

    setGamers(rivalName);

    setCount(count);

    switch (type) {
      case 'connectionToPlay':
        if (!payload.success) {
          return navigate('/rooms');
        }
        break;

      case 'readyToPlay':
        if (canStart) {
          const users = [...gamers, login].map((user: string, i: number) => {
            return {
              login: user,
              id: i,
              enthourage: '',
            }
          });
          dispatch(setGameMemebers(users));
          navigate(`/game/${gameId}/enthourage`);
        }
        break;

      default:
        break;
    }
  };

  return (
    <DataLoader isLoading={isFetching} isError={isError} data={data}>
      {data => (
        <StyledContainer
          maxWidth={false}
          disableGutters
          extendClass={styles.container}
        >
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'>
            <StyledGridItem item xs='auto' className={styles.gridItem}>
              <StyledButton
                extendClass={styles.link}
                onClick={handleChangeButton}
              >
                Назад
              </StyledButton>
            </StyledGridItem>
            <StyledGridItem item xs className={styles.gridMainItem}>
              <img className={styles.img} src={logo} alt='логотип' />
              <StyledDescribe variant='body1'>
                Ожидание игроков... ({count} из 4)
              </StyledDescribe>
            </StyledGridItem>
            <StyledGridItem item xs extendClass={styles.gridGamersItem}>
              <StyledButton
                onClick={handleChangeFullscreen}
                extendClass={styles.button}>
                {isFullscreen
                  ? 'Выйти из полноэкранного режима'
                  : 'Полноэкранный режим'}
              </StyledButton>
              <StyledDescribe>Игроки в комнате</StyledDescribe>
              <StyledDescribe >{`${data.login} ${gamers}`}</StyledDescribe>
            </StyledGridItem>
          </Grid>
        </StyledContainer>
      )}
    </DataLoader>
  );
};
