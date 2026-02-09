"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummaryService = void 0;
function toSummaryResponse(payload) {
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
class SummaryService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async generateSummary(chatId) {
        const response = await this.httpClient.get(`/api/v1/chats/${chatId}/summary`, { timeout: 60000 });
        return toSummaryResponse(response.data);
    }
}
exports.SummaryService = SummaryService;
