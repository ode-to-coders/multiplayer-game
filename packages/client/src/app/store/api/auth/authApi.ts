import { HTTP_METHOD } from '../../../../shared/const/constants';
import { baseApi } from '../baseApi';

import {
  SignInRequestBody,
  SignUpResponse,
  SignUpRequestBody,
  UserInfoResponse,
} from './types';

const SIGN_IN_API_PATH = '/auth/signin';
const SIGN_UP_API_PATH = '/auth/signup';
const LOGOUT_API_PATH = '/auth/logout';
const USER_INFO_API_PATH = '/auth/user';

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<void, SignInRequestBody>({
      query: credentials => ({
        url: SIGN_IN_API_PATH,
        method: HTTP_METHOD.POST,
        body: credentials,
        responseHandler: response => response.text(),
      }),
      invalidatesTags: [{ type: 'USER_INFO', id: 'INFO' }],
    }),
    signUp: builder.mutation<SignUpResponse, SignUpRequestBody>({
      query: credentials => ({
        url: SIGN_UP_API_PATH,
        method: HTTP_METHOD.POST,
        body: credentials,
      }),
      invalidatesTags: [{ type: 'USER_INFO', id: 'INFO' }],
    }),
    logout: builder.mutation<SignUpResponse, void>({
      query: credentials => ({
        url: LOGOUT_API_PATH,
        method: HTTP_METHOD.POST,
        body: credentials,
      }),
      invalidatesTags: [{ type: 'USER_INFO', id: 'INFO' }],
    }),
    getUserInfo: builder.query<UserInfoResponse, void | Record<never, never>>({
      query: () => USER_INFO_API_PATH,
      providesTags: [{ type: 'USER_INFO', id: 'INFO' }],
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetUserInfoQuery,
  useLogoutMutation,
} = authApi;
