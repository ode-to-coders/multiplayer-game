import type { Express } from 'express';

import {
  createTopic,
  getTopics,
  updateTopicReactions,
} from '../controllers/topic.controller';
import { createComment } from '../controllers/comment.controller';

const enum TOPIC_ROUTES {
  GET_TOPICS = '/api/topics',
  PUT_TOPIC_REACTIONS = '/api/topics/update',
  CREATE_TOPIC = '/api/topics/create',
}

export const routes = (app: Express) => {
  app.get(TOPIC_ROUTES.GET_TOPICS, getTopics);
  app.post(TOPIC_ROUTES.CREATE_TOPIC, createTopic);
  app.put(TOPIC_ROUTES.PUT_TOPIC_REACTIONS, updateTopicReactions);
};

const enum COMMENT_ROUTES {
  GET_COMMENTS = '/api/comments/:id',
  CREATE_COMMENT = '/api/comments/create',
}

export const commentRoutes = (app: Express) => {
  app.get(COMMENT_ROUTES.GET_COMMENTS, getTopics);
  app.post(COMMENT_ROUTES.CREATE_COMMENT, createComment);
};
