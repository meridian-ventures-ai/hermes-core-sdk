export interface PreCallContext {
    call_goal?: string;
    readiness?: string;
    guardrails?: string[];
    key_signals?: string[];
    primary_intent?: string;
    objections_or_risks?: string[];
    conversation_summary?: string;
    [key: string]: any;
}

export interface CallLog {
    id: string;
    sessionId: string;
    tenantId: string;
    leadId: string;
    type: string;
    fromNumber: string;
    toNumber: string;
    twilioCallSid: string | null;
    status: string;
    errorMessage: string | null;
    errorCode: string | null;
    startedAt: string;
    answeredAt: string | null;
    endedAt: string | null;
    durationSeconds: number | null;
    preCallContext: PreCallContext | null;
    summary: string | null;
    scheduledByUserId: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CallTranscript {
    id: string;
    callLogId: string;
    role: string;
    content: string;
    timestamp: string;
    createdAt: string;
}
