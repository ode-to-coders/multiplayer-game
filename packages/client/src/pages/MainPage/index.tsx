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

export function MainPage() {
  const aboutAnchor = useRef<HTMLDivElement>(null);
  const videoAnchor = useRef<HTMLDivElement>(null);
  const toPlay = useRef<HTMLDivElement>(null);
  const { isAuth } = useAuth();

  const handleScroll = (element: HTMLDivElement | null) => {
    if (element) {
      element.scrollIntoView();
    }
  };

  //TODO DELETE
  const test = async () => {
    fetch(`${__CLIENT_URL__}/topics/create`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: 'first',
        author: 'Mark',
      }),
    });

    fetch(`${__CLIENT_URL__}/topics/update`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        id: 1,
        reactions: [{ raction: 'smile', count: 1 }],
      }),
    });

    fetch(`${__CLIENT_URL__}/topics`);
  };

  // test();

  return (
    <div className={styles.container}>
      <Grid container spacing={2} className={styles.grid}>
        <Grid item>
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
