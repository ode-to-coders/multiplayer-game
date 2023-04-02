import cx from 'classnames';
import Avatar from '@mui/material/Avatar';

import { LeaderBoardT, User } from './types';

import styles from './index.module.scss';


function LeaderBoard(props: LeaderBoardT) {
  const {
    users,
  } = props;

  if(!users || users.length < 0) return null;

  return (
    <div className={styles.leaderboard}>
      <style jsx='true'>{`
        .${styles.table} {
          border-left: 1px solid var(--color-grey);
          border-bottom: 1px solid var(--color-grey);
        }
        .${styles.row} {
          border-bottom: 1px solid var(--color-grey);
        }
        .${styles.header},
        .${styles.count},
        .countGame {
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
        </li>
        {users.map((user: User, i: number) => {
          const {
            first_name: name,
            percent,
            count_game: countGame,
            id
          } = user;

          return (
            <li className={cx(styles.row, i < 3 && styles._active)} key={id}>
              <div className={styles.col}>
                <div className={styles.count}>{i + 1}</div>
                <div className={styles.userInfo}>
                  <Avatar alt="avatar" src={user.avatar} />
                  <div className={styles.name}>{name}</div>
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.progressbar}>
                  <div className={styles.progress} style={{width:`${percent || 0}%`}} />
                </div>
                <div className='percent'>{percent}%</div>
              </div>
              <div className={styles.col}>
                <div className='countGame'>{countGame}</div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  );
}

export default LeaderBoard;
