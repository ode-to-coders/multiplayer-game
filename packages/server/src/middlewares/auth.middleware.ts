import { Request, Response, NextFunction } from 'express';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uuid, authCookie } = req.cookies;

    if (!uuid || !authCookie) {
      res.clearCookie('authCookie').clearCookie('uuid').sendStatus(401);

      throw new Error('Authentication failed');
    }

    const checkAuth = await fetch(
      'https://ya-praktikum.tech/api/v2/auth/user',
      {
        credentials: 'include',
        headers: {
          Cookie: `authCookie=${authCookie};uuid=${uuid}`,
        },
      }
    );

    if (checkAuth.status >= 400) {
      throw new Error('Authentication failed');
    }

    next();
  } catch (error) {
    res.clearCookie('authCookie').clearCookie('uuid').sendStatus(401);
  }
};
