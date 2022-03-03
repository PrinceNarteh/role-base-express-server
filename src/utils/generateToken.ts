import { sign } from 'jsonwebtoken';

export const generateAccessToken = (userId: string) => {
  return sign({ userId }, process.env.accessTokenSecret!, {
    expiresIn: '15m',
  });
};

export const generateRefreshToken = (userId: string) => {
  return sign({ userId }, process.env.refreshTokenSecret!, {
    expiresIn: '1d',
  });
};
