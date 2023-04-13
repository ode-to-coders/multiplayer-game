import React from 'react';

import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import { PAGES } from '../../app/lib/routes.types';
import {
  StyledButton,
  StyledContainer,
  StyledDescribe,
  StyledGridItem,
} from '../../shared/ui/Styled';

import style from './index.module.scss';
import logo from './logo.png';

export const StartPage = () => {

  const handleChangeFullscreen = (e: React.MouseEvent) => {
    const page = document.getElementById('root') as HTMLElement;
    const button = e.target as HTMLButtonElement;
    if (!document.fullscreenElement) {
      page.requestFullscreen();
      button.textContent = 'Выйти из полноэкранного режима';
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      button.textContent = 'Полноэкранный режим';
    }
  };

  return (
    <StyledContainer maxWidth={false} disableGutters>
      <StyledButton onClick={handleChangeFullscreen} extendClass={style.button}>
        Полноэкранный режим
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
    </StyledContainer>
  );
};
