import { AxiosInstance } from "axios";
import { CallLog, CallTranscript } from "./call.types";
export declare class CallService {
    private httpClient;
    constructor(httpClient: AxiosInstance);
    getCallLogsByLeadId(leadId: string): Promise<CallLog[]>;
    getTranscriptsByCallLogId(callLogId: string): Promise<CallTranscript[]>;
}
