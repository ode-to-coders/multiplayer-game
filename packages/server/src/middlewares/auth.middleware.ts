import { Request, Response, NextFunction } from 'express';

import { YA_CHECK_AUTH_URL } from '../utils/constants';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uuid, authCookie } = req.cookies;

    if (!uuid || !authCookie) {
      throw new Error('Authentication failed');
    }

    const checkAuth = await fetch(YA_CHECK_AUTH_URL, {
      headers: {
        Cookie: `authCookie=${authCookie};uuid=${uuid}`,
      },
      credentials: 'include',
    });

    if (checkAuth.status >= 400) {
      throw new Error('Authentication failed');
    }

    next();
  } catch (error) {
    res.sendStatus(401);
  }
};
