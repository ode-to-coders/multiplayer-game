interface IRoomData {
  "name": string;
  "count": string;
  "password": string;
}

type User = {
  name: string;
  id: number;
};

export type Subject = {
  id: number;
  subject: string;
  players: number;
  maxPlayers: number;
  user: User;
  password: string;
};

export type RoomsT = {
  rooms: Subject[];
};
