// Fields agents can never change, the server enforces the same list.
export const AGENT_DENIED_LEAD_FIELDS = [
  'first_name',
  'last_name',
  'email',
  'phone',
] as const;

// Minimum confidence for an agent-filed change request.
export const CHANGE_REQUEST_CONFIDENCE_THRESHOLD = 0.7;
