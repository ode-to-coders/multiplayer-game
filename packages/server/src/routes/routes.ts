import type { Express } from 'express';

import { commentRoutes } from './comment.routes';
import { topicRoutes } from './topic.routes';

export default (app: Express) => {
  commentRoutes(app);
  topicRoutes(app);
};
