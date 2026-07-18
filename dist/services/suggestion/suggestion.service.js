"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestionService = void 0;
class SuggestionService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    /** Agent-side: submit a batch of proposed changes for a lead. */
    async createSuggestions(data) {
        const response = await this.httpClient.post("/api/v1/suggestions", data);
        return response.data;
    }
    /** Entities that have pending suggestions — feeds the dashboard notification bell. */
    async getInbox() {
        const response = await this.httpClient.get("/api/v1/suggestions/inbox");
        const data = response.data;
        return Array.isArray(data) ? data : [];
    }
    async getPendingSuggestions(entityId) {
        const response = await this.httpClient.get(`/api/v1/suggestions/entity/${entityId}`);
        const data = response.data;
        return Array.isArray(data) ? data : [];
    }
    async acceptSuggestion(id, body = {}) {
        const response = await this.httpClient.post(`/api/v1/suggestions/${id}/accept`, body);
        return response.data;
    }
    async dismissSuggestion(id, body = {}) {
        const response = await this.httpClient.post(`/api/v1/suggestions/${id}/dismiss`, body);
        return response.data;
    }
    async acceptAllSuggestions(entityId) {
        const response = await this.httpClient.post(`/api/v1/suggestions/entity/${entityId}/accept-all`);
        return response.data;
    }
    async dismissAllSuggestions(entityId) {
        const response = await this.httpClient.post(`/api/v1/suggestions/entity/${entityId}/dismiss-all`);
        return response.data;
    }
}
exports.SuggestionService = SuggestionService;
