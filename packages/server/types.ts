import WebSocket from 'ws';

export type payloadType = {
  success?: boolean;
  rivalName?: Array<string>;
  login?: string;
  gameId?: string;
  canStart?: boolean;
  count?: number;
  userAnswers?: userAnswerType[],
  winEntourage?: string,
  gameData?: any,
  ratings?: any,
  answers?: any
};

export type resultType = {
  type: string;
  payload: payloadType;
};

export type requestType = {
  event: string;
  gameId: string;
  payload: payloadType;
  login: string;
};

export type clientType = {
  login: string;
  entourage: string;
} & WebSocket;

export type gamesType = Record<string, Array<clientType>>;

export type userAnswerType = {
  login: string,
  id: number,
  entourage: string,
  profession: '',
  secret: string,
  answers: string,
  votes: number[],
  randomPair: number[],
  finalVotes: number[],
  score: number,
}
