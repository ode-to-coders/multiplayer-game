import { useState } from 'react';

import styles from './index.module.scss';

const Emoji = (props: any) => (
  <span
    className="emoji"
    role="img"
    aria-label={props.label ? props.label : ''}
    aria-hidden={props.label ? 'false' : 'true'}
  >
    {props.symbol}
  </span>
);

const emojis = [
  '🐑', '😀', '😍', '😭', '😫', '💪',
];

function EmojiWrapper() {
  const [selectedEmoji, setChosenEmoji] = useState([]);

  return (
    <div className={styles.wrapper}>
      {
        emojis.map((em, index) => (
          <Emoji symbol={em} key={index} />
        ))
      }
    </div>
  )
}

export default EmojiWrapper;
