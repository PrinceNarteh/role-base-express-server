import { Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';

export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
  return res.status(201).json({ status: 'success', data: 'All Posts' });
});

export const getPost = asyncHandler(async (req: Request, res: Response) => {
  return res.status(201).json({ status: 'success', data: 'Single Posts' });
});

export const createPost = asyncHandler(async (req: Request, res: Response) => {
  return res.status(201).json({ status: 'success', data: 'Post Created' });
});

export const updatePost = asyncHandler(async (req: Request, res: Response) => {
  return res.status(200).json({ status: 'success', data: 'Post Updated' });
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  return res.status(200).json({ status: 'success', data: 'Post Deleted' });
});
