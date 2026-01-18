import crypto from 'crypto';

type GhostMemberPayload = {
  email: string;
  name?: string;
  subscribed?: boolean;
};

const ADMIN_AUDIENCE = '/admin/';
const DEFAULT_TOKEN_EXPIRY_SECONDS = 5 * 60; // 5 minutes
const MAX_TOKEN_EXPIRY_SECONDS = 24 * 60 * 60; // 24 hours maximum for security

/**
 * Parse and validate the token expiry setting at module initialization.
 * This ensures consistent behavior and better performance across all token generations.
 */
function parseTokenExpiry(): number {
  let expirySeconds = DEFAULT_TOKEN_EXPIRY_SECONDS;
  const rawExpiry = process.env.GHOST_ADMIN_TOKEN_EXPIRY_SECONDS;
  
  if (rawExpiry !== undefined) {
    const parsed = parseInt(rawExpiry, 10);
    if (!isNaN(parsed) && parsed > 0 && parsed <= MAX_TOKEN_EXPIRY_SECONDS) {
      expirySeconds = parsed;
    } else {
      console.warn(
        `Invalid GHOST_ADMIN_TOKEN_EXPIRY_SECONDS value "${rawExpiry}". ` +
          `Using default of ${DEFAULT_TOKEN_EXPIRY_SECONDS} seconds (allowed range: 1-${MAX_TOKEN_EXPIRY_SECONDS}).`,
      );
    }
  }
  
  return expirySeconds;
}

const TOKEN_EXPIRY_SECONDS = parseTokenExpiry();

/**
 * Determine whether the Ghost Admin API is configured.
 *
 * @returns `true` if both the Ghost admin URL and Admin API key are set.
 */
export function isGhostAdminConfigured(): boolean {
  const url = process.env.GHOST_ADMIN_API_URL || process.env.GHOST_CONTENT_API_URL;
  const key = process.env.GHOST_ADMIN_API_KEY;
  return Boolean(url && key);
}

function base64UrlEncode(value: string): string {
  return Buffer.from(value).toString('base64url');
}

function createAdminToken(adminApiKey: string): string {
  const parts = adminApiKey.split(':');
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw new Error("Invalid Ghost Admin API key format. Expected format: 'id:secret'.");
  }
  const [id, secret] = parts;

  const iat = Math.floor(Date.now() / 1000);
  const header = { alg: 'HS256', typ: 'JWT', kid: id };
  const payload = { iat, exp: iat + TOKEN_EXPIRY_SECONDS, aud: ADMIN_AUDIENCE };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = crypto
    .createHmac('sha256', Buffer.from(secret, 'hex'))
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

function getAdminApiBaseUrl(): string {
  const url = process.env.GHOST_ADMIN_API_URL || process.env.GHOST_CONTENT_API_URL;
  if (!url) {
    throw new Error('Ghost Admin API URL not configured.');
  }

  return url.replace(/\/$/, '');
}

/**
 * Add a member to Ghost via the Admin API.
 *
 * @param member - Ghost member payload, including required email and optional name/subscribed flags.
 * @returns `true` when Ghost accepts the new member.
 * @throws Error if the request fails or Ghost returns errors.
 */
export async function addGhostMember(member: GhostMemberPayload): Promise<boolean> {
  const adminApiKey = process.env.GHOST_ADMIN_API_KEY;
  if (!adminApiKey) {
    throw new Error('Ghost Admin API key not configured.');
  }

  const token = createAdminToken(adminApiKey);
  const baseUrl = getAdminApiBaseUrl();
  const response = await fetch(`${baseUrl}/ghost/api/admin/members/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Ghost ${token}`,
    },
    body: JSON.stringify({
      members: [member],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message =
      errorData?.errors?.[0]?.message || `Ghost Admin API error (${response.status})`;
    throw new Error(message);
  }

  return true;
}
