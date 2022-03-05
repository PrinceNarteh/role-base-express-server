import { sign } from 'jsonwebtoken';
import { IUser } from '../models/user.model';

interface IUserDocument extends IUser {
  _id: string;
}

export const generateAccessToken = (user: IUserDocument) => {
  return sign(
    { userId: user._id, roles: user.roles },
    process.env.accessTokenSecret!,
    {
      expiresIn: '15m',
    }
  );
};

export const generateRefreshToken = (user: IUserDocument) => {
  return sign({ userId: user._id }, process.env.refreshTokenSecret!, {
    expiresIn: '1d',
  });
};
