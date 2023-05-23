import type { Express } from 'express';

import { createTopic, getTopics } from '../controllers/topic.controller';

const enum TOPIC_ROUTES {
  GET_TOPICS = '/api/topics',
  CREATE_TOPIC = '/api/topics/create',
}

export const routes = (app: Express) => {
  app.get(TOPIC_ROUTES.GET_TOPICS, getTopics);
  app.post(TOPIC_ROUTES.CREATE_TOPIC, createTopic);
};
