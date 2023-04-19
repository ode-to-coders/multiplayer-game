import { RouteObject } from 'react-router-dom';

export type Route = RouteObject & {
  path: string;
  Component: React.FC;
};

export type Routes = Route[];

export const enum PAGES {
  MAIN = '/',
  ABOUT = '/about',
  RULES = '/rules',
  VIDEO = '/video',
  PROFILE = '/profile',
  EDIT_PROFILE = '/profile/edit',
  EDIT_PASSWORD = '/profile/edit/password',
  GAME = '/game',
  START_GAME = '/game/rooms/:gameId',
  ENDGAME = '/game/end',
  LEADERBOARD = '/game/leaderboard',
  FORUM = '/game/forum',
  TOPIC = 'game/topic',
  ROOMS = '/game/rooms',
  SIGNIN = '/signin',
  REGISTRATION = '/registration',
  NOTFOUND = '/404',
  SERVER_ERROR = '/500',
  ENTHOURAGE = '/game/enthourage',
}
