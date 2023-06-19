import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types/model';

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
}

export const topicModel: ModelAttributes<Model, ITopic> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
  },
  author: {
    type: DataType.STRING,
    allowNull: false,
  },
  content: {
    type: DataType.STRING,
  },
  // Todo Разобраться как подсчитывать автоматом
  comments_count: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  createdAt: {
    type: DataType.DATE,
  },
  updatedAt: {
    type: DataType.DATE,
  },
  reactions: {
    type: DataType.ARRAY(DataType.JSON),
  },
};
