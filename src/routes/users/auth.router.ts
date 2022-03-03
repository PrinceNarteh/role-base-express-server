import { Router } from 'express';
import { login, register, refreshTokenHandler } from './auth.controller';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.get('/refresh', refreshTokenHandler);

export default authRouter;
