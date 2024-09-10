import { Router } from 'express';
import {getAllUsers, getUserByUsername, validateUser} from '../controllers/userController';

const router = Router();

router.get('/user', getUserByUsername);
router.post('/validate', validateUser);
router.post('/list', getAllUsers);

export default router;
