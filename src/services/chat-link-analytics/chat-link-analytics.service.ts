import { AxiosInstance } from "axios";
import { ChatLinkDailyMetrics, ChatLinkMetrics } from "./chat-link-analytics.types";

const EMPTY_METRICS: ChatLinkMetrics = {
    chatsShown: 0,
    chatsClicked: 0,
    timesShown: 0,
    totalClicks: 0,
    ctr: null,
    byLabel: [],
};

export class ChatLinkAnalyticsService {
    constructor(private httpClient: AxiosInstance) {}

    async getMetrics(fromDate: string, toDate: string): Promise<ChatLinkMetrics> {
        const url = `/api/v1/analytics/chat-links/metrics?from=${fromDate}&to=${toDate}`;
        const response = await this.httpClient.get<ChatLinkMetrics | null>(url);
        return response.data ?? EMPTY_METRICS;
    }

    async getDailyBreakdown(fromDate: string, toDate: string): Promise<ChatLinkDailyMetrics[]> {
        const url = `/api/v1/analytics/chat-links/breakdown?from=${fromDate}&to=${toDate}`;
        const response = await this.httpClient.get<ChatLinkDailyMetrics[]>(url);
        return response.data ?? [];
    }
}
