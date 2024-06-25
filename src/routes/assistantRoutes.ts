import { Router } from 'express';
import {createThread, userQuestion} from "../controllers/assistantController";

const router = Router();

router.post('/create-thread', createThread);
router.post('/user-question', userQuestion);

export default router;
