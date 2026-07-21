import { SDKConfig } from '../../config/sdk-config';
import { AgenticChatRequest } from './agentic.types';
/**
 * AgenticService — streaming chat endpoint wrapper.
 *
 * Unlike every other service in the SDK (which use the shared Axios instance),
 * this service calls the streaming endpoint via the native fetch API.
 * Axios buffers the full response before resolving, which is incompatible with
 * SSE / chunked streaming. fetch() lets us hand the raw ReadableStream straight
 * back to the caller (typically a Next.js Route Handler) for zero-copy piping.
 */
export declare class AgenticService {
    private baseUrl;
    private headers;
    constructor(config: SDKConfig);
    /**
     * Start a streaming agentic chat turn.
     *
     * Returns the raw fetch `Response` so the caller can pipe its body
     * (a Vercel AI SDK UI-message-stream) directly to their HTTP response
     * without buffering.
     *
     * @example — Next.js Route Handler
     * ```ts
     * export async function POST(req: Request) {
     *   const body = await req.json()
     *   const upstream = await hermesCoreClient.agentic.chat(body)
     *   return new Response(upstream.body, {
     *     headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' }
     *   })
     * }
     * ```
     */
    chat(request: AgenticChatRequest): Promise<Response>;
}
