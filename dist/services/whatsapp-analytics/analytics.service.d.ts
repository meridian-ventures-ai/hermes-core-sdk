import { AxiosInstance } from "axios";
import { WhatsAppAnalyticsMetrics } from "./analytics.types";
export declare class WhatsAppAnalyticsService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getMetrics(fromDate?: string, toDate?: string): Promise<WhatsAppAnalyticsMetrics>;
    getDailyBreakdown(fromDate: string, toDate: string): Promise<WhatsAppAnalyticsMetrics[]>;
    calculateMetrics(date?: string): Promise<WhatsAppAnalyticsMetrics>;
}
