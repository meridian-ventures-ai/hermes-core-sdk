"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadService = void 0;
class LeadService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getLeads(params) {
        const response = await this.httpClient.get("/api/v1/leads", { params });
        return response.data;
    }
    async getLead(leadId) {
        const response = await this.httpClient.get(`/api/v1/leads/${leadId}`);
        return response.data;
    }
    async getLeadFields() {
        const response = await this.httpClient.get('/api/v1/leads/fields');
        return response.data;
    }
    async deleteLead(leadId) {
        await this.httpClient.delete(`/api/v1/leads/${leadId}`);
    }
    async createLead(lead) {
        const response = await this.httpClient.post('/api/v1/leads', lead);
        return response.data;
    }
    async createLeadField(leadField) {
        const response = await this.httpClient.post('/api/v1/leads/fields', leadField);
        return response.data;
    }
}
exports.LeadService = LeadService;
