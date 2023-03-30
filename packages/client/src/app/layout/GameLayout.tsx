import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, Grid } from '@mui/material';

import { PAGES } from '../lib/routes.types';

export const GameLayout = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: 'flex',
      }}>
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'right',
          fontSize: '20px',
          fontWeight: '500',
          lineHeight: '20px',
          marginRight: '61px',
          gap: '27px',
        }}>
        <Grid item>
          <Link to={PAGES.GAME}>Главная</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.START_GAME}>Старт</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.ENDGAME}>Конец</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.LEADERBOARD}>Рейтинг</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.FORUM}>Форум</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.PROFILE}>Профиль</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.ROOMS}>Комнаты</Link>
        </Grid>
      </Grid>
      <Outlet />
    </Container>
  );
};
