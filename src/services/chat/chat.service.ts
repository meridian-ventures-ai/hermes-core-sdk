import { AxiosInstance } from "axios";
import { Chat, ChatResponse, ChatWithProfileData, CreateChatRequest, SummaryRecommendation, SummaryResponse } from "./chat.types";

interface PaginationParams {
    page?: number;
    pageSize?: number;
}

interface SummaryPayload {
    summary?: string;
    recommendations?: SummaryRecommendation[];
    isCached?: boolean;
}

function toSummaryResponse(payload: SummaryPayload): SummaryResponse {
    const recs = payload.recommendations ?? [];
    return {
        success: true,
        summary: payload.summary ?? "",
        recommendations: recs.map((r) => ({
            action: r.action ?? r.title ?? r.description ?? "",
            title: r.title,
            description: r.description,
            priority: r.priority,
            category: r.category,
            timeline: r.timeline,
            evidence: r.evidence ?? [],
        })),
        isCached: payload.isCached ?? false,
    };
}

export class ChatService {
    constructor(private httpClient: AxiosInstance) {}

    async getChats(paginationParams?: PaginationParams): Promise<ChatResponse> {
        const response = await this.httpClient.get('/api/v1/chats', { params: paginationParams });
        return response.data;
    }

    async getChat(chatId: string): Promise<Chat | null> {
        const response = await this.httpClient.get(`/api/v1/chats/${chatId}`);
        return response.data;
    }

    async getProfileByChatId(chatId: string): Promise<ChatWithProfileData | null> {
        const response = await this.httpClient.get(`/api/v1/chats/profile/${chatId}`);
        return response.data;
    }

    async getSummary(chatId: string): Promise<SummaryResponse> {
        const response = await this.httpClient.get<SummaryPayload>(
            `/api/v1/chats/${chatId}/summary`,
            { timeout: 60000 }
        );
        return toSummaryResponse(response.data);
    }

    async createChat(chat: CreateChatRequest): Promise<Chat> {
        const response = await this.httpClient.post('/api/v1/chats', chat);
        return response.data;
    }
}