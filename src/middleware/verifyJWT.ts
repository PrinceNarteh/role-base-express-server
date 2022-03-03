import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];

    const accessTokenSecret = process.env.accessTokenSecret || '';
    const decoded = <JwtPayload>verify(token, accessTokenSecret);
    req.userId = decoded.userId;
    next();
  } catch (error: any) {
    if (error.message === 'jwt expired') {
      return res.status(401).json({ status: 'fail', message: 'JWT expired' });
    }
    return res.status(401).json({ status: 'fail', message: 'Unauthenticated' });
  }
};
