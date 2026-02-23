import { AxiosInstance } from "axios";
import { CreateLeadFieldRequest, CreateLeadRequest, GetLeadsParams, GetLeadsResponse, Lead, LeadField } from "./lead.types";
import { GetLeadByIdResponse } from "../../shared/types";
export declare class LeadService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getLeads(params?: GetLeadsParams): Promise<GetLeadsResponse>;
    getLead(leadId: string): Promise<GetLeadByIdResponse>;
    getLeadFields(): Promise<LeadField[]>;
    deleteLead(leadId: string): Promise<void>;
    createLead(lead: CreateLeadRequest): Promise<Lead>;
    createLeadField(leadField: CreateLeadFieldRequest): Promise<LeadField>;
}
