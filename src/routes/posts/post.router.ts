import { Router } from 'express';
import { verifyJWT } from '../../middleware/verifyJWT';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from './post.controller';
import { ROLES_LIST, verifyRoles } from '../../middleware/verifyRoles';

const postRouter = Router();

postRouter
  .route('/')
  .get(getAllPosts)
  .post(
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    createPost
  );
postRouter
  .route('/:postId')
  .get(getPost)
  .patch(
    verifyJWT,
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    updatePost
  )
  .delete(verifyJWT, verifyRoles(ROLES_LIST.Admin), deletePost);

export default postRouter;
