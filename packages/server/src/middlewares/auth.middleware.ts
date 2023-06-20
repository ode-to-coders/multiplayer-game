import { Request, Response, NextFunction } from 'express';

const { YANDEX_BASE_API_PATH } = process.env;

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

    const checkAuth = await fetch(`${YANDEX_BASE_API_PATH}/auth/user`, {
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
