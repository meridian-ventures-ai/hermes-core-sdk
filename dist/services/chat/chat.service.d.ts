import { AxiosInstance } from "axios";
import { Chat, ChatResponse, CreateChatRequest, GetChatsParams } from "./chat.types";
import { GetLeadByIdResponse, SummaryResponse } from "../../shared/types";
export declare class ChatService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getChats(paginationParams?: GetChatsParams): Promise<ChatResponse>;
    getChat(chatId: string): Promise<Chat | null>;
    getProfileByChatId(chatId: string): Promise<GetLeadByIdResponse | null>;
    getSummary(chatId: string): Promise<SummaryResponse>;
    createChat(chat: CreateChatRequest): Promise<Chat>;
}
