import openai from "../clients/openAiClient";
import {UserQuestion} from "../models/assistantModel";

export const initThread = async (): Promise<string | null> => {
  const { id } = await openai.beta.threads.create();
  return id;
};

export const createMessage = async (userQuestion: UserQuestion) => {
  const { threadId, question } = userQuestion;
  return openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: question
  });
}
