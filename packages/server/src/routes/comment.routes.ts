import type { Express } from 'express';

import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from '../controllers/comment.controller';

const enum COMMENT_ROUTES {
  GET_COMMENTS = '/api/comments/:topicId/:depth',
  CREATE_COMMENT = '/api/comments/create',
  DELETE_COMMENT = '/api/comments/delete/:id/:topicId',
  UPDATE_COMMENT = '/api/comments/update',
}

export const commentRoutes = (app: Express) => {
  app.get(COMMENT_ROUTES.GET_COMMENTS, getComments);
  app.post(COMMENT_ROUTES.CREATE_COMMENT, createComment);
  app.delete(COMMENT_ROUTES.DELETE_COMMENT, deleteComment);
  app.put(COMMENT_ROUTES.UPDATE_COMMENT, updateComment);
};
