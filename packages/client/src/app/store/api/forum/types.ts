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

export interface ICreateTopic {
  name: string,
  author: string,
  content: string,
  reactions?: {
    reaction: string;
    count: number;
  }[] 
};

export interface IUpdateTopic {
  id: number,
  name: string,
  author: string,
  content: string,
  reactions?: {
    reaction: string;
    count: number;
  }[]
};

export interface IUpdateReactionsTopic {
  id: number,
  reactions?: {
    reaction: string;
    count: number;
  }[]
};

export interface IComment {
  id: number;
  topic_id: number;
  parent_id: number | null;
  content: string;
  author: string;
  depth: number;
  createdAt: Date;
  updatedAt: Date;
};

export interface IGetComments {
  id: string;
  depth: number;
};

export interface ICreateComment {
  topic_id: number; 
  author: string; 
  content: string;
  parent_id?: number; 
  depth?: number;
};

export interface IUpdateComment {
  id: number;
  topic_id: number; 
  author: string; 
  content: string;
  parent_id?: number; 
  depth?: number;
};
