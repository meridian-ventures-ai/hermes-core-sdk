import { AxiosInstance } from "axios";
import { AssignLeadPayload, CreateLeadFieldRequest, CreateLeadRequest, GetLeadsParams, GetLeadsResponse, Lead, LeadField, LeadMapResponse } from "./lead.types";
export declare class LeadService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getLeads(params?: GetLeadsParams): Promise<GetLeadsResponse>;
    getLead(leadId: string): Promise<Lead>;
    getLeadJourney(leadId: string): Promise<LeadMapResponse>;
    getLeadFields(): Promise<LeadField[]>;
    deleteLead(leadId: string): Promise<void>;
    createLead(lead: CreateLeadRequest): Promise<Lead>;
    assignLead(leadId: string, payload: AssignLeadPayload): Promise<Lead>;
    createLeadField(leadField: CreateLeadFieldRequest): Promise<LeadField>;
}
