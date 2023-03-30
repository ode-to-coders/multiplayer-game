import React from 'react';

import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import { PAGES } from '../../app/lib/routes.types';
import { StyledContainer, StyledDescribe } from '../../shared/ui/Styled';
import { StyledGridItem } from '../../shared/ui/Styled/StyledGridItem';

import style from './index.module.scss';
import logo from './logo.png';
import { styles } from './styles';

export const StartPage = () => {
  return (
    <StyledContainer maxWidth={false} disableGutters>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center">
        <StyledGridItem
          item
          xs="auto"
          styles={styles.gridItem}>
          <Link className={style.link} to={PAGES.game}>
            Назад
          </Link>
        </StyledGridItem>
        <StyledGridItem
          item
          xs
          styles={styles.gridMainItem}>
          <img className={style.img} src={logo} alt="логотип" />
          <StyledDescribe variant="body1">Ожидание игроков...</StyledDescribe>
        </StyledGridItem>
      </Grid>
    </StyledContainer>
  );
};
