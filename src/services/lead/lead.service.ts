import { AxiosInstance } from "axios";
import {
    AssignLeadPayload,
    CreateLeadFieldRequest,
    CreateLeadRequest,
    DynamicFieldsPatch,
    GetLeadsParams,
    GetLeadsResponse,
    Lead,
    LeadField,
    LeadMapResponse,
    QualifyingField,
    UpdateLeadFieldRequest,
} from "./lead.types";

export class LeadService {
    constructor(private httpClient: AxiosInstance) {}

    async getLeads(params?: GetLeadsParams): Promise<GetLeadsResponse> {
        const response = await this.httpClient.get("/api/v1/leads", { params });
        return response.data;
    }

    async getLead(leadId: string): Promise<Lead> {
        const response = await this.httpClient.get(`/api/v1/leads/${leadId}`);
        return response.data;
    }

    async getLeadJourney(leadId: string): Promise<LeadMapResponse> {
        const response = await this.httpClient.get(`/api/v1/leads/${leadId}/journey`);
        return response.data;
    }

    async getLeadFields(): Promise<LeadField[]> {
        const response = await this.httpClient.get('/api/v1/leads/fields');
        return response.data;
    }

    /**
     * Returns all lead fields with flowType === "QUALIFYING_QUESTION" for the
     * authenticated tenant. These are stored in the same lead_fields table as
     * form fields — this endpoint is a filtered read, not a separate resource.
     * TODO: Remove this endpoint in hermes-core, directly use getLeadFields and filter by flowType client-side.
     */
    async getQualifyingFields(): Promise<QualifyingField[]> {
        const response = await this.httpClient.get('/api/v1/leads/fields/qualifying');
        return response.data;
    }

    async deleteLead(leadId: string): Promise<void> {
        await this.httpClient.delete(`/api/v1/leads/${leadId}`);
    }

    async createLead(lead: CreateLeadRequest): Promise<Lead> {
        const response = await this.httpClient.post('/api/v1/leads', lead);
        return response.data;
    }

    /** Assign or unassign a lead. Pass { assignedTo: null } to unassign.
     *  @throws 400 if the target user does not exist in the tenant
     *  @throws 404 if the lead is not found */
    async assignLead(leadId: string, payload: AssignLeadPayload): Promise<Lead> {
        const response = await this.httpClient.patch(
            `/api/v1/leads/${leadId}/assign`,
            payload
        );
        return response.data;
    }

    async createLeadField(leadFields: CreateLeadFieldRequest[]): Promise<LeadField[]> {
        const response = await this.httpClient.post('/api/v1/leads/fields', leadFields);
        return response.data;
    }

    async updateLeadField(fieldId: string, payload: UpdateLeadFieldRequest): Promise<LeadField> {
        const response = await this.httpClient.patch(`/api/v1/leads/fields/${fieldId}`, payload);
        return response.data;
    }

    async deleteLeadField(fieldId: string): Promise<void> {
        await this.httpClient.delete(`/api/v1/leads/fields/${fieldId}`);
    }

    async reorderLeadFields(orderedIds: string[]): Promise<void> {
        await this.httpClient.patch('/api/v1/leads/fields/reorder', { orderedIds });
    }

    async patchDynamicFields(leadId: string, patch: DynamicFieldsPatch): Promise<Lead> {
        const response = await this.httpClient.patch(
            `/api/v1/leads/${leadId}/dynamic-fields`,
            patch
        );
        return response.data;
    }
}