import { AxiosInstance } from "axios";
import { PhoenixAnalyticsMetrics, PhoenixReachSummary } from "./phoenix-analytics.types";
export declare class PhoenixAnalyticsService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getMetrics(fromDate?: string, toDate?: string): Promise<PhoenixAnalyticsMetrics>;
    getDailyBreakdown(fromDate: string, toDate: string): Promise<PhoenixAnalyticsMetrics[]>;
    getReachSummary(fromDate: string, toDate: string): Promise<PhoenixReachSummary>;
    calculateMetrics(date?: string): Promise<PhoenixAnalyticsMetrics>;
}
