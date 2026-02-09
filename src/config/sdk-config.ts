export interface SDKConfig {
    jwtToken?: string;
    baseUrl: string;
    tenantId?: string;
    operatingTenantId?: string;
    apiKey?: string;
    timeout?: number;
    getAccessToken?: () => string | null | Promise<string | null>;
    getOperatingTenantId?: () => string | null;
    on401Refresh?: () => Promise<string | null>;
}