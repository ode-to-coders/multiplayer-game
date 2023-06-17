import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types/model';

export interface ITheme {
  id: number,
  themes: {
    theme: string,
  }[];
}

export const themeModel: ModelAttributes<Model, ITheme> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  themes: {
    type: DataType.ARRAY(DataType.JSON),
    defaultValue: [
      {
        theme: 'light'
      },
      {
        theme: 'dark'
      },
    ]
  },
};
