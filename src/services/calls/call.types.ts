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
    scheduledByUserId: number | null;
    createdAt: string;
    updatedAt: string;
}

export interface CallTranscript {
    id: string;
    callLogId: string;
    turnIndex: number;
    role: string;
    content: string;
    timestamp: string;
    createdAt: string;
}

// Scheduled calls

export type ScheduledCallStatus = 'PENDING' | 'QUEUED' | 'COMPLETED' | 'CANCELLED' | 'FAILED' | 'NO_ANSWER' | 'BUSY';
export type ScheduledBy = 'USER' | 'SYSTEM';

export interface ScheduledCall {
    id: string;
    tenantId: string;
    leadId: string;
    leadFirstName: string | null;
    leadLastName: string | null;
    phoneNumber: string;
    scheduledAt: string;
    scheduledBy: ScheduledBy;
    scheduledByUserId: number | null;
    status: ScheduledCallStatus;
    callLogId: string | null;
    reason: string | null;
    errorMessage: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateScheduledCallRequest {
    leadId: string;
    phoneNumber: string;
    scheduledAt: string;
    scheduledBy: ScheduledBy;
    scheduledByUserId?: number;
    reason?: string;
}

export interface UpdateScheduledCallRequest {
    scheduledAt?: string;
    status?: 'CANCELLED' | 'FAILED' | 'NO_ANSWER' | 'BUSY';
    reason?: string;
    errorMessage?: string;
}

export interface GetScheduledCallsParams {
    status?: ScheduledCallStatus;
    leadId?: string;
    leadIds?: string[];
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
}
