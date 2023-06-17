import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

import { PAGES } from '../../app/lib/routes.types';

import AboutGame from '../../components/AboutGame';
import Video from '../../components/Video';
import { StyledButton } from '../../shared/ui/Styled/StyledButton';

import logo from '../../images/logo.png';

import styles from './index.module.scss';
import { useAuth } from '../../app/hooks/useAuth';

// Todo удалить
import { useGetUserInfoQuery } from '../../app/store/api/auth/authApi';
import { useGetThemesQuery } from '../../app/store/api/themes/themesApi';
import {useCreateUserThemeMutation, useGetUserThemeQuery ,  useUpdateUserThemeMutation} from '../../app/store/api/userTheme';

export function MainPage() {
  const aboutAnchor = useRef<HTMLDivElement>(null);
  const videoAnchor = useRef<HTMLDivElement>(null);
  const toPlay = useRef<HTMLDivElement>(null);
  const { isAuth } = useAuth();

  const { data } = useGetUserInfoQuery();
  const [ createUserTheme ] = useCreateUserThemeMutation();
  const [updateUserTheme] = useUpdateUserThemeMutation();
  const { data: theme } = useGetUserThemeQuery({
    ownerId: data?.id
  });

  console.log(useGetUserThemeQuery({
    ownerId: 1
  }), 'currentTheme');

  const handleClick = () => {
    createUserTheme({
      theme: 'light',
      ownerId: data?.id
    })
  }

  const handleScroll = (element: HTMLDivElement | null) => {
    if (element) {
      element.scrollIntoView();
    }
  };

  return (
    <div className={styles.container}>
      <Grid container spacing={2} className={styles.grid}>
        <Grid item>
          <button onClick={handleClick}>создать тему</button>
          <div
            className={styles.item}
            onClick={() => handleScroll(aboutAnchor.current)}>
            Об игре
          </div>
        </Grid>
        <Grid item>
          <div
            className={styles.item}
            onClick={() => handleScroll(videoAnchor.current)}>
            Видео
          </div>
        </Grid>
        <Grid item>
          <div
            className={styles.item}
            onClick={() => handleScroll(toPlay.current)}>
            Играть
          </div>
        </Grid>
      </Grid>
      <div className={styles.main} ref={toPlay}>
        <div className={styles.logo}>
          <img src={logo} />
        </div>
        <StyledButton>
          <Link to={isAuth ? PAGES.ROOMS : PAGES.REGISTRATION}>Играть</Link>
        </StyledButton>
      </div>
      <div ref={aboutAnchor}>
        <AboutGame />
      </div>
      <div ref={videoAnchor}>
        <Video />
      </div>
    </div>
  );
}
