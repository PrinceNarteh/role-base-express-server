import { Router } from 'express';
import postRouter from './posts/post.router';
import authRouter from './auth/auth.router';

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/posts', postRouter);

export default rootRouter;
