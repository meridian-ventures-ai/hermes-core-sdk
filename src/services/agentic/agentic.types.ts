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

export interface AgenticChatRequest {
  /** Chat session UUID — must exist (or will be auto-created) in hermes-core */
  id: string;
  /** Full conversation history in Vercel AI SDK UIMessage format */
  messages: UIMessage[];
  /** Lead profile data collected from the intake form */
  profileData?: Record<string, unknown> | null;
  /** Sentinel prompt key to fetch. Defaults to "system_prompt" if omitted. */
  promptKey?: string;
}
