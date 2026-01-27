import { AxiosInstance } from "axios";

import { Message, CreateMessageRequest, CreateMessageFeedbackRequest, MessageFeedback } from "./message.types";

export class MessageService {
    constructor(private httpClient: AxiosInstance) {}

    async getMessages(chatId: string): Promise<Message> {
        const response = await this.httpClient.get(`/api/v1/messages/${chatId}`);
        return response.data;
    }

    async createMessage(message: CreateMessageRequest): Promise<Message> {
        const response = await this.httpClient.post('/api/v1/messages', message);
        return response.data;
    }

    async getFeedbackByMessage(messageId: string): Promise<MessageFeedback> {
        const response = await this.httpClient.get(`/api/v1/messages/feedback/message/${messageId}`);
        return response.data;
    }

    async getFeedbackByTenant(): Promise<MessageFeedback[]> {
        const response = await this.httpClient.get('/api/v1/messages/feedback/tenant');
        return response.data;
    }

    async createFeedback(feedback: CreateMessageFeedbackRequest): Promise<MessageFeedback> {
        const response = await this.httpClient.post('/api/v1/messages/feedback', feedback);
        return response.data;
    }
}