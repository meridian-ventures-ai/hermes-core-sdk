"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatLinkAnalyticsService = void 0;
const EMPTY_METRICS = {
    chatsShown: 0,
    chatsClicked: 0,
    timesShown: 0,
    totalClicks: 0,
    ctr: null,
    byLabel: [],
};
class ChatLinkAnalyticsService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async getMetrics(fromDate, toDate) {
        const url = `/api/v1/analytics/chat-links/metrics?from=${fromDate}&to=${toDate}`;
        const response = await this.httpClient.get(url);
        return response.data ?? EMPTY_METRICS;
    }
    async getDailyBreakdown(fromDate, toDate) {
        const url = `/api/v1/analytics/chat-links/breakdown?from=${fromDate}&to=${toDate}`;
        const response = await this.httpClient.get(url);
        return response.data ?? [];
    }
}
exports.ChatLinkAnalyticsService = ChatLinkAnalyticsService;
