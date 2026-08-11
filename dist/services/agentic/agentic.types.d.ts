/**
 * Types for the agentic streaming chat endpoint (POST /api/v1/agentic/chat).
 *
 * UIMessage mirrors the Vercel AI SDK v5 UIMessage shape so the SDK stays
 * compatible with the useChat hook used in all agentic-chat frontends.
 */
export interface UIMessagePart {
    type: string;
    text?: string;
    [key: string]: unknown;
}
export interface UIMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    parts?: UIMessagePart[];
    /** Plain text content — used when parts are not available */
    content?: string;
    createdAt?: string;
}
/** One place a user can book, with its own Calendly event and token */
export interface BookingLocation {
    /** Short id used by the agent, e.g. "jeddah" */
    key: string;
    /** Human readable name of the place */
    label: string;
    /** Branch names that map to this location, empty means it serves all */
    branches: string[];
    /** Calendly event type API uri to read slots from and book against */
    eventTypeUri: string;
    /** Public Calendly page link, shared when live booking is unavailable */
    schedulingUrl: string;
    /** IANA timezone used to show slot times, e.g. "Asia/Riyadh" */
    timezone: string;
    /** Calendly access token for this location, resolve it server side only */
    token: string;
}
/** Booking setup a tenant app sends with each chat request to enable in chat booking */
export interface BookingConfig {
    provider: 'calendly';
    locations: BookingLocation[];
}
export interface AgenticChatRequest {
    /** Chat session UUID — must exist (or will be auto-created) in hermes-core */
    id: string;
    /** Full conversation history in Vercel AI SDK UIMessage format */
    messages: UIMessage[];
    /** Lead profile data collected from the intake form */
    profileData?: Record<string, unknown> | null;
    /** Sentinel prompt key to fetch. Defaults to "system_prompt" if omitted. */
    promptKey?: string;
    /** Tenant booking setup — resolved server-side by the tenant app, never from the browser */
    booking?: BookingConfig;
}
