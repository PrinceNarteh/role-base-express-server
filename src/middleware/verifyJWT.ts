import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface RequestWithUser extends Request {
  user: string;
}

export const verifyJWT = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];

  verify(token, process.env.accessTokenSecret!, (err, decoded) => {
    if (err) return res.sendStatus(403);
    if (decoded) {
      console.log(decoded);
      next();
    }
  });
};
