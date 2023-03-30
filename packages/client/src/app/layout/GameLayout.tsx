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
          <Link to={PAGES.game}>Главная</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.startGame}>Старт</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.endGame}>Конец</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.leaderboard}>Рейтинг</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.forum}>Форум</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.profile}>Профиль</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.rooms}>Комнаты</Link>
        </Grid>
      </Grid>
      <Outlet /> 
    </Container>
  );
};
