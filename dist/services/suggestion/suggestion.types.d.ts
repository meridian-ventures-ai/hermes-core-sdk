export type SuggestionAction = "set_field" | "set_status";
export type SuggestionStatus = "pending" | "accepted" | "dismissed" | "superseded";
export interface SuggestionPayload {
    currentValue: unknown;
    suggestedValue: unknown;
    appliedValue?: unknown;
}
export interface SuggestionEvidence {
    reason: string;
    quote?: string | null;
    confidence: number;
    sourceType: string;
}
export interface Suggestion {
    id: string;
    tenantId: string;
    entityType: string;
    entityId: string;
    action: SuggestionAction;
    field: string | null;
    suggestedBy: string;
    sourceId: string | null;
    payload: SuggestionPayload;
    evidence: SuggestionEvidence;
    status: SuggestionStatus;
    decidedBy: string | null;
    decidedAt: string | null;
    decisionNote: string | null;
    createdAt: string;
    updatedAt: string;
}
export interface CreateSuggestionItem {
    action: SuggestionAction;
    field?: string;
    suggestedValue: unknown;
    reason: string;
    quote?: string;
    confidence: number;
}
export interface CreateSuggestionsRequest {
    entityId: string;
    suggestedBy: string;
    sourceType: string;
    sourceId: string;
    items: CreateSuggestionItem[];
}
export interface CreateSuggestionsResult {
    created: number;
    skipped: number;
}
export interface DecideSuggestionRequest {
    appliedValue?: unknown;
    note?: string;
}
export interface DecideAllResult {
    done: number;
    failed: {
        id: string;
        reason: string;
    }[];
}
export interface PendingSuggestionSummary {
    entityType: string;
    entityId: string;
    entityName: string | null;
    count: number;
    latestAt: string;
}
