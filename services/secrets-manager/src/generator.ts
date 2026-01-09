/**
 * Cryptographically secure secret generator
 */

import crypto from 'crypto';

export class SecretsGenerator {
  generate(type: string, length: number = 32): string {
    switch (type) {
      case 'jwt':
      case 'base64':
        return crypto.randomBytes(length).toString('base64');

      case 'api_key':
        // Format: sk_prod_<40_random_chars>
        const prefix = 'sk_prod_';
        const random = crypto.randomBytes(20).toString('hex');
        return prefix + random;

      case 'password':
        // Strong password with mixed characters
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        let password = '';
        const bytes = crypto.randomBytes(length);
        for (let i = 0; i < length; i++) {
          password += chars[bytes[i] % chars.length];
        }
        return password;

      case 'uuid':
        return crypto.randomUUID();

      default:
        throw new Error(`Unknown secret type: ${type}`);
    }
  }
}
