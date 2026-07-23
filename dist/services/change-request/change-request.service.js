"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeRequestService = void 0;
class ChangeRequestService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    // Agent side: submit a batch of proposed changes for one lead.
    async createChangeRequests(data) {
        const response = await this.httpClient.post('/api/v1/change-requests', data);
        return response.data;
    }
    // Leads with pending change requests. Feeds the dashboard notification bell.
    async getInbox() {
        const response = await this.httpClient.get('/api/v1/change-requests/inbox');
        const data = response.data;
        return Array.isArray(data) ? data : [];
    }
    async getPendingChangeRequests(entityId) {
        const response = await this.httpClient.get(`/api/v1/change-requests/entity/${entityId}`);
        const data = response.data;
        return Array.isArray(data) ? data : [];
    }
    async acceptChangeRequest(id, body = {}) {
        const response = await this.httpClient.post(`/api/v1/change-requests/${id}/accept`, body);
        return response.data;
    }
    async dismissChangeRequest(id, body = {}) {
        const response = await this.httpClient.post(`/api/v1/change-requests/${id}/dismiss`, body);
        return response.data;
    }
    async acceptAllChangeRequests(entityId) {
        const response = await this.httpClient.post(`/api/v1/change-requests/entity/${entityId}/accept-all`);
        return response.data;
    }
    async dismissAllChangeRequests(entityId) {
        const response = await this.httpClient.post(`/api/v1/change-requests/entity/${entityId}/dismiss-all`);
        return response.data;
    }
}
exports.ChangeRequestService = ChangeRequestService;
