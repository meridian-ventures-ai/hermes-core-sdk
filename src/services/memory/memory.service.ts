import { AxiosInstance } from "axios";
import { LeadMemory, UpsertLeadMemoryEpisode } from "./memory.types";

export class MemoryService {
  constructor(private httpClient: AxiosInstance) {}

  async getWorkingMemory(leadId: string): Promise<LeadMemory> {
    const response = await this.httpClient.get(`/api/v1/leads/${leadId}/memory`);
    return response.data;
  }

  async getByChatId(chatId: string): Promise<LeadMemory> {
    const response = await this.httpClient.get(`/api/v1/chats/${chatId}/memory`);
    return response.data;
  }

  async upsertEpisode(leadId: string, body: UpsertLeadMemoryEpisode): Promise<LeadMemory> {
    const response = await this.httpClient.put(
      `/api/v1/leads/${leadId}/memory/episodes`,
      body
    );
    return response.data;
  }
}
