import { RootState } from './app/store/store';

declare module '*.module.scss';

declare module '*.png';
declare module '*.svg';

declare global {
  interface Window {
    __PRELOADED_STATE__: RootState
  }
}
