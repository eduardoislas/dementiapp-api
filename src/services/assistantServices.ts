import openai from "../clients/openAiClient";
import {Options, UserQuestion} from "../models/assistantModel";
import {Threads} from "openai/resources/beta";
import MessagesPage = Threads.MessagesPage;

export const initThread = async (): Promise<string | null> => {
    const {id} = await openai.beta.threads.create();
    return id;
};

export const createMessage = async (userQuestion: UserQuestion) => {
    const {threadId, question} = userQuestion;
    return openai.beta.threads.messages.create(threadId, {
        role: 'user',
        content: question
    });
}

export const runMessage = async (options: Options) => {
    const {threadId, assistantId} = options;
    if (!assistantId) {
        throw new Error('Assistant ID is not defined in the environment variables');
    }
    return openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId
    });
}

export const checkCompletedStatus = async (options: Options): Promise<any> => {
    const {threadId, runId} = options;
    if (!runId) {
        throw new Error('Run ID is not defined');
    }
    const runStatus = await openai.beta.threads.runs.retrieve(
        threadId,
        runId
    )
    if ( runStatus.status === 'completed') {
        return runStatus;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    return await checkCompletedStatus( options );
}

export const getThreadMessagesList = async (options: Options) => {
    const {threadId} = options;
    const messageList = await openai.beta.threads.messages.list( threadId ) as MessagesPage;
    if (!messageList || !messageList.data) {
        throw new Error('Failed to retrieve message list');
    }
    return messageList.data.map((message: any) => ({
        role: message.role,
        content: message.content.map((content: any) => content.text.value)
    }));
}

export const getLastThreadMessage = async (options: Options) => {
    const { threadId } = options;
    const messageList = await openai.beta.threads.messages.list(threadId) as MessagesPage;
    if (!messageList || !messageList.data || messageList.data.length === 0) {
        throw new Error('No messages found or failed to retrieve message list');
    }
    const lastMessage = messageList.data[0];
    return {
        role: lastMessage.role,
        content: lastMessage.content.map((content: any) => content.text.value)
    };
}
