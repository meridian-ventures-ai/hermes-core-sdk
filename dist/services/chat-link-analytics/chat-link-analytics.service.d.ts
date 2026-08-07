import { AxiosInstance } from "axios";
import { ChatLinkDailyMetrics, ChatLinkMetrics } from "./chat-link-analytics.types";
export declare class ChatLinkAnalyticsService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getMetrics(fromDate: string, toDate: string): Promise<ChatLinkMetrics>;
    getDailyBreakdown(fromDate: string, toDate: string): Promise<ChatLinkDailyMetrics[]>;
}
