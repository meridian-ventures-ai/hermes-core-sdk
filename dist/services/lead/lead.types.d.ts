import { CallLog } from "../calls/call.types";
export interface LeadMapChatItem {
    id: string;
    tenantId: string;
    source: string;
    createdAt: string;
    updatedAt: string;
}
export interface LeadMapResponse {
    chats: LeadMapChatItem[];
    callLogs: CallLog[];
}
export interface GetLeadsParams {
    limit?: number;
    offset?: number;
    page?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
    leadPotential?: string;
    showCompletedProfile?: boolean;
    courseType?: string;
    sortBy?: string;
    sortDirn?: "asc" | "desc";
}
/**
 * Stats attached to a dynamicField written by the extraction agent.
 * Not present on form-filled fields.
 */
export interface DynamicFieldStats {
    confidence: "HIGH" | "MEDIUM" | "LOW";
    version: number;
    eventId?: string;
}
export interface DynamicField {
    value: any;
    question?: string;
    source?: "FORM" | "EXTRACTION_AGENT";
    stats?: DynamicFieldStats;
}
interface Phone {
    countryCode: string;
    phoneNumber: string;
}
export interface Lead {
    id: string;
    tenantId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: Phone | string | null;
    createdFrom?: "HERMES" | "PHOENIX" | "MANUAL" | "IMPORT" | "API";
    leadPotential: string;
    profileCompleteness: number;
    status: string;
    leadScore: number;
    leadScoreBreakdown: Record<string, any> | null;
    dynamicFields: Record<string, DynamicField> | null;
    metadata: any;
    assignedTo: number | null;
    assignedAt: string | null;
    createdAt: string;
    updatedAt: string;
}
export interface LeadField {
    id: string;
    type: string;
    order: number;
    question: string;
    tenantId: string;
    flowType: string;
    createdAt: string;
    fieldName: string;
    updatedAt: string;
    fieldDetails: any;
}
/**
 * Qualifying fields are stored in the same lead_fields table as form fields.
 * The only distinction is flowType === "QUALIFYING_QUESTION".
 * fieldName is the permanent data key used by the qualifying and extraction
 * agents — it cannot be changed after creation.
 */
export type QualifyingField = LeadField;
export interface GetLeadsResponse {
    items: Lead[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
export interface CreateLeadRequest {
    chatId: string | null;
    leadPotential: string;
    createdFrom: "HERMES" | "PHOENIX" | "MANUAL" | "IMPORT" | "API";
    leadScore: number;
    leadScoreBreakdown: Record<string, any> | null;
    profileCompleteness: number;
    status: string;
    metadata: any;
    responses: {
        fieldId: string;
        fieldName: string;
        value: any;
    }[];
}
export interface AssignLeadPayload {
    assignedTo: number | null;
}
export interface CreateLeadFieldRequest {
    fieldName: string;
    question: string;
    type: string;
    order: number;
    fieldDetails: Record<string, any>;
    /** Defaults to "AGENTIC_CHAT_FORM_QUESTION" server-side if omitted. */
    flowType?: string;
}
export interface UpdateLeadFieldRequest {
    fieldName?: string;
    question?: string;
    type?: string;
    order?: number;
    fieldDetails?: Record<string, any>;
}
export {};
