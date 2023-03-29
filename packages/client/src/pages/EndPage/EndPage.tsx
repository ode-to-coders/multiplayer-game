import React from 'react';

import { ModalEnd } from '@/features';
import { StyledContainer } from './components/StyledContainer';

export const EndPage = () => {
  return (
    <StyledContainer maxWidth={false} disableGutters>
      <ModalEnd />
    </StyledContainer>
  );
};
