import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types/model';

export interface IComment {
  id: number;
  topic_id: number;
  comment: string;
  owner_name: string;
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
  owner_name: {
    type: DataType.STRING,
    allowNull: false,
  },
  comment: {
    type: DataType.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataType.DATE,
  },
  updatedAt: {
    type: DataType.DATE,
  },
};
