export interface PhoenixAnalyticsMetrics {
    date?: string;
    totalCalls: number;
    pickupRate: number;
    responseAccuracy: number;
    avgCallDurationSeconds: number;
    responseLatencyMs: number;
    firstCallEffectiveness: number | null;
    leadQualificationRate: number | null;
    completedInterviews: number | null;
    incompleteInterviews: number | null;
    approvedCandidates: number | null;
    rejectedCandidates: number | null;
    npsScore: number;
}
export interface PhoenixCallEffectiveness {
    uniqueLeadsCalled: number;
    truePickupRate: number | null;
    meaningfulCallRate: number | null;
}
export interface PhoenixCallEffectivenessDay extends PhoenixCallEffectiveness {
    date: string;
}
