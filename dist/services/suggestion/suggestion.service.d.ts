import { AxiosInstance } from "axios";
import { CreateSuggestionsRequest, CreateSuggestionsResult, DecideAllResult, DecideSuggestionRequest, Suggestion } from "./suggestion.types";
export declare class SuggestionService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    /** Agent-side: submit a batch of proposed changes for a lead. */
    createSuggestions(data: CreateSuggestionsRequest): Promise<CreateSuggestionsResult>;
    getPendingSuggestions(entityId: string): Promise<Suggestion[]>;
    acceptSuggestion(id: string, body?: DecideSuggestionRequest): Promise<Suggestion>;
    dismissSuggestion(id: string, body?: DecideSuggestionRequest): Promise<Suggestion>;
    acceptAllSuggestions(entityId: string): Promise<DecideAllResult>;
    dismissAllSuggestions(entityId: string): Promise<DecideAllResult>;
}
