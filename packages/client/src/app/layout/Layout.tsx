import { Container, Grid } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

import { PAGES } from '../lib/routes.types';

export const Layout = () => {
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
          <Link to={PAGES.main}>Main</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.game}>Game</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.profile}>Profile</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.signin}>Signin</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.registration}>Registration</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.not_found}>404</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.server_error}>500</Link>
        </Grid>
      </Grid>
      <Outlet />
    </Container>
  );
};
