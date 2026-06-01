import { AxiosInstance } from "axios";
import { CreateEventRequest, Event } from "./events.types";

export class EventsService {
  constructor(private httpClient: AxiosInstance) {}

  async createEvent(data: CreateEventRequest): Promise<Event> {
    const response = await this.httpClient.post("/api/v1/events", data);
    return response.data;
  }

  async getEventsByEntity(entityId: string): Promise<Event[]> {
    const response = await this.httpClient.get(
      `/api/v1/events/entity/${entityId}`
    );
    const data = response.data;
    return Array.isArray(data) ? data : [];
  }

  async getEventsByInteraction(interactionId: string): Promise<Event[]> {
    const response = await this.httpClient.get(
      `/api/v1/events/interaction/${interactionId}`
    );
    const data = response.data;
    return Array.isArray(data) ? data : [];
  }

  async getExtractionEvents(entityId: string, limit?: number): Promise<Event[]> {
    const params = new URLSearchParams({ eventType: 'EXTRACTION_AGENT' });
    if (limit !== undefined) params.set('limit', String(limit));
    const response = await this.httpClient.get(
      `/api/v1/events/entity/${entityId}?${params.toString()}`
    );
    const data = response.data;
    return Array.isArray(data) ? data : [];
  }

}
