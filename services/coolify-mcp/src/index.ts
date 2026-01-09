/**
 * Coolify Deployment MCP Server
 * Provides Claude Code with direct deployment capabilities
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { CoolifyClient } from './coolify-client.js';
import type { CoolifyConfig, DeploymentRequest, ServiceName, SecretUpdate, RollbackRequest } from './types.js';
import { SERVICES } from './types.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Coolify client
const coolifyConfig: CoolifyConfig = {
  apiUrl: process.env.COOLIFY_URL || 'http://localhost',
  apiToken: process.env.COOLIFY_API_TOKEN || '',
  webhookUrl: process.env.COOLIFY_WEBHOOK_URL || '',
  projectId: process.env.COOLIFY_PROJECT_ID,
};

const coolify = new CoolifyClient(coolifyConfig);

// Create MCP server
const server = new Server(
  {
    name: 'coolify-deployment',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * List available tools
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'deploy',
        description: 'Deploy application to Coolify/Hostinger or other platforms',
        inputSchema: {
          type: 'object',
          properties: {
            target: {
              type: 'string',
              enum: ['coolify', 'docker-local', 'railway', 'vercel'],
              description: 'Deployment target platform',
              default: 'coolify',
            },
            environment: {
              type: 'string',
              enum: ['production', 'staging', 'development'],
              description: 'Target environment',
              default: 'production',
            },
            version: {
              type: 'string',
              description: 'Version tag to deploy (e.g., v1.2.3, latest)',
            },
            services: {
              type: 'array',
              items: { type: 'string' },
              description: 'Specific services to deploy (deploys all if not specified)',
            },
            skipHealthCheck: {
              type: 'boolean',
              description: 'Skip health check after deployment',
              default: false,
            },
          },
          required: [],
        },
      },
      {
        name: 'deployment_status',
        description: 'Check current deployment status and service health',
        inputSchema: {
          type: 'object',
          properties: {
            deploymentId: {
              type: 'string',
              description: 'Specific deployment ID to check (optional)',
            },
          },
        },
      },
      {
        name: 'service_health',
        description: 'Check health of a specific service',
        inputSchema: {
          type: 'object',
          properties: {
            service: {
              type: 'string',
              enum: SERVICES.map(s => s.name),
              description: 'Service name to check',
            },
          },
          required: ['service'],
        },
      },
      {
        name: 'service_logs',
        description: 'Get logs from a specific service',
        inputSchema: {
          type: 'object',
          properties: {
            service: {
              type: 'string',
              enum: SERVICES.map(s => s.name),
              description: 'Service name',
            },
            lines: {
              type: 'number',
              description: 'Number of log lines to retrieve',
              default: 100,
            },
          },
          required: ['service'],
        },
      },
      {
        name: 'update_secrets',
        description: 'Update environment variables/secrets in Coolify',
        inputSchema: {
          type: 'object',
          properties: {
            secrets: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  key: { type: 'string' },
                  value: { type: 'string' },
                  description: { type: 'string' },
                  overwrite: { type: 'boolean', default: true },
                },
                required: ['key', 'value'],
              },
              description: 'Array of secrets to update',
            },
          },
          required: ['secrets'],
        },
      },
      {
        name: 'rollback',
        description: 'Rollback to a previous deployment',
        inputSchema: {
          type: 'object',
          properties: {
            deploymentId: {
              type: 'string',
              description: 'Deployment ID to rollback to (optional)',
            },
            targetVersion: {
              type: 'string',
              description: 'Version tag to rollback to',
            },
            reason: {
              type: 'string',
              description: 'Reason for rollback',
            },
          },
        },
      },
    ],
  };
});

/**
 * Handle tool calls
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'deploy': {
        const deployRequest = args as unknown as DeploymentRequest;
        const result = await coolify.deploy(deployRequest);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'deployment_status': {
        const { deploymentId } = args as { deploymentId?: string };
        const status = await coolify.getDeploymentStatus(deploymentId || `status-${Date.now()}`);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(status, null, 2),
            },
          ],
        };
      }

      case 'service_health': {
        const { service } = args as { service: ServiceName };
        const health = await coolify.checkServiceHealth(service);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(health, null, 2),
            },
          ],
        };
      }

      case 'service_logs': {
        const { service, lines = 100 } = args as { service: ServiceName; lines?: number };
        const logs = await coolify.getLogs(service, lines);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(logs, null, 2),
            },
          ],
        };
      }

      case 'update_secrets': {
        const { secrets } = args as { secrets: SecretUpdate[] };
        const result = await coolify.updateSecrets(secrets);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'rollback': {
        const rollbackRequest = args as unknown as RollbackRequest;
        const result = await coolify.rollback(rollbackRequest);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ error: errorMessage }, null, 2),
        },
      ],
      isError: true,
    };
  }
});

/**
 * Start server
 */
async function main() {
  console.error('🚀 Coolify Deployment MCP Server starting...');
  console.error(`📡 Coolify URL: ${coolifyConfig.apiUrl}`);
  console.error(`🔗 Webhook: ${coolifyConfig.webhookUrl ? 'Configured' : 'Not configured'}`);

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('✅ Server ready and listening on stdio');
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
