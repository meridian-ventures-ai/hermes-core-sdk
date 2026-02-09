export interface SDKConfig {
    jwtToken?: string;
    baseUrl: string;
    tenantId?: string;
    operatingTenantId?: string;
    apiKey?: string;
    timeout?: number;
    on401Refresh?: () => Promise<string | null>;
}
