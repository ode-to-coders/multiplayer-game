import { combineReducers } from '@reduxjs/toolkit';
import { CombinedState } from '@reduxjs/toolkit/dist/query/core/apiState';

import { baseApi } from './api/baseApi';
import { AuthState, authReducer } from './auth/authSlice';

import { gameMembersReducer } from './game/gameSlice';
import { UsersState } from './game/types';

export interface IReducer {
  baseApi: CombinedState<Record<never, never>, 'USER_INFO', 'baseApi'>;
  auth: AuthState;
  game: UsersState;
}

export const reducer = combineReducers<IReducer>({
  baseApi: baseApi.reducer,
  auth: authReducer,
  game: gameMembersReducer,
});
