import { Router } from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from './post.controller';

const postRouter = Router();

postRouter.route('/').get(getAllPosts).post(createPost);
postRouter.route('/:postId').get(getPost).patch(updatePost).delete(deletePost);

export default postRouter;
