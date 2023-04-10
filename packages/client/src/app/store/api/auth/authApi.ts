import { baseApi } from '../baseApi';

const enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

const SIGN_IN_API_PATH = '/auth/signin';
const SIGN_UP_API_PATH = '/auth/signup';

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

export const auth = baseApi.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<void, SignInRequestBody>({
      query: credentials => ({
        url: SIGN_IN_API_PATH,
        method: HTTP_METHOD.POST,
        body: credentials,
        responseHandler: response => response.text(),
      }),
    }),
    signUp: builder.mutation<{ id: number }, SignUpRequestBody>({
      query: credentials => ({
        url: SIGN_UP_API_PATH,
        method: HTTP_METHOD.POST,
        body: credentials,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = auth;
