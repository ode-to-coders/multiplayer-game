import { StyledContainer } from '../../shared/ui/Styled';

import style from './index.module.scss';
import { MainPage } from '../MainPage';

export const GamePage = () => {
  return (
    <StyledContainer
      maxWidth={false}
      disableGutters
      extendсlass={style.container}>
      <MainPage />
    </StyledContainer>
  );
};
