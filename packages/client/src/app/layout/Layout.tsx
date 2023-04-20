import { Outlet } from 'react-router-dom';

import { StyledContainer } from '../../shared/ui/Styled';

import styles from './index.module.scss';

export const Layout: React.FC<React.PropsWithChildren> = props => {
  return (
    <StyledContainer
      maxWidth={false}
      disableGutters
      extendClass={styles.container}>
      {props.children}
      <Outlet />
    </StyledContainer>
  );
};
