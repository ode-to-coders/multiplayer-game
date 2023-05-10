import React from 'react';
import { CircularProgress, Grid } from '@mui/material';

import { Layout } from '../../layout/Layout';

import { withProviders } from '../../providers/withProviders';

import { AuthenticatedApp } from '../AuthenticatedApp/AuthenticatedApp';
import { useAuth } from '../../hooks/useAuth';
import { UnauthenticatedApp } from '../UnauthenticatedApp/UnauthenticatedApp';

import { useMounted } from '../../hooks/useMounted';
import '../../styles/vars.scss';
import '../../styles/global.scss';
import styles from './index.module.scss';

function App() {
  const { hasMounted } = useMounted();
  const { isFetching, isAuth } = useAuth();

  if (isFetching) {
    return (
      hasMounted && (
        <Layout>
          <Grid container className={styles.fullScreenLoader}>
            <CircularProgress />
          </Grid>
        </Layout>
      )
    );
  }

  if (isAuth) {
    return hasMounted && <AuthenticatedApp />;
  } else {
    return hasMounted && <UnauthenticatedApp />;
  }
}

export default withProviders(App);
