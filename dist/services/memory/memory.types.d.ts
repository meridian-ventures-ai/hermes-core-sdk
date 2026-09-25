export type MemoryChannel = "HERMES" | "WHATSAPP" | "PHOENIX";
export interface MemoryEpisode {
    id?: string;
    channel: MemoryChannel;
    sourceId: string;
    summary: string;
    engagement: "HIGH" | "MEDIUM" | "LOW" | string;
    sentiment?: {
        label: string | null;
        score: number | null;
    };
    keyInsights: string[];
    recommendedActions: string[];
    updatedAt?: string | null;
}
export interface LeadIntelligence {
    summary?: string | null;
    intent?: string | null;
    commitments: string[];
    objections: string[];
    interests: string[];
    openQuestions: string[];
    nextStep?: string | null;
}
export interface LeadMemory extends LeadIntelligence {
    episodeCount: number;
    lastChannel: MemoryChannel | null;
    lastInteractionAt: string | null;
    episodes: MemoryEpisode[];
    isFirstTouch: boolean;
}
export interface UpsertLeadMemoryEpisode {
    episode: Omit<MemoryEpisode, "id" | "updatedAt">;
    intelligence?: LeadIntelligence;
}
