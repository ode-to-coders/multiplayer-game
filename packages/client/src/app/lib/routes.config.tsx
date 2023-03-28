import { GamePage } from '@/pages/Game/GamePage';
import { PAGES, Routes } from './routes.types';
import { StartPage } from '@/pages/StartPage/StartPage';
import { EndPage } from '@/pages/EndPage/EndPage';
import { ErrorPage } from '@/pages/ErrorPage/ErrorPage';
/**
 * Роуты главной страницы, до авторизации
 */
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
    Component: () => <GamePage />,
  },
  {
    path: PAGES.startGame,
    Component: () => <StartPage />,
  },
  {
    path: PAGES.endGame,
    Component: () => <EndPage />,
  },
  {
    path: PAGES.leaderboard,
    Component: () => <div>Leaderboard</div>,
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
    Component: () => <ErrorPage code={404} text={'Не туда попали'} />,
  },
  {
    path: PAGES.server_error,
    Component: () => <ErrorPage code={500} text={'Мы уже фиксим'} />,
  },
];

export const routesConfig: Routes = [
  ...MAIN_ROUTES,
  ...GAME_ROUTES,
  ...PROFILE_ROUTES,
  ...AUTH_ROUTES,
  ...ERROR_ROUTES,
];
