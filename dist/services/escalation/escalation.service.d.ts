import { AxiosInstance } from "axios";
import { EscalationDetail, GetEscalationsParams, GetEscalationsResponse, ResolveEscalationPayload } from "./escalation.types";
export declare class EscalationService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getEscalations(params?: GetEscalationsParams): Promise<GetEscalationsResponse>;
    getEscalation(escalationId: string): Promise<EscalationDetail>;
    claimEscalation(escalationId: string): Promise<EscalationDetail>;
    resolveEscalation(escalationId: string, payload: ResolveEscalationPayload): Promise<EscalationDetail>;
}
