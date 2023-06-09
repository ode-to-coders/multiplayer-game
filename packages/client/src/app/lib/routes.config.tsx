import {
  EndPage,
  ErrorPage,
  GamePage,
  StartPage,
  LeaderBoardPage,
  ForumPage,
  TopicPage,
  Registration,
  Signin,
  Profile,
  MainPage,
  RoomPage,
  Enthourage,
} from '../../pages';

import { PAGES, Routes } from './routes.types';

import rooms from '../../mocks/rooms.json';
import { Canvas } from '../../features/Canvas';

/**
 * Роуты главной страницы, до авторизации
 */

// TODO выпилить мок
const MAIN_ROUTES: Routes = [
  {
    path: PAGES.MAIN,
    Component: () => <MainPage />,
  },
];
/**
 * Роуты связанные с игрой, после авторизации
 */
const GAME_ROUTES: Routes = [
  {
    path: PAGES.GAME,
    // Component: () => <GamePage />,
    Component: () => <Canvas />,
  },
  {
    path: PAGES.START_GAME,
    Component: () => <StartPage />,
  },
  {
    path: PAGES.ENDGAME,
    Component: () => <EndPage />,
  },
  {
    path: PAGES.LEADERBOARD,
    Component: () => <LeaderBoardPage />,
  },
  {
    path: PAGES.FORUM,
    Component: () => <ForumPage />,
  },
  {
    path: PAGES.TOPIC,
    Component: () => <TopicPage />,
  },
  {
    path: PAGES.ROOMS,
    Component: () => <RoomPage rooms={rooms} />,
  },
  {
    path: PAGES.ENTHOURAGE,
    Component: () => <Enthourage />,
  },
];
/**
 * Роуты связанные с профилем
 */
const PROFILE_ROUTES: Routes = [
  {
    path: PAGES.EDIT_PROFILE,
    Component: () => <Profile page={PAGES.EDIT_PROFILE} />,
  },
  {
    path: PAGES.EDIT_PASSWORD,
    Component: () => <Profile page={PAGES.EDIT_PASSWORD} />,
  },
  {
    path: PAGES.PROFILE,
    Component: () => <Profile page={PAGES.PROFILE} />,
  },
];
/**
 * Роуты связанные с аутентификацией
 */
export const AUTH_ROUTES: Routes = [
  {
    path: PAGES.SIGNIN,
    Component: () => <Signin />,
  },
  {
    path: PAGES.REGISTRATION,
    Component: () => <Registration />,
  },
];
/**
 * Роуты связанные с ошибками
 */
const ERROR_ROUTES: Routes = [
  {
    path: PAGES.NOTFOUND,
    Component: () => <ErrorPage code={404} text="Не туда попали" />,
  },
  {
    path: PAGES.SERVER_ERROR,
    Component: () => <ErrorPage code={500} text="Мы уже фиксим" />,
  },
];

export const routesConfig: Routes = [
  ...MAIN_ROUTES,
  ...GAME_ROUTES,
  ...PROFILE_ROUTES,
  ...ERROR_ROUTES,
];
