"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryService = void 0;
class MemoryService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getWorkingMemory(leadId) {
        const response = await this.httpClient.get(`/api/v1/leads/${leadId}/memory`);
        return response.data;
    }
    async getByChatId(chatId) {
        const response = await this.httpClient.get(`/api/v1/chats/${chatId}/memory`);
        return response.data;
    }
    async upsertEpisode(leadId, body) {
        const response = await this.httpClient.put(`/api/v1/leads/${leadId}/memory/episodes`, body);
        return response.data;
    }
}
exports.MemoryService = MemoryService;
