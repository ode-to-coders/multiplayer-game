export interface ITopic {
  id: number;
  name: string;
  author: string;
  content: string;
  comments_count: number;
  createdAt: Date;
  updatedAt: Date;
  reactions: {
    reaction: string;
    count: number;
  }[];
};
