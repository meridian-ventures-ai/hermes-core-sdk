import { AxiosInstance } from "axios";
import { CallLog, CallTranscript } from "./call.types";

export class CallService {
    constructor(private httpClient: AxiosInstance) {}

    async getCallLogsByLeadId(leadId: string): Promise<CallLog[]> {
        const response = await this.httpClient.get(`/api/v1/calls/leads/${leadId}/call-logs`);
        return response.data;
    }

    async getTranscriptsByCallLogId(callLogId: string): Promise<CallTranscript[]> {
        const response = await this.httpClient.get(`/api/v1/calls/logs/call-log/${callLogId}/transcripts`);
        return response.data;
    }
}
