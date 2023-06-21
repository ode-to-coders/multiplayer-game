import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types/model';

export interface ITheme {
  id: number,
  theme: string;
  ownerId: number;
}

export const userThemeModel: ModelAttributes<Model, ITheme> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  theme: {
    type: DataType.STRING,
    defaultValue: 'dark',
  },
  ownerId: {
    type: DataType.INTEGER,
  },
};
