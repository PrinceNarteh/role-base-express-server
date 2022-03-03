import { Request, Response } from 'express';

import AppError from '../../utils/appError';
import { loginValidator, registerValidator } from '../../utils/validation';
import User from '../../models/user.model';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../utils/generateToken';

export async function register(req: Request, res: Response) {
  try {
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
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 3600 * 1000,
    });
    res.status(201).json({ accessToken });
  } catch (error: any) {
    throw new AppError(error.message, 400);
  }
}

export async function login(req: Request, res: Response) {
  try {
    // validates incoming data
    const data = await loginValidator.parseAsync(req.body);

    // check if user with the email or password exists
    let user = await User.findOne({
      $or: [
        { email: data.emailOrUsername },
        { username: data.emailOrUsername },
      ],
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
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 3600 * 1000,
    });

    // send accessToken
    res.status(201).json({ accessToken });
  } catch (error: any) {
    throw new AppError(error.message, 400);
  }
}
