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

export interface IResultLeader {
  idUser: number;
  avatar?: string;
  gamer?: string;
  resultGame: boolean;
  points: number;
}
