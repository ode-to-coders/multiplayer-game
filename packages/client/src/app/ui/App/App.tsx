import { useEffect } from 'react';
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
  useEffect(() => {
    const fetchServerData = async () => {
      const url = __CLIENT_URL__;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

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

  return isAuth ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default withProviders(App);
