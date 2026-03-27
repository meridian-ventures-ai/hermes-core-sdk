import { AxiosInstance } from "axios";
import { PhoenixAnalyticsMetrics } from "./phoenix-analytics.types";
export declare class PhoenixAnalyticsService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getMetrics(fromDate?: string, toDate?: string): Promise<PhoenixAnalyticsMetrics>;
    getDailyBreakdown(fromDate: string, toDate: string): Promise<PhoenixAnalyticsMetrics[]>;
    calculateMetrics(date?: string): Promise<PhoenixAnalyticsMetrics>;
}
