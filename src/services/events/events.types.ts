// ── Payload shapes per event type ─────────────────────────────────────────────

export interface QualifyingAgentCalledPayload {
  fieldAsked: string;
  turnNumber: number;
  missingFieldsRemaining: number;
}

export interface ExtractionAgentPayload {
  sourceType: 'HERMES' | 'PHOENIX';
  sourceId: string;
  leadId: string;
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
  interactionType: 'HERMES' | 'PHOENIX' | null;
  interactionId: string | null;
  title: string;
  payload: Record<string, unknown>;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

// ── Request / response types ──────────────────────────────────────────────────

export interface CreateEventRequest {
  eventType: string;
  entityType?: string;
  entityId?: string;
  interactionType?: 'HERMES' | 'PHOENIX';
  interactionId?: string;
  title: string;
  payload: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface GetEventsByEntityParams {
  entityId: string;
}

export interface GetEventsByInteractionParams {
  interactionId: string;
}
