import { Router } from 'express';
import { verifyJWT } from '../../middleware/verifyJWT';
import { ROLES_LIST, verifyRoles } from '../../middleware/verifyRoles';
import { getAllUsers, getUser } from './users.controller';

const usersRouter = Router();

usersRouter.get('/', verifyJWT, verifyRoles(ROLES_LIST.Admin), getAllUsers);
usersRouter.get('/:userId', verifyJWT, verifyRoles(ROLES_LIST.Admin), getUser);

export default usersRouter;
