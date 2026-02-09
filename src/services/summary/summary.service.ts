import { AxiosInstance } from "axios";
import { SummaryRecommendation, SummaryResponse } from "./summary.types";

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

export class SummaryService {
    constructor(private httpClient: AxiosInstance) {}

    async generateSummary(chatId: string): Promise<SummaryResponse> {
        const response = await this.httpClient.get<SummaryPayload>(
            `/api/v1/chats/${chatId}/summary`,
            { timeout: 60000 }
        );
        return toSummaryResponse(response.data);
    }
}
