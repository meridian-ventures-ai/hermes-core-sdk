export type FieldType = 'text' | 'email' | 'tel' | 'textarea' | 'date' | 'partial_date' | 'select' | 'radio' | 'checkbox' | 'chips' | 'country-dropdown' | 'phone_country_dropdown' | 'select_or_text' | 'binary_with_conditional';
export type RuleOperator = '=' | '!=' | '<' | '<=' | '>' | '>=' | 'in' | 'notIn' | 'between' | 'notBetween' | 'contains' | 'doesNotContain' | 'beginsWith' | 'endsWith' | 'null' | 'notNull';
export type Combinator = 'and' | 'or';
export interface RuleLeaf {
    field: string;
    operator: RuleOperator | string;
    value: unknown;
}
export interface RuleGroup {
    combinator: Combinator;
    not?: boolean;
    rules: Array<RuleLeaf | RuleGroup>;
}
export type Predicate = RuleLeaf | RuleGroup;
export type ScoringLeaf = RuleLeaf & {
    score: number;
    label?: string;
};
export type ScoringGroup = RuleGroup & {
    score: number;
    label?: string;
};
export type ScoringBranch = ScoringLeaf | ScoringGroup;
export interface Dimension {
    id: string;
    label?: string;
    weight: number;
    fallbackScore: number;
    rules: ScoringBranch[];
}
export interface Threshold {
    min: number;
    potential: string;
}
export interface ScoringConfig {
    algorithmVersion: string;
    dimensions: Dimension[];
    thresholds: Threshold[];
    engagementScoreEnabled?: boolean;
    engagementScorePercentage?: number;
    sentimentScoreEnabled?: boolean;
    sentimentScorePercentage?: number;
    qualifyingCriteriaScorePercentage?: number;
}
export interface ScoringConfigRow {
    id: string;
    tenantId: string;
    version: number;
    config: ScoringConfig;
    createdAt: string;
    updatedAt: string;
}
export interface DimensionScore {
    id: string;
    label?: string;
    score: number;
    weight: number;
    weightedScore: number;
    matched: {
        label?: string;
    } | null;
}
export interface LeadScoringResult {
    finalScore: number;
    leadPotential: string;
    dimensions: DimensionScore[];
    scoredAt: string;
    algorithmVersion: string;
    algorithmType: 'RULE_BASED';
    scoringConfigId?: string;
    scoringConfigVersion?: number;
    /** Sum of (dimension.weight × max rule score) across all dimensions. */
    maxQualificationScore?: number;
    extractionScores?: {
        engagementScore: number;
        sentimentScore: number;
        sentimentLabel: string;
        qualifyingCount: number;
        totalQualifyingCount: number;
    };
}
export interface ApplyExtractionScoresRequest {
    /** Qualifying coverage: (capturedFields / totalFields) × 100 */
    engagementScore: number;
    /** LLM-derived sentiment score (0–100) */
    sentimentScore: number;
    sentimentLabel: string;
    qualifyingCount: number;
    totalQualifyingCount: number;
}
export interface ApplyExtractionScoresResponse {
    scored: boolean;
    reason?: string;
    result?: LeadScoringResult;
}
export type ScoringResult = LeadScoringResult;
export interface DynamicFieldEntry {
    value: unknown;
    question?: string;
}
export type DynamicFieldsMap = Record<string, DynamicFieldEntry>;
export interface PreviewScoringRequest {
    dynamicFields: DynamicFieldsMap | null;
    config?: ScoringConfig;
}
export interface ScoreLeadRequest {
    trigger?: 'CREATE_LEAD' | 'EXTRACTION_AGENT' | 'API' | 'BACKFILL';
    sourceEventId?: string;
}
export interface ScoreLeadResponse {
    scored: boolean;
    reason?: string;
    result?: LeadScoringResult;
}
