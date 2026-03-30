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
interface DynamicField {
    value: any;
    question?: string;
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
    createdAt: string;
    fieldName: string;
    updatedAt: string;
    fieldDetails: any;
}
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
}
export {};
