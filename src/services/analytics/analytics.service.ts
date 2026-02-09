import { AxiosInstance } from "axios";
import { AnalyticsMetrics } from "./analytics.types";

const EMPTY_METRICS: AnalyticsMetrics = {
    dailyActiveChats: 0,
    avgSessionDuration: 0,
    avgQuestionsPerSession: 0,
    responseLatency: 0,
    responseAccuracy: 0,
    fallbackRate: 0,
    leadCaptureRate: 0,
    userSatisfactionRate: 0,
    peakInquiryTimes: "",
    totalConversations: 0,
};

export class AnalyticsService {
    constructor(private httpClient: AxiosInstance) {}

    async getMetrics(fromDate?: string, toDate?: string): Promise<AnalyticsMetrics> {
        let url = "/api/v1/analytics/metrics";
        if (fromDate && toDate && fromDate !== toDate) {
            url = `/api/v1/analytics/metrics?from=${fromDate}&to=${toDate}`;
        } else if (fromDate) {
            url = `/api/v1/analytics/metrics?date=${fromDate}`;
        }
        const response = await this.httpClient.get<AnalyticsMetrics | null>(url);
        return response.data ?? EMPTY_METRICS;
    }

    async getDailyBreakdown(fromDate: string, toDate: string): Promise<AnalyticsMetrics[]> {
        const url = `/api/v1/analytics/breakdown?from=${fromDate}&to=${toDate}`;
        const response = await this.httpClient.get<AnalyticsMetrics[]>(url);
        return response.data ?? [];
    }

    async calculateMetrics(date?: string): Promise<AnalyticsMetrics> {
        const url = date
            ? `/api/v1/analytics/calculate?date=${date}`
            : "/api/v1/analytics/calculate";
        const response = await this.httpClient.post<AnalyticsMetrics>(url, {});
        return response.data;
    }
}
