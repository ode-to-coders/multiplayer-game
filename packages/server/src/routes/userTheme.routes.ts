import type { Express } from 'express';

import {
  updateUserTheme,
  getUserTheme,
  createUserTheme
} from '../controllers/userTheme.controller';

const enum USER_THEME_ROUTES {
  GET_THEME = '/api/user-theme/:ownerId',
  UPDATE_THEME = '/api/user-theme/update',
  CREATE_THEME = '/api/user-theme/create',
}

export const topicRoutes = (app: Express) => {
  app.get(USER_THEME_ROUTES.GET_THEME, getUserTheme);
  app.put(USER_THEME_ROUTES.UPDATE_THEME, updateUserTheme);
  app.post(USER_THEME_ROUTES.CREATE_THEME, createUserTheme);
};
