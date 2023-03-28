import React from 'react';

import { Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { PAGES } from '@/app/lib/routes.types';

import { style } from './style';
import logo from './logo.png';

export const StartPage = () => {
  return (
    <Container maxWidth={false} disableGutters sx={style.container}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center">
        <Grid item xs="auto" sx={style.gridItem}>
          <Link style={style.link} to={PAGES.game}>
            Назад
          </Link>
        </Grid>
        <Grid item xs sx={style.gridMainItem}>
          <img src={logo} alt="логотип" style={style.image} />
          <Typography sx={style.describe} variant="body1">
            Ожидание игроков...
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
