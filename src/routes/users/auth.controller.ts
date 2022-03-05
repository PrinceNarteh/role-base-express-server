import { Request, Response } from 'express';

import AppError from '../../utils/appError';
import { loginValidator, registerValidator } from '../../utils/validation';
import User from '../../models/user.model';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../utils/generateToken';
import { asyncHandler } from '../../utils/asyncHandler';
import { verify } from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

function setCookie(res: Response, refreshToken: string) {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 24 * 3600 * 1000,
  });
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  // validates incoming data
  const data = registerValidator.parse(req.body);

  // check if email already exist
  const emailExists = await User.findOne({ email: data.email });
  if (emailExists) {
    throw new AppError('Email already in use', 400);
  }

  // check if username is taken
  const usernameExists = await User.findOne({ username: data.username });
  if (usernameExists) {
    throw new AppError('Username is already taken.', 400);
  }

  // create user in the database
  const user = new User(data);

  // generate tokens
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // storing refreshToken
  user.refreshToken = refreshToken;

  // saving user to database
  await user.save();

  // return tokens
  setCookie(res, refreshToken);
  res.status(201).json({ accessToken });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  // validates incoming data
  const data = await loginValidator.parseAsync(req.body);

  // check if user with the email or password exists
  let user = await User.findOne({
    $or: [{ email: data.emailOrUsername }, { username: data.emailOrUsername }],
  });

  // if user not found throw an error
  if (!user) {
    throw new AppError('Invalid credentials', 400);
  }

  // if user check if password is correct
  if (user && !(await user.comparePassword(data.password))) {
    throw new AppError('Invalid credentials', 400);
  }

  // generate tokens
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // storing refreshToken
  await User.findByIdAndUpdate(user._id, {
    $set: { refreshToken },
  });

  // return tokens
  setCookie(res, refreshToken);

  // send accessToken
  res.status(201).json({ accessToken });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(204); // No content

  // finding user with this cookie
  const { refreshToken } = cookies;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.sendStatus(204);
  }

  // clearing the refreshToken from user's info
  user.refreshToken = '';
  await user.save();

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.sendStatus(204);
});

export const refreshTokenHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) return res.sendStatus(401);

    // finding user with this cookie
    const { refreshToken } = cookies;
    const user = await User.findOne({ refreshToken });
    if (!user) return res.sendStatus(403); // Forbidden

    const refreshTokenSecret = process.env.refreshTokenSecret || '';
    const decoded = <JwtPayload>verify(refreshToken, refreshTokenSecret);
    if (!decoded || String(user._id) !== String(decoded.userId)) {
      return res.sendStatus(403);
    }

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  }
);
