import type WebSocket from 'ws';

export type payloadType = {
  success?: boolean;
  rivalName?: Array<string>;
  login?: string;
  gameId?: string;
  canStart?: boolean;
  count?: number;
  vote?: string,
  profession?: string,
};

export type resultType = {
  type: string;
  payload: payloadType;
};

export type requestType = {
  event: string;
  gameId: string;
  payload: payloadType;
};

export type clientType = {
  login: string;
} & WebSocket;

export type gamesType = Record<string, Array<clientType>>;
