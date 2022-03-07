import { Router } from 'express';
import { verifyJWT } from '../../middleware/verifyJWT';
import { ROLES_LIST, verifyRoles } from '../../middleware/verifyRoles';
import { deleteUser, getAllUsers, getUser } from './users.controller';

const usersRouter = Router();

usersRouter.use(verifyJWT, verifyRoles(ROLES_LIST.Admin));
usersRouter.get('/', getAllUsers);
usersRouter.route('/:userId').get(getUser).delete(deleteUser);

export default usersRouter;
