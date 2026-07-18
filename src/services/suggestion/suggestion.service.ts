import { AxiosInstance } from "axios";
import {
  CreateSuggestionsRequest,
  CreateSuggestionsResult,
  DecideAllResult,
  DecideSuggestionRequest,
  PendingSuggestionSummary,
  Suggestion,
} from "./suggestion.types";

export class SuggestionService {
  constructor(private httpClient: AxiosInstance) {}

  /** Agent-side: submit a batch of proposed changes for a lead. */
  async createSuggestions(data: CreateSuggestionsRequest): Promise<CreateSuggestionsResult> {
    const response = await this.httpClient.post("/api/v1/suggestions", data);
    return response.data;
  }

  /** Entities that have pending suggestions — feeds the dashboard notification bell. */
  async getPendingSummary(): Promise<PendingSuggestionSummary[]> {
    const response = await this.httpClient.get("/api/v1/suggestions/pending-summary");
    const data = response.data;
    return Array.isArray(data) ? data : [];
  }

  async getPendingSuggestions(entityId: string): Promise<Suggestion[]> {
    const response = await this.httpClient.get(`/api/v1/suggestions/entity/${entityId}`);
    const data = response.data;
    return Array.isArray(data) ? data : [];
  }

  async acceptSuggestion(id: string, body: DecideSuggestionRequest = {}): Promise<Suggestion> {
    const response = await this.httpClient.post(`/api/v1/suggestions/${id}/accept`, body);
    return response.data;
  }

  async dismissSuggestion(id: string, body: DecideSuggestionRequest = {}): Promise<Suggestion> {
    const response = await this.httpClient.post(`/api/v1/suggestions/${id}/dismiss`, body);
    return response.data;
  }

  async acceptAllSuggestions(entityId: string): Promise<DecideAllResult> {
    const response = await this.httpClient.post(`/api/v1/suggestions/entity/${entityId}/accept-all`);
    return response.data;
  }

  async dismissAllSuggestions(entityId: string): Promise<DecideAllResult> {
    const response = await this.httpClient.post(`/api/v1/suggestions/entity/${entityId}/dismiss-all`);
    return response.data;
  }
}
