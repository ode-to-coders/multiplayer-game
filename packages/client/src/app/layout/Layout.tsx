import { ReactNode } from 'react';
import { Container, Grid } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

import { PAGES } from '../lib/routes.types';

interface ILayoutProps {
  children?: ReactNode;
}

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  // TODO Grid с ссылками для начального удобства, как большинство будет готово надо удалить
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-layout)',
      }}>
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
    </Container>
  );
};
