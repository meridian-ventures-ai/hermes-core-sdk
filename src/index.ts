export { HermesClient } from './client/hermes-client';
export * from './services/chat/chat.types';
export * from './services/lead/lead.types';
export * from './services/message/message.types';
export * from './services/analytics/analytics.types';
// Summary types moved to chat.types.ts - kept for backward compatibility
export { SummaryResponse, SummaryRecommendation } from './services/chat/chat.types';
export * from './config/sdk-config';