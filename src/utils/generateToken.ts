import { sign } from 'bcryptjs';

export const generateAccessToken = (userId: string) => {
  return sign({ id: userId }, process.env.accessTokenSecret);
};

export const generateRefreshToken = (userId: string) => {
  return sign({ id: userId }, process.env.accessTokenSecret);
};
