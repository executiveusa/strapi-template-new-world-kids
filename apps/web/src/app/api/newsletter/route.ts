import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Email validation schema
const EmailSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.enum(['blog', 'homepage', 'sidebar']).optional().default('blog'),
  name: z.string().optional(),
});

type EmailRequest = z.infer<typeof EmailSchema>;

/**
 * Determine the client's IP address from the incoming request.
 *
 * @param request - The incoming NextRequest whose headers or connection info will be inspected to derive the client IP.
 * @returns The resolved client IP address, using header values (`x-forwarded-for`, `x-real-ip`) or `request.ip`, falling back to `'127.0.0.1'` if none are available.
 */
function getClientIP(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    request.ip ||
    '127.0.0.1'
  );
}

/**
 * Determine whether the given IP is allowed to make a request under the per-IP rate limit.
 *
 * Enforces a limit of 10 requests per 1-hour window per IP address; when the window expires the count is reset.
 *
 * @param ip - Client IP address used to track request count
 * @returns `true` if the request is allowed, `false` if the IP has exceeded 10 requests within the current 1-hour window
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitStore.get(ip);

  // Clear old limit window
  if (limit && now > limit.resetTime) {
    rateLimitStore.delete(ip);
    return true;
  }

  // Check if limit exceeded
  if (limit && limit.count >= 10) {
    return false;
  }

  // Increment counter
  if (limit) {
    limit.count++;
  } else {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + 60 * 60 * 1000, // 1 hour
    });
  }

  return true;
}

/**
 * Detects whether a request body passes the honeypot bot check.
 *
 * Treats non-object or null inputs as passing. Considers the presence of a non-empty
 * `website` field in the body to indicate a bot submission.
 *
 * @param request - The parsed request body to inspect
 * @returns `true` if the request passes the honeypot check (not a bot), `false` otherwise
 */
function validateHoneypot(request: unknown): boolean {
  if (typeof request !== 'object' || !request) return true;
  const obj = request as Record<string, unknown>;
  // If honeypot field is filled, it's a bot
  return !obj.website || obj.website === '';
}

/**
 * Subscribe an email address to the newsletter using configured providers and fallbacks.
 *
 * Attempts to add the subscriber via the Ghost Members API when configured, falls back to sending
 * a welcome email via Resend if Ghost is unavailable, and finally logs the signup as a last resort.
 *
 * @param email - Subscriber email address
 * @param name - Optional subscriber display name
 * @returns An object with `success` indicating whether the signup was accepted, `message` describing the outcome, and an optional `error` with failure details when available
 */
async function addToNewsletterService(
  email: string,
  name?: string
): Promise<{
  success: boolean;
  message: string;
  error?: string;
}> {
  // Option 1: Try Ghost Members API
  const ghostUrl = process.env.GHOST_CONTENT_API_URL;
  const ghostAdminKey = process.env.GHOST_ADMIN_API_KEY;

  if (ghostUrl && ghostAdminKey) {
    try {
      const response = await fetch(`${ghostUrl}/ghost/api/admin/members/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Ghost ${ghostAdminKey}`,
        },
        body: JSON.stringify({
          members: [
            {
              email,
              name: name || undefined,
              subscribed: true,
            },
          ],
        }),
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Successfully subscribed to newsletter',
        };
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.errors?.[0]?.message || 'Failed to subscribe via Ghost'
        );
      }
    } catch (ghostError) {
      console.error('Ghost API error:', ghostError);
      // Fall through to Resend
    }
  }

  // Option 2: Use Resend email service
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'noreply@newworldkids.org',
          to: email,
          subject: 'Welcome to New World Kids Newsletter',
          html: `
            <h1>Welcome to New World Kids!</h1>
            <p>Thank you for subscribing to our newsletter. You'll receive updates on:</p>
            <ul>
              <li>Impact stories from our projects</li>
              <li>Lessons from the field</li>
              <li>Resources for sustainable development</li>
              <li>Ways you can contribute</li>
            </ul>
            <p>Welcome to building for 7 generations.</p>
          `,
        }),
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Welcome email sent! Check your inbox.',
        };
      }
    } catch (resendError) {
      console.error('Resend API error:', resendError);
    }
  }

  // Fallback: Success response (data stored in logs)
  console.log('Newsletter signup:', { email, name, timestamp: new Date() });
  return {
    success: true,
    message: 'Thank you for subscribing!',
  };
}

/**
 * Handle newsletter signup requests.
 *
 * Enforces a per-IP rate limit, performs a honeypot bot check, validates the request body against the email schema,
 * and attempts to subscribe the provided email using configured newsletter services (with fallbacks).
 *
 * @param request - Incoming Next.js request containing the JSON signup payload
 * @returns A NextResponse whose JSON body is `{ success: boolean, message?: string, error?: string }`. Uses HTTP
 * status codes to indicate the outcome: 200 on success, 400 for validation errors, 429 for rate limiting, and 500
 * for server-side failures.
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Check honeypot
    if (!validateHoneypot(body)) {
      // Silently fail for bot requests
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you for subscribing!',
        },
        { status: 200 }
      );
    }

    // Validate email
    const validation = EmailSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.errors[0]?.message || 'Invalid input',
        },
        { status: 400 }
      );
    }

    const { email, name, source } = validation.data;

    // Add to newsletter service
    const result = await addToNewsletterService(email, name);

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: result.message,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to subscribe',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

/**
 * Provide a simple health check response for the newsletter API.
 *
 * @returns A JSON response with `{ status: 'ok', service: 'newsletter-api' }` indicating the service is healthy.
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'newsletter-api',
  });
}