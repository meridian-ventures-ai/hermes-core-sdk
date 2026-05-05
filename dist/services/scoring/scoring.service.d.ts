import { AxiosInstance } from 'axios';
import { ApplyExtractionScoresRequest, ApplyExtractionScoresResponse, LeadScoringResult, PreviewScoringRequest, ScoreLeadRequest, ScoreLeadResponse, ScoringConfig, ScoringConfigRow } from './scoring.types';
export declare class ScoringService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    /** Get the tenant's scoring config (404 if not configured). */
    getConfig(): Promise<ScoringConfigRow>;
    /**
     * Insert or replace the tenant's scoring config (bumps version on replace).
     * The request body IS the config — no `{ config: ... }` wrapper.
     */
    upsertConfig(config: ScoringConfig): Promise<ScoringConfigRow>;
    /** Remove the tenant's scoring config (disables scoring). */
    deleteConfig(): Promise<void>;
    /**
     * Pure dry-run — score the given dynamicFields against the supplied
     * config (or the active stored config if `config` is omitted). Does not
     * touch any lead.
     */
    preview(request: PreviewScoringRequest): Promise<LeadScoringResult>;
    /**
     * Force a recalc + persist for a single lead. Returns
     * `{ scored: false, reason: 'no_scoring_config' }` if the tenant has no
     * stored config.
     */
    scoreLead(leadId: string, request?: ScoreLeadRequest): Promise<ScoreLeadResponse>;
    applyExtractionScores(leadId: string, request: ApplyExtractionScoresRequest): Promise<ApplyExtractionScoresResponse>;
}
