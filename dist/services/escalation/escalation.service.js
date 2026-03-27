"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscalationService = void 0;
class EscalationService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getEscalations(params) {
        const response = await this.httpClient.get("/api/v1/escalations", { params });
        return response.data;
    }
    async getEscalation(escalationId) {
        const response = await this.httpClient.get(`/api/v1/escalations/${escalationId}`);
        return response.data;
    }
    async claimEscalation(escalationId) {
        const response = await this.httpClient.post(`/api/v1/escalations/${escalationId}/claim`);
        return response.data;
    }
    async resolveEscalation(escalationId, payload) {
        const response = await this.httpClient.patch(`/api/v1/escalations/${escalationId}`, payload);
        return response.data;
    }
}
exports.EscalationService = EscalationService;
