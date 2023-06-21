import { Outlet } from 'react-router-dom';

import { StyledContainer} from '../../shared/ui/Styled';
import { ThemeTogglerWithoutAuth } from '../../components/ThemeTogglerWithoutAuth';
import styles from './index.module.scss';

export const Layout: React.FC<React.PropsWithChildren> = props => {
  return (
    <StyledContainer
      maxWidth={false}
      disableGutters
      extendсlass={styles.container}>
      <ThemeTogglerWithoutAuth />
      {props.children}
      <Outlet />
    </StyledContainer>
  );
};
