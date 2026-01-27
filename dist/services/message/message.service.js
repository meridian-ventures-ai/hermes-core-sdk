"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
class MessageService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getMessages(chatId) {
        const response = await this.httpClient.get(`/api/v1/messages/${chatId}`);
        return response.data;
    }
    async createMessage(message) {
        const response = await this.httpClient.post('/api/v1/messages', message);
        return response.data;
    }
    async getFeedbackByMessage(messageId) {
        const response = await this.httpClient.get(`/api/v1/messages/feedback/message/${messageId}`);
        return response.data;
    }
    async getFeedbackByTenant() {
        const response = await this.httpClient.get('/api/v1/messages/feedback/tenant');
        return response.data;
    }
    async createFeedback(feedback) {
        const response = await this.httpClient.post('/api/v1/messages/feedback', feedback);
        return response.data;
    }
}
exports.MessageService = MessageService;
