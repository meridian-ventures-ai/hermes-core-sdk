import { PaginatedResponse } from "../../shared/types";
export interface Chat {
    id: string;
    source: string;
    tenantId: string;
    createdAt: string;
    updatedAt: string;
    leadId?: string | null;
}
export type ChatResponse = PaginatedResponse<Chat>;
export interface CreateChatRequest {
    id: string;
    leadId?: string;
    source?: string;
}
export interface GetChatsParams {
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
}
