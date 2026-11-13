import { AxiosInstance } from "axios";
import { CreateCallEscalationPayload, EscalationDetail, GetEscalationsParams, GetEscalationsResponse, ResolveEscalationPayload } from "./escalation.types";
export declare class EscalationService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getEscalations(params?: GetEscalationsParams): Promise<GetEscalationsResponse>;
    getEscalation(escalationId: string): Promise<EscalationDetail>;
    /**
     * Opens an escalation for a tagged call, or adds the call's tags to the
     * lead's open one. Resolves to null when nothing was written.
     */
    createCallEscalation(payload: CreateCallEscalationPayload): Promise<EscalationDetail | null>;
    claimEscalation(escalationId: string): Promise<EscalationDetail>;
    resolveEscalation(escalationId: string, payload: ResolveEscalationPayload): Promise<EscalationDetail>;
}
