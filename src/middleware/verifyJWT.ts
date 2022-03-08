import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface JwtPayload {
  user: {
    userId: string;
    roles: number[];
  };
  iat: number;
  exp: number;
}

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];

    const accessTokenSecret = process.env.accessTokenSecret || '';
    const user = <JwtPayload>verify(token, accessTokenSecret);
    console.log(user);
    // req.user = user;
    next();
  } catch (error: any) {
    if (error.message === 'jwt expired') {
      return res.status(401).json({ status: 'fail', message: 'JWT expired' });
    }
    return res.status(401).json({ status: 'fail', message: 'Unauthenticated' });
  }
};
