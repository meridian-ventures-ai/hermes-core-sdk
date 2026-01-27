import { AxiosInstance } from "axios";
import { Chat, ChatResponse, ChatWithProfileResponse, CreateChatRequest } from "./chat.types";
interface PaginationParams {
    page?: number;
    pageSize?: number;
}
export declare class ChatService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getChats(paginationParams?: PaginationParams): Promise<ChatResponse>;
    getChat(chatId: string): Promise<Chat | null>;
    getProfileByChatId(chatId: string): Promise<ChatWithProfileResponse | null>;
    createChat(chat: CreateChatRequest): Promise<Chat>;
}
export {};
