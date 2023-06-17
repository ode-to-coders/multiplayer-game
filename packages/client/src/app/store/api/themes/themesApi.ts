import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ITheme } from './types';

const enum THEME {
  GET = '/theme',
}

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' });

export const themesApi = createApi({
  reducerPath: 'themesApi',
  tagTypes: ['THEME_DATA'],
  baseQuery,
  endpoints: builder => ({
    getThemes: builder.query<ITheme[], void>({
      query: () => THEME.GET,
      providesTags: (result) =>
      {
        console.log(result, 'res');
        return result
          ? [
              ...result.map(({ themes }) => ({ type: 'THEME_DATA' as const, themes })),
              { type: 'THEME_DATA', id: 'LIST' },
            ]
          : [{ type: 'THEME_DATA', id: 'LIST' }]
    }
    }),
  }),
})

export const {
  useGetThemesQuery,
} = themesApi;
