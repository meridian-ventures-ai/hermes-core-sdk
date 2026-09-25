import { AxiosInstance } from "axios";
import { LeadMemory, UpsertLeadMemoryEpisode } from "./memory.types";
export declare class MemoryService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getWorkingMemory(leadId: string): Promise<LeadMemory>;
    getByChatId(chatId: string): Promise<LeadMemory>;
    upsertEpisode(leadId: string, body: UpsertLeadMemoryEpisode): Promise<LeadMemory>;
}
