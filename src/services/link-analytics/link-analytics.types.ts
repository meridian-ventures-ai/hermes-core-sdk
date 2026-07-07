// Used for both the period total (no date) and each day of the breakdown (with date).
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
