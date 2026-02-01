import axios, { AxiosInstance, AxiosError } from "axios";
import { SDKConfig } from "../config/sdk-config";
import { LeadService } from "../services/lead/lead.service";
import { MessageService } from "../services/message/message.service";
import { ChatService } from "../services/chat/chat.service";

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
    public chats: ChatService;
    public leads: LeadService;
    public messages: MessageService;

    constructor(config: SDKConfig) {
        this.httpClient = axios.create({
            baseURL: config.baseUrl,
            timeout: config.timeout || 30000,
            headers: {
              'Content-Type': 'application/json',
              ...(config.jwtToken && { 'Authorization': `Bearer ${config.jwtToken}` }),
              ...(config.tenantId && { 'X-Tenant-ID': config.tenantId }),
              ...(config.apiKey && { 'X-API-Key': config.apiKey }),
            },
        });
      
        this.setupInterceptors();

        this.chats = new ChatService(this.httpClient);
        this.leads = new LeadService(this.httpClient);
        this.messages = new MessageService(this.httpClient);
    }

    private setupInterceptors() {
        // Request interceptor
        this.httpClient.interceptors.request.use(
            (config) => {
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
                
                // Auto-unwrap: { success, data, message } -> data
                if (response.data && typeof response.data === 'object') {
                    // If backend returns { success, data, message }, extract data
                    if ('data' in response.data) {
                        response.data = response.data.data;
                    }
                }
                
                return response;
            },
            (error: AxiosError) => {
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