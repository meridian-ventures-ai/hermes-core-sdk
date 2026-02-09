import { AxiosInstance } from "axios";
import {
    CreateLeadFieldRequest,
    CreateLeadRequest,
    GetLeadsParams,
    GetLeadsResponse,
    Lead,
    LeadField,
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

    async getLeadFields(): Promise<LeadField[]> {
        const response = await this.httpClient.get('/api/v1/leads/fields');
        return response.data;
    }

    async deleteLead(leadId: string): Promise<void> {
        await this.httpClient.delete(`/api/v1/leads/${leadId}`);
    }

    async createLead(lead: CreateLeadRequest): Promise<Lead> {
        const response = await this.httpClient.post('/api/v1/leads', lead);
        return response.data;
    }

    async createLeadField(leadField: CreateLeadFieldRequest): Promise<LeadField> {
        const response = await this.httpClient.post('/api/v1/leads/fields', leadField);
        return response.data;
    }
}