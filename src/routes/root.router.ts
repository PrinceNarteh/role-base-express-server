import { Router } from 'express';
import postRouter from './posts/post.router';
import authRouter from './auth/auth.router';
import usersRouter from './users/users.router';

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/posts', postRouter);
rootRouter.use('/users', usersRouter);

export default rootRouter;
