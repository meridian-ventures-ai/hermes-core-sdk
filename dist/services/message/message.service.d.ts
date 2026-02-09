import { AxiosInstance } from "axios";
import { Message, CreateMessageRequest, CreateMessageFeedbackRequest, MessageFeedback } from "./message.types";
export declare class MessageService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getMessages(chatId: string): Promise<Message[]>;
    createMessage(message: CreateMessageRequest): Promise<Message>;
    getFeedbackByMessage(messageId: string): Promise<MessageFeedback>;
    getFeedbackByTenant(): Promise<MessageFeedback[]>;
    createFeedback(feedback: CreateMessageFeedbackRequest): Promise<MessageFeedback>;
}
