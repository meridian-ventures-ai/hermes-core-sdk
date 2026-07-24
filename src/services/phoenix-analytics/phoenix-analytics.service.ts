import { AxiosInstance } from "axios";
import {
  PhoenixAnalyticsMetrics,
  PhoenixCallEffectiveness,
} from "./phoenix-analytics.types";

const EMPTY_METRICS: PhoenixAnalyticsMetrics = {
  totalCalls: 0,
  pickupRate: 0,
  responseAccuracy: 0,
  avgCallDurationSeconds: 0,
  responseLatencyMs: 0,
  firstCallEffectiveness: null,
  leadQualificationRate: null,
  completedInterviews: 0,
  incompleteInterviews: 0,
  approvedCandidates: 0,
  rejectedCandidates: 0,
  npsScore: 0,
  uniqueLeadsCalled: null,
  truePickupRate: null,
  meaningfulCallRate: null,
};

const EMPTY_CALL_EFFECTIVENESS: PhoenixCallEffectiveness = {
  uniqueLeadsCalled: 0,
  truePickupRate: null,
  meaningfulCallRate: null,
};

export class PhoenixAnalyticsService {
  constructor(private httpClient: AxiosInstance) {}

  async getMetrics(
    fromDate?: string,
    toDate?: string,
  ): Promise<PhoenixAnalyticsMetrics> {
    let url = "/api/v1/analytics/phoenix/metrics";
    if (fromDate && toDate && fromDate !== toDate) {
      url = `/api/v1/analytics/phoenix/metrics?from=${fromDate}&to=${toDate}`;
    } else if (fromDate) {
      url = `/api/v1/analytics/phoenix/metrics?date=${fromDate}`;
    }
    const response = await this.httpClient.get<PhoenixAnalyticsMetrics | null>(
      url,
    );
    return response.data ?? EMPTY_METRICS;
  }

  async getDailyBreakdown(
    fromDate: string,
    toDate: string,
  ): Promise<PhoenixAnalyticsMetrics[]> {
    const url = `/api/v1/analytics/phoenix/breakdown?from=${fromDate}&to=${toDate}`;
    const response = await this.httpClient.get<PhoenixAnalyticsMetrics[]>(url);
    return response.data ?? [];
  }

  async getCallEffectiveness(
    fromDate: string,
    toDate: string,
  ): Promise<PhoenixCallEffectiveness> {
    const url = `/api/v1/analytics/phoenix/call-effectiveness?from=${fromDate}&to=${toDate}`;
    const response = await this.httpClient.get<PhoenixCallEffectiveness | null>(
      url,
    );
    return response.data ?? EMPTY_CALL_EFFECTIVENESS;
  }

  async calculateMetrics(date?: string): Promise<PhoenixAnalyticsMetrics> {
    const url = date
      ? `/api/v1/analytics/phoenix/calculate?date=${date}`
      : "/api/v1/analytics/phoenix/calculate";
    const response = await this.httpClient.post<PhoenixAnalyticsMetrics>(
      url,
      {},
    );
    return response.data;
  }
}
