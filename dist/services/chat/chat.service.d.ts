import { AxiosInstance } from "axios";
import { Chat, ChatResponse, ChatWithProfileData, CreateChatRequest, SummaryResponse } from "./chat.types";
interface PaginationParams {
    page?: number;
    pageSize?: number;
}
export declare class ChatService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getChats(paginationParams?: PaginationParams): Promise<ChatResponse>;
    getChat(chatId: string): Promise<Chat | null>;
    getProfileByChatId(chatId: string): Promise<ChatWithProfileData | null>;
    getSummary(chatId: string): Promise<SummaryResponse>;
    createChat(chat: CreateChatRequest): Promise<Chat>;
}
export {};
