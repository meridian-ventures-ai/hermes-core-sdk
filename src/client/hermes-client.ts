import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { SDKConfig } from "../config/sdk-config";
import { LeadService } from "../services/lead/lead.service";
import { MessageService } from "../services/message/message.service";
import { ChatService } from "../services/chat/chat.service";
import { AnalyticsService } from "../services/analytics/analytics.service";

export class HermesSDKError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public code?: string,
        public details?: any
    ) {
        super(message);
        this.name = 'HermesSDKError';
    }
}

export class HermesClient {
    private httpClient: AxiosInstance;
    private config: SDKConfig;
    private _accessToken: string | null = null;
    private _operatingTenantId: string | null = null;
    public chats: ChatService;
    public leads: LeadService;
    public messages: MessageService;
    public analytics: AnalyticsService;

    constructor(config: SDKConfig) {
        this.config = config;
        
        // Initialize internal state from config
        this._accessToken = config.jwtToken || null;
        this._operatingTenantId = config.operatingTenantId || null;
        
        this.httpClient = axios.create({
            baseURL: config.baseUrl,
            timeout: config.timeout || 30000,
            headers: {
                'Content-Type': 'application/json',
                ...(config.tenantId && { 'X-Tenant-ID': config.tenantId }),
                ...(config.apiKey && { 'X-API-Key': config.apiKey }),
            },
        });

        this.setupInterceptors();

        this.chats = new ChatService(this.httpClient);
        this.leads = new LeadService(this.httpClient);
        this.messages = new MessageService(this.httpClient);
        this.analytics = new AnalyticsService(this.httpClient);
    }

    /**
     * Set the access token (JWT) for authentication.
     * This token will be used in the Authorization header for all requests.
     */
    setAccessToken(token: string | null): void {
        this._accessToken = token;
    }

    /**
     * Set the operating tenant ID.
     * This is used for SERVICE role tokens to specify which tenant to operate on.
     */
    setOperatingTenantId(tenantId: string | null): void {
        this._operatingTenantId = tenantId;
    }

    private setupInterceptors() {
        this.httpClient.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
                // Use internal state for Authorization header
                if (config.headers) {
                    if (this._accessToken) {
                        config.headers.Authorization = `Bearer ${this._accessToken}`;
                    } else {
                        delete config.headers.Authorization;
                    }
                }

                // Use internal state for X-Operating-Tenant-Id header
                if (config.headers) {
                    if (this._operatingTenantId) {
                        config.headers['X-Operating-Tenant-Id'] = this._operatingTenantId;
                    } else {
                        delete config.headers['X-Operating-Tenant-Id'];
                    }
                }

                if (config.method === "get" && config.url) {
                    const sep = config.url.includes("?") ? "&" : "?";
                    config.url = `${config.url}${sep}_=${Date.now()}`;
                }

                const method = config.method?.toUpperCase() || 'GET';
                const url = config.baseURL
                    ? `${config.baseURL.replace(/\/$/, '')}${config.url ?? ''}`
                    : config.url;
                console.log(`[HermesClient] Request: ${method} ${url}`);
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.httpClient.interceptors.response.use(
            (response) => {
                const method = response.config.method?.toUpperCase() || 'GET';
                const url = response.config.baseURL
                    ? `${response.config.baseURL.replace(/\/$/, '')}${response.config.url ?? ''}`
                    : response.config.url;
                console.log(`[HermesClient] Response: ${method} ${url} - Status: ${response.status}`);

                if (response.data && typeof response.data === 'object' && 'data' in response.data) {
                    response.data = response.data.data;
                }

                return response;
            },
            async (error: AxiosError) => {
                const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
                const { on401Refresh } = this.config;

                if (
                    error.response?.status === 401 &&
                    originalRequest &&
                    !originalRequest._retry &&
                    on401Refresh
                ) {
                    originalRequest._retry = true;
                    const newToken = await on401Refresh();
                    if (newToken) {
                        // Update internal state with new token
                        this._accessToken = newToken;
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        }
                        return this.httpClient.request(originalRequest);
                    }
                }

                if (error.config) {
                    const method = error.config.method?.toUpperCase() || 'GET';
                    const url = error.config.baseURL
                        ? `${error.config.baseURL.replace(/\/$/, '')}${error.config.url ?? ''}`
                        : error.config.url;
                    if (error.response) {
                        console.log(`[HermesClient] Response Error: ${method} ${url} - Status: ${error.response.status}`);
                    } else {
                        console.log(`[HermesClient] Request Error: ${method} ${url} - No response received.`);
                    }
                }

                return Promise.reject(this.handleError(error));
            }
        );
    }

    private handleError(error: AxiosError): HermesSDKError {
        const response = error.response;
        const data = response?.data as any;

        if (!response) {
            return new HermesSDKError(
                'Network error: Unable to reach Hermes Core',
                undefined,
                'NETWORK_ERROR'
            );
        }

        const message = data?.message || data?.error || error?.message || 'An error occurred';
        
        return new HermesSDKError(
            message,
            response.status,
            data?.code,
            data?.details
        );
    }
}