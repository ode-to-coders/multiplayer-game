import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types/model';

export interface ILeaderboard {
  id: number;
  avatar: string;
  gamer: string;
  winGames: number;
  allGames: number;
  winPercent: number;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

export const leaderboardModel: ModelAttributes<Model, ILeaderboard> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  avatar: {
    type: DataType.STRING,
    allowNull: true,
  },
  gamer: {
    type: DataType.STRING,
    allowNull: false,
  },
  winGames: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  allGames: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  winPercent: {
    type: DataType.INTEGER,
    allowNull: false
  },
  points: {
    type: DataType.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DataType.DATE,
  },
  updatedAt: {
    type: DataType.DATE,
  }
};
