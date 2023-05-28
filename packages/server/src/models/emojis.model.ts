import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types/model';

export interface IEmoji {
  id: number;
  reactions: {
    reaction: string;
    count: number;
  }[];
}

export const emojisModel: ModelAttributes<Model, IEmoji> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  reactions: {
    type: DataType.ARRAY(DataType.JSON),
  },
};
