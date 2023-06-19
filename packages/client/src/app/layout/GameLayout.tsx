import { NavLink, Outlet } from 'react-router-dom';

import { PAGES } from '../lib/routes.types';
import {
  StyledContainer,
  StyledGridItem,
  StyledSwitch,
} from '../../shared/ui/Styled';
import { changeTheme } from '../../utils/changeTheme';

import styles from './index.module.scss';
import { useState } from 'react';

export const GameLayout = () => {
  const checkbox =
    typeof window !== 'undefined' ? localStorage.getItem('checkbox') : null;
  const [checked, setChecked] = useState(checkbox === 'false' ? false : true);

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    changeTheme();
    localStorage.setItem('checkbox', String(event.target.checked));
  };

  return (
    <StyledContainer maxWidth={false} disableGutters>
      <StyledGridItem container spacing={2} extendсlass={styles.grid}>
        <StyledGridItem item>
          <NavLink
            className={({ isActive }) => (isActive ? 'active-link' : 'link')}
            to={PAGES.GAME}>
            Главная
            <span />
          </NavLink>
        </StyledGridItem>
        <StyledGridItem item>
          <NavLink
            className={({ isActive }) => (isActive ? 'active-link' : 'link')}
            to={PAGES.ENDGAME}>
            Конец
            <span />
          </NavLink>
        </StyledGridItem>
        <StyledGridItem item>
          <NavLink
            className={({ isActive }) => (isActive ? 'active-link' : 'link')}
            to={PAGES.LEADERBOARD}>
            Рейтинг
            <span />
          </NavLink>
        </StyledGridItem>
        <StyledGridItem item>
          <NavLink
            className={({ isActive }) => (isActive ? 'active-link' : 'link')}
            to={PAGES.FORUM}>
            Форум
            <span />
          </NavLink>
        </StyledGridItem>
        <StyledGridItem item>
          <NavLink
            className={({ isActive }) => (isActive ? 'active-link' : 'link')}
            to={PAGES.PROFILE}>
            Профиль
            <span />
          </NavLink>
        </StyledGridItem>
        <StyledGridItem item>
          <NavLink
            className={({ isActive }) => (isActive ? 'active-link' : 'link')}
            to={PAGES.ROOMS}>
            Комнаты
            <span />
          </NavLink>
        </StyledGridItem>
        <StyledGridItem item extendсlass={styles.gridLast}>
          <StyledSwitch checked={checked} onChange={handleChangeChecked} />
        </StyledGridItem>
      </StyledGridItem>
      <Outlet />
    </StyledContainer>
  );
};
