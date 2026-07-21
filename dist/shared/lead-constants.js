"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHANGE_REQUEST_CONFIDENCE_THRESHOLD = exports.AGENT_DENIED_LEAD_FIELDS = exports.LEAD_STATUSES = void 0;
// Mirrors hermes-core's server-side lists so agent consumers stay in sync.
exports.LEAD_STATUSES = [
    'lead',
    'prospective',
    'applicant',
    'enrolled',
    'lost',
    'new',
    'invited',
    'scheduled',
    'attempted',
    'contacted',
    'qualified',
    'offer pending',
    'defer_3_months',
    'defer_1_year',
    'converted',
    'meeting_tour',
    'reopened',
    'interview_incomplete',
    'interview_completed',
    'interview_in_progress',
    'interview_pending',
    'approved',
    'review',
    'pending',
    'rejected',
];
// Fields agents can never change, the server enforces the same list.
exports.AGENT_DENIED_LEAD_FIELDS = [
    'first_name',
    'last_name',
    'email',
    'phone',
    'birthday',
];
// Minimum confidence for an agent-filed change request.
exports.CHANGE_REQUEST_CONFIDENCE_THRESHOLD = 0.7;
