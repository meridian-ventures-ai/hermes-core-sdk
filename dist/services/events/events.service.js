"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
class EventsService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    /**
     * Create a new platform event (e.g. EXTRACTION_AGENT, QUALIFYING_AGENT).
     */
    async createEvent(data) {
        const response = await this.httpClient.post("/api/v1/events", data);
        return response.data;
    }
    /**
     * Get all events for a given entity (e.g. all events tied to a lead).
     */
    async getEventsByEntity(entityId) {
        const response = await this.httpClient.get(`/api/v1/events/entity/${entityId}`);
        const data = response.data;
        return Array.isArray(data) ? data : [];
    }
    /**
     * Get all events for a specific interaction (e.g. all events tied to a chatId or callLogId).
     */
    async getEventsByInteraction(interactionId) {
        const response = await this.httpClient.get(`/api/v1/events/interaction/${interactionId}`);
        const data = response.data;
        return Array.isArray(data) ? data : [];
    }
}
exports.EventsService = EventsService;
