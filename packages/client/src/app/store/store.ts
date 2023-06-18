import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { baseApi } from './api/baseApi';
import { reducer } from './reducer';
import { authSlice } from './auth/authSlice';
import { forumApi } from './api/forum/forumApi';
import { leaderboardApi } from './api/leaderboard/leaderboardApi';

  const initialState =
  typeof window !== 'undefined'
    ? window.__PRELOADED_STATE__
    : {
        auth: authSlice.getInitialState(),
      };

const createStore = (preloadedState = {}) => {
  return configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(baseApi.middleware, forumApi.middleware, leaderboardApi.middleware),
    preloadedState,
  });  
}

export const store = createStore(initialState);

export type IAppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<IAppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const dispatch = store.dispatch;
