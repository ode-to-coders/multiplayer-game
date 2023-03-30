import React from 'react';

import { GameLayout } from '../../app/layout/GameLayout';
import { StyledContainer } from '../../shared/ui/Styled';

import logo from './logo.png';
import style from './index.module.scss';

export const GamePage = () => {
  return (
    <StyledContainer
      maxWidth={false}
      disableGutters
      className={style.container}>
      <GameLayout />
      <img className={style.logo} src={logo} alt="логотип" />
    </StyledContainer>
  );
};
