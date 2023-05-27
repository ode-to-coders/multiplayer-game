import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HTTP_METHOD } from '../../../../shared/const/constants';

import {
  ITopic
} from './types';

const enum FORUM_TOPIC {
  GET = '/topics',
  UPDATE_REACTIONS = '/topics/reactions/update',
  UPDATE = '/topics/update',
  CREATE = '/topics/create',
  DELETE = '/topics/delete',
  FORUM_GET_COMMENTS = '/comments',
  FORUM_CREATE_COMMENTS = '/comments/create',
}

const enum FORUM_COMMENTS {
  GET = '/comments',
  CREATE = '/comments/create',
  DELETE = '/comments/delete'
}

const baseQuery = fetchBaseQuery({ baseUrl: __CLIENT_URL__ })

export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery,
  endpoints: builder => ({

    getTopics: builder.query<ITopic[], void | Record<never, never>>({
      query: () => FORUM_TOPIC.GET,
    }),

    updateTopic: builder.mutation({
      query: updateTopic => ({
        url: FORUM_TOPIC.UPDATE,
        method: HTTP_METHOD.PUT,
        body: updateTopic
      })
    }),

    updateReactions: builder.mutation({
      query: updateReactions => ({
        url: FORUM_TOPIC.UPDATE_REACTIONS,
        method: HTTP_METHOD.PUT,
        body: updateReactions
      })
    }),

    createTopic: builder.mutation({
      query: newTopic => ({
        url: FORUM_TOPIC.CREATE,
        method: HTTP_METHOD.POST,
        body: newTopic
      })
    }),

    deleteTopic: builder.mutation({
      query: id => ({
        url: `${FORUM_TOPIC.DELETE}/${id}`,
        method: HTTP_METHOD.DELETE
      })
    }),

    getComments: builder.query({
      query: ({id, depth}) => `${FORUM_COMMENTS.GET}/${id}/${depth}`,
    }),

    createComment: builder.mutation({
      query: newComment => ({
        url: FORUM_COMMENTS.CREATE,
        method: HTTP_METHOD.POST,
        body: newComment
      })
    }),

    deleteComment: builder.mutation({
      query: id => ({
        url: `${FORUM_COMMENTS.DELETE}/${id}`,
        method: HTTP_METHOD.DELETE
      })
    })
  })
})

export const {
  useGetTopicsQuery,
  useUpdateTopicMutation,
  useUpdateReactionsMutation,
  useCreateTopicMutation,
  useDeleteTopicMutation,
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation
} = forumApi;
