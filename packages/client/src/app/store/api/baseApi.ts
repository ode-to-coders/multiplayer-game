import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { setIsAuth } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: __BASE_API_PATH__,
  prepareHeaders(headers) {
    return headers;
  },
  credentials: 'include',
});

const handleUnauthenticatedQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(setIsAuth(false));
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: handleUnauthenticatedQuery,
  endpoints: () => ({}),
  tagTypes: ['USER_INFO'],
});
