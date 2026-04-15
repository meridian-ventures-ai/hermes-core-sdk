// ── Payload shapes per event type ─────────────────────────────────────────────

export interface QualifyingAgentCalledPayload {
  fieldAsked: string;
  turnNumber: number;
  missingFieldsRemaining: number;
}

/** payload = the trigger request (what was sent to the agent) */
export interface ExtractionAgentRequestPayload {
  leadId: string;
  sourceType: 'HERMES' | 'PHOENIX';
  sourceId: string;
}

/** response = the agent output (what was extracted) */
export interface ExtractionAgentResponse {
  extractedFields: Record<
    string,
    | { status: 'missed' }
    | {
        status: 'captured' | 'low_confidence';
        value: string;
        confidence: 'HIGH' | 'MEDIUM' | 'LOW';
        rawText?: string;
      }
  >;
  summary: {
    adminSummary: string;
    keyInsights: string[];
    recommendedActions: string[];
    engagementLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  };
  stats: {
    totalFields: number;
    openFields: number;
    captured: number;
    lowConfidence: number;
    missed: number;
  };
}

export interface FormFilledPayload {
  formFields: Record<string, { value: unknown; question: string }>;
}

export interface CallScheduledPayload {
  scheduledAt: string;
  scheduledBy: 'USER' | 'SYSTEM';
  phoneNumber: string;
}

// ── Event entity ──────────────────────────────────────────────────────────────

export interface Event {
  id: string;
  tenantId: string;
  eventType: string;
  entityType: string;
  entityId: string | null;
  title: string;
  payload: Record<string, unknown>;
  response: Record<string, unknown> | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

// ── Request / response types ──────────────────────────────────────────────────

export interface CreateEventRequest {
  eventType: string;
  entityType?: string;
  entityId?: string;
  title: string;
  payload: Record<string, unknown>;
  response?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface GetEventsByEntityParams {
  entityId: string;
}

export interface GetEventsByInteractionParams {
  interactionId: string;
}
