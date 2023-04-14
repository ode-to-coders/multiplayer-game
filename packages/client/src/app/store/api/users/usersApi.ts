import { HTTP_METHOD } from 'shared/const/constants';
import { baseApi } from '../baseApi';
import { authApi } from '../auth/authApi';

const USER_PROFILE_API_PATH = '/user/profile';
const USER_CHANGE_PASSWORD_API_PATH = '/user/password';
const USER_CHANGE_AVATAR_API_PATH = '/user/profile/avatar';

type ChangeUserPasswordRequestBody = {
  oldPassword: string;
  newPassword: string;
};

type ChangeUserProfileRequestBody = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

type ChangeUserProfileResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
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

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    changeUserProfile: builder.mutation<
      ChangeUserProfileResponse,
      ChangeUserProfileRequestBody
    >({
      query: userProfile => ({
        url: USER_PROFILE_API_PATH,
        method: HTTP_METHOD.PUT,
        body: userProfile,
        responseHandler: response => response.text(),
      }),
      invalidatesTags: [{ type: 'USER_INFO', id: 'INFO' }],
      //TODO разобраться почему не работает optimistic update
      onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          authApi.util.updateQueryData('getUserInfo', {}, draft => {
            return {
              ...draft,
              ...body,
            };
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    changeUserPassword: builder.mutation<void, ChangeUserPasswordRequestBody>({
      query: body => ({
        url: USER_CHANGE_PASSWORD_API_PATH,
        method: HTTP_METHOD.PUT,
        body,
        responseHandler: response => response.text(),
      }),
    }),
    changeUserAvatar: builder.mutation<UserInfoResponse, FormData>({
      query: body => ({
        url: USER_CHANGE_AVATAR_API_PATH,
        method: HTTP_METHOD.PUT,
        headers: {
          'content-type': 'multipart/form-data',
        },
        body,
        responseHandler: response => response.text(),
      }),
    }),
  }),
});

export const {
  useChangeUserProfileMutation,
  useChangeUserPasswordMutation,
  useChangeUserAvatarMutation,
} = usersApi;
