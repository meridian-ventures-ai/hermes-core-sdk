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

export interface Lead {
    id: string;
    tenantId: string;
    createdFrom?: "HERMES" | "PHOENIX" | "MANUAL" | "IMPORT" | "API";
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    potential: string;
    profileCompleteness: number;
    status: string;
    score: number;
    scoreBreakdown: Record<string, any> | null;
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

export interface GetLeadsResponse {
    items: Lead[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface CreateLeadRequest {
    chatId?: string | null;
    createdFrom?: string | null;
    temperature?: string | null;
    score?: number | null;
    scoreBreakdown?: any | null;
    metadata?: any | null;
    profileCompleteness?: number;
    status?: string;
    responses?: {
        fieldId: string;
        value: any;
        fieldName: string;
    }[];
}


export interface CreateLeadFieldRequest {
  fieldName: string;
  question: string;
  type: string;
  order: number;
  fieldDetails: Record<string, any>;
}
