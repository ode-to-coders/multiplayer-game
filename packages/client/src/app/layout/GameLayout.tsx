import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { PAGES } from '../lib/routes.types';
import { StyledContainer, StyledGridItem } from 'shared/ui/Styled';

import style from './index.module.scss';

export const GameLayout = () => {
  return (
    <StyledContainer maxWidth={false} disableGutters>
      <StyledGridItem container spacing={2} extendClass={style.grid}>
        <StyledGridItem item>
          <Link to={PAGES.GAME}>Главная</Link>
        </StyledGridItem>
        <StyledGridItem item>
          <Link to={PAGES.START_GAME}>Старт</Link>
        </StyledGridItem>
        <StyledGridItem item>
          <Link to={PAGES.ENDGAME}>Конец</Link>
        </StyledGridItem>
        <StyledGridItem item>
          <Link to={PAGES.LEADERBOARD}>Рейтинг</Link>
        </StyledGridItem>
        <StyledGridItem item>
          <Link to={PAGES.FORUM}>Форум</Link>
        </StyledGridItem>
        <StyledGridItem item>
          <Link to={PAGES.PROFILE}>Профиль</Link>
        </StyledGridItem>
        <StyledGridItem item extendClass={style.gridLast}>
          <Link to={PAGES.ROOMS}>Комнаты</Link>
        </StyledGridItem>
      </StyledGridItem>
      <Outlet />
    </StyledContainer>
  );
};
