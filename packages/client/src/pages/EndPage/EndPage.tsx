import { ModalEnd } from '../../features';
import { StyledContainer } from '../../shared/ui/Styled';

import style from './index.module.scss';

export const EndPage = () => {
  return (
    <StyledContainer
      extendсlass={style.container}
      maxWidth={false}
      disableGutters>
      <ModalEnd />
    </StyledContainer>
  );
};
