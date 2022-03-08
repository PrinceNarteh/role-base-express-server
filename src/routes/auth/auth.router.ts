import { Router } from 'express';
import { verifyJWT } from '../../middleware/verifyJWT';
import { ROLES_LIST, verifyRoles } from '../../middleware/verifyRoles';
import {
  login,
  register,
  refreshTokenHandler,
  logout,
  assignRole,
} from './auth.controller';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.get('/refresh', refreshTokenHandler);
authRouter.get('/logout', logout);

// authRouter.use(verifyJWT, verifyRoles(ROLES_LIST.Admin));
authRouter.post('/assign-role', assignRole);

export default authRouter;
