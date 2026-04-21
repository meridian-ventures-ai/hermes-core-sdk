import { AxiosInstance } from "axios";
import { AssignLeadPayload, CreateLeadFieldRequest, CreateLeadRequest, DynamicFieldsPatch, GetLeadsParams, GetLeadsResponse, Lead, LeadField, LeadMapResponse, QualifyingField } from "./lead.types";
export declare class LeadService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getLeads(params?: GetLeadsParams): Promise<GetLeadsResponse>;
    getLead(leadId: string): Promise<Lead>;
    getLeadJourney(leadId: string): Promise<LeadMapResponse>;
    getLeadFields(): Promise<LeadField[]>;
    getQualifyingFields(): Promise<QualifyingField[]>;
    deleteLead(leadId: string): Promise<void>;
    createLead(lead: CreateLeadRequest): Promise<Lead>;
    /** Assign or unassign a lead. Pass { assignedTo: null } to unassign.
     *  @throws 400 if the target user does not exist in the tenant
     *  @throws 404 if the lead is not found */
    assignLead(leadId: string, payload: AssignLeadPayload): Promise<Lead>;
    createLeadField(leadField: CreateLeadFieldRequest): Promise<LeadField>;
    patchDynamicFields(leadId: string, patch: DynamicFieldsPatch): Promise<Lead>;
}
