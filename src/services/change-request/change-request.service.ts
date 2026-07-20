import { AxiosInstance } from "axios";
import {
  CreateChangeRequestsRequest,
  CreateChangeRequestsResult,
  DecideAllResult,
  DecideChangeRequestRequest,
  ChangeRequestInboxItem,
  ChangeRequest,
} from "./change-request.types";

export class ChangeRequestService {
  constructor(private httpClient: AxiosInstance) {}

  /** Agent-side: submit a batch of proposed changes for a lead. */
  async createChangeRequests(data: CreateChangeRequestsRequest): Promise<CreateChangeRequestsResult> {
    const response = await this.httpClient.post("/api/v1/change-requests", data);
    return response.data;
  }

  /** Entities that have pending change requests — feeds the dashboard notification bell. */
  async getInbox(): Promise<ChangeRequestInboxItem[]> {
    const response = await this.httpClient.get("/api/v1/change-requests/inbox");
    const data = response.data;
    return Array.isArray(data) ? data : [];
  }

  async getPendingChangeRequests(entityId: string): Promise<ChangeRequest[]> {
    const response = await this.httpClient.get(`/api/v1/change-requests/entity/${entityId}`);
    const data = response.data;
    return Array.isArray(data) ? data : [];
  }

  async acceptChangeRequest(id: string, body: DecideChangeRequestRequest = {}): Promise<ChangeRequest> {
    const response = await this.httpClient.post(`/api/v1/change-requests/${id}/accept`, body);
    return response.data;
  }

  async dismissChangeRequest(id: string, body: DecideChangeRequestRequest = {}): Promise<ChangeRequest> {
    const response = await this.httpClient.post(`/api/v1/change-requests/${id}/dismiss`, body);
    return response.data;
  }

  async acceptAllChangeRequests(entityId: string): Promise<DecideAllResult> {
    const response = await this.httpClient.post(`/api/v1/change-requests/entity/${entityId}/accept-all`);
    return response.data;
  }

  async dismissAllChangeRequests(entityId: string): Promise<DecideAllResult> {
    const response = await this.httpClient.post(`/api/v1/change-requests/entity/${entityId}/dismiss-all`);
    return response.data;
  }
}
