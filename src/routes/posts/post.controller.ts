import { Request, Response } from 'express';
import Post from '../../models/post.model';
import AppError from '../../utils/appError';
import { asyncHandler } from '../../utils/asyncHandler';
import {
  createPostValidator,
  updatePostValidator,
  validationError,
} from '../../utils/validation';

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
  // checking if the user did not send empty object
  if (Object.keys(req.body).length === 0) {
    throw new AppError('Cannot update with empty fields', 400);
  }

  // validating user inputs
  const inputData = updatePostValidator.safeParse(req.body);
  if (!inputData.success) {
    const errors = validationError(inputData.error);
    return res.status(400).json({ status: 'fail', errors });
  }

  // getting postId and checking if post exists
  const { postId } = req.params;
  let post = await Post.findById(postId);
  if (!post) {
    throw new AppError('Post not found', 404);
  }

  // checking if the user it the owner of the post
  if (String(post.author) !== String(req.userId)) {
    throw new AppError('Not allowed to perform this operation', 403);
  }
  post = await Post.findByIdAndUpdate(postId, inputData.data, { new: true });
  return res.status(200).json({ status: 'success', post });
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  return res.status(200).json({ status: 'success', data: 'Post Deleted' });
});
