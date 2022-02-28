import { Request, Response } from 'express';

import AppError from '../../utils/appError';
import { registerValidator } from '../../helpers/validation';
import User from '../../models/user.model';

export async function register(req: Request, res: Response) {
  try {
    const data = await registerValidator.validateAsync(req.body);

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

    const user = await User.create(data);
  } catch (error: any) {
    throw new AppError(error.message, 400);
  }
}
