/**
 * Lead scoring types — mirrors the rule-based engine in hermes-core
 * (`src/modules/scoring/scoring.type.ts`). Configs are react-querybuilder-
 * shaped JSON with `score`/`weight` extra fields per node.
 */
export type FieldType = 'text' | 'email' | 'tel' | 'textarea' | 'date' | 'partial_date' | 'select' | 'radio' | 'checkbox' | 'chips' | 'country-dropdown' | 'phone_country_dropdown' | 'select_or_text' | 'binary_with_conditional';
/**
 * Operators the engine understands. Names align with react-querybuilder's
 * defaults so authoring UI built on RQB can use them directly.
 */
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
    /** Stable identifier used in result breakdowns. */
    id: string;
    /** Human-readable label shown in UI. */
    label?: string;
    /** Multiplier applied to whichever rule matches. */
    weight: number;
    /** Score used when none of `rules` match. Defaults to 0. */
    fallbackScore: number;
    /** Branches walked top-to-bottom, first match wins. */
    rules: ScoringBranch[];
}
export interface Threshold {
    /** Inclusive lower bound on `finalScore` for this bucket to apply. */
    min: number;
    /** Lead potential label — typically HOT, WARM, COOL, COLD. */
    potential: string;
}
/**
 * Field types are NOT stored in the scoring config — the engine fetches
 * them from `lead_fields` at scoring time, so configs stay tenant-agnostic
 * and never need re-emission when a field's type changes.
 */
export interface ScoringConfig {
    /** Author-facing version string for the rule set. */
    algorithmVersion: string;
    /** Dimensions evaluated independently and summed (score × weight). */
    dimensions: Dimension[];
    /** Score → potential bucketing. Highest bucket the score clears wins. */
    thresholds: Threshold[];
    /**
     * If true, the lead's final score is split between the rule-engine's
     * qualifying-criteria score and an engagement score produced separately
     * by the agent pipeline. Defaults to false.
     */
    engagementScoreEnabled?: boolean;
    /**
     * Percentage (0–100) of the final score driven by the engagement signal
     * when `engagementScoreEnabled` is true. e.g. 30 means engagement
     * contributes 30% and qualifying contributes the remaining 70%.
     */
    engagementScorePercentage?: number;
    /**
     * Percentage (0–100) of the final score driven by this rule engine.
     * 100 when `engagementScoreEnabled` is false; otherwise
     * `100 - engagementScorePercentage`.
     */
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
    /** Raw score from the matched rule (or `fallbackScore`). */
    score: number;
    /** Dimension's weight, copied from the config. */
    weight: number;
    /** `score × weight`, rounded to 2 decimals. */
    weightedScore: number;
    /** Which rule matched (`null` if fallback). */
    matched: {
        label?: string;
    } | null;
}
export interface LeadScoringResult {
    finalScore: number;
    /** HOT / WARM / COOL / COLD — picked from `thresholds`. */
    leadPotential: string;
    dimensions: DimensionScore[];
    scoredAt: string;
    algorithmVersion: string;
    algorithmType: 'RULE_BASED';
    scoringConfigId?: string;
    scoringConfigVersion?: number;
}
/**
 * @deprecated Use `LeadScoringResult`. Kept as an alias for any callers
 * that imported the old name.
 */
export type ScoringResult = LeadScoringResult;
/**
 * Per-field envelope used by hermes-core's `dynamicFields` JSONB column.
 * `value` is the raw form input; `question` is the prompt that produced it
 * (used for audit, not scoring).
 */
export interface DynamicFieldEntry {
    value: unknown;
    question?: string;
}
export type DynamicFieldsMap = Record<string, DynamicFieldEntry>;
export interface PreviewScoringRequest {
    /** The lead's dynamic fields. Pass `null` to score against an empty record. */
    dynamicFields: DynamicFieldsMap | null;
    /** Optional override config — if omitted, the tenant's stored config is used. */
    config?: ScoringConfig;
}
export interface ScoreLeadRequest {
    trigger?: 'CREATE_LEAD' | 'EXTRACTION_AGENT' | 'API' | 'BACKFILL';
    sourceEventId?: string;
}
export interface ScoreLeadResponse {
    scored: boolean;
    /** Set to `'no_scoring_config'` when the tenant has no stored config. */
    reason?: string;
    result?: LeadScoringResult;
}
