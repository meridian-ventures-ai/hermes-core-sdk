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
export class AgenticService {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(config: SDKConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');

    this.headers = {
      'Content-Type': 'application/json',
    };

    // Service-level API key auth (used by all agentic-chat frontends)
    if (config.apiKey) this.headers['x-api-key'] = config.apiKey;
    if (config.tenantId) this.headers['x-tenant-id'] = config.tenantId;

    // JWT auth (used by dashboard / user-facing clients)
    if (config.jwtToken) this.headers['Authorization'] = `Bearer ${config.jwtToken}`;
    if (config.operatingTenantId) {
      this.headers['x-operating-tenant-id'] = config.operatingTenantId;
    }
  }

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
  async chat(request: AgenticChatRequest): Promise<Response> {
    const url = `${this.baseUrl}/api/v1/agentic/chat`;

    console.log(`[HermesClient] Request: POST ${url}`);

    const response = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request),
    });

    console.log(`[HermesClient] Response: POST ${url} - Status: ${response.status}`);

    return response;
  }
}
