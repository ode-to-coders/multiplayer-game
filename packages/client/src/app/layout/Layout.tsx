import { Outlet } from 'react-router-dom';

import { StyledContainer, StyledSwitch } from '../../shared/ui/Styled';
import { changeTheme } from '../../utils/changeTheme';

import styles from './index.module.scss';
import { useState } from 'react';

export const Layout: React.FC<React.PropsWithChildren> = props => {
  const checkbox =
    typeof window !== 'undefined' ? localStorage.getItem('checkbox') : null;
  const [checked, setChecked] = useState(checkbox === 'false' ? false : true);

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    changeTheme();
    localStorage.setItem('checkbox', String(event.target.checked));
  };

  return (
    <StyledContainer
      maxWidth={false}
      disableGutters
      extendсlass={styles.container}>
      <StyledSwitch
        checked={checked}
        onChange={handleChangeChecked}
        extendсlass={styles.switch}
      />
      {props.children}
      <Outlet />
    </StyledContainer>
  );
};
