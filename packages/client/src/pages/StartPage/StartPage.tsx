import React, { useCallback, useState } from 'react';
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
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    </StyledContainer>
  );
};
