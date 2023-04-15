import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_API_PATH = 'https://ya-praktikum.tech/api/v2/';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_API_PATH}`,
  prepareHeaders(headers) {
    return headers;
  },
  credentials: 'include',
});

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['USER_INFO'],
});
