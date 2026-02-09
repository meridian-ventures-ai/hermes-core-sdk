import { AxiosInstance } from "axios";
import {
    CreateLeadFieldRequest,
    CreateLeadRequest,
    GetLeadsParams,
    GetLeadsResponse,
    Lead,
    LeadField,
} from "./lead.types";

function buildGetLeadsParams(params?: GetLeadsParams): Record<string, string | number | undefined> {
    if (!params) return {};
    const limit = params.limit ?? 10;
    const page = params.page ?? (params.offset != null ? Math.floor(params.offset / limit) + 1 : 1);
    const out: Record<string, string | number | undefined> = {
        page,
        limit,
        ...(params.status != null && { status: params.status }),
        ...(params.startDate != null && { startDate: params.startDate }),
        ...(params.endDate != null && { endDate: params.endDate }),
        ...(params.leadPotential != null && { leadPotential: params.leadPotential }),
    };
    return out;
}

export class LeadService {
    constructor(private httpClient: AxiosInstance) {}

    async getLeads(params?: GetLeadsParams): Promise<GetLeadsResponse> {
        const query = buildGetLeadsParams(params);
        const response = await this.httpClient.get("/api/v1/leads", { params: query });
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