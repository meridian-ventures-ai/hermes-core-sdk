"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const EMPTY_METRICS = {
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
class AnalyticsService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getMetrics(fromDate, toDate) {
        let url = "/api/v1/analytics/metrics";
        if (fromDate && toDate && fromDate !== toDate) {
            url = `/api/v1/analytics/metrics?from=${fromDate}&to=${toDate}`;
        }
        else if (fromDate) {
            url = `/api/v1/analytics/metrics?date=${fromDate}`;
        }
        const response = await this.httpClient.get(url);
        return response.data ?? EMPTY_METRICS;
    }
    async getDailyBreakdown(fromDate, toDate) {
        const url = `/api/v1/analytics/breakdown?from=${fromDate}&to=${toDate}`;
        const response = await this.httpClient.get(url);
        return response.data ?? [];
    }
    async calculateMetrics(date) {
        const url = date
            ? `/api/v1/analytics/calculate?date=${date}`
            : "/api/v1/analytics/calculate";
        const response = await this.httpClient.post(url, {});
        return response.data;
    }
}
exports.AnalyticsService = AnalyticsService;
