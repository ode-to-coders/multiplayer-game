import type { Express } from 'express';

import {
  createTopic,
  deleteTopic,
  getTopics,
  updateTopic,
  updateTopicReactions,
} from '../controllers/topic.controller';
import { createComment } from '../controllers/comment.controller';

const enum TOPIC_ROUTES {
  GET_TOPICS = '/api/topics',
  UPDATE_TOPIC_REACTIONS = '/api/topics/reactions/update',
  UPDATE_TOPIC = '/api/topics/update',
  CREATE_TOPIC = '/api/topics/create',
  DELETE_TOPIC = '/api/topics/delete/:id',
}

export const routes = (app: Express) => {
  app.get(TOPIC_ROUTES.GET_TOPICS, getTopics);
  app.post(TOPIC_ROUTES.CREATE_TOPIC, createTopic);
  app.put(TOPIC_ROUTES.UPDATE_TOPIC_REACTIONS, updateTopicReactions);
  app.put(TOPIC_ROUTES.UPDATE_TOPIC, updateTopic);
  app.delete(TOPIC_ROUTES.DELETE_TOPIC, deleteTopic);
};

const enum COMMENT_ROUTES {
  GET_COMMENTS = '/api/comments/:topicId/:depth',
  CREATE_COMMENT = '/api/comments/create',
  DELETE_COMMENT = '/api/comments/delete/:id',
}

export const commentRoutes = (app: Express) => {
  app.get(COMMENT_ROUTES.GET_COMMENTS, getTopics);
  app.post(COMMENT_ROUTES.CREATE_COMMENT, createComment);
};
