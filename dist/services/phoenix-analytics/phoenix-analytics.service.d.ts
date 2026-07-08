import { AxiosInstance } from "axios";
import { PhoenixAnalyticsMetrics, PhoenixCallEffectiveness, PhoenixCallEffectivenessDay } from "./phoenix-analytics.types";
export declare class PhoenixAnalyticsService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getMetrics(fromDate?: string, toDate?: string): Promise<PhoenixAnalyticsMetrics>;
    getDailyBreakdown(fromDate: string, toDate: string): Promise<PhoenixAnalyticsMetrics[]>;
    getCallEffectiveness(fromDate: string, toDate: string): Promise<PhoenixCallEffectiveness>;
    getCallEffectivenessBreakdown(fromDate: string, toDate: string): Promise<PhoenixCallEffectivenessDay[]>;
    calculateMetrics(date?: string): Promise<PhoenixAnalyticsMetrics>;
}
