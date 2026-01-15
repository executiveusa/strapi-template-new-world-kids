/**
 * Encrypted secrets vault using bcrypt + filesystem storage
 */

import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

interface Secret {
  key: string;
  value: string;
  environment: string;
  createdAt: string;
  expiresAt?: string;
  tags?: string[];
}

export class SecretsVault {
  private vaultDir: string;
  private encryptionKey: string;

  constructor() {
    this.vaultDir = path.join(process.env.HOME || process.env.USERPROFILE || '.', '.nwk-secrets');
    this.encryptionKey = process.env.VAULT_ENCRYPTION_KEY || this.getOrCreateMasterKey();
  }

  private getOrCreateMasterKey(): string {
    const keyPath = path.join(this.vaultDir, '.master.key');
    try {
      return require('fs').readFileSync(keyPath, 'utf8');
    } catch {
      const key = crypto.randomBytes(32).toString('hex');
      require('fs').mkdirSync(this.vaultDir, { recursive: true });
      require('fs').writeFileSync(keyPath, key, { mode: 0o600 });
      return key;
    }
  }

  private encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(this.encryptionKey, 'hex'),
      iv
    );
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  }

  private decrypt(text: string): string {
    const parts = text.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(this.encryptionKey, 'hex'),
      iv
    );
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  async store(
    key: string,
    value: string,
    environment: string,
    options?: { expiresInDays?: number; tags?: string[] }
  ): Promise<void> {
    await fs.mkdir(this.vaultDir, { recursive: true });

    const secret: Secret = {
      key,
      value: this.encrypt(value),
      environment,
      createdAt: new Date().toISOString(),
      expiresAt: options?.expiresInDays
        ? new Date(Date.now() + options.expiresInDays * 24 * 60 * 60 * 1000).toISOString()
        : undefined,
      tags: options?.tags,
    };

    const filePath = path.join(this.vaultDir, `${environment}.${key}.json`);
    await fs.writeFile(filePath, JSON.stringify(secret, null, 2), { mode: 0o600 });
  }

  async get(key: string, environment: string): Promise<Secret | null> {
    const filePath = path.join(this.vaultDir, `${environment}.${key}.json`);
    try {
      const data = await fs.readFile(filePath, 'utf8');
      const secret: Secret = JSON.parse(data);
      secret.value = this.decrypt(secret.value);
      return secret;
    } catch {
      return null;
    }
  }

  async list(
    environment: string = 'all',
    options?: { tags?: string[]; showExpired?: boolean }
  ): Promise<Omit<Secret, 'value'>[]> {
    await fs.mkdir(this.vaultDir, { recursive: true });
    const files = await fs.readdir(this.vaultDir);

    const secrets = await Promise.all(
      files
        .filter((f: string) => f.endsWith('.json') && !f.startsWith('.'))
        .filter((f: string) => environment === 'all' || f.startsWith(environment))
        .map(async (file: string) => {
          const data = await fs.readFile(path.join(this.vaultDir, file), 'utf8');
          const secret: Secret = JSON.parse(data);
          const { value, ...meta } = secret;
          return meta;
        })
    );

    let filtered: Omit<Secret, 'value'>[] = secrets;

    if (options?.tags) {
      filtered = filtered.filter((s: Omit<Secret, 'value'>) =>
        options.tags!.some((tag) => s.tags?.includes(tag))
      );
    }

    if (!options?.showExpired) {
      filtered = filtered.filter(
        (s: Omit<Secret, 'value'>) => !s.expiresAt || new Date(s.expiresAt) > new Date()
      );
    }

    return filtered;
  }

  async export(environment: string, format: 'dotenv' | 'json' | 'yaml'): Promise<string> {
    const secrets = await this.list(environment);
    const values = await Promise.all(
      secrets.map(async (s) => {
        const secret = await this.get(s.key, s.environment);
        return { key: s.key, value: secret!.value };
      })
    );

    switch (format) {
      case 'dotenv':
        return values.map(({ key, value }) => `${key}=${value}`).join('\n');
      case 'json':
        return JSON.stringify(
          Object.fromEntries(values.map(({ key, value }) => [key, value])),
          null,
          2
        );
      case 'yaml':
        return values.map(({ key, value }) => `${key}: ${value}`).join('\n');
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }

  async writeFile(filePath: string, content: string): Promise<void> {
    await fs.writeFile(filePath, content, { mode: 0o600 });
  }

  async getExpiring(
    daysThreshold: number,
    environment: string = 'all'
  ): Promise<Array<Omit<Secret, 'value'> & { daysRemaining: number }>> {
    const secrets = await this.list(environment, { showExpired: false });
    const threshold = Date.now() + daysThreshold * 24 * 60 * 60 * 1000;

    return secrets
      .filter((s) => s.expiresAt && new Date(s.expiresAt).getTime() < threshold)
      .map((s) => ({
        ...s,
        daysRemaining: Math.floor(
          (new Date(s.expiresAt!).getTime() - Date.now()) / (24 * 60 * 60 * 1000)
        ),
      }));
  }

  async validate(
    environment: string,
    templatePath: string
  ): Promise<{ present: string[]; missing: string[]; coverage: number }> {
    // Read template file and extract required keys
    const template = await fs.readFile(templatePath, 'utf8');
    const matches = template.matchAll(/^([A-Z_][A-Z0-9_]*)=/gm);
    const requiredKeys: string[] = [];
    for (const m of matches) {
      if (m[1]) requiredKeys.push(m[1]);
    }

    const storedSecrets = await this.list(environment);
    const storedKeys = storedSecrets.map((s) => s.key);

    const present = requiredKeys.filter((k) => storedKeys.includes(k));
    const missing = requiredKeys.filter((k) => !storedKeys.includes(k));
    const coverage = Math.round((present.length / requiredKeys.length) * 100);

    return { present, missing, coverage };
  }
}
