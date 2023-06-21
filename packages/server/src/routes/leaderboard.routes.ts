import type { Express } from 'express';

import {
  pushResult,
  getLeaderboard
} from '../controllers/leaderboard.controller';

const enum LEADERBOARD_ROUTES {
  GET = '/api/leader',
  PUSH = '/api/leader/push'
}

export const leaderboardRoutes = (app: Express) => {
  app.get(LEADERBOARD_ROUTES.GET, getLeaderboard);
  app.post(LEADERBOARD_ROUTES.PUSH, pushResult);
};
