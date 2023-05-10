import React from 'react';
import { CircularProgress, Grid } from '@mui/material';

import { Layout } from '../../layout/Layout';

import { withProviders } from '../../providers/withProviders';

import { AuthenticatedApp } from '../AuthenticatedApp/AuthenticatedApp';
import { useAuth } from '../../hooks/useAuth';
import { UnauthenticatedApp } from '../UnauthenticatedApp/UnauthenticatedApp';

import '../../styles/vars.scss';
import '../../styles/global.scss';
import styles from './index.module.scss';

function App() {
  const { isFetching, isAuth } = useAuth();

  if (isFetching) {
    return (
      <Layout>
        <Grid container className={styles.fullScreenLoader}>
          <CircularProgress />
        </Grid>
      </Layout>
    );
  }

  if (isAuth) {
    return <AuthenticatedApp />;
  } else {
    return <UnauthenticatedApp />;
  }
}

export default withProviders(App);
