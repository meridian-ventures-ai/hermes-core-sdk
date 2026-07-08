import { AxiosInstance } from "axios";
import { PhoenixAnalyticsMetrics, PhoenixCallEffectiveness } from "./phoenix-analytics.types";
export declare class PhoenixAnalyticsService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getMetrics(fromDate?: string, toDate?: string): Promise<PhoenixAnalyticsMetrics>;
    getDailyBreakdown(fromDate: string, toDate: string): Promise<PhoenixAnalyticsMetrics[]>;
    getCallEffectiveness(fromDate: string, toDate: string): Promise<PhoenixCallEffectiveness>;
    calculateMetrics(date?: string): Promise<PhoenixAnalyticsMetrics>;
}
