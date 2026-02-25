import { PaginatedResponse } from "../../shared/types";
import { Lead } from "../lead/lead.types";
export interface Chat {
    id: string;
    tenantId: string;
    source: string;
    createdAt: string;
    updatedAt: string;
    leadId?: string | null;
}
export type ChatResponse = PaginatedResponse<Chat>;
export interface ChatWithProfileData {
    id: string;
    tenantId: string;
    source?: string;
    leadId?: string;
    createdAt: string;
    updatedAt: string;
    lead: Lead | null;
}
export interface CreateChatRequest {
    id: string;
    sessionId?: string;
    phase?: string;
    summary?: string;
    leadId?: string;
    source?: string;
}
export interface GetChatsParams {
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
}
