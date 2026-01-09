/**
 * Coolify MCP Server Types
 * Type definitions for Coolify API and MCP tools
 */

export interface CoolifyConfig {
  apiUrl: string;
  apiToken: string;
  webhookUrl: string;
  projectId?: string;
}

export interface DeploymentRequest {
  target: 'coolify' | 'docker-local' | 'railway' | 'vercel';
  environment: 'production' | 'staging' | 'development';
  version?: string;
  services?: string[];
  skipHealthCheck?: boolean;
}

export interface DeploymentStatus {
  deploymentId: string;
  status: 'pending' | 'building' | 'deploying' | 'healthy' | 'error' | 'rolled-back';
  phase: string;
  progress: number; // 0-100
  startTime: number;
  endTime?: number;
  duration?: number;
  services: ServiceStatus[];
  errors?: string[];
  warnings?: string[];
}

export interface ServiceStatus {
  name: string;
  status: 'up' | 'down' | 'starting' | 'error';
  health: 'healthy' | 'unhealthy' | 'unknown';
  uptime?: string;
  memory?: string;
  cpu?: string;
  port: number;
  url?: string;
  lastRestart?: number;
}

export interface DeploymentResult {
  success: boolean;
  deploymentId: string;
  status: DeploymentStatus;
  message: string;
  url?: string;
  duration: number;
}

export interface ServiceLog {
  service: string;
  timestamp: number;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  metadata?: Record<string, any>;
}

export interface HealthCheckResult {
  service: string;
  healthy: boolean;
  responseTime: number;
  statusCode?: number;
  error?: string;
}

export interface SecretUpdate {
  key: string;
  value: string;
  description?: string;
  overwrite?: boolean;
}

export interface RollbackRequest {
  deploymentId?: string;
  targetVersion?: string;
  reason?: string;
}

export interface CoolifyWebhookPayload {
  version: string;
  environment: string;
  services?: string[];
  metadata?: Record<string, any>;
}

export interface MCPToolResult {
  success: boolean;
  data?: any;
  error?: string;
  metadata?: Record<string, any>;
}

// Service definitions matching docker-compose.coolify.yml
export const SERVICES = [
  { name: 'web-frontend', port: 3000, healthPath: '/health' },
  { name: 'stellar-agents', port: 3004, healthPath: '/health' },
  { name: 'big-3-orchestrator', port: 3010, healthPath: '/health' },
  { name: 'browser-service', port: 3013, healthPath: '/health' },
  { name: 'chrome-devtools-mcp', port: 3014, healthPath: undefined },
  { name: 'rube-mcp', port: 3015, healthPath: '/health' },
] as const;

export type ServiceName = typeof SERVICES[number]['name'];
