import {Request, Response} from "express";
import {UserQuestion} from "../models/assistantModel";
import {
    checkCompletedStatus,
    createMessage, getLastThreadMessage,
    initThread,
    runMessage
} from "../services/assistantServices"
import { getLogger } from '../clients/logger';

export const createThread = async (req: Request, res: Response) => {
    const logger = getLogger();
    try {
        const thread = await initThread();
        if (thread) {
            logger.info(`Thread creado ${thread}`);
            res.status(200).json({message: 'Thread created', thread});
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}

export const userQuestion = async (req: Request, res: Response) => {
    const logger = getLogger();
    try {
        const userQuestion: UserQuestion = req.body.userQuestion;
        if (!userQuestion || !userQuestion.threadId || !userQuestion.question) {
            return res.status(400).json({message: 'Invalid User Question data'});
        }
        const message = await createMessage(userQuestion);
        if (!message) {
            return res.status(400).json({message: 'No message found'});
        }
        const assistantId = process.env.ASSISTANT_ID;
        if (!assistantId) {
            return res.status(500).json({message: 'Assistant ID is not defined in the environment variables'});
        }
        const run = await runMessage({threadId: userQuestion.threadId, assistantId: assistantId});
        await checkCompletedStatus({threadId: userQuestion.threadId, runId: run.id});
        // const messages = await getThreadMessagesList({threadId: userQuestion.threadId})
        const lastMessage = await getLastThreadMessage({threadId: userQuestion.threadId})
        logger.info(`Mensaje para el thread ${userQuestion.threadId} obtenido`)
        res.status(200).json({message: lastMessage});
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}
