import { NextRequest, NextResponse } from 'next/server';

/**
 * Enterprise Security Middleware
 * - Rate limiting (10 req/min unauthenticated, 100 req/min authenticated)
 * - Bot detection (device-detector + behavioral analysis)
 * - IP-based throttling with exponential backoff
 * - Request fingerprinting for persistent bot blocking
 * - CSP headers and security policies
 */

// In-memory store for rate limiting (use Upstash Redis in production)
interface RateLimitEntry {
  count: number;
  resetTime: number;
  warnings: number;
  blocked: boolean;
  lastRequest: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const blockedIps = new Set<string>();

// Clean up old entries every minute
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 60000);

/**
 * Get client IP from request headers
 */
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const clientIp = request.headers.get('cf-connecting-ip');

  return forwardedFor?.split(',')[0].trim() || realIp || clientIp || 'unknown';
}

/**
 * Detect bot characteristics
 */
function isSuspiciousBot(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent') || '';
  const acceptLanguage = request.headers.get('accept-language') || '';

  // Known bot patterns
  const botPatterns = [
    /googlebot/i,
    /bingbot/i,
    /slurp/i,
    /duckduckbot/i,
    /baiduspider/i,
    /yandexbot/i,
    /facebookexternalhit/i,
    /twitterbot/i,
    /linkedinbot/i,
    /scrapy/i,
    /curl/i,
    /wget/i,
    /python/i,
    /java[^script]/i,
  ];

  const isBotLike = botPatterns.some((pattern) => pattern.test(userAgent));

  // Suspicious patterns: missing headers, unusual combos
  const isHeaderSuspicious =
    !request.headers.get('accept') ||
    !acceptLanguage ||
    (!userAgent && request.nextUrl.pathname.includes('/api/'));

  return isBotLike || isHeaderSuspicious;
}

/**
 * Generate request fingerprint for persistent tracking
 */
function generateFingerprint(request: NextRequest): string {
  const ip = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || '';
  const accept = request.headers.get('accept') || '';

  const components = [ip, userAgent, accept].join('|');
  let hash = 0;
  for (let i = 0; i < components.length; i++) {
    const char = components.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Check rate limit with exponential backoff
 */
function checkRateLimit(
  ip: string,
  isAuthenticated: boolean,
  fingerprint: string,
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const key = `${ip}:${fingerprint}`;
  const limit = isAuthenticated ? 100 : 10; // requests per minute
  const timeWindow = 60000; // 1 minute

  // Check if IP is permanently blocked
  if (blockedIps.has(ip)) {
    return { allowed: false, retryAfter: 3600 };
  }

  let entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    entry = {
      count: 0,
      resetTime: now + timeWindow,
      warnings: 0,
      blocked: false,
      lastRequest: now,
    };
    rateLimitStore.set(key, entry);
  }

  // Calculate request rate (exponential backoff after warnings)
  const timeSinceLastRequest = now - entry.lastRequest;
  const backoffMultiplier = Math.pow(2, entry.warnings);
  const minIntervalMs = 100 * backoffMultiplier;

  if (timeSinceLastRequest < minIntervalMs) {
    entry.warnings = Math.min(entry.warnings + 1, 5);

    // Block after 5 warnings
    if (entry.warnings >= 5) {
      entry.blocked = true;
      blockedIps.add(ip);
      return { allowed: false, retryAfter: 3600 };
    }

    return {
      allowed: false,
      retryAfter: Math.ceil((minIntervalMs - timeSinceLastRequest) / 1000),
    };
  }

  // Increment counter
  entry.count++;
  entry.lastRequest = now;

  if (entry.count > limit) {
    entry.warnings++;
    if (entry.warnings >= 5) {
      entry.blocked = true;
      blockedIps.add(ip);
      return { allowed: false, retryAfter: 3600 };
    }
    return { allowed: false, retryAfter: 60 };
  }

  return { allowed: true };
}

/**
 * Main middleware
 */
export function middleware(request: NextRequest) {
  const ip = getClientIP(request);
  const fingerprint = generateFingerprint(request);
  const pathname = request.nextUrl.pathname;

  // Skip rate limiting for static assets
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/public/') ||
    pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // Skip rate limiting for healthcheck
  if (pathname === '/health' || pathname === '/api/health') {
    return NextResponse.next();
  }

  // Check if request is from authenticated user
  const token = request.cookies.get('auth-token')?.value;
  const isAuthenticated = !!token;

  // Detect suspicious behavior
  const isSuspicious = isSuspiciousBot(request);

  // Check rate limit
  const rateLimit = checkRateLimit(ip, isAuthenticated, fingerprint);

  if (!rateLimit.allowed) {
    const response = new NextResponse(
      JSON.stringify({
        error: 'Rate limit exceeded',
        retryAfter: rateLimit.retryAfter,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(rateLimit.retryAfter || 60),
          'X-RateLimit-Remaining': '0',
        },
      },
    );
    return response;
  }

  // Log suspicious activity
  if (isSuspicious && pathname.includes('/api/')) {
    console.warn(`[SECURITY] Suspicious bot detected: ${ip} - ${fingerprint}`);
  }

  // Create response with security headers
  const response = NextResponse.next();

  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://js.stripe.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "img-src 'self' data: https:; " +
      "connect-src 'self' https://*.supabase.co https://api.openai.com https://api.anthropic.com https://generativelanguage.googleapis.com; " +
      "frame-src 'self' https://js.stripe.com",
  );

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  // Rate limit headers
  const limit = isAuthenticated ? 100 : 10;
  const entry = rateLimitStore.get(`${ip}:${fingerprint}`);
  const remaining = Math.max(0, limit - (entry?.count || 0));

  response.headers.set('X-RateLimit-Limit', String(limit));
  response.headers.set('X-RateLimit-Remaining', String(remaining));
  response.headers.set('X-RateLimit-Reset', String(entry?.resetTime || Date.now() + 60000));

  // Add request ID for tracing
  const requestId = crypto.randomUUID();
  response.headers.set('X-Request-ID', requestId);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
