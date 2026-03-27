"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoenixAnalyticsService = void 0;
const EMPTY_METRICS = {
    totalCalls: 0,
    pickupRate: 0,
    responseAccuracy: 0,
    avgCallDurationSeconds: 0,
    responseLatencyMs: 0
};
class PhoenixAnalyticsService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getMetrics(fromDate, toDate) {
        let url = "/api/v1/analytics/phoenix/metrics";
        if (fromDate && toDate && fromDate !== toDate) {
            url = `/api/v1/analytics/phoenix/metrics?from=${fromDate}&to=${toDate}`;
        }
        else if (fromDate) {
            url = `/api/v1/analytics/phoenix/metrics?date=${fromDate}`;
        }
        const response = await this.httpClient.get(url);
        return response.data ?? EMPTY_METRICS;
    }
    async getDailyBreakdown(fromDate, toDate) {
        const url = `/api/v1/analytics/phoenix/breakdown?from=${fromDate}&to=${toDate}`;
        const response = await this.httpClient.get(url);
        return response.data ?? [];
    }
    async calculateMetrics(date) {
        const url = date
            ? `/api/v1/analytics/phoenix/calculate?date=${date}`
            : "/api/v1/analytics/phoenix/calculate";
        const response = await this.httpClient.post(url, {});
        return response.data;
    }
}
exports.PhoenixAnalyticsService = PhoenixAnalyticsService;
