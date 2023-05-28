import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { HTTP_METHOD } from '../../../../shared/const/constants';

import {
  IComment,
  ICreateComment,
  ICreateTopic,
  IGetComments,
  ITopic,
  IUpdateComment,
  IUpdateReactionsTopic,
  IUpdateTopic
} from './types';

const enum FORUM_TOPIC {
  GET = '/topics',
  UPDATE_REACTIONS = '/topics/reactions/update',
  UPDATE = '/topics/update',
  CREATE = '/topics/create',
  DELETE = '/topics/delete'
}

const enum FORUM_COMMENTS {
  GET = '/comments',
  CREATE = '/comments/create',
  DELETE = '/comments/delete',
  UPDATE = '/comments/update'
}

const baseQuery = fetchBaseQuery({ baseUrl: __CLIENT_URL__ })

export const forumApi = createApi({
  reducerPath: 'forumApi',
  tagTypes: ['FORUM_DATA'],
  baseQuery,
  endpoints: builder => ({

    getTopics: builder.query<ITopic[], void>({
      query: () => FORUM_TOPIC.GET,
      providesTags: result => result
        ? [
            ...result.map(({ id }) => (
              { type: 'FORUM_DATA' as const, id }
              )),
            { type: 'FORUM_DATA', id: 'LIST' },
          ]
        : [{ type: 'FORUM_DATA', id: 'LIST' }],
    }),

    updateTopic: builder.mutation<ITopic, IUpdateTopic>({
      query: updateTopic => ({
        url: FORUM_TOPIC.UPDATE,
        method: HTTP_METHOD.PUT,
        body: updateTopic
      }),
      invalidatesTags: [{ type: 'FORUM_DATA', id: 'LIST' }]
    }),

    updateReactions: builder.mutation<ITopic, IUpdateReactionsTopic>({
      query: updateReactions => ({
        url: FORUM_TOPIC.UPDATE_REACTIONS,
        method: HTTP_METHOD.PUT,
        body: updateReactions
      }),
      invalidatesTags: [{ type: 'FORUM_DATA', id: 'LIST' }]
    }),

    createTopic: builder.mutation<ITopic, ICreateTopic>({
      query: newTopic => ({
        url: FORUM_TOPIC.CREATE,
        method: HTTP_METHOD.POST,
        body: newTopic
      }),
      invalidatesTags: [{ type: 'FORUM_DATA', id: 'LIST' }]
    }),

    deleteTopic: builder.mutation<string, string>({
      query: id => ({
        url: `${FORUM_TOPIC.DELETE}/${id}`,
        method: HTTP_METHOD.DELETE
      }),
      invalidatesTags: [{ type: 'FORUM_DATA', id: 'LIST' }]
    }),

    getComments: builder.query<IComment, IGetComments>({
      query: ({id, depth}) => `${FORUM_COMMENTS.GET}/${id}/${depth}`,
    }),

    createComment: builder.mutation<IComment, ICreateComment>({
      query: newComment => ({
        url: FORUM_COMMENTS.CREATE,
        method: HTTP_METHOD.POST,
        body: newComment
      })
    }),

    deleteComment: builder.mutation<string, string>({
      query: id => ({
        url: `${FORUM_COMMENTS.DELETE}/${id}`,
        method: HTTP_METHOD.DELETE
      })
    }),

    updateComment: builder.mutation<IComment, IUpdateComment>({
      query: updatedComment => ({
        url: FORUM_COMMENTS.UPDATE,
        method: HTTP_METHOD.PUT,
        body: updatedComment
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
  useDeleteCommentMutation,
  useUpdateCommentMutation
} = forumApi;
