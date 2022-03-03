import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface RequestWithUserId extends Request {
  userId: string;
}

export const verifyJWT = async (
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];

    const decoded = <any>verify(token, process.env.accessTokenSecret!);
    req.userId = decoded.userId;
    next();
  } catch (error: any) {
    if (error.message === 'jwt expired') {
      return res.status(401).json({ status: 'fail', message: 'JWT expired' });
    }
    return res.status(401).json({ status: 'fail', message: 'Unauthenticated' });
  }
};
