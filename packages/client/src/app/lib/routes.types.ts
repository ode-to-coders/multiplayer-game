import { RouteObject } from 'react-router-dom';

export type Route = RouteObject & {
  path: string;
  Component: React.FC;
};

export type Routes = Route[];

export const enum PAGES {
  MAIN = '/',
  PROFILE = '/profile',
  EDIT_PROFILE = '/profile/edit',
  EDIT_PASSWORD = '/profile/edit/password',
  START_GAME = '/rooms/:gameId',
  GAME = '/game/:gameId',
  ENDGAME = '/end',
  LEADERBOARD = '/leaderboard',
  FORUM = '/forum',
  TOPIC = '/topic',
  ROOMS = '/rooms',
  SIGNIN = '/signin',
  REGISTRATION = '/registration',
  NOTFOUND = '/404',
  SERVER_ERROR = '/500',
  ENTHOURAGE = '/game/:gameId/enthourage',
}
