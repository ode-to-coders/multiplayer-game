import { HTTP_METHOD } from 'shared/const/constants';
import { baseApi } from '../baseApi';

const SIGN_IN_API_PATH = '/auth/signin';
const SIGN_UP_API_PATH = '/auth/signup';
const USER_INFO_API_PATH = '/auth/user';

type SignInRequestBody = {
  login: string;
  password: string;
};

type SignUpRequestBody = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

type SignUpResponse = {
  id: number;
};

export type UserInfoResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<void, SignInRequestBody>({
      query: credentials => ({
        url: SIGN_IN_API_PATH,
        method: HTTP_METHOD.POST,
        body: credentials,
        responseHandler: response => response.text(),
      }),
    }),
    signUp: builder.mutation<SignUpResponse, SignUpRequestBody>({
      query: credentials => ({
        url: SIGN_UP_API_PATH,
        method: HTTP_METHOD.POST,
        body: credentials,
      }),
    }),
    getUserInfo: builder.query<UserInfoResponse, void | Record<never, never>>({
      query: () => USER_INFO_API_PATH,
      providesTags: [{ type: 'USER_INFO', id: 'INFO' }],
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useGetUserInfoQuery } =
  authApi;
