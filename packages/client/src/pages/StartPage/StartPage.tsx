import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetUserInfoQuery } from 'app/store/api/auth/authApi';
import {
  StyledButton,
  StyledContainer,
  StyledDescribe,
  StyledGridItem,
} from '../../shared/ui/Styled';

import style from './index.module.scss';
import logo from './logo.png';
import { DataLoader } from '@/shared/ui/DataLoader/DataLoader';

const wss = new WebSocket('ws://localhost:3002/game/rooms/');

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
  }, [document.fullscreenElement]);

  wss.onmessage = function (response) {
    const { type, payload } = JSON.parse(response.data);
    const { login, rivalName, canStart, count } = payload;
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
          // TODO: переход на страницу с канвасом
          console.log('ready to play');
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    wss.send(
      JSON.stringify({
        event: 'connect',
        payload: { login: data?.login, gameId: gameId },
      })
    );
  }, []);

  const handleChangeButton = () => {
    wss.send(
      JSON.stringify({
        event: 'logout',
        payload: { login: data?.login, gameId: gameId },
      })
    );
    navigate('/rooms');
  };

  return (
    <DataLoader isLoading={isFetching} isError={isError} data={data}>
      {data => (
        <StyledContainer
          maxWidth={false}
          disableGutters
          extendClass={style.container}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center">
            <StyledGridItem item xs="auto" className={style.gridItem}>
              <StyledButton
                extendClass={style.link}
                onClick={handleChangeButton}>
                Назад
              </StyledButton>
            </StyledGridItem>
            <StyledGridItem item xs className={style.gridMainItem}>
              <img className={style.img} src={logo} alt="логотип" />
              <StyledDescribe variant="body1">
                Ожидание игроков... ({count} из 4)
              </StyledDescribe>
            </StyledGridItem>
            <StyledGridItem item xs extendClass={style.gridGamersItem}>
              <StyledButton
                onClick={handleChangeFullscreen}
                extendClass={style.button}>
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
