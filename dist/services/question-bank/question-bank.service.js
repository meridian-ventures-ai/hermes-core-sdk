"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionBankService = void 0;
// Mirrors hermes-core's src/modules/question-bank/question-bank.routes.ts.
// Extraction itself happens entirely in urag-indexing (presigned S3 upload +
// POST /extract/questions, called directly against urag-indexing, not
// through this SDK) -- by the time createDrafts is called, the caller
// already has the finished, validated fields in hand.
class QuestionBankService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    // Persists an urag-indexing extraction result as pending change_requests
    // drafts, ready for review.
    async createDrafts(data) {
        const response = await this.httpClient.post('/api/v1/question-bank/drafts', data);
        return response.data;
    }
    // All pending drafts across every upload batch, for the review panel.
    async getDrafts() {
        const response = await this.httpClient.get('/api/v1/question-bank/drafts');
        const data = response.data;
        return Array.isArray(data) ? data : [];
    }
    async updateDraft(id, body) {
        const response = await this.httpClient.patch(`/api/v1/question-bank/drafts/${id}`, body);
        return response.data;
    }
    // Approving inserts the draft into lead_fields (append-only, after
    // whatever is already live).
    async approveDraft(id) {
        const response = await this.httpClient.post(`/api/v1/question-bank/drafts/${id}/approve`, {});
        return response.data;
    }
    async dismissDraft(id) {
        const response = await this.httpClient.post(`/api/v1/question-bank/drafts/${id}/dismiss`, {});
        return response.data;
    }
    async approveBatch(batchId) {
        const response = await this.httpClient.post(`/api/v1/question-bank/drafts/batch/${batchId}/approve`, {});
        return response.data;
    }
    async dismissBatch(batchId) {
        const response = await this.httpClient.post(`/api/v1/question-bank/drafts/batch/${batchId}/dismiss`, {});
        return response.data;
    }
}
exports.QuestionBankService = QuestionBankService;
