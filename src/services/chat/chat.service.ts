import { AxiosInstance } from "axios";
import { Chat, ChatResponse, ChatWithProfileData, CreateChatRequest } from "./chat.types";


interface PaginationParams {
    page?: number;
    pageSize?: number;
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

    async createChat(chat: CreateChatRequest): Promise<Chat> {
        const response = await this.httpClient.post('/api/v1/chats', chat);
        return response.data;
    }
}