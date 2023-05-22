import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types/model';

export interface ITopic {
  id: number;
  name: string;
  owner_name: string;
  comments_count: number;
  createdAt: Date;
  updatedAt: Date;
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
  owner_name: {
    type: DataType.STRING,
    allowNull: false,
  },
  // Разобраться как подсчитывать автоматом
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
};
