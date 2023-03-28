import React from 'react';

import { Container } from '@mui/material';

import { style } from './style';
import { ModalEnd } from '@/features';

export const EndPage = () => {
  return (
    <Container maxWidth={false} disableGutters sx={style.container}>
      <ModalEnd></ModalEnd>
    </Container>
  );
};
