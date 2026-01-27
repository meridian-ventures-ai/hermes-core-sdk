import { AxiosInstance } from "axios";
import { PaginationParams } from "../../shared/types";
import { CreateLeadFieldRequest, CreateLeadRequest, GetLeadsResponse, Lead, LeadField } from "./lead.types";

export class LeadService {
    constructor(private httpClient: AxiosInstance) {}

    async getLeads(paginationParams?: PaginationParams): Promise<GetLeadsResponse> {
        const response = await this.httpClient.get('/api/v1/leads', { params: paginationParams });
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

    async createLead(lead: CreateLeadRequest): Promise<Lead> {
        const response = await this.httpClient.post('/api/v1/leads', lead);
        return response.data;
    }

    async createLeadField(leadField: CreateLeadFieldRequest): Promise<LeadField> {
        const response = await this.httpClient.post('/api/v1/leads/fields', leadField);
        return response.data;
    }
}