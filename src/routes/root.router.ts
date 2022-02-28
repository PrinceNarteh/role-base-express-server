import { Router } from 'express';
import authRouter from './users/auth.router';

const rootRouter = Router();

rootRouter.use('/auth', authRouter);

export default rootRouter;
