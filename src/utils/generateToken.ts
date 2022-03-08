import { sign } from 'jsonwebtoken';
import { IUserDocument } from '../models/user.model';

export const generateAccessToken = (user: IUserDocument) => {
  const roles = Object.values(user.roles);
  console.log(roles);
  return sign(
    { user: { userId: user._id, roles } },
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
