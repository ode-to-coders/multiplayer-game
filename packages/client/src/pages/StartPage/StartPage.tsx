import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserInfoQuery } from '../../app/store/api/auth/authApi';
import {
  StyledButton,
  StyledContainer,
  StyledDescribe,
  StyledGridItem,
} from '../../shared/ui/Styled';
import styles from './index.module.scss';
import logo from './logo.png';
import { DataLoader } from '../../shared/ui/DataLoader/DataLoader';

export let ws: any;

export const StartPage = () => {
  const { data, isError, isFetching } = useGetUserInfoQuery();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gamers, setGamers] = useState([]);
  const [count, setCount] = useState(1);
  const { gameId } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (count >= 2) {
      ws.send(
        JSON.stringify({
          event: 'ready',
          payload: {
            gameId,
          },
        })
      );
    }
  }, [gameId, count]);

  useEffect(() => {
    ws = new WebSocket('wss://odetocode-league-24.ya-praktikum.tech/wss');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
      ws.send(
        JSON.stringify({
          event: 'connect',
          payload: {
            login: data?.login,
            gameId: gameId,
          },
        })
      );
    };

    ws.onmessage = function (response: any) {
      const { type, payload } = JSON.parse(response.data);
      const {
        login,
        rivalName,
        canStart,
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
          if (login === data?.login && canStart) {
            navigate(`/game/${gameId}`);
          }
          break;
        default:
          break;
      }
    };

    ws.onclose = () => {
      console.log('close');
      ws.send(
        JSON.stringify({
          event: 'logout',
          payload: { login: data?.login, gameId: gameId },
        })
      );
    };
  }, [count, data?.login, gameId]);

  // const handleChangeButton = () => {
  //   ws.close();
  //   navigate('/rooms');
  // };

  return (
    <DataLoader isLoading={isFetching} isError={isError} data={data}>
      {data => (
        <StyledContainer
          maxWidth={false}
          disableGutters
          extendсlass={styles.container}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center">
            <StyledGridItem item xs="auto" className={styles.gridItem}>
              <StyledButton
                extendсlass={styles.link}
                onClick={() => navigate('/rooms')}>
                Назад
              </StyledButton>
            </StyledGridItem>
            <StyledGridItem item xs className={styles.gridMainItem}>
              <img className={styles.img} src={logo} alt="логотип" />
              <StyledDescribe variant="body1">
                Ожидание игроков... ({count} из 4)
              </StyledDescribe>
            </StyledGridItem>
            <StyledGridItem item xs extendсlass={styles.gridGamersItem}>
              <StyledButton
                onClick={handleChangeFullscreen}
                extendсlass={styles.button}>
                {isFullscreen
                  ? 'Выйти из полноэкранного режима'
                  : 'Полноэкранный режим'}
              </StyledButton>
              <StyledDescribe>Игроки в комнате</StyledDescribe>
              <StyledDescribe>{`${data.login} ${gamers}`}</StyledDescribe>
            </StyledGridItem>
          </Grid>
        </StyledContainer>
      )}
    </DataLoader>
  );
};
