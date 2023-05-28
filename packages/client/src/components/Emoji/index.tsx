import { Fragment } from 'react';

import { TEmoji } from 'pages/TopicPage/types';
import { TEmojiProps } from './types';

import styles from './index.module.scss';


const emojiList = [
  {
    reaction:  '😀',
    count: 0
  },
  {
    reaction:  '👍',
    count: 0
  },
  {
    reaction: '💪',
    count: 0
  },
  {
    reaction: '👏',
    count: 0
  },
  {
    reaction: ' 💖',
    count: 0
  },
  {
    reaction: ' 👎',
    count: 0
  }
];


const Emoji = (props: TEmojiProps) => {
  const {
    onEmojiClick,
    reactions,
  } = props;

  const list = reactions || emojiList;

  return (
    <Fragment>
      <div>Как вам топик?</div>
      <div className={styles.wrapper}>
        {list.map((emoji: TEmoji, index: number) => (
          <div
            onClick={() => onEmojiClick(emoji, list)}
            key={index}
            className={styles.emoji}
            role="img"
            aria-label=''
            aria-hidden='true'
          >
            <div>{emoji.reaction}</div>
            <div className={styles.count}>{emoji.count}</div>
          </div>
          ))
        }
      </div>
    </Fragment>
  )
};

export default Emoji;
