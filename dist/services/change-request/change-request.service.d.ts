import { AxiosInstance } from 'axios';
import { CreateChangeRequestsRequest, CreateChangeRequestsResult, DecideAllResult, DecideChangeRequestRequest, ChangeRequestInboxItem, ChangeRequest } from './change-request.types';
export declare class ChangeRequestService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    createChangeRequests(data: CreateChangeRequestsRequest): Promise<CreateChangeRequestsResult>;
    getInbox(): Promise<ChangeRequestInboxItem[]>;
    getPendingChangeRequests(entityId: string): Promise<ChangeRequest[]>;
    acceptChangeRequest(id: string, body?: DecideChangeRequestRequest): Promise<ChangeRequest>;
    dismissChangeRequest(id: string, body?: DecideChangeRequestRequest): Promise<ChangeRequest>;
    acceptAllChangeRequests(entityId: string): Promise<DecideAllResult>;
    dismissAllChangeRequests(entityId: string): Promise<DecideAllResult>;
}
