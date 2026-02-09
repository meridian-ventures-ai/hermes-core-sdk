import { AxiosInstance } from "axios";
import { AnalyticsMetrics } from "./analytics.types";
export declare class AnalyticsService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getMetrics(fromDate?: string, toDate?: string): Promise<AnalyticsMetrics>;
    getDailyBreakdown(fromDate: string, toDate: string): Promise<AnalyticsMetrics[]>;
    calculateMetrics(date?: string): Promise<AnalyticsMetrics>;
}
