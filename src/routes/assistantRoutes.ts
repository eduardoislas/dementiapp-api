import { Router } from 'express';
import {createThread, getThreadMessages, userQuestion} from "../controllers/assistantController";

const router = Router();

router.post('/create-thread', createThread);
router.post('/user-question', userQuestion);
router.get('/thread-messages/:threadId', getThreadMessages);

export default router;
