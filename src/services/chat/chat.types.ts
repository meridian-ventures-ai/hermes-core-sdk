import { PaginatedResponse } from "../../shared/types";
import { Lead, LeadField } from "../lead/lead.types";

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
    phase: string;
    createdAt: string;
    updatedAt: string;
    lead: Lead | null;
}

export interface ChatWithProfileResponse {
    success: boolean;
    message: string;
    data: ChatWithProfileData;
}

export interface CreateChatRequest {
  id: string;
  sessionId: string;
  phase: string;
  summary?: string;
}












