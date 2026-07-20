export type ChangeRequestAction = "set_field" | "set_status";

export type ChangeRequestStatus = "pending" | "accepted" | "dismissed" | "superseded";

export interface ChangeRequestPayload {
  currentValue: unknown;
  suggestedValue: unknown;
  // Set on accept; differs from suggestedValue when the advisor edited it.
  appliedValue?: unknown;
}

export interface ChangeRequestEvidence {
  reason: string;
  quote?: string | null;
  confidence: number;
  sourceType: string;
}

export interface ChangeRequest {
  id: string;
  tenantId: string;
  entityType: string;
  entityId: string;
  action: ChangeRequestAction;
  field: string | null;
  requestedBy: string;
  sourceId: string | null;
  payload: ChangeRequestPayload;
  evidence: ChangeRequestEvidence;
  status: ChangeRequestStatus;
  decidedBy: string | null;
  decidedAt: string | null;
  decisionNote: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChangeRequestItem {
  action: ChangeRequestAction;
  field?: string;
  suggestedValue: unknown;
  reason: string;
  quote?: string;
  confidence: number;
}

export interface CreateChangeRequestsRequest {
  entityId: string;
  requestedBy: string;
  sourceType: string;
  sourceId: string;
  items: CreateChangeRequestItem[];
}

export interface CreateChangeRequestsResult {
  created: number;
  skipped: number;
}

export interface DecideChangeRequestRequest {
  // Accept only: the advisor's edited value, when it differs from the request.
  appliedValue?: unknown;
  note?: string;
}

export interface DecideAllResult {
  done: number;
  failed: { id: string; reason: string }[];
}

export interface ChangeRequestInboxItem {
  entityType: string;
  entityId: string;
  entityName: string | null;
  count: number;
  latestAt: string;
}
