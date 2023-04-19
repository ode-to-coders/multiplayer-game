import { Outlet } from 'react-router-dom';

import { StyledContainer } from '../../shared/ui/Styled';

import style from './index.module.scss';

export const Layout: React.FC<React.PropsWithChildren> = props => {
  return (
    <StyledContainer
      maxWidth={false}
      disableGutters
      extendClass={style.container}>
      {props.children}
      <Outlet />
    </StyledContainer>
  );
};
