import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { HTTP_METHOD } from '../../../../shared/const/constants';

import {
  IResultLeader,
  ILeaderboard,
} from './types';

const enum LEADERBOARD {
  GET = '/leader',
  PUSH = '/leader/push',
}

const baseQuery = fetchBaseQuery({ baseUrl: __CLIENT_URL__ });

export const leaderboardApi = createApi({
  reducerPath: 'leaderboardApi',
  tagTypes: ['LEADER_DATA'],
  baseQuery,
  endpoints: builder => ({
    getLeaderboard: builder.query<ILeaderboard[], void>({
      query: () => LEADERBOARD.GET,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'LEADER_DATA' as const, id })),
              { type: 'LEADER_DATA', id: 'LIST' },
            ]
          : [{ type: 'LEADER_DATA', id: 'LIST' }],
    }),

    pushResultLeader: builder.mutation<void, IResultLeader>({
      query: result => ({
        url: LEADERBOARD.PUSH,
        method: HTTP_METHOD.POST,
        body: result,
      }),
      invalidatesTags: [{ type: 'LEADER_DATA', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetLeaderboardQuery,
  usePushResultLeaderMutation,
} = leaderboardApi;
