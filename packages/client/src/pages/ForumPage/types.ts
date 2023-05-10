type User = {
  name: string;
  id: number;
};

export type Subject = {
  id: number;
  subject: string;
  comments_count: number;
  date: string;
  user: User;
};

export type TopicsT = {
  topics: Subject[];
};
