import { AxiosInstance } from 'axios';
import { CreateQuestionBankDraftsRequest, CreateQuestionBankDraftsResponse, QuestionBankBatchDecisionResult, QuestionBankDraft, UpdateQuestionBankDraftRequest } from './question-bank.types';
export declare class QuestionBankService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    createDrafts(data: CreateQuestionBankDraftsRequest): Promise<CreateQuestionBankDraftsResponse>;
    getDrafts(): Promise<QuestionBankDraft[]>;
    updateDraft(id: string, body: UpdateQuestionBankDraftRequest): Promise<QuestionBankDraft>;
    approveDraft(id: string): Promise<QuestionBankDraft>;
    dismissDraft(id: string): Promise<QuestionBankDraft>;
    approveBatch(batchId: string): Promise<QuestionBankBatchDecisionResult>;
    dismissBatch(batchId: string): Promise<QuestionBankBatchDecisionResult>;
}
