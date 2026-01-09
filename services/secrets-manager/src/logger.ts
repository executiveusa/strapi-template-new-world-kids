/**
 * Audit logger for secret operations
 */

import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

interface LogEntry {
  timestamp: string;
  operation: string;
  key: string;
  environment: string;
  user: string;
  ip?: string;
}

export class AuditLogger {
  private logPath: string;

  constructor() {
    const homeDir = process.env.HOME || process.env.USERPROFILE || '.';
    this.logPath = path.join(homeDir, '.nwk-secrets', 'audit.log');
  }

  async log(operation: string, key: string, environment: string): Promise<void> {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      operation,
      key,
      environment,
      user: os.userInfo().username,
    };

    const logDir = path.dirname(this.logPath);
    await fs.mkdir(logDir, { recursive: true });

    await fs.appendFile(
      this.logPath,
      JSON.stringify(entry) + '\n',
      { mode: 0o600 }
    );
  }

  async getLogs(options?: {
    limit?: number;
    operation?: string;
    environment?: string;
  }): Promise<LogEntry[]> {
    try {
      const data = await fs.readFile(this.logPath, 'utf8');
      let logs: LogEntry[] = data
        .split('\n')
        .filter(Boolean)
        .map((line: string) => JSON.parse(line) as LogEntry);

      if (options?.operation && options.operation !== 'all') {
        logs = logs.filter((log: LogEntry) => log.operation === options.operation);
      }

      if (options?.environment && options.environment !== 'all') {
        logs = logs.filter((log: LogEntry) => log.environment === options.environment);
      }

      if (options?.limit) {
        logs = logs.slice(-options.limit);
      }

      return logs.reverse();
    } catch {
      return [];
    }
  }
}
