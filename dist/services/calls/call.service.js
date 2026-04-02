"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallService = void 0;
class CallService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getCallLogsByLeadId(leadId) {
        const response = await this.httpClient.get(`/api/v1/calls/leads/${leadId}/call-logs`);
        return response.data;
    }
    async getTranscriptsByCallLogId(callLogId) {
        const response = await this.httpClient.get(`/api/v1/calls/logs/call-log/${callLogId}/transcripts`);
        return response.data;
    }
    // Scheduled calls
    async createScheduledCall(data) {
        const response = await this.httpClient.post('/api/v1/calls/schedule', data);
        return response.data;
    }
    async getScheduledCalls(params) {
        const response = await this.httpClient.get('/api/v1/calls/scheduled', { params });
        return response.data;
    }
    async updateScheduledCall(id, data) {
        const response = await this.httpClient.patch(`/api/v1/calls/scheduled/${id}`, data);
        return response.data;
    }
}
exports.CallService = CallService;
