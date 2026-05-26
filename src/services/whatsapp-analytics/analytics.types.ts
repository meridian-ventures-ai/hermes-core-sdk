export interface WhatsAppAnalyticsMetrics {
    date?: string;
    dailyActiveChats: number | { total: number; };
    avgQuestionsPerChat: number;
    responseLatency: number;
    responseAccuracy: number;
    fallbackRate: number;
    leadCaptureRate: number;
    peakInquiryTimes: string;
    totalConversations: number;
}
