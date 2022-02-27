import { Request, Response } from 'express';

import AppError from '../../utils/appError';
import { registerValidator } from '../../helpers/validation';
import User from '../../models/user.model';

export async function register(req: Request, res: Response) {
  try {
    const data = await registerValidator.validateAsync(req.body);

    // check if email already exist
    let user = await User.findOne({ email: data.email });
    if (user) {
      throw new AppError('Email already in use', 400);
    }

    // check if username is taken
    user = await User.findOne({ username: data.username });
    if (user) {
      throw new AppError('Email already in use', 400);
    }
  } catch (error: any) {
    throw new AppError(error.message, 400);
  }
}
