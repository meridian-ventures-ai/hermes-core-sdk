import { AxiosInstance } from "axios";
import { PaginatedResponse } from "../../shared/types";
import {
    CallLog,
    CallTranscript,
    ScheduledCall,
    CreateScheduledCallRequest,
    UpdateScheduledCallRequest,
    GetScheduledCallsParams,
    SubmitSchedulingPreferenceRequest,
    SubmitSchedulingPreferenceResponse,
} from "./call.types";

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

    // Scheduled calls

    async createScheduledCall(data: CreateScheduledCallRequest): Promise<ScheduledCall> {
        const response = await this.httpClient.post('/api/v1/calls/schedule', data);
        return response.data;
    }

    async getScheduledCalls(params?: GetScheduledCallsParams): Promise<PaginatedResponse<ScheduledCall>> {
        const response = await this.httpClient.get('/api/v1/calls/scheduled', { params });
        return response.data;
    }

    async updateScheduledCall(id: string, data: UpdateScheduledCallRequest): Promise<ScheduledCall> {
        const response = await this.httpClient.patch(`/api/v1/calls/scheduled/${id}`, data);
        return response.data;
    }

    // Lead-facing "Call me now" / "Schedule for later" choice from the chat widget.

    async submitSchedulingPreference(
        data: SubmitSchedulingPreferenceRequest
    ): Promise<SubmitSchedulingPreferenceResponse> {
        const response = await this.httpClient.post('/api/v1/call-scheduling/preference', data);
        return response.data;
    }
}
