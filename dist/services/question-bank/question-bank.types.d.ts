export declare const QUESTION_BANK_PROFESSIONAL_TYPES: readonly ["NURSE", "NURSING_TECHNICIAN"];
export type QuestionBankProfessionalType = (typeof QUESTION_BANK_PROFESSIONAL_TYPES)[number];
export declare const QUESTION_BANK_LANGUAGES: readonly ["english", "portuguese"];
export type QuestionBankLanguage = (typeof QUESTION_BANK_LANGUAGES)[number];
export declare const QUESTION_PHASES: readonly ["behavioral", "technical"];
export type QuestionPhase = (typeof QUESTION_PHASES)[number];
export interface ExtractedQuestionOption {
    key: string;
    text: string;
}
export interface ExtractedQuestionFieldDetails {
    phase: QuestionPhase;
    block: number;
    serviceName: string;
    professionalType: QuestionBankProfessionalType;
    documentType: 'technical_assessment';
    provideOptions: boolean;
    idealAnswer?: string | null;
    evaluationCriteria?: string | null;
    passingBehavior?: string | null;
    options?: ExtractedQuestionOption[] | null;
    correctOption?: string | null;
    passingScore?: string | null;
    sourceFileKey?: string | null;
}
export interface ExtractedQuestionField {
    fieldName: string;
    question: string;
    type: 'textarea';
    flowType: 'QUALIFYING_QUESTION';
    order: number;
    fieldDetails: ExtractedQuestionFieldDetails;
}
export interface ExtractedQuestionWarning {
    fieldName?: string | null;
    message: string;
}
export interface CreateQuestionBankDraftsRequest {
    specialty: string;
    professionalType: QuestionBankProfessionalType;
    language: QuestionBankLanguage;
    originalFilename: string;
    sizeBytes?: number;
    fields: ExtractedQuestionField[];
    warnings?: ExtractedQuestionWarning[];
    /** file_key from urag-indexing's presigned-upload step for this batch's PDF. */
    sourceFileKey?: string;
}
export type QuestionBankDraftStatus = 'pending' | 'accepted' | 'dismissed' | 'superseded';
export interface QuestionBankDraft {
    id: string;
    batchId: string;
    fieldName: string;
    question: string;
    fieldDetails: ExtractedQuestionFieldDetails;
    order: number;
    specialty: string;
    professionalType: QuestionBankProfessionalType;
    language: QuestionBankLanguage;
    originalFilename: string;
    sourceFileKey?: string;
    status: QuestionBankDraftStatus;
    createdAt: string;
}
export interface CreateQuestionBankDraftsResponse {
    batchId: string;
    specialty: string;
    professionalType: QuestionBankProfessionalType;
    language: QuestionBankLanguage;
    originalFilename: string;
    sizeBytes: number;
    sourceFileKey?: string;
    drafts: QuestionBankDraft[];
    extractionWarnings: ExtractedQuestionWarning[];
}
export interface UpdateQuestionBankDraftRequest {
    fieldName?: string;
    question?: string;
    /** Partial -- the server merges this into the existing fieldDetails object. */
    fieldDetails?: Record<string, unknown>;
}
export interface QuestionBankBatchDecisionResult {
    approved?: number;
    dismissed?: number;
    failed: {
        id: string;
        reason: string;
    }[];
}
