import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HTTP_METHOD } from '../../../../shared/const/constants';

import {
  ChangeUserPasswordRequestBody,
  ChangeUserProfileRequestBody,
  ChangeUserProfileResponse,
  UserInfoResponse,
} from './types';

const FORUM_GET_TOPICS = '/topics';
const FORUM_CREATE_TOPIC = '/topics/create';
const FORUM_GET_COMMENTS = '/comments';
const FORUM_CREATE_COMMENTS = '/comments/create';

const baseQuery = fetchBaseQuery({ baseUrl: __CLIENT_URL__ })

export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery,
  endpoints: builder => ({
    getTopics: builder.query({
      query: () => FORUM_GET_TOPICS,
    }),
    createTopic: builder.mutation({
      query: newTopic => ({
        url: FORUM_CREATE_TOPIC,
        method: HTTP_METHOD.POST,
        body: newTopic
      })
    }),
    getComments: builder.query({
      query: id => `${FORUM_GET_COMMENTS}/${id}`,
    }),
    createComment: builder.mutation({
      query: newComment => ({
        url: FORUM_CREATE_COMMENTS,
        method: HTTP_METHOD.POST,
        body: newComment
      })
    })
  })
})

export const {
  useGetTopicsQuery,
  useCreateTopicMutation,
  useGetCommentsQuery,
  useCreateCommentMutation,
} = forumApi;
