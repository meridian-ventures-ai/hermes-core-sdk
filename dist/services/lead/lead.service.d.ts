import { AxiosInstance } from "axios";
import { PaginationParams } from "../../shared/types";
import { CreateLeadFieldRequest, CreateLeadRequest, GetLeadsResponse, Lead, LeadField } from "./lead.types";
export declare class LeadService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getLeads(paginationParams?: PaginationParams): Promise<GetLeadsResponse>;
    getLead(leadId: string): Promise<Lead>;
    getLeadFields(): Promise<LeadField[]>;
    createLead(lead: CreateLeadRequest): Promise<Lead>;
    createLeadField(leadField: CreateLeadFieldRequest): Promise<LeadField>;
}
