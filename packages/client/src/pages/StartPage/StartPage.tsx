import React from 'react';

import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import { PAGES } from '@/app/lib/routes.types';

import { StyledDescribe } from './components/StyledDescribe';
import { StyledGridItem } from './components/StyledGridItem';
import { StyledGridMainItem } from './components/StyledGridMainItem';
import { StyledImage } from './components/StyledImage';
import { StyledContainer } from './components/StyledContainer';

import logo from './logo.png';

export const StartPage = () => {
  return (
    <StyledContainer maxWidth={false} disableGutters>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center">
        <StyledGridItem item xs="auto">
          <Link
            style={{
              color: 'var(--color-blue)',
              fontSize: '0.8125rem',
              lineHeight: '0.8125rem',
              textDecoration: 'none',
            }}
            to={PAGES.game}>
            Назад
          </Link>
        </StyledGridItem>
        <StyledGridMainItem item xs>
          <StyledImage src={logo} alt="логотип" />
          <StyledDescribe variant="body1">Ожидание игроков...</StyledDescribe>
        </StyledGridMainItem>
      </Grid>
    </StyledContainer>
  );
};
