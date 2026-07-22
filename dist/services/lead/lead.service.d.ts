import { AxiosInstance } from "axios";
import { AssignLeadPayload, CreateLeadFieldRequest, CreateLeadRequest, DynamicField, GetLeadsParams, GetLeadsResponse, Lead, LeadField, LeadMapResponse, QualifyingField, UpdateLeadFieldRequest, UpdateLeadRequest, UpdateReviewerFeedbackPayload } from "./lead.types";
export declare class LeadService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getLeads(params?: GetLeadsParams): Promise<GetLeadsResponse>;
    /** Distinct values present for a column, for the CRM filter dropdowns. */
    getLeadFieldValues(field: string): Promise<string[]>;
    getLead(leadId: string): Promise<Lead>;
    getLeadJourney(leadId: string): Promise<LeadMapResponse>;
    getLeadFields(): Promise<LeadField[]>;
    /**
     * Returns all lead fields with flowType === "QUALIFYING_QUESTION" for the
     * authenticated tenant. These are stored in the same lead_fields table as
     * form fields — this endpoint is a filtered read, not a separate resource.
     * TODO: Remove this endpoint in hermes-core, directly use getLeadFields and filter by flowType client-side.
     */
    getQualifyingFields(): Promise<QualifyingField[]>;
    deleteLead(leadId: string): Promise<void>;
    createLead(lead: CreateLeadRequest): Promise<Lead>;
    /** Assign or unassign a lead. Pass { assignedTo: null } to unassign.
     *  @throws 400 if the target user does not exist in the tenant
     *  @throws 404 if the lead is not found */
    assignLead(leadId: string, payload: AssignLeadPayload): Promise<Lead>;
    createLeadField(leadFields: CreateLeadFieldRequest[]): Promise<LeadField[]>;
    updateLeadField(fieldId: string, payload: UpdateLeadFieldRequest): Promise<LeadField>;
    deleteLeadField(fieldId: string): Promise<void>;
    reorderLeadFields(orderedIds: string[]): Promise<void>;
    patchDynamicFields(leadId: string, patch: Record<string, DynamicField>): Promise<Lead>;
    updateLead(leadId: string, payload: UpdateLeadRequest): Promise<Lead>;
    /** Merges into `lead.metadata.reviewer_feedback` without touching other metadata keys. Pass empty/whitespace to clear. */
    updateReviewerFeedback(leadId: string, payload: UpdateReviewerFeedbackPayload): Promise<Lead>;
}
