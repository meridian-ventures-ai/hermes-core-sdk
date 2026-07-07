"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkAnalyticsService = void 0;
const EMPTY_METRICS = {
    emailsSent: 0,
    emailsOpened: 0,
    applicationClicks: 0,
    tourClicks: 0,
    openRate: null,
    applicationCtr: null,
    tourCtr: null,
};
class LinkAnalyticsService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getMetrics(fromDate, toDate) {
        const url = `/api/v1/analytics/link-analytics/metrics?from=${fromDate}&to=${toDate}`;
        const response = await this.httpClient.get(url);
        return response.data ?? EMPTY_METRICS;
    }
    async getDailyBreakdown(fromDate, toDate) {
        const url = `/api/v1/analytics/link-analytics/breakdown?from=${fromDate}&to=${toDate}`;
        const response = await this.httpClient.get(url);
        return response.data ?? [];
    }
}
exports.LinkAnalyticsService = LinkAnalyticsService;
