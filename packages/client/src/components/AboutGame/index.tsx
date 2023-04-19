import Grid from '@mui/material/Grid';

import styles from './index.module.scss';

import { ReactComponent as Watch } from '../../images/watch.svg';
import { ReactComponent as Group } from '../../images/group.svg';
import { ReactComponent as Stroller } from '../../images/stroller.svg';
import { StyledDescribe, StyledGridItem } from '@/shared/ui/Styled';


function AboutGame() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Об игре</div>
      <div className={styles.info}>
        <Grid
          container
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className={styles.gridContainer}
          justifyContent="center"
          rowSpacing={1}>
          <StyledGridItem item xs={4} extendClass={styles.icon}>
            <Group />
            <StyledDescribe>1-6</StyledDescribe>
          </StyledGridItem>
          <StyledGridItem item xs={4} extendClass={styles.icon}>
            <Watch />
            <StyledDescribe>30-45</StyledDescribe>
          </StyledGridItem>
          <StyledGridItem item xs={4} extendClass={styles.icon}>
            <Stroller />
            <StyledDescribe>13+</StyledDescribe>
          </StyledGridItem>
        </Grid>
        <div className={styles.description}>
          <p className={styles.p}>
            Расследование загадочных происшествий всегда было вашей страстью, и
            когда вы узнали о закрытом клубе детективов, то немедленно решили в
            него вступить. Для этого вам предствоит пройти особое испытание:
            оказавшись за одним столом с другими кандидатами, разгадать, кем они
            являются в “обычной жизни” и какие тайны скрывают.
          </p>
          <p className={styles.p}>
            Лига детективов - это увлекательная разговорная игра на дедукцию.
            Каждый игрок получает профессию и тайну, а затем отвечает на вопросы
            так, чтобы только самые смекалистые догадались, кем он является.
            Здесь вам потребуются фантазия и навыки дедукции, ведь подсказки
            должны быть не слишком запутанными или очевидными.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutGame;
