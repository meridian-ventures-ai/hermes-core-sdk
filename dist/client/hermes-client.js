"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HermesClient = exports.HermesSDKError = void 0;
const axios_1 = __importDefault(require("axios"));
const lead_service_1 = require("../services/lead/lead.service");
const message_service_1 = require("../services/message/message.service");
const chat_service_1 = require("../services/chat/chat.service");
const analytics_service_1 = require("../services/analytics/analytics.service");
const summary_service_1 = require("../services/summary/summary.service");
class HermesSDKError extends Error {
    constructor(message, statusCode, code, details) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
        this.name = 'HermesSDKError';
    }
}
exports.HermesSDKError = HermesSDKError;
class HermesClient {
    constructor(config) {
        this.config = config;
        this.httpClient = axios_1.default.create({
            baseURL: config.baseUrl,
            timeout: config.timeout || 30000,
            headers: {
                'Content-Type': 'application/json',
                ...(config.jwtToken && { 'Authorization': `Bearer ${config.jwtToken}` }),
                ...(config.tenantId && { 'X-Tenant-ID': config.tenantId }),
                ...(config.operatingTenantId && { 'X-Operating-Tenant-Id': config.operatingTenantId }),
                ...(config.apiKey && { 'X-API-Key': config.apiKey }),
            },
        });
        this.setupInterceptors();
        this.chats = new chat_service_1.ChatService(this.httpClient);
        this.leads = new lead_service_1.LeadService(this.httpClient);
        this.messages = new message_service_1.MessageService(this.httpClient);
        this.analytics = new analytics_service_1.AnalyticsService(this.httpClient);
        this.summary = new summary_service_1.SummaryService(this.httpClient);
    }
    setupInterceptors() {
        this.httpClient.interceptors.request.use(async (config) => {
            const { getAccessToken, getOperatingTenantId } = this.config;
            if (getAccessToken) {
                const token = await Promise.resolve(getAccessToken());
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            if (getOperatingTenantId) {
                const tenantId = getOperatingTenantId();
                if (config.headers) {
                    if (tenantId) {
                        config.headers['X-Operating-Tenant-Id'] = tenantId;
                    }
                    else {
                        delete config.headers['X-Operating-Tenant-Id'];
                    }
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
        }, (error) => Promise.reject(error));
        this.httpClient.interceptors.response.use((response) => {
            const method = response.config.method?.toUpperCase() || 'GET';
            const url = response.config.baseURL
                ? `${response.config.baseURL.replace(/\/$/, '')}${response.config.url ?? ''}`
                : response.config.url;
            console.log(`[HermesClient] Response: ${method} ${url} - Status: ${response.status}`);
            if (response.data && typeof response.data === 'object' && 'data' in response.data) {
                response.data = response.data.data;
            }
            return response;
        }, async (error) => {
            const originalRequest = error.config;
            const { on401Refresh } = this.config;
            if (error.response?.status === 401 &&
                originalRequest &&
                !originalRequest._retry &&
                on401Refresh) {
                originalRequest._retry = true;
                const newToken = await on401Refresh();
                if (newToken && originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
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
                }
                else {
                    console.log(`[HermesClient] Request Error: ${method} ${url} - No response received.`);
                }
            }
            return Promise.reject(this.handleError(error));
        });
    }
    handleError(error) {
        const response = error.response;
        const data = response?.data;
        if (!response) {
            return new HermesSDKError('Network error: Unable to reach Hermes Core', undefined, 'NETWORK_ERROR');
        }
        const message = data?.message || data?.error || error?.message || 'An error occurred';
        return new HermesSDKError(message, response.status, data?.code, data?.details);
    }
}
exports.HermesClient = HermesClient;
