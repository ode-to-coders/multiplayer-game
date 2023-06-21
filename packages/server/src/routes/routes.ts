import type { Express } from 'express';

import { commentRoutes } from './comment.routes';
import { topicRoutes } from './topic.routes';
import { leaderboardRoutes } from './leaderboard.routes';
import { userThemeRoutes } from './userTheme.routes';

export default (app: Express) => {
  commentRoutes(app);
  topicRoutes(app);
  leaderboardRoutes(app);
  userThemeRoutes(app);
};
