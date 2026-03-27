import { AxiosInstance } from "axios";
import {
    EscalationDetail,
    GetEscalationsParams,
    GetEscalationsResponse,
    ResolveEscalationPayload,
} from "./escalation.types";

export class EscalationService {
    constructor(private httpClient: AxiosInstance) {}

    async getEscalations(params?: GetEscalationsParams): Promise<GetEscalationsResponse> {
        const response = await this.httpClient.get("/api/v1/escalations", { params });
        return response.data;
    }

    async getEscalation(escalationId: string): Promise<EscalationDetail> {
        const response = await this.httpClient.get(`/api/v1/escalations/${escalationId}`);
        return response.data;
    }

    async claimEscalation(escalationId: string): Promise<EscalationDetail> {
        const response = await this.httpClient.post(
            `/api/v1/escalations/${escalationId}/claim`,
        );
        return response.data;
    }

    async resolveEscalation(
        escalationId: string,
        payload: ResolveEscalationPayload
    ): Promise<EscalationDetail> {
        const response = await this.httpClient.patch(
            `/api/v1/escalations/${escalationId}`,
            payload
        );
        return response.data;
    }
}
