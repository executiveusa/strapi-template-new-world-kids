#!/usr/bin/env node

/**
 * Secrets Manager MCP Server
 * 
 * Secure secrets management for New World Kids platform.
 * Handles encryption, storage, rotation, and deployment of secrets.
 * 
 * Features:
 * - Encrypted local storage
 * - Auto-rotation with expiration tracking
 * - Multi-environment support (dev, staging, prod)
 * - Vercel/Coolify deployment helpers
 * - Secret generation with strong entropy
 * - Audit logging
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { SecretsVault } from './vault.js';
import { SecretsGenerator } from './generator.js';
import { SecretsDeployer } from './deployer.js';
import { AuditLogger } from './logger.js';

const vault = new SecretsVault();
const generator = new SecretsGenerator();
const deployer = new SecretsDeployer();
const logger = new AuditLogger();

const server = new Server(
  {
    name: 'secrets-manager',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define all tools
const tools: Tool[] = [
  {
    name: 'store_secret',
    description: 'Store a secret securely in encrypted vault',
    inputSchema: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description: 'Secret key name (e.g., OPENAI_API_KEY)',
        },
        value: {
          type: 'string',
          description: 'Secret value',
        },
        environment: {
          type: 'string',
          enum: ['development', 'staging', 'production'],
          description: 'Environment',
          default: 'development',
        },
        expiresInDays: {
          type: 'number',
          description: 'Days until secret should be rotated (optional)',
        },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description: 'Tags for organization (e.g., ["critical", "api", "openai"])',
        },
      },
      required: ['key', 'value', 'environment'],
    },
  },
  {
    name: 'get_secret',
    description: 'Retrieve a secret from the vault',
    inputSchema: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description: 'Secret key name',
        },
        environment: {
          type: 'string',
          enum: ['development', 'staging', 'production'],
          description: 'Environment',
        },
      },
      required: ['key', 'environment'],
    },
  },
  {
    name: 'list_secrets',
    description: 'List all secrets (keys only, not values)',
    inputSchema: {
      type: 'object',
      properties: {
        environment: {
          type: 'string',
          enum: ['development', 'staging', 'production', 'all'],
          description: 'Environment to filter by',
          default: 'all',
        },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description: 'Filter by tags',
        },
        showExpired: {
          type: 'boolean',
          description: 'Include expired secrets',
          default: false,
        },
      },
    },
  },
  {
    name: 'generate_secret',
    description: 'Generate a cryptographically secure random secret',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['jwt', 'api_key', 'password', 'uuid', 'base64'],
          description: 'Type of secret to generate',
        },
        length: {
          type: 'number',
          description: 'Length in bytes (for base64) or characters',
          default: 32,
        },
        store: {
          type: 'boolean',
          description: 'Automatically store in vault',
          default: false,
        },
        key: {
          type: 'string',
          description: 'Key name if store=true',
        },
        environment: {
          type: 'string',
          enum: ['development', 'staging', 'production'],
          description: 'Environment if store=true',
        },
      },
      required: ['type'],
    },
  },
  {
    name: 'rotate_secret',
    description: 'Generate new value for an existing secret and update everywhere',
    inputSchema: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description: 'Secret key to rotate',
        },
        environment: {
          type: 'string',
          enum: ['development', 'staging', 'production'],
          description: 'Environment',
        },
        deployToVercel: {
          type: 'boolean',
          description: 'Update in Vercel',
          default: false,
        },
        deployToCoolify: {
          type: 'boolean',
          description: 'Update in Coolify',
          default: false,
        },
      },
      required: ['key', 'environment'],
    },
  },
  {
    name: 'export_env_file',
    description: 'Export secrets to .env file format',
    inputSchema: {
      type: 'object',
      properties: {
        environment: {
          type: 'string',
          enum: ['development', 'staging', 'production'],
          description: 'Environment',
        },
        outputPath: {
          type: 'string',
          description: 'Output file path',
          default: '.env.local',
        },
        format: {
          type: 'string',
          enum: ['dotenv', 'json', 'yaml'],
          description: 'Output format',
          default: 'dotenv',
        },
      },
      required: ['environment'],
    },
  },
  {
    name: 'deploy_to_vercel',
    description: 'Deploy secrets to Vercel using CLI',
    inputSchema: {
      type: 'object',
      properties: {
        environment: {
          type: 'string',
          enum: ['development', 'preview', 'production'],
          description: 'Vercel environment',
        },
        secrets: {
          type: 'array',
          items: { type: 'string' },
          description: 'Specific secret keys to deploy (or all if empty)',
        },
        projectId: {
          type: 'string',
          description: 'Vercel project ID',
        },
      },
      required: ['environment'],
    },
  },
  {
    name: 'deploy_to_coolify',
    description: 'Deploy secrets to Coolify via API',
    inputSchema: {
      type: 'object',
      properties: {
        environment: {
          type: 'string',
          enum: ['development', 'staging', 'production'],
          description: 'Environment',
        },
        secrets: {
          type: 'array',
          items: { type: 'string' },
          description: 'Specific secret keys to deploy',
        },
        serviceId: {
          type: 'string',
          description: 'Coolify service ID',
        },
        coolifyUrl: {
          type: 'string',
          description: 'Coolify instance URL',
        },
      },
      required: ['environment'],
    },
  },
  {
    name: 'check_expiring_secrets',
    description: 'List secrets expiring soon (within N days)',
    inputSchema: {
      type: 'object',
      properties: {
        daysThreshold: {
          type: 'number',
          description: 'Alert if expiring within N days',
          default: 30,
        },
        environment: {
          type: 'string',
          enum: ['development', 'staging', 'production', 'all'],
          description: 'Environment filter',
          default: 'all',
        },
      },
    },
  },
  {
    name: 'audit_log',
    description: 'View audit log of secret operations',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Number of log entries',
          default: 50,
        },
        operation: {
          type: 'string',
          enum: ['store', 'get', 'rotate', 'deploy', 'delete', 'all'],
          description: 'Filter by operation type',
          default: 'all',
        },
        environment: {
          type: 'string',
          enum: ['development', 'staging', 'production', 'all'],
          description: 'Environment filter',
          default: 'all',
        },
      },
    },
  },
  {
    name: 'validate_secrets',
    description: 'Validate secrets against SECRETS_COMPLETE_LIST.md template',
    inputSchema: {
      type: 'object',
      properties: {
        environment: {
          type: 'string',
          enum: ['development', 'staging', 'production'],
          description: 'Environment to validate',
        },
        templatePath: {
          type: 'string',
          description: 'Path to secrets template file',
          default: 'SECRETS_COMPLETE_LIST.md',
        },
      },
      required: ['environment'],
    },
  },
];

// Tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools,
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'store_secret': {
        const { key, value, environment, expiresInDays, tags } = args as any;
        await vault.store(key, value, environment, { expiresInDays, tags });
        await logger.log('store', key, environment);
        return {
          content: [
            {
              type: 'text',
              text: `✅ Secret "${key}" stored securely in ${environment}${
                expiresInDays ? ` (expires in ${expiresInDays} days)` : ''
              }`,
            },
          ],
        };
      }

      case 'get_secret': {
        const { key, environment } = args as any;
        const secret = await vault.get(key, environment);
        await logger.log('get', key, environment);
        return {
          content: [
            {
              type: 'text',
              text: secret
                ? `🔑 ${key} = ${secret.value}\n\nStored: ${secret.createdAt}\nExpires: ${
                    secret.expiresAt || 'Never'
                  }`
                : `❌ Secret "${key}" not found in ${environment}`,
            },
          ],
        };
      }

      case 'list_secrets': {
        const { environment, tags, showExpired } = args as any;
        const secrets = await vault.list(environment, { tags, showExpired });
        const formatted = secrets
          .map((s) => {
            const expiry = s.expiresAt
              ? new Date(s.expiresAt) < new Date()
                ? '🔴 EXPIRED'
                : `⏰ ${s.expiresAt}`
              : '♾️  No expiry';
            return `• ${s.key} [${s.environment}] - ${expiry}\n  Tags: ${
              s.tags?.join(', ') || 'none'
            }`;
          })
          .join('\n');
        return {
          content: [
            {
              type: 'text',
              text: `📋 Secrets (${secrets.length}):\n\n${formatted}`,
            },
          ],
        };
      }

      case 'generate_secret': {
        const { type, length, store, key, environment } = args as any;
        const newSecret = generator.generate(type, length);

        if (store && key && environment) {
          await vault.store(key, newSecret, environment);
          await logger.log('generate', key, environment);
          return {
            content: [
              {
                type: 'text',
                text: `🎲 Generated and stored "${key}":\n\n${newSecret}`,
              },
            ],
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: `🎲 Generated ${type} secret:\n\n${newSecret}\n\n⚠️  Copy now! This won't be shown again.`,
            },
          ],
        };
      }

      case 'rotate_secret': {
        const { key, environment, deployToVercel, deployToCoolify } = args as any;
        const oldSecret = await vault.get(key, environment);
        if (!oldSecret) {
          return {
            content: [
              { type: 'text', text: `❌ Secret "${key}" not found in ${environment}` },
            ],
          };
        }

        const newValue = generator.generate('base64', 32);
        await vault.store(key, newValue, environment);

        const deployments = [];
        if (deployToVercel) {
          await deployer.deployToVercel(key, newValue, environment);
          deployments.push('Vercel');
        }
        if (deployToCoolify) {
          await deployer.deployToCoolify(key, newValue, environment);
          deployments.push('Coolify');
        }

        await logger.log('rotate', key, environment);

        return {
          content: [
            {
              type: 'text',
              text: `🔄 Rotated "${key}" in ${environment}\n\nNew value: ${newValue}\n${
                deployments.length > 0
                  ? `\n✅ Deployed to: ${deployments.join(', ')}`
                  : ''
              }`,
            },
          ],
        };
      }

      case 'export_env_file': {
        const { environment, outputPath, format } = args as any;
        const exported = await vault.export(environment, format);
        await vault.writeFile(outputPath, exported);
        await logger.log('export', outputPath, environment);
        return {
          content: [
            {
              type: 'text',
              text: `📤 Exported ${environment} secrets to ${outputPath} (${format} format)`,
            },
          ],
        };
      }

      case 'deploy_to_vercel': {
        const { environment, secrets, projectId } = args as any;
        const result = await deployer.deployToVercel(
          secrets || (await vault.list(environment)).map((s) => s.key),
          environment,
          { projectId }
        );
        await logger.log('deploy', 'vercel', environment);
        return {
          content: [
            {
              type: 'text',
              text: `🚀 Deployed ${result.count} secrets to Vercel (${environment})\n\n${result.message}`,
            },
          ],
        };
      }

      case 'deploy_to_coolify': {
        const { environment, secrets, serviceId, coolifyUrl } = args as any;
        const result = await deployer.deployToCoolify(
          secrets || (await vault.list(environment)).map((s) => s.key),
          environment,
          { serviceId, coolifyUrl }
        );
        await logger.log('deploy', 'coolify', environment);
        return {
          content: [
            {
              type: 'text',
              text: `🚀 Deployed ${result.count} secrets to Coolify (${environment})\n\n${result.message}`,
            },
          ],
        };
      }

      case 'check_expiring_secrets': {
        const { daysThreshold, environment } = args as any;
        const expiring = await vault.getExpiring(daysThreshold, environment);
        const formatted = expiring
          .map(
            (s) =>
              `• ${s.key} [${s.environment}] - Expires ${s.expiresAt} (${s.daysRemaining} days)`
          )
          .join('\n');
        return {
          content: [
            {
              type: 'text',
              text:
                expiring.length > 0
                  ? `⚠️  ${expiring.length} secrets expiring soon:\n\n${formatted}`
                  : `✅ No secrets expiring within ${daysThreshold} days`,
            },
          ],
        };
      }

      case 'audit_log': {
        const { limit, operation, environment } = args as any;
        const logs = await logger.getLogs({ limit, operation, environment });
        const formatted = logs
          .map(
            (log) =>
              `${log.timestamp} | ${log.operation.toUpperCase()} | ${log.key} | ${
                log.environment
              } | ${log.user || 'system'}`
          )
          .join('\n');
        return {
          content: [
            {
              type: 'text',
              text: `📜 Audit Log (${logs.length} entries):\n\n${formatted}`,
            },
          ],
        };
      }

      case 'validate_secrets': {
        const { environment, templatePath } = args as any;
        const validation = await vault.validate(environment, templatePath);
        const missing = validation.missing.map((k) => `  ❌ ${k}`).join('\n');
        const present = validation.present.map((k) => `  ✅ ${k}`).join('\n');
        return {
          content: [
            {
              type: 'text',
              text: `🔍 Validation for ${environment}:\n\nPresent (${validation.present.length}):\n${present}\n\nMissing (${validation.missing.length}):\n${missing}\n\nCoverage: ${validation.coverage}%`,
            },
          ],
        };
      }

      default:
        return {
          content: [{ type: 'text', text: `❌ Unknown tool: ${name}` }],
          isError: true,
        };
    }
  } catch (error: any) {
    return {
      content: [{ type: 'text', text: `❌ Error: ${error.message}` }],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('🔐 Secrets Manager MCP Server running on stdio');
}

main().catch(console.error);
