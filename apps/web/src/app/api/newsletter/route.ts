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
 * Get client IP for rate limiting
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
 * Check rate limit (10 requests per hour per IP)
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
 * Honeypot validation - catches bots
 */
function validateHoneypot(request: unknown): boolean {
  if (typeof request !== 'object' || !request) return true;
  const obj = request as Record<string, unknown>;
  // If honeypot field is filled, it's a bot
  return !obj.website || obj.website === '';
}

/**
 * Add email to Ghost Members API
 * Falls back to Resend if Ghost not configured
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
 * POST handler for newsletter signup
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
 * GET handler - for healthchecks
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'newsletter-api',
  });
}
