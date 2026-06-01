"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
class EventsService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async createEvent(data) {
        const response = await this.httpClient.post("/api/v1/events", data);
        return response.data;
    }
    async getEventsByEntity(entityId) {
        const response = await this.httpClient.get(`/api/v1/events/entity/${entityId}`);
        const data = response.data;
        return Array.isArray(data) ? data : [];
    }
    async getEventsByInteraction(interactionId) {
        const response = await this.httpClient.get(`/api/v1/events/interaction/${interactionId}`);
        const data = response.data;
        return Array.isArray(data) ? data : [];
    }
    async getExtractionEvents(entityId, limit) {
        const params = new URLSearchParams({ eventType: 'EXTRACTION_AGENT' });
        if (limit !== undefined)
            params.set('limit', String(limit));
        const response = await this.httpClient.get(`/api/v1/events/entity/${entityId}?${params.toString()}`);
        const data = response.data;
        return Array.isArray(data) ? data : [];
    }
}
exports.EventsService = EventsService;
