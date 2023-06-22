import { NavLink, Outlet } from 'react-router-dom';

import { PAGES } from '../lib/routes.types';
import { StyledContainer, StyledGridItem } from '../../shared/ui/Styled';
import { ThemeToggler } from '../../components/ThemeToggler';

import styles from './index.module.scss';

export const GameLayout = () => {
  return (
    <StyledContainer maxWidth={false} disableGutters>
      <StyledGridItem container spacing={2} extendсlass={styles.grid}>
        <StyledGridItem item>
          <NavLink
            className={({ isActive }) => (isActive ? 'active-link' : 'link')}
            to={PAGES.MAIN}>
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
          <ThemeToggler />
        </StyledGridItem>
      </StyledGridItem>
      <Outlet />
    </StyledContainer>
  );
};
