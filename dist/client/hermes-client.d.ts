import { SDKConfig } from "../config/sdk-config";
import { LeadService } from "../services/lead/lead.service";
import { MessageService } from "../services/message/message.service";
import { ChatService } from "../services/chat/chat.service";
import { AnalyticsService } from "../services/analytics/analytics.service";
import { SummaryService } from "../services/summary/summary.service";
export declare class HermesSDKError extends Error {
    statusCode?: number | undefined;
    code?: string | undefined;
    details?: any | undefined;
    constructor(message: string, statusCode?: number | undefined, code?: string | undefined, details?: any | undefined);
}
export declare class HermesClient {
    private httpClient;
    private config;
    chats: ChatService;
    leads: LeadService;
    messages: MessageService;
    analytics: AnalyticsService;
    summary: SummaryService;
    constructor(config: SDKConfig);
    private setupInterceptors;
    private handleError;
}
