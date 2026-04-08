import { AxiosInstance } from "axios";
import { PaginatedResponse } from "../../shared/types";
import { CallLog, CallTranscript, ScheduledCall, CreateScheduledCallRequest, UpdateScheduledCallRequest, GetScheduledCallsParams } from "./call.types";
export declare class CallService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getCallLogsByLeadId(leadId: string): Promise<CallLog[]>;
    getTranscriptsByCallLogId(callLogId: string): Promise<CallTranscript[]>;
    createScheduledCall(data: CreateScheduledCallRequest): Promise<ScheduledCall>;
    getScheduledCalls(params?: GetScheduledCallsParams): Promise<PaginatedResponse<ScheduledCall>>;
    updateScheduledCall(id: string, data: UpdateScheduledCallRequest): Promise<ScheduledCall>;
}
