export interface SummaryRecommendation {
    action?: string;
    title?: string;
    description?: string;
    priority?: string;
    category?: string;
    timeline?: string;
    evidence?: string[];
}

export interface SummaryResponse {
    success: boolean;
    summary: string;
    recommendations: SummaryRecommendation[];
    isCached?: boolean;
}
