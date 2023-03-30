import React from 'react';

import { ModalEnd } from '../../features';
import { StyledContainer } from '../../shared/ui/Styled';
import style from './index.module.scss';

export const EndPage = () => {
  return (
    <StyledContainer
      className={style.container}
      maxWidth={false}
      disableGutters>
      <ModalEnd />
    </StyledContainer>
  );
};
