import { useRef } from 'react';
import { Grid } from '@mui/material';

import AboutGame from '../../components/AboutGame';
import Video from '../../components/Video';
import { StyledButton } from '../../shared/ui/Styled/StyledButton';

import logo from '../../images/logo.png';

import styles from './index.module.scss';

export function MainPage() {
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
      <StyledButton>
        Играть
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
