import { AxiosInstance } from "axios";
import { LinkAnalyticsMetrics } from "./link-analytics.types";

const EMPTY_METRICS: LinkAnalyticsMetrics = {
    emailsSent: 0,
    emailsOpened: 0,
    applicationClicks: 0,
    tourClicks: 0,
    openRate: null,
    applicationCtr: null,
    tourCtr: null,
};

export class LinkAnalyticsService {
    constructor(private httpClient: AxiosInstance) {}

    async getMetrics(fromDate: string, toDate: string): Promise<LinkAnalyticsMetrics> {
        const url = `/api/v1/analytics/link-analytics/metrics?from=${fromDate}&to=${toDate}`;
        const response = await this.httpClient.get<LinkAnalyticsMetrics | null>(url);
        return response.data ?? EMPTY_METRICS;
    }

    async getDailyBreakdown(fromDate: string, toDate: string): Promise<LinkAnalyticsMetrics[]> {
        const url = `/api/v1/analytics/link-analytics/breakdown?from=${fromDate}&to=${toDate}`;
        const response = await this.httpClient.get<LinkAnalyticsMetrics[]>(url);
        return response.data ?? [];
    }
}
