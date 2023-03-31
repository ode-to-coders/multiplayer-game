import { PAGES, Routes } from './routes.types';

import LeaderBoard from 'pages/leaderBoard';
import ratings from '../../mocks/ratings.json';
/**
 * Роуты главной страницы, до авторизации
 */

// TODO выпилить мок
const MAIN_ROUTES: Routes = [
  {
    path: PAGES.main,
    Component: () => <div>Main</div>,
  },
  {
    path: PAGES.about,
    Component: () => <div>About</div>,
  },
  {
    path: PAGES.rules,
    Component: () => <div>Rules</div>,
  },
  {
    path: PAGES.video,
    Component: () => <div>Video</div>,
  },
];
/**
 * Роуты связанные с игрой, после авторизации
 */
const GAME_ROUTES: Routes = [
  {
    path: PAGES.game,
    Component: () => <div>Game</div>,
  },
  {
    path: PAGES.leaderboard,
    Component: () => <LeaderBoard users={ratings} />,
  },
  {
    path: PAGES.forum,
    Component: () => <div>Form</div>,
  },
  {
    path: PAGES.rooms,
    Component: () => <div>Rooms</div>,
  },
];
/**
 * Роуты связанные с профилем
 */
const PROFILE_ROUTES: Routes = [
  {
    path: PAGES.editProfile,
    Component: () => <div>Edit profile</div>,
  },
  {
    path: PAGES.editPassword,
    Component: () => <div>Edit Password</div>,
  },
  {
    path: PAGES.profile,
    Component: () => <div>Profile</div>,
  },
];
/**
 * Роуты связанные с аутентификацией
 */
const AUTH_ROUTES: Routes = [
  {
    path: PAGES.signin,
    Component: () => <div>Signin</div>,
  },
  {
    path: PAGES.registration,
    Component: () => <div>Registration</div>,
  },
];
/**
 * Роуты связанные с ошибками
 */
const ERROR_ROUTES: Routes = [
  {
    path: PAGES.not_found,
    Component: () => <div>Not found</div>,
  },
  {
    path: PAGES.server_error,
    Component: () => <div>Server Error</div>,
  },
];

export const routesConfig: Routes = [
  ...MAIN_ROUTES,
  ...GAME_ROUTES,
  ...PROFILE_ROUTES,
  ...AUTH_ROUTES,
  ...ERROR_ROUTES,
];
