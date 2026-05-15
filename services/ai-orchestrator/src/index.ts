/**
 * AI Orchestrator Service Entry Point
 *
 * This service can be run in two modes:
 * 1. HTTP Server Mode (default): Starts Express server with REST API
 * 2. Standalone Mode: Runs orchestrator without HTTP server
 *
 * To run in standalone mode: Set STANDALONE=true in .env
 */

export { default as AIOrchestrator } from './agents/orchestrator.js';
export { default as GrantScheduler } from './automation/grant-scheduler.js';
export { default as BrowserAutomation } from './automation/browser-automation.js';
export { default as GeminiIntegration } from './integrations/gemini.js';
export { default as NotificationService } from './lib/notification-service.js';
