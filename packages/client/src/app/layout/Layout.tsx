import { Grid } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

import { PAGES } from '../lib/routes.types';
import { StyledContainer } from 'shared/ui/Styled';

import style from './index.module.scss';

interface ILayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  // TODO Grid с ссылками для начального удобства, как большинство будет готово надо удалить
  return (
    <StyledContainer
      maxWidth={false}
      disableGutters
      extendClass={style.container}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Link to={PAGES.MAIN}>Главная</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.GAME}>Игра</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.PROFILE}>Профиль</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.SIGNIN}>Авторизация</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.REGISTRATION}>Регистрация</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.NOTFOUND}>404</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.SERVER_ERROR}>500</Link>
        </Grid>
      </Grid>
      {children && children}
      <Outlet />
    </StyledContainer>
  );
};
