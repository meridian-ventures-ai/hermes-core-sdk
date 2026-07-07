import { AxiosInstance } from "axios";
import { LinkAnalyticsMetrics } from "./link-analytics.types";
export declare class LinkAnalyticsService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getMetrics(fromDate: string, toDate: string): Promise<LinkAnalyticsMetrics>;
    getDailyBreakdown(fromDate: string, toDate: string): Promise<LinkAnalyticsMetrics[]>;
}
