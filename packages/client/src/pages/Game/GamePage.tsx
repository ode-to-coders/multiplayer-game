import React from "react";

import { GameLayout } from '@/app/layout/GameLayout';
import { StyledContainer } from './components/StyledContainer';
import { StyledImage } from './components/StyledImage';

import logo from './logo.png';

export const GamePage = () => {
  return (
    <StyledContainer maxWidth={false} disableGutters>
      <GameLayout />
      <StyledImage src={logo} alt="логотип" />
    </StyledContainer>
  );
}
