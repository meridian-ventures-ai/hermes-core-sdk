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
        this.httpClient = axios_1.default.create({
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
        this.chats = new chat_service_1.ChatService(this.httpClient);
        this.leads = new lead_service_1.LeadService(this.httpClient);
        this.messages = new message_service_1.MessageService(this.httpClient);
    }
    setupInterceptors() {
        // Request interceptor
        this.httpClient.interceptors.request.use((config) => {
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
            // Auto-unwrap: { success, data, message } -> data
            if (response.data && typeof response.data === 'object') {
                // If backend returns { success, data, message }, extract data
                if ('data' in response.data) {
                    response.data = response.data.data;
                }
            }
            return response;
        }, (error) => {
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
