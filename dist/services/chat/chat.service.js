"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
function toSummaryResponse(payload) {
    const recs = payload.recommendations ?? [];
    return {
        success: true,
        summary: payload.summary ?? "",
        recommendations: recs.map((r) => ({
            action: r.action ?? r.title ?? r.description ?? "",
            title: r.title,
            description: r.description,
            priority: r.priority,
            category: r.category,
            timeline: r.timeline,
            evidence: r.evidence ?? [],
        })),
        isCached: payload.isCached ?? false,
    };
}
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
    async getSummary(chatId) {
        const response = await this.httpClient.get(`/api/v1/chats/${chatId}/summary`, { timeout: 60000 });
        return toSummaryResponse(response.data);
    }
    async createChat(chat) {
        const response = await this.httpClient.post('/api/v1/chats', chat);
        return response.data;
    }
}
exports.ChatService = ChatService;
