import { PaginatedResponse } from "../../shared/types";
import { Lead, LeadField } from "../lead/lead.types";

export interface Chat {
    id: string;
    tenant_id: string;
    session_id: string;
    last_message_at: string | null;
    summary: string | null;
    phase: string;
    created_at: string;
    updated_at: string;
    lead?: any | null;
}

export type ChatResponse = PaginatedResponse<Chat>;

export interface ChatWithProfileData {
    id: string;
    tenant_id: string;
    session_id: string;
    last_message_at: string | null;
    summary: string | null;
    phase: string;
    created_at: string;
    updated_at: string;
    lead: Lead | null;
}

export interface ChatWithProfileResponse {
    success: boolean;
    message: string;
    data: ChatWithProfileData;
}


export interface CreateChatRequest {
  id: string;
  session_id: string;
  phase: string;
  summary?: string;
}












