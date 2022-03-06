import { Router } from 'express';
import {
  login,
  register,
  refreshTokenHandler,
  logout,
} from './auth.controller';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.get('/refresh', refreshTokenHandler);
authRouter.get('/logout', logout);

export default authRouter;
