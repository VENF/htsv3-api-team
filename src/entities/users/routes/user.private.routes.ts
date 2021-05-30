import { Router } from 'express';
import { user } from '../controllers/verify.controller';
import { getUsers, getUser, deleteUser, updateUser } from "../controllers/user.controller"
import auth from '../../../utils/private';
const router = Router();

router.get('/user', auth.private, user);
router.get('/users', auth.private, getUsers);
router.get('/user/:email', auth.private, getUser);
router.get('/user/remove/:email', auth.private, deleteUser);
router.post('/user/update/:email', auth.private, updateUser);

export default router;
