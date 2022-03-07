import { Request, Response } from 'express';
import User from '../../models/user.model';
import AppError from '../../utils/appError';
import { asyncHandler } from '../../utils/asyncHandler';

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({});
  res.status(200).json({ status: 'success', users });
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new AppError(`User with ID ${userId} not found`, 404);
  }
  res.status(200).json({ status: 'success', user });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new AppError(`User with ID ${userId} not found`, 404);
  }
  await user.delete();
  res
    .status(200)
    .json({ status: 'success', message: 'User deleted successfully.' });
});
