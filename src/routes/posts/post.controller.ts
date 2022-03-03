import { Request, Response } from 'express';
import Post from '../../models/post.model';
import { asyncHandler } from '../../utils/asyncHandler';
import { createPostValidator, validationError } from '../../utils/validation';

export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
  const posts = await Post.find({});
  return res.status(200).json({ status: 'success', posts });
});

export const getPost = asyncHandler(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  return res.status(200).json({ status: 'success', post });
});

export const createPost = asyncHandler(async (req: Request, res: Response) => {
  const inputData = createPostValidator.safeParse(req.body);
  if (!inputData.success) {
    const errors = validationError(inputData.error);
    return res.status(400).json({ status: 'fail', errors });
  }
  const post = await Post.create({ ...inputData.data, author: req.userId });
  return res.status(201).json({ status: 'success', post });
});

export const updatePost = asyncHandler(async (req: Request, res: Response) => {
  return res.status(200).json({ status: 'success', data: 'Post Updated' });
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  return res.status(200).json({ status: 'success', data: 'Post Deleted' });
});
