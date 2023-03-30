import React from 'react';

import { ModalEnd } from '../../features';
import { StyledContainer } from '../../shared/ui/Styled';
import { styles } from './styles';


export const EndPage = () => {
  return (
    <StyledContainer
      maxWidth={false}
      disableGutters
      styles={styles.container}>
      <ModalEnd />
    </StyledContainer>
  );
};
