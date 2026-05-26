"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppAnalyticsService = void 0;
const EMPTY_METRICS = {
    dailyActiveChats: 0,
    avgQuestionsPerChat: 0,
    responseLatency: 0,
    responseAccuracy: 0,
    fallbackRate: 0,
    leadCaptureRate: 0,
    peakInquiryTimes: "",
    totalConversations: 0,
};
class WhatsAppAnalyticsService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getMetrics(fromDate, toDate) {
        let url = "/api/v1/analytics/whatsapp/metrics";
        if (fromDate && toDate && fromDate !== toDate) {
            url = `/api/v1/analytics/whatsapp/metrics?from=${fromDate}&to=${toDate}`;
        }
        else if (fromDate) {
            url = `/api/v1/analytics/whatsapp/metrics?date=${fromDate}`;
        }
        const response = await this.httpClient.get(url);
        return response.data ?? EMPTY_METRICS;
    }
    async getDailyBreakdown(fromDate, toDate) {
        const url = `/api/v1/analytics/whatsapp/breakdown?from=${fromDate}&to=${toDate}`;
        const response = await this.httpClient.get(url);
        return response.data ?? [];
    }
    async calculateMetrics(date) {
        const url = date
            ? `/api/v1/analytics/whatsapp/calculate?date=${date}`
            : "/api/v1/analytics/whatsapp/calculate";
        const response = await this.httpClient.post(url, {});
        return response.data;
    }
}
exports.WhatsAppAnalyticsService = WhatsAppAnalyticsService;
