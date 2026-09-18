// Mirrors hermes-core's src/modules/question-bank/question-bank.type.ts and,
// through it, urag-indexing's POST /extract/questions response -- keep these
// three in sync when any of them change.

export const QUESTION_BANK_PROFESSIONAL_TYPES = ['NURSE', 'NURSING_TECHNICIAN'] as const;
export type QuestionBankProfessionalType = (typeof QUESTION_BANK_PROFESSIONAL_TYPES)[number];

export const QUESTION_BANK_LANGUAGES = ['english', 'portuguese'] as const;
export type QuestionBankLanguage = (typeof QUESTION_BANK_LANGUAGES)[number];

export const QUESTION_PHASES = ['behavioral', 'technical'] as const;
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
  // Hard-forced false end to end (urag-indexing/hermes-core never let this be
  // true) -- there is no multiple-choice path in this feature.
  provideOptions: boolean;
  idealAnswer?: string | null;
  evaluationCriteria?: string | null;
  passingBehavior?: string | null;
  options?: ExtractedQuestionOption[] | null;
  correctOption?: string | null;
  passingScore?: string | null;
  // S3 file_key of the source PDF this question was extracted from. Resolve
  // to a preview URL on demand via urag-indexing's getFileContentUrl(fileKey)
  // -- never persist the presigned download_url itself, since that expires.
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

// Request body for POST /api/v1/question-bank/drafts -- the caller has
// already run urag-indexing's presign-upload + POST /extract/questions flow
// by this point, so this call carries the finished extraction result, not a
// file.
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

// Flattened change_requests row -- reads like a draft lead_fields row.
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
  failed: { id: string; reason: string }[];
}
