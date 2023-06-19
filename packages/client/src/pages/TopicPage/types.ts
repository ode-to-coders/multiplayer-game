type User = {
  name: string;
  id: number;
};

export type Comment = {
  id: number;
  user: string;
  text: string;
  avatar: string;
};

export type Theme = {
  id: number;
  subject: string;
  user: User;
  description: string;
  comments: Comment[];
  reactions?: TEmoji[];
};

export type TopicT = {
  topic: Theme;
};

export type TEmoji = {
  reaction: string,
  count: number,
}

export const enum COMMENT_STATE {
  OFF = 0,
  UPDATE = 1,
  WRITE = 2
}

export type TCommentState = { 
  id: number, 
  toogle: COMMENT_STATE.OFF | COMMENT_STATE.UPDATE | COMMENT_STATE.WRITE 
}

