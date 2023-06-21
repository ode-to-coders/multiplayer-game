import { Request, Response, NextFunction } from 'express';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uuid, authCookie } = req.cookies;

    if (!uuid || !authCookie) {
      res.status(401).clearCookie('authCookie').clearCookie('uuid');

      throw new Error('Authentication failed');
    }

    const checkAuth = await fetch(
      'https://odetocode-league-24.ya-praktikum.tech/api/v2/auth/user',
      {
        credentials: 'include',
        headers: {
          cookie: authCookie || '',
        },
      }
    );

    if (checkAuth.status >= 400) {
      throw new Error('Authentication failed');
    }

    next();
  } catch (error) {
    res.sendStatus(401);
  }
};
