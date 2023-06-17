import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { HTTP_METHOD } from '../../../../shared/const/constants';

import { ITheme, ICreateUserTheme } from './types';

const enum USER_THEME {
  GET = '/user-theme',
  UPDATE_THEME = '/user-theme/update',
  CREATE_THEME = '/user-theme/create'
}

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' });

export const userThemeApi = createApi({
  reducerPath: 'userThemeApi',
  tagTypes: ['USER_THEME_DATA'],
  baseQuery,
  endpoints: builder => ({

    getUserTheme: builder.query<ITheme[], any>({
      query: ({ ownerId }) => `${USER_THEME.GET}/${ownerId}`,
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'USER_THEME_DATA' as const, id })),
              { type: 'USER_THEME_DATA', id: 'LIST' },
            ]
          : [{ type: 'USER_THEME_DATA', id: 'LIST' }],
    }),

    createUserTheme: builder.mutation<ITheme, ICreateUserTheme>({
      query: newTheme => ({
        url: USER_THEME.CREATE_THEME,
        method: HTTP_METHOD.POST,
        body: newTheme,
      }),
      invalidatesTags: [{ type: 'USER_THEME_DATA', id: 'LIST' }],
    }),

    updateUserTheme: builder.mutation<ITheme, ICreateUserTheme >({
      query: updateTheme  => ({
        url: USER_THEME.UPDATE_THEME,
        method: HTTP_METHOD.PUT,
        body: updateTheme,
      }),
      invalidatesTags: [{ type: 'USER_THEME_DATA', id: 'LIST' }],
    }),
    
  })
});

export const {
  useGetUserThemeQuery,
  useCreateUserThemeMutation,
  useUpdateUserThemeMutation,
} = userThemeApi;
