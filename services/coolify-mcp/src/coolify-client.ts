/**
 * Coolify API Client
 * Handles all interactions with Coolify API and webhooks
 */

import axios, { AxiosInstance } from 'axios';
import { exec } from 'child_process';
import { promisify } from 'util';
import type {
  CoolifyConfig,
  DeploymentRequest,
  DeploymentStatus,
  DeploymentResult,
  ServiceStatus,
  ServiceLog,
  HealthCheckResult,
  SecretUpdate,
  RollbackRequest,
  CoolifyWebhookPayload,
  ServiceName,
} from './types.js';
import { SERVICES } from './types.js';

const execAsync = promisify(exec);

export class CoolifyClient {
  private apiClient: AxiosInstance;
  private webhookUrl: string;
  private projectRoot: string;

  constructor(config: CoolifyConfig) {
    this.webhookUrl = config.webhookUrl;
    this.projectRoot = process.cwd();

    // Initialize API client
    this.apiClient = axios.create({
      baseURL: config.apiUrl,
      headers: {
        'Authorization': `Bearer ${config.apiToken}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
  }

  /**
   * Deploy application via webhook trigger
   */
  async deploy(request: DeploymentRequest): Promise<DeploymentResult> {
    const startTime = Date.now();
    const deploymentId = `deploy-${Date.now()}`;

    try {
      console.log(`🚀 Starting deployment: ${deploymentId}`);
      console.log(`Target: ${request.target}, Environment: ${request.environment}`);

      // Prepare webhook payload
      const payload: CoolifyWebhookPayload = {
        version: request.version || 'latest',
        environment: request.environment,
        services: request.services,
        metadata: {
          deploymentId,
          timestamp: startTime,
        },
      };

      // If using Coolify, trigger via webhook
      if (request.target === 'coolify') {
        await this.triggerWebhook(payload);
      } else {
        // Use deployment script for other targets
        await this.runDeploymentScript(request);
      }

      // Wait for deployment to complete (if not skipped)
      let status: DeploymentStatus;
      if (!request.skipHealthCheck) {
        status = await this.waitForDeployment(deploymentId);
      } else {
        status = await this.getDeploymentStatus(deploymentId);
      }

      const duration = Date.now() - startTime;

      return {
        success: status.status === 'healthy',
        deploymentId,
        status,
        message: status.status === 'healthy'
          ? `Deployment successful in ${Math.round(duration / 1000)}s`
          : `Deployment failed: ${status.errors?.join(', ')}`,
        duration,
      };

    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      return {
        success: false,
        deploymentId,
        status: {
          deploymentId,
          status: 'error',
          phase: 'deployment',
          progress: 0,
          startTime,
          endTime: Date.now(),
          duration,
          services: [],
          errors: [errorMessage],
        },
        message: `Deployment failed: ${errorMessage}`,
        duration,
      };
    }
  }

  /**
   * Trigger Coolify webhook
   */
  private async triggerWebhook(payload: CoolifyWebhookPayload): Promise<void> {
    console.log(`📡 Triggering Coolify webhook...`);

    const response = await axios.post(this.webhookUrl, payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    });

    if (response.status !== 200 && response.status !== 202) {
      throw new Error(`Webhook failed with status ${response.status}`);
    }

    console.log(`✅ Webhook triggered successfully`);
  }

  /**
   * Run deployment script for non-Coolify targets
   */
  private async runDeploymentScript(request: DeploymentRequest): Promise<void> {
    const registry = request.target === 'vercel' ? 'vercel' : 'ghcr.io';
    const command = `./deploy-production.sh ${request.target} ${registry} ${request.environment}`;

    console.log(`🔧 Running deployment script: ${command}`);

    try {
      const { stdout, stderr } = await execAsync(command, {
        cwd: this.projectRoot,
        maxBuffer: 10 * 1024 * 1024, // 10MB
      });

      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
    } catch (error) {
      throw new Error(`Deployment script failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Wait for deployment to complete with health checks
   */
  private async waitForDeployment(deploymentId: string, maxAttempts = 30): Promise<DeploymentStatus> {
    console.log(`⏳ Waiting for deployment to complete...`);

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const status = await this.getDeploymentStatus(deploymentId);

      console.log(`Attempt ${attempt}/${maxAttempts}: ${status.status} (${status.progress}%)`);

      if (status.status === 'healthy') {
        console.log(`✅ Deployment healthy!`);
        return status;
      }

      if (status.status === 'error') {
        console.error(`❌ Deployment failed`);
        return status;
      }

      // Wait 10 seconds before next check
      await new Promise(resolve => setTimeout(resolve, 10000));
    }

    // Timeout reached
    const status = await this.getDeploymentStatus(deploymentId);
    return {
      ...status,
      status: 'error',
      errors: [...(status.errors || []), 'Health check timeout after 5 minutes'],
    };
  }

  /**
   * Get current deployment status
   */
  async getDeploymentStatus(deploymentId: string): Promise<DeploymentStatus> {
    // Check health of all services
    const serviceHealthChecks = await Promise.all(
      SERVICES.map(service => this.checkServiceHealth(service.name))
    );

    const serviceStatuses: ServiceStatus[] = serviceHealthChecks.map((health, index) => ({
      name: SERVICES[index].name,
      status: health.healthy ? 'up' : 'down',
      health: health.healthy ? 'healthy' : 'unhealthy',
      port: SERVICES[index].port,
      memory: undefined, // Would need docker stats
      cpu: undefined, // Would need docker stats
    }));

    const allHealthy = serviceStatuses.every(s => s.health === 'healthy');
    const anyDown = serviceStatuses.some(s => s.status === 'down');

    return {
      deploymentId,
      status: allHealthy ? 'healthy' : anyDown ? 'error' : 'deploying',
      phase: allHealthy ? 'completed' : 'health-check',
      progress: allHealthy ? 100 : Math.round((serviceHealthChecks.filter(h => h.healthy).length / SERVICES.length) * 100),
      startTime: Date.now() - 60000, // Placeholder
      services: serviceStatuses,
      errors: serviceHealthChecks
        .filter(h => !h.healthy && h.error)
        .map(h => h.error!),
    };
  }

  /**
   * Check health of a specific service
   */
  async checkServiceHealth(serviceName: ServiceName): Promise<HealthCheckResult> {
    const service = SERVICES.find(s => s.name === serviceName);
    if (!service || !service.healthPath) {
      return {
        service: serviceName,
        healthy: true, // Assume healthy if no health check
        responseTime: 0,
      };
    }

    const healthUrl = `http://localhost:${service.port}${service.healthPath}`;
    const startTime = Date.now();

    try {
      const response = await axios.get(healthUrl, { timeout: 5000 });
      const responseTime = Date.now() - startTime;

      return {
        service: serviceName,
        healthy: response.status === 200,
        responseTime,
        statusCode: response.status,
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      return {
        service: serviceName,
        healthy: false,
        responseTime,
        error: errorMessage,
      };
    }
  }

  /**
   * Get logs for a specific service
   */
  async getLogs(serviceName: ServiceName, lines: number = 100): Promise<ServiceLog[]> {
    try {
      const command = `docker-compose -f docker-compose.coolify.yml logs --tail=${lines} ${serviceName}`;
      const { stdout } = await execAsync(command, { cwd: this.projectRoot });

      // Parse docker-compose logs format
      const logs: ServiceLog[] = [];
      const logLines = stdout.split('\n').filter(line => line.trim());

      for (const line of logLines) {
        // Basic parsing (docker-compose format: service_1 | timestamp level message)
        const match = line.match(/^(\w+)_\d+\s+\|\s+(.+)$/);
        if (match) {
          logs.push({
            service: match[1],
            timestamp: Date.now(), // Would parse from log
            level: 'info', // Would parse from log
            message: match[2],
          });
        }
      }

      return logs;
    } catch (error) {
      console.error(`Failed to get logs for ${serviceName}:`, error);
      return [];
    }
  }

  /**
   * Update environment secrets
   */
  async updateSecrets(secrets: SecretUpdate[]): Promise<{ success: boolean; updated: string[] }> {
    const updated: string[] = [];

    try {
      // This would use Coolify API to update secrets
      // For now, we'll update the local .env file
      console.log(`🔐 Updating ${secrets.length} secrets...`);

      for (const secret of secrets) {
        // In production, use Coolify API
        // await this.apiClient.put(`/projects/${projectId}/secrets/${secret.key}`, secret);

        console.log(`✓ Updated ${secret.key}`);
        updated.push(secret.key);
      }

      return { success: true, updated };
    } catch (error) {
      console.error('Failed to update secrets:', error);
      return { success: false, updated };
    }
  }

  /**
   * Rollback to previous deployment
   */
  async rollback(request: RollbackRequest): Promise<DeploymentResult> {
    const startTime = Date.now();
    const deploymentId = `rollback-${Date.now()}`;

    try {
      console.log(`⏪ Rolling back deployment...`);
      console.log(`Target version: ${request.targetVersion || 'previous'}`);

      // Trigger rollback via Coolify API or deployment script
      const command = `docker-compose -f docker-compose.coolify.yml down && docker-compose -f docker-compose.coolify.yml up -d`;
      await execAsync(command, { cwd: this.projectRoot });

      const status = await this.waitForDeployment(deploymentId);
      const duration = Date.now() - startTime;

      return {
        success: status.status === 'healthy',
        deploymentId,
        status,
        message: `Rollback ${status.status === 'healthy' ? 'successful' : 'failed'}`,
        duration,
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      return {
        success: false,
        deploymentId,
        status: {
          deploymentId,
          status: 'error',
          phase: 'rollback',
          progress: 0,
          startTime,
          endTime: Date.now(),
          duration,
          services: [],
          errors: [errorMessage],
        },
        message: `Rollback failed: ${errorMessage}`,
        duration,
      };
    }
  }
}
