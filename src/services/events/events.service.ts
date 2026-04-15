import { AxiosInstance } from "axios";
import { CreateEventRequest, Event } from "./events.types";

export class EventsService {
  constructor(private httpClient: AxiosInstance) {}

  /**
   * Create a new platform event (e.g. EXTRACTION_AGENT, QUALIFYING_AGENT).
   */
  async createEvent(data: CreateEventRequest): Promise<Event> {
    const response = await this.httpClient.post("/api/v1/events", data);
    return response.data;
  }

  /**
   * Get all events for a given entity (e.g. all events tied to a lead).
   */
  async getEventsByEntity(entityId: string): Promise<Event[]> {
    const response = await this.httpClient.get(
      `/api/v1/events/entity/${entityId}`
    );
    const data = response.data;
    return Array.isArray(data) ? data : [];
  }

  /**
   * Get all events for a specific interaction (e.g. all events tied to a chatId or callLogId).
   */
  async getEventsByInteraction(interactionId: string): Promise<Event[]> {
    const response = await this.httpClient.get(
      `/api/v1/events/interaction/${interactionId}`
    );
    const data = response.data;
    return Array.isArray(data) ? data : [];
  }
}
