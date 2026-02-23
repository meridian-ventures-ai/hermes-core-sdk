export interface PaginatedResponse <T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message: string;
    success: boolean;
}

export interface SummaryRecommendation {
    action?: string;
    title?: string;
    description?: string;
    priority?: string;
    category?: string;
    timeline?: string;
    evidence?: string[];
}

export interface SummaryPayload {
    summary?: string;
    recommendations?: SummaryRecommendation[];
    isCached?: boolean;
}

export interface SummaryResponse {
    success: boolean;
    summary: string;
    recommendations: SummaryRecommendation[];
    isCached?: boolean;
}

export interface GetLeadByIdField {
    fieldId: string;
    fieldName: string;
    question: string;
    type: string;
    order: number;
    value: any;
}

export interface GetLeadByIdResponse {
    id: string;
    tenantId: string;
    chatId: string;
    leadId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: string;
    temperature: string;
    score: number;
    scoreBreakdown: Record<string, any>;
    profileCompleteness: number;
    createdFrom: string;
    metadata: {
        phase: string;
        source: string;
        [key: string]: any;
    };
    createdAt: string;
    updatedAt: string;
    fields: GetLeadByIdField[];
}
