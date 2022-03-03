import { Router } from 'express';
import { verifyJWT } from '../../middleware/verifyJWT';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from './post.controller';

const postRouter = Router();

postRouter.route('/').get(getAllPosts).post(verifyJWT, createPost);
postRouter
  .route('/:postId')
  .get(getPost)
  .patch(verifyJWT, updatePost)
  .delete(verifyJWT, deletePost);

export default postRouter;
