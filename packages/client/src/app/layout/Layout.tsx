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
          <Link to={PAGES.MAIN}>Main</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.GAME}>Game</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.PROFILE}>Profile</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.SIGNIN}>Signin</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.REGISTRATION}>Registration</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.NOTFOUND}>404</Link>
        </Grid>
        <Grid item>
          <Link to={PAGES.SERVER_ERROR}>500</Link>
        </Grid>
      </Grid>
      <Outlet />
    </Container>
  );
};
