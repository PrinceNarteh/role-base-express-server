import { Request, Response } from 'express';
import User from '../../models/user.model';
import { asyncHandler } from '../../utils/asyncHandler';

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({});
  res.status(200).json({ status: 'success', users });
});
