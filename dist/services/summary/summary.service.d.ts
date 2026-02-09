import { AxiosInstance } from "axios";
import { SummaryResponse } from "./summary.types";
export declare class SummaryService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    generateSummary(chatId: string): Promise<SummaryResponse>;
}
