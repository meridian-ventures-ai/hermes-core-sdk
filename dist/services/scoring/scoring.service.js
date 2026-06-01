"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoringService = void 0;
class ScoringService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    /** Get the tenant's scoring config (404 if not configured). */
    async getConfig() {
        const response = await this.httpClient.get('/api/v1/scoring/config');
        return response.data;
    }
    /**
     * Insert or replace the tenant's scoring config (bumps version on replace).
     * The request body IS the config — no `{ config: ... }` wrapper.
     */
    async upsertConfig(config) {
        const response = await this.httpClient.put('/api/v1/scoring/config', config);
        return response.data;
    }
    /** Remove the tenant's scoring config (disables scoring). */
    async deleteConfig() {
        await this.httpClient.delete('/api/v1/scoring/config');
    }
    /**
     * Pure dry-run — score the given dynamicFields against the supplied
     * config (or the active stored config if `config` is omitted). Does not
     * touch any lead.
     */
    async preview(request) {
        const response = await this.httpClient.post('/api/v1/scoring/preview', request);
        return response.data;
    }
    /**
     * Force a recalc + persist for a single lead. Returns
     * `{ scored: false, reason: 'no_scoring_config' }` if the tenant has no
     * stored config.
     */
    async scoreLead(leadId, request = {}) {
        const response = await this.httpClient.post(`/api/v1/scoring/leads/${leadId}/score`, request);
        return response.data;
    }
    async applyExtractionScores(leadId, request) {
        const response = await this.httpClient.post(`/api/v1/scoring/leads/${leadId}/extraction-scores`, request);
        return response.data;
    }
}
exports.ScoringService = ScoringService;
