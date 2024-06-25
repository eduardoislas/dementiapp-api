import {Request, Response} from "express";
import {UserQuestion} from "../models/assistantModel";
import {createMessage, initThread} from "../services/assistantServices"

export const createThread = async (req: Request, res: Response) => {
    try {
        const thread = await initThread();
        if (thread) {
            res.status(200).json({message: 'Thread created', thread});
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}

export const userQuestion = async (req: Request, res: Response) => {
    const userQuestion: UserQuestion = req.body.userQuestion;
    if (!userQuestion || !userQuestion.threadId || !userQuestion.question) {
        return res.status(400).json({message: 'Invalid User Question data'});
    }
    const message = await createMessage(userQuestion);
    console.log(message)
    res.status(200).json( { message: message, userQuestion } );
}

export const runMessage = async (req: Request, res: Response) => {

}
