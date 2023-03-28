import React from "react";

import { Container } from '@mui/material';

import { GameLayout } from '@/app/layout/GameLayout';
import logo from './logo.png';
import { style } from './style';

export const GamePage = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={style.container}>
      <GameLayout/>
      <img src={logo} alt="логотип" style={style.image} />
    </Container>
  );
}
