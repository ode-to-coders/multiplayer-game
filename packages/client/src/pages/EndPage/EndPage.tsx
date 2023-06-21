import React from 'react';
import { ModalEnd } from '../../features';
import { StyledContainer } from '../../shared/ui/Styled';

import style from './index.module.scss';

export const EndPage = (props: any) => {
  return (
    <StyledContainer
      extendсlass={style.container}
      maxWidth={false}
      disableGutters>
      <ModalEnd {...props} />
    </StyledContainer>
  );
};
