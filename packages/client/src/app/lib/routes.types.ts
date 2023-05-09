import { ReactNode } from 'react';
import { RouteObject } from 'react-router-dom';

export type Route = RouteObject & {
  path: string;
  Component: () => ReactNode;
};

export type Routes = Route[];

export const enum PAGES {
  MAIN = '/',
  PROFILE = '/profile',
  EDIT_PROFILE = '/profile/edit',
  EDIT_PASSWORD = '/profile/edit/password',
  GAME = '/game',
  START_GAME = '/rooms/:gameId',
  ENDGAME = '/end',
  LEADERBOARD = '/leaderboard',
  FORUM = '/forum',
  TOPIC = '/topic',
  ROOMS = '/rooms',
  SIGNIN = '/signin',
  REGISTRATION = '/registration',
  NOTFOUND = '/404',
  SERVER_ERROR = '/500',
  ENTHOURAGE = '/game/enthourage',
}
