export interface AnalyticsMetrics {
    date?: string;
    dailyActiveChats: number | { total: number; prospects: number; existingStudents: number };
    avgSessionDuration: number;
    avgQuestionsPerSession: number;
    responseLatency: number;
    responseAccuracy: number;
    fallbackRate: number;
    leadCaptureRate: number;
    userSatisfactionRate: number;
    peakInquiryTimes: string;
    totalConversations: number;
}
