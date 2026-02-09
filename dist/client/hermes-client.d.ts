import { SDKConfig } from "../config/sdk-config";
import { LeadService } from "../services/lead/lead.service";
import { MessageService } from "../services/message/message.service";
import { ChatService } from "../services/chat/chat.service";
import { AnalyticsService } from "../services/analytics/analytics.service";
export declare class HermesSDKError extends Error {
    statusCode?: number | undefined;
    code?: string | undefined;
    details?: any | undefined;
    constructor(message: string, statusCode?: number | undefined, code?: string | undefined, details?: any | undefined);
}
export declare class HermesClient {
    private httpClient;
    private config;
    private _accessToken;
    private _operatingTenantId;
    chats: ChatService;
    leads: LeadService;
    messages: MessageService;
    analytics: AnalyticsService;
    constructor(config: SDKConfig);
    /**
     * Set the access token (JWT) for authentication.
     * This token will be used in the Authorization header for all requests.
     */
    setAccessToken(token: string | null): void;
    /**
     * Set the operating tenant ID.
     * This is used for SERVICE role tokens to specify which tenant to operate on.
     */
    setOperatingTenantId(tenantId: string | null): void;
    private setupInterceptors;
    private handleError;
}
