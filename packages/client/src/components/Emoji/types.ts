import { TEmoji } from 'pages/TopicPage/types';

export type TEmojiProps = {
  onEmojiClick: (emoji: TEmoji, list: TEmoji[]) => void,
  reactions: TEmoji[] | undefined,
}
