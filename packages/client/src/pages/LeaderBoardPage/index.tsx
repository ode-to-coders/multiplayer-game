import cx from 'classnames';
import Avatar from '@mui/material/Avatar';

import { LeaderBoardT, User } from './types';
import { StyledContainer } from '../../shared/ui/Styled';

import styles from './index.module.scss';
import { useGetLeaderboardQuery } from '../../app/store/api/leaderboard/leaderboardApi';
import { ILeaderboard } from '@/app/store/api/leaderboard/types';

export function LeaderBoardPage(props: LeaderBoardT) {
  const { users } = props;

  if (!users || users.length < 0) return null;

  const { data: dataLeaders } = useGetLeaderboardQuery();

  return (
    <StyledContainer extendсlass={styles.mainContainer}>
      <div className={styles.leaderboard}>
        <style jsx="true">{`
          .${styles.table} {
            border-left: 1px solid var(--color-grey);
            border-bottom: 1px solid var(--color-grey);
          }
          .${styles.row} {
            border-bottom: 1px solid var(--color-grey);
          }
          .${styles.header}, .${styles.count}, .countGame {
            color: var(--color-primary);
          }
          .${styles.name} {
            color: var(--color-grey);
          }
          .${styles.progressbar} {
            background: var(--color-grey);
          }
          .${styles.progress} {
            background: var(--color-blue);
          }
          .percent {
            color: var(--color-darkGrey);
          }
        `}</style>
        <ol className={styles.table}>
          <li className={cx(styles.row, styles.header)}>
            <div className={styles.col}>Позиция в рейтинге</div>
            <div className={styles.col}>Процент побед</div>
            <div className={styles.col}>Всего игр</div>
            <div className={styles.col}>Всего очков</div>
          </li>
          {dataLeaders?.map((user: ILeaderboard, i: number) => {
            const {
              gamer,
              avatar,
              winPercent,
              allGames,
              points,
              id,
            } = user;

            return (
              <li className={cx(styles.row, i < 3 && styles._active)} key={id}>
                <div className={styles.col}>
                  <div className={styles.count}>{i + 1}</div>
                  <div className={styles.userInfo}>
                    <Avatar 
                      alt="?" 
                      src={`https://ya-praktikum.tech/api/v2/resources${avatar}`}
                    />
                    <div className={styles.name}>{gamer}</div>
                  </div>
                </div>
                <div className={styles.col}>
                  <div className={styles.progressbar}>
                    <div
                      className={styles.progress}
                      style={{ width: `${winPercent}%` }}
                    />
                  </div>
                  <div className="percent">{winPercent}%</div>
                </div>
                <div className={styles.col}>
                  <div className={styles.countGame}>{allGames}</div>
                </div>
                <div className={styles.col}>
                  <div className={styles.countGame}>{points}</div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </StyledContainer>
  );
}
