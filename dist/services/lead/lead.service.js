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
    async getLeadJourney(leadId) {
        const response = await this.httpClient.get(`/api/v1/leads/${leadId}/journey`);
        return response.data;
    }
    async getLeadFields() {
        const response = await this.httpClient.get('/api/v1/leads/fields');
        return response.data;
    }
    /**
     * Returns all lead fields with flowType === "QUALIFYING_QUESTION" for the
     * authenticated tenant. These are stored in the same lead_fields table as
     * form fields — this endpoint is a filtered read, not a separate resource.
     * TODO: Remove this endpoint in hermes-core, directly use getLeadFields and filter by flowType client-side.
     */
    async getQualifyingFields() {
        const response = await this.httpClient.get('/api/v1/leads/fields/qualifying');
        return response.data;
    }
    async deleteLead(leadId) {
        await this.httpClient.delete(`/api/v1/leads/${leadId}`);
    }
    async createLead(lead) {
        const response = await this.httpClient.post('/api/v1/leads', lead);
        return response.data;
    }
    /** Assign or unassign a lead. Pass { assignedTo: null } to unassign.
     *  @throws 400 if the target user does not exist in the tenant
     *  @throws 404 if the lead is not found */
    async assignLead(leadId, payload) {
        const response = await this.httpClient.patch(`/api/v1/leads/${leadId}/assign`, payload);
        return response.data;
    }
    async createLeadField(leadFields) {
        const response = await this.httpClient.post('/api/v1/leads/fields', leadFields);
        return response.data;
    }
    async updateLeadField(fieldId, payload) {
        const response = await this.httpClient.patch(`/api/v1/leads/fields/${fieldId}`, payload);
        return response.data;
    }
    async deleteLeadField(fieldId) {
        await this.httpClient.delete(`/api/v1/leads/fields/${fieldId}`);
    }
    async reorderLeadFields(orderedIds) {
        await this.httpClient.patch('/api/v1/leads/fields/reorder', { orderedIds });
    }
    async patchDynamicFields(leadId, patch) {
        const response = await this.httpClient.patch(`/api/v1/leads/${leadId}/dynamic-fields`, patch);
        return response.data;
    }
}
exports.LeadService = LeadService;
