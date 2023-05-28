import { TEmoji } from 'pages/TopicPage/types';

import styles from './index.module.scss';


const Emoji = (props: any) => {
  const {
    onEmojiClick,
    reactions,
  } = props;

  return (
    <div className={styles.wrapper}>
      {reactions.map((emoji: TEmoji, index: number) => (
        <div
          onClick={() => onEmojiClick(emoji)}
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
  )
};

export default Emoji;
