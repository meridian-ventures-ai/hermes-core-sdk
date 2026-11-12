import { AxiosInstance } from 'axios';
import {
  CreateQuestionBankDraftsRequest,
  CreateQuestionBankDraftsResponse,
  QuestionBankBatchDecisionResult,
  QuestionBankDraft,
  UpdateQuestionBankDraftRequest,
} from './question-bank.types';

// Mirrors hermes-core's src/modules/question-bank/question-bank.routes.ts.
// Extraction itself happens entirely in urag-indexing (presigned S3 upload +
// POST /extract/questions, called directly against urag-indexing, not
// through this SDK) -- by the time createDrafts is called, the caller
// already has the finished, validated fields in hand.
export class QuestionBankService {
  constructor(private httpClient: AxiosInstance) {}

  // Persists an urag-indexing extraction result as pending change_requests
  // drafts, ready for review.
  async createDrafts(
    data: CreateQuestionBankDraftsRequest,
  ): Promise<CreateQuestionBankDraftsResponse> {
    const response = await this.httpClient.post('/api/v1/question-bank/drafts', data);
    return response.data;
  }

  // All pending drafts across every upload batch, for the review panel.
  async getDrafts(): Promise<QuestionBankDraft[]> {
    const response = await this.httpClient.get('/api/v1/question-bank/drafts');
    const data = response.data;
    return Array.isArray(data) ? data : [];
  }

  async updateDraft(
    id: string,
    body: UpdateQuestionBankDraftRequest,
  ): Promise<QuestionBankDraft> {
    const response = await this.httpClient.patch(`/api/v1/question-bank/drafts/${id}`, body);
    return response.data;
  }

  // Approving inserts the draft into lead_fields (append-only, after
  // whatever is already live).
  async approveDraft(id: string): Promise<QuestionBankDraft> {
    const response = await this.httpClient.post(`/api/v1/question-bank/drafts/${id}/approve`, {});
    return response.data;
  }

  async dismissDraft(id: string): Promise<QuestionBankDraft> {
    const response = await this.httpClient.post(`/api/v1/question-bank/drafts/${id}/dismiss`, {});
    return response.data;
  }

  async approveBatch(batchId: string): Promise<QuestionBankBatchDecisionResult> {
    const response = await this.httpClient.post(
      `/api/v1/question-bank/drafts/batch/${batchId}/approve`,
      {},
    );
    return response.data;
  }

  async dismissBatch(batchId: string): Promise<QuestionBankBatchDecisionResult> {
    const response = await this.httpClient.post(
      `/api/v1/question-bank/drafts/batch/${batchId}/dismiss`,
      {},
    );
    return response.data;
  }
}
