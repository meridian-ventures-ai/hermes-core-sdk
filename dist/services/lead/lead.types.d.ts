import { PaginatedResponse } from "../../shared/types";
export interface Lead {
    id: string;
    tenantId: string;
    chatId: string | null;
    leadPotential: string;
    profileCompleteness: number;
    status: string;
    leadScore: number;
    leadScoreBreakdown: Record<string, any> | null;
    metadata: any;
    createdAt: string;
    updatedAt: string;
    leadFieldValues?: LeadFieldValue[];
}
export interface LeadFieldValue {
    id: string;
    value: any;
    leadId: string;
    fieldId: string;
    createdAt: string;
    updatedAt: string;
    leadFields?: LeadField | null;
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
export type GetLeadsResponse = PaginatedResponse<Lead>;
export interface CreateLeadRequest {
    chatId: string | null;
    leadPotential: string;
    leadScore: number;
    leadScoreBreakdown: Record<string, any> | null;
    profileCompleteness: number;
    status: string;
    metadata: any;
    responses: {
        fieldId: string;
        value: any;
    }[];
}
export interface CreateLeadFieldRequest {
    fieldName: string;
    question: string;
    type: string;
    order: number;
    fieldDetails: Record<string, any>;
}
