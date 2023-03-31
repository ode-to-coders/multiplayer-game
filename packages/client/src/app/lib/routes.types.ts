import { RouteObject } from 'react-router-dom';

export type Route = RouteObject & {
  path: string;
  Component: React.FC;
};

export type Routes = Route[];

export const enum PAGES {
  main = '/',
  about = '/about',
  rules = '/rules',
  video = '/video',
  profile = '/profile',
  editProfile = '/profile/edit',
  editPassword = '/profile/edit/password',
  game = '/game',
  leaderboard = '/game/leaderboard',
  forum = '/game/forum',
  topic = 'game/topic',
  rooms = '/game/rooms',
  signin = '/signin',
  registration = '/registration',
  not_found = '/404',
  server_error = '/500',
}
