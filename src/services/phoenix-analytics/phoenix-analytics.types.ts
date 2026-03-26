export interface PhoenixAnalyticsMetrics {
    date?: string;
    totalCalls: number;
    pickupRate: number;
    responseAccuracy: number;
    avgCallDurationSeconds: number;
    responseLatencyMs: number;
}