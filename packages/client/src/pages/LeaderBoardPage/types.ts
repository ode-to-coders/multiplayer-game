export type User = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  avatar: string;
  phone: string;
  email: string;
  percent: number,
  count_game?: number
};

export type LeaderBoardT = {
  users: User[]
}
