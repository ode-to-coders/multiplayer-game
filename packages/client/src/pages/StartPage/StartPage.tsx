
import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { PAGES } from '../../app/lib/routes.types';
import {
  StyledButton,
  StyledContainer,
  StyledDescribe,
  StyledGridItem,
} from '../../shared/ui/Styled';

import style from './index.module.scss';
import logo from './logo.png';

const wss = new WebSocket('ws://localhost:3002/game/rooms/');

export const StartPage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gamers, setGamers] = useState('');
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
    const { login, rivalName } = payload;
    console.log(login, rivalName);
    switch (type) {
      case 'connectionToPlay':
        if (!payload.success) {
          return navigate('/game/rooms');
        }
        setGamers(rivalName);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    wss.send(
      JSON.stringify({
        event: 'connect',
        payload: { login: `login${uuidv4()}`, gameId: gameId },
      })
    );
  }, []);

  return (
    <StyledContainer maxWidth={false} disableGutters>
      <StyledButton onClick={handleChangeFullscreen} extendClass={style.button}>
        {isFullscreen
          ? 'Выйти из полноэкранного режима'
          : 'Полноэкранный режим'}
      </StyledButton>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center">
        <StyledGridItem item xs="auto" className={style.gridItem}>
          <Link className={style.link} to={PAGES.ROOMS}>
            Назад
          </Link>
        </StyledGridItem>
        <StyledGridItem item xs className={style.gridMainItem}>
          <img className={style.img} src={logo} alt="логотип" />
          <StyledDescribe variant="body1">Ожидание игроков...</StyledDescribe>
        </StyledGridItem>
      </Grid>
      <Grid>
        <StyledGridItem>
          <StyledDescribe>{gamers}</StyledDescribe>
        </StyledGridItem>
      </Grid>
    </StyledContainer>
  );
};
