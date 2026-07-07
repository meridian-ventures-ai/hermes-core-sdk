export interface LinkAnalyticsMetrics {
    date?: string;
    emailsSent: number;
    emailsOpened: number;
    applicationClicks: number;
    tourClicks: number;
    openRate: number | null;
    applicationCtr: number | null;
    tourCtr: number | null;
}
