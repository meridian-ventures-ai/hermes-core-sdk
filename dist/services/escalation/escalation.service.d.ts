import { AxiosInstance } from "axios";
import { ClaimEscalationPayload, EscalationDetail, GetEscalationsParams, GetEscalationsResponse, ResolveEscalationPayload } from "./escalation.types";
export declare class EscalationService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getEscalations(params?: GetEscalationsParams): Promise<GetEscalationsResponse>;
    getEscalation(escalationId: string): Promise<EscalationDetail>;
    claimEscalation(escalationId: string, payload: ClaimEscalationPayload): Promise<EscalationDetail>;
    resolveEscalation(escalationId: string, payload: ResolveEscalationPayload): Promise<EscalationDetail>;
}
