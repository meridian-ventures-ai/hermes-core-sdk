"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
class ChatService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getChats(paginationParams) {
        const response = await this.httpClient.get('/api/v1/chats', { params: paginationParams });
        return response.data;
    }
    async getChat(chatId) {
        const response = await this.httpClient.get(`/api/v1/chats/${chatId}`);
        return response.data;
    }
    async getProfileByChatId(chatId) {
        const response = await this.httpClient.get(`/api/v1/chats/profile/${chatId}`);
        return response.data;
    }
    async createChat(chat) {
        const response = await this.httpClient.post('/api/v1/chats', chat);
        return response.data;
    }
}
exports.ChatService = ChatService;
