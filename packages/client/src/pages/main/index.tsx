import { useRef } from 'react';
import { Button, StyledEngineProvider } from '@mui/material';
import { Grid } from '@mui/material';

import AboutGame from '../../components/AboutGame';
import Video from '../../components/Video';

import logo from '../../images/logo.png';

import styles from './index.module.scss';

function MainPage() {
  const aboutAnchor = useRef<HTMLDivElement>(null);
  const videoAnchor = useRef<HTMLDivElement>(null);
  const toPlay = useRef<HTMLDivElement>(null);

  const handleScroll = (element: HTMLDivElement | null) => {
    if (element) {
      element.scrollIntoView()
    }
  }

  return (
   <div className={styles.container}>
     <Grid
      container
      spacing={2}
      className={styles.grid}
      >
        <Grid item>
          <div className={styles.item} onClick={() => handleScroll(aboutAnchor.current)}>
            Об игре
          </div>
        </Grid>
        <Grid item>
          <div className={styles.item} onClick={() => handleScroll(videoAnchor.current)}>
            Видео
          </div>
        </Grid>
        <Grid item>
          <div className={styles.item} onClick={() => handleScroll(toPlay.current)}>
            Играть
          </div>
        </Grid>
      </Grid>
    <div className={styles.main} ref={toPlay}>
      <div className={styles.logo}>
        <img src={logo} />
      </div>
      <StyledEngineProvider injectFirst>
        <Button className={styles.button}>
          Играть
        </Button>
      </StyledEngineProvider>
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

export default MainPage;
