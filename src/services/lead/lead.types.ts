
import { PaginatedResponse } from "../../shared/types";

export interface Lead {
    id: string;
    tenant_id: string;
    chat_id: string | null;
    lead_potential: string;
    profile_completeness: number;
    status: string;
    lead_score: number;
    lead_score_breakdown: Record<string, any> | null;
    metadata: any;
    created_at: string;
    updated_at: string;
    lead_field_values?: LeadFieldValue[];
}

export interface LeadFieldValue {
    id: string;
    value: any;
    lead_id: string;
    field_id: string;
    created_at: string;
    updated_at: string;
    lead_fields?: LeadField | null;
}

export interface LeadField {
    id: string;
    type: string;
    order: number;
    question: string;
    tenant_id: string;
    created_at: string;
    field_name: string;
    updated_at: string;
    field_details: any;
}

export type GetLeadsResponse = PaginatedResponse<Lead>;


export interface CreateLeadRequest {
    chat_id: string | null;
    lead_potential: string;
    lead_score: number;
    lead_score_breakdown: Record<string, any> | null;
    profile_completeness: number;
    status: string;
    metadata: any;
    responses: {
        field_id: string;
        value: any;
    }[];
}


export interface CreateLeadFieldRequest {
  field_name: string;
  question: string;
  type: string;
  order: number;
  field_details: Record<string, any>;
}
