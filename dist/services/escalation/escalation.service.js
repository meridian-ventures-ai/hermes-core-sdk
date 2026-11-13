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
    /**
     * Opens an escalation for a tagged call, or adds the call's tags to the
     * lead's open one. Resolves to null when nothing was written.
     */
    async createCallEscalation(payload) {
        const response = await this.httpClient.post(`/api/v1/escalations/calls`, payload);
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
