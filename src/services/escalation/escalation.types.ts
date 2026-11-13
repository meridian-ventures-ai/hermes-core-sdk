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
    /** The lead's phone (`{ countryCode, phoneNumber }`), when the lead has one. */
    leadPhone?: { countryCode?: string; phoneNumber?: string } | null;
    /** Null for call escalations, which point at a call log instead. */
    chatId: string | null;
    /** Set for call escalations (e.g. MCF Portugal post-call tags). */
    callLogId?: string | null;
    source: string;
    causeForEscalation: string;
    /** For call escalations: "interest" | "issue" | "interest_issue". */
    failureCategory: string | null;
    status: EscalationStatus;
    urgency: number | null;
    claimedBy: number | null;
    createdAt: string;
    updatedAt: string;
}

export interface EscalationDetail extends EscalationListItem {
    agentResponse: string | null;
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
    claimedBy?: number;
    /** Comma-separated failure categories, e.g. "interest,interest_issue". */
    failureCategory?: string;
    /** "urgency" puts the most urgent first, oldest first within a level. Default: newest first. */
    sortBy?: "created_at" | "urgency";
}

/** Body for an MCF Portugal call tagged Interest and/or Issue. Service API key only. */
export interface CreateCallEscalationPayload {
    leadId: string;
    callLogId: string;
    interest: boolean;
    issue: { summary?: string | null; category?: string | null } | null;
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
    claimedBy: number;
}

export interface ResolveEscalationPayload {
    status: "DEESCALATED";
    resolutionType: ResolutionType;
    resolutionNotes?: string;
}
