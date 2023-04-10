import { combineReducers } from '@reduxjs/toolkit';
import { CombinedState } from '@reduxjs/toolkit/dist/query/core/apiState';

import { baseApi } from './api/baseApi';

export interface IReducer {
  baseApi: CombinedState<any, never, 'baseApi'>;
}

export const reducer = combineReducers<IReducer>({
  baseApi: baseApi.reducer,
});
