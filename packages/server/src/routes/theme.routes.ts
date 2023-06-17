import type { Express } from 'express';

import {
  getTheme,
} from '../controllers/theme.controller';

const enum THEME_ROUTES {
  GET_THEME = '/api/theme',
}

export const topicRoutes = (app: Express) => {
  app.get(THEME_ROUTES.GET_THEME, getTheme);
};
