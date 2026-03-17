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
}
exports.CallService = CallService;
