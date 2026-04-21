import { AxiosInstance } from "axios";
import { CreateEventRequest, Event } from "./events.types";
export declare class EventsService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    createEvent(data: CreateEventRequest): Promise<Event>;
    getEventsByEntity(entityId: string): Promise<Event[]>;
    getEventsByInteraction(interactionId: string): Promise<Event[]>;
}
