import { combineReducers } from '@reduxjs/toolkit';
import { CombinedState } from '@reduxjs/toolkit/dist/query/core/apiState';

import { baseApi } from './api/baseApi';
import { AuthState, authReducer } from './auth/authSlice';
import { forumApi } from './api/forum/forumApi';
import { leaderboardApi } from './api/leaderboard/leaderboardApi';

export interface IReducer {
  baseApi: CombinedState<Record<never, never>, 'USER_INFO', 'baseApi'>;
  auth: AuthState;
  forumApi: CombinedState<Record<never, never>, 'FORUM_DATA', 'forumApi'>;
  leaderboardApi: CombinedState<Record<never, never>, 'LEADER_DATA', 'leaderboardApi'>;
}

export const reducer = combineReducers<IReducer>({
  baseApi: baseApi.reducer,
  auth: authReducer,
  forumApi: forumApi.reducer,
  leaderboardApi: leaderboardApi.reducer
});
