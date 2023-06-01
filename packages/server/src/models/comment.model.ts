import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types/model';

export interface IComment {
  id: number;
  topic_id: number;
  parent_id: number | null;
  content: string;
  author: string;
  depth: number;
  createdAt: Date;
  updatedAt: Date;
}

export const commentModel: ModelAttributes<Model, IComment> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  topic_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  parent_id: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  author: {
    type: DataType.STRING,
    allowNull: false,
  },
  content: {
    type: DataType.STRING,
    allowNull: false,
  },
  depth: {
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  createdAt: {
    type: DataType.DATE,
  },
  updatedAt: {
    type: DataType.DATE,
  },
};
