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
  // SAE outreach metrics, per day, alongside the metrics above.
  uniqueLeadsCalled: number | null;
  truePickupRate: number | null;
  meaningfulCallRate: number | null;
}

// Period totals for the outreach cards. Unique leads and pick-up are distinct per lead
// over the range, so they come from a dedicated endpoint, not summed daily rows.
export interface PhoenixCallEffectiveness {
  uniqueLeadsCalled: number;
  truePickupRate: number | null;
  meaningfulCallRate: number | null;
}
