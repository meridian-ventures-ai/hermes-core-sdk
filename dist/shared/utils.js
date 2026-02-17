"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSummaryResponse = toSummaryResponse;
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
