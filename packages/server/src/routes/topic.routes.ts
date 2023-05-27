import type { Express } from 'express';

import {
  createTopic,
  deleteTopic,
  getTopics,
  updateTopic,
  updateTopicReactions,
} from '../controllers/topic.controller';

const enum TOPIC_ROUTES {
  GET_TOPICS = '/api/topics',
  UPDATE_TOPIC_REACTIONS = '/api/topics/reactions/update',
  UPDATE_TOPIC = '/api/topics/update',
  CREATE_TOPIC = '/api/topics/create',
  DELETE_TOPIC = '/api/topics/delete/:id',
}

export const topicRoutes = (app: Express) => {
  app.get(TOPIC_ROUTES.GET_TOPICS, getTopics);
  app.post(TOPIC_ROUTES.CREATE_TOPIC, createTopic);
  app.put(TOPIC_ROUTES.UPDATE_TOPIC_REACTIONS, updateTopicReactions);
  app.put(TOPIC_ROUTES.UPDATE_TOPIC, updateTopic);
  app.delete(TOPIC_ROUTES.DELETE_TOPIC, deleteTopic);
};
