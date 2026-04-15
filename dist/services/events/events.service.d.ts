import { AxiosInstance } from "axios";
import { CreateEventRequest, Event } from "./events.types";
export declare class EventsService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    /**
     * Create a new platform event (e.g. EXTRACTION_AGENT, QUALIFYING_AGENT).
     */
    createEvent(data: CreateEventRequest): Promise<Event>;
    /**
     * Get all events for a given entity (e.g. all events tied to a lead).
     */
    getEventsByEntity(entityId: string): Promise<Event[]>;
    /**
     * Get all events for a specific interaction (e.g. all events tied to a chatId or callLogId).
     */
    getEventsByInteraction(interactionId: string): Promise<Event[]>;
}
