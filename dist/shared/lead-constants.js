"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHANGE_REQUEST_CONFIDENCE_THRESHOLD = exports.AGENT_DENIED_LEAD_FIELDS = void 0;
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
