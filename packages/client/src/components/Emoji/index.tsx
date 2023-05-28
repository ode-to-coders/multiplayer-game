import styles from './index.module.scss';

const EMOJIS = [
  '😀', '👍', '💪', '👏', ' 👎', ' 💖', '🐬'
];

const Emoji = (props: any) => {
  const {
    onEmojiClick,
  } = props;

  return (
    <div className={styles.wrapper}>
      {EMOJIS.map((symbol, index) => (
        <span
          onClick={() => onEmojiClick(symbol)}
          key={index}
          className={styles.emoji}
          role="img"
          aria-label=''
          aria-hidden='true'
        >
          {symbol}
        </span>
        ))
      }
    </div>
  )
};

export default Emoji;
