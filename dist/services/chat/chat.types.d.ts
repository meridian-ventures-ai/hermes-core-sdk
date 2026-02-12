import { PaginatedResponse } from "../../shared/types";
import { Lead } from "../lead/lead.types";
export interface Chat {
    id: string;
    tenantId: string;
    sessionId: string;
    lastMessageAt: string | null;
    summary: string | null;
    phase: string;
    createdAt: string;
    updatedAt: string;
    lead?: any | null;
}
export type ChatResponse = PaginatedResponse<Chat>;
export interface ChatWithProfileData {
    id: string;
    tenantId: string;
    sessionId: string;
    lastMessageAt: string | null;
    summary: string | null;
    source?: string;
    leadId?: string;
    phase: string;
    createdAt: string;
    updatedAt: string;
    lead: Lead | null;
}
export interface CreateChatRequest {
    id: string;
    sessionId: string;
    phase: string;
    summary?: string;
    leadId?: string;
    source?: string;
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
export interface SummaryResponse {
    success: boolean;
    summary: string;
    recommendations: SummaryRecommendation[];
    isCached?: boolean;
}
