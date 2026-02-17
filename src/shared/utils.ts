import { SummaryPayload, SummaryResponse } from "./types";

export function toSummaryResponse(payload: SummaryPayload): SummaryResponse {
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

