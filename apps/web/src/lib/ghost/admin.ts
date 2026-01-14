import crypto from 'crypto';

type GhostMemberPayload = {
  email: string;
  name?: string;
  subscribed?: boolean;
};

const ADMIN_AUDIENCE = '/admin/';
const DEFAULT_JWT_EXPIRATION_SECONDS = 5 * 60; // 5 minutes

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
  
  // Allow configurable JWT expiration via environment variable.
  // Increase this value if Ghost Admin API calls may take longer in certain scenarios
  // (e.g., high latency networks, slow Ghost instances).
  const expirationSeconds = process.env.GHOST_ADMIN_JWT_EXPIRATION_SECONDS
    ? parseInt(process.env.GHOST_ADMIN_JWT_EXPIRATION_SECONDS, 10)
    : DEFAULT_JWT_EXPIRATION_SECONDS;
  
  const header = { alg: 'HS256', typ: 'JWT', kid: id };
  const payload = { iat, exp: iat + expirationSeconds, aud: ADMIN_AUDIENCE };

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
    const statusInfo = response.statusText
      ? `${response.status} ${response.statusText}`
      : `${response.status}`;
    let message = `Ghost Admin API error (${statusInfo})`;
    const serverMessage = errorData?.errors?.[0]?.message;
    if (serverMessage) {
      message += `: ${serverMessage}`;
    }
    throw new Error(message);
  }

  return true;
}
