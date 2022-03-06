import { Router } from 'express';
import { verifyJWT } from '../../middleware/verifyJWT';
import { ROLES_LIST, verifyRoles } from '../../middleware/verifyRoles';
import { getAllUsers } from './users.controller';

const usersRouter = Router();

usersRouter.get('/', verifyJWT, verifyRoles(ROLES_LIST.Admin), getAllUsers);

export default usersRouter;
