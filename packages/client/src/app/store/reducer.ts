import { combineReducers } from '@reduxjs/toolkit';
import { CombinedState } from '@reduxjs/toolkit/dist/query/core/apiState';

import { baseApi } from './api/baseApi';
import { AuthState, authReducer } from './auth/authSlice';
import { forumApi } from './api/forum/forumApi';

export interface IReducer {
  baseApi: CombinedState<Record<never, never>, 'USER_INFO', 'baseApi'>;
  auth: AuthState;
  forumApi: CombinedState<Record<never, never>, never, 'forumApi'>;
}

export const reducer = combineReducers<IReducer>({
  baseApi: baseApi.reducer,
  auth: authReducer,
  forumApi: forumApi.reducer
});
