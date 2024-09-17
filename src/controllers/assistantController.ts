import {Request, Response} from "express";
import {
    checkCompletedStatus,
    createMessage, getLastThreadMessage, getThreadMessagesList,
    initThread,
    runMessage
} from "../services/assistantServices"
import { getLogger } from '../clients/logger';

export const createThread = async (req: Request, res: Response) => {
    const logger = getLogger();
    try {
        const thread = await initThread();
        if (thread) {
            logger.info({ function: "createThread", message: `Thread created ${thread}`})
            res.status(200).json({message: 'Thread created', thread});
        }
    } catch (error) {
        logger.error({function: 'Create thread', message: 'Internal server error'})
        res.status(500).json({message: 'Internal server error'});
    }
}

export const userQuestion = async (req: Request, res: Response) => {
    const logger = getLogger();
    try {
        const { userQuestion } = req.body;
        if (!userQuestion || !userQuestion.threadId || !userQuestion.question) {
            logger.error('Invalid User Question data')
            return res.status(400).json({message: 'Invalid User Question data'});
        }
        const message = await createMessage(userQuestion);
        if (!message) {
            logger.error('No message found')
            return res.status(400).json({message: 'No message found'});
        }
        logger.info({ function: "createMessage", message: `${message}`, threadId: `${userQuestion.threadId}` });
        const assistantId = process.env.ASSISTANT_ID;
        if (!assistantId) {
            logger.error('Assistant ID is not defined in the environment variables')
            return res.status(500).json({message: 'Assistant ID is not defined in the environment variables'});
        }
        const run = await runMessage({threadId: userQuestion.threadId, assistantId: assistantId});
        await checkCompletedStatus({threadId: userQuestion.threadId, runId: run.id});
        const lastMessage = await getLastThreadMessage({threadId: userQuestion.threadId})
        logger.info({ function: "Response userQuestion", message: `${lastMessage}`, threadId: `${userQuestion.threadId}`});
        res.status(200).json({message: lastMessage});
    } catch (error) {
        logger.error({function: 'User question', message: 'Internal server error'})
        res.status(500).json({message: 'Internal server error'});
    }
}

export const getThreadMessages = async (req: Request, res: Response) => {
    const logger = getLogger();
    try {
        const { threadId } = req.params;
        if (!threadId) {
            logger.error('Invalid threadId provided');
            return res.status(400).json({ message: 'Invalid threadId provided' });
        }
        const messages = await getThreadMessagesList({ threadId });
        if (!messages || messages.length === 0) {
            logger.info(`No messages found for thread ${threadId}`);
            return res.status(404).json({ message: `No messages found for thread ${threadId}` });
        }
        logger.info(`Messages retrieved for thread ${threadId}`);
        logger.info(`Messages  ${messages}`);
        return res.status(200).json({ messages });
    } catch (error: any) {
        logger.error({
            function: 'getThreadMessages',
            message: 'Internal server error',
            error: error.message || error
        });
        return res.status(500).json({ message: 'Internal server error' });
    }
};
