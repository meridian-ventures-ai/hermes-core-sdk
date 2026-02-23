import { AxiosInstance } from "axios";
import { Chat, ChatResponse, CreateChatRequest, GetChatsParams } from "./chat.types";
import { GetLeadByIdResponse, SummaryPayload, SummaryResponse } from "../../shared/types";
import { toSummaryResponse } from "../../shared/utils";


export class ChatService {
    constructor(private httpClient: AxiosInstance) {}

    async getChats(paginationParams?: GetChatsParams): Promise<ChatResponse> {
        const response = await this.httpClient.get('/api/v1/chats', { params: paginationParams });
        return response.data;
    }

    async getChat(chatId: string): Promise<Chat | null> {
        const response = await this.httpClient.get(`/api/v1/chats/${chatId}`);
        return response.data;
    }

    async getProfileByChatId(chatId: string): Promise<GetLeadByIdResponse | null> {
        const response = await this.httpClient.get(`/api/v1/chats/${chatId}/lead-profile`);
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