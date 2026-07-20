import { AxiosInstance } from "axios";
import { CreateChangeRequestsRequest, CreateChangeRequestsResult, DecideAllResult, DecideChangeRequestRequest, ChangeRequestInboxItem, ChangeRequest } from "./change-request.types";
export declare class ChangeRequestService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    /** Agent-side: submit a batch of proposed changes for a lead. */
    createChangeRequests(data: CreateChangeRequestsRequest): Promise<CreateChangeRequestsResult>;
    /** Entities that have pending suggestions — feeds the dashboard notification bell. */
    getInbox(): Promise<ChangeRequestInboxItem[]>;
    getPendingChangeRequests(entityId: string): Promise<ChangeRequest[]>;
    acceptChangeRequest(id: string, body?: DecideChangeRequestRequest): Promise<ChangeRequest>;
    dismissChangeRequest(id: string, body?: DecideChangeRequestRequest): Promise<ChangeRequest>;
    acceptAllChangeRequests(entityId: string): Promise<DecideAllResult>;
    dismissAllChangeRequests(entityId: string): Promise<DecideAllResult>;
}
