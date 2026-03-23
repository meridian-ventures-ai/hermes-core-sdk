export type EscalationStatus = "ESCALATED" | "CLAIMED" | "DEESCALATED";

export type ResolutionType =
    | "followed_up_successfully"
    | "kb_gap_identified"
    | "lead_unresponsive"
    | "no_action_needed";

export interface EscalationListItem {
    id: string;
    leadId: string | null;
    leadFirstName: string | null;
    leadLastName: string | null;
    chatId: string;
    source: string;
    causeForEscalation: string;
    status: EscalationStatus;
    urgency: number | null;
    claimedBy: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface EscalationDetail extends EscalationListItem {
    agentResponse: string | null;
    failureCategory: string | null;
    messageId: string | null;
    claimedAt: string | null;
    resolvedAt: string | null;
    resolutionType: ResolutionType | null;
    resolutionNotes: string | null;
    updatedAt: string;
}

export interface GetEscalationsParams {
    page?: number;
    limit?: number;
    status?: EscalationStatus;
}

export interface GetEscalationsResponse {
    items: EscalationListItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ClaimEscalationPayload {
    status: "CLAIMED";
    claimedBy: string;
}

export interface ResolveEscalationPayload {
    status: "DEESCALATED";
    resolutionType: ResolutionType;
    resolutionNotes?: string;
}
