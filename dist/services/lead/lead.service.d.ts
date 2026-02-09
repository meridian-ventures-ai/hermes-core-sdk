import { AxiosInstance } from "axios";
import { CreateLeadFieldRequest, CreateLeadRequest, GetLeadsParams, GetLeadsResponse, Lead, LeadField } from "./lead.types";
export declare class LeadService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getLeads(params?: GetLeadsParams): Promise<GetLeadsResponse>;
    getLead(leadId: string): Promise<Lead>;
    getLeadFields(): Promise<LeadField[]>;
    deleteLead(leadId: string): Promise<void>;
    createLead(lead: CreateLeadRequest): Promise<Lead>;
    createLeadField(leadField: CreateLeadFieldRequest): Promise<LeadField>;
}
