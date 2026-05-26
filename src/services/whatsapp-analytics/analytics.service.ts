import { AxiosInstance } from "axios";
import { WhatsAppAnalyticsMetrics } from "./analytics.types";

const EMPTY_METRICS: WhatsAppAnalyticsMetrics = {
    dailyActiveChats: 0,
    avgQuestionsPerChat: 0,
    responseLatency: 0,
    responseAccuracy: 0,
    fallbackRate: 0,
    leadCaptureRate: 0,
    peakInquiryTimes: "",
    totalConversations: 0,
};

export class WhatsAppAnalyticsService {
    constructor(private httpClient: AxiosInstance) {}

    async getMetrics(fromDate?: string, toDate?: string): Promise<WhatsAppAnalyticsMetrics> {
        let url = "/api/v1/analytics/whatsapp/metrics";
        if (fromDate && toDate && fromDate !== toDate) {
            url = `/api/v1/analytics/whatsapp/metrics?from=${fromDate}&to=${toDate}`;
        } else if (fromDate) {
            url = `/api/v1/analytics/whatsapp/metrics?date=${fromDate}`;
        }
        const response = await this.httpClient.get<WhatsAppAnalyticsMetrics | null>(url);
        return response.data ?? EMPTY_METRICS;
    }

    async getDailyBreakdown(fromDate: string, toDate: string): Promise<WhatsAppAnalyticsMetrics[]> {
        const url = `/api/v1/analytics/whatsapp/breakdown?from=${fromDate}&to=${toDate}`;
        const response = await this.httpClient.get<WhatsAppAnalyticsMetrics[]>(url);
        return response.data ?? [];
    }

    async calculateMetrics(date?: string): Promise<WhatsAppAnalyticsMetrics> {
        const url = date
            ? `/api/v1/analytics/whatsapp/calculate?date=${date}`
            : "/api/v1/analytics/whatsapp/calculate";
        const response = await this.httpClient.post<WhatsAppAnalyticsMetrics>(url, {});
        return response.data;
    }
}
