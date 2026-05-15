/**
 * Stripe Checkout Session Creator
 * Handles one-time and recurring donations
 */

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

interface CheckoutRequest {
  amount: number // Amount in USD cents
  frequency: 'one-time' | 'monthly' | 'annual'
  projectId?: string
  returnUrl: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json()

    // Validation
    if (!body.amount || body.amount < 100) {
      return NextResponse.json(
        { error: 'Minimum donation is $1.00' },
        { status: 400 }
      )
    }

    if (!['one-time', 'monthly', 'annual'].includes(body.frequency)) {
      return NextResponse.json(
        { error: 'Invalid frequency' },
        { status: 400 }
      )
    }

    // Validate Stripe API key
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.' },
        { status: 500 }
      )
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20',
    })

    // Create real Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Donation to New World Kids${body.projectId ? ` - Project: ${body.projectId}` : ''}`,
              description: `Support tech education for youth in Seattle`,
            },
            unit_amount: body.amount,
            ...(body.frequency !== 'one-time' && {
              recurring: {
                interval: body.frequency === 'monthly' ? 'month' : 'year',
              },
            }),
          },
          quantity: 1,
        },
      ],
      mode: body.frequency === 'one-time' ? 'payment' : 'subscription',
      success_url: `${body.returnUrl}?session_id={CHECKOUT_SESSION_ID}&status=success`,
      cancel_url: `${body.returnUrl}?status=cancelled`,
      billing_address_collection: 'auto',
      customer_email_collection: 'always',
      metadata: {
        projectId: body.projectId || 'general',
        frequency: body.frequency,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      {
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Handle webhook from Stripe
export async function PUT(request: NextRequest) {
  try {
    // Verify Stripe webhook signature
    const sig = request.headers.get('stripe-signature')
    if (!sig) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    const body = await request.text()

    let event: Stripe.Event
    try {
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
      if (!webhookSecret) {
        console.warn('STRIPE_WEBHOOK_SECRET not configured')
        // For development, allow unverified webhooks
        event = JSON.parse(body) as Stripe.Event
      } else {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
      }
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid stripe-signature' },
        { status: 400 }
      )
    }

    // Handle different Stripe events
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log('✅ Checkout session completed:', {
          sessionId: session.id,
          amount: session.amount_total,
          email: session.customer_email,
          mode: session.mode,
        })

        // Save donation to Strapi
        try {
          const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337'
          const strapiToken = process.env.STRAPI_TOKEN

          await fetch(`${strapiUrl}/api/donations`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(strapiToken && { Authorization: `Bearer ${strapiToken}` }),
            },
            body: JSON.stringify({
              data: {
                amount: (session.amount_total || 0) / 100,
                currency: session.currency || 'usd',
                donorEmail: session.customer_email,
                donorName: session.customer_details?.name,
                paymentProvider: 'stripe',
                stripeSessionId: session.id,
                stripePaymentIntentId: session.payment_intent as string,
                stripeSubscriptionId: session.subscription as string | undefined,
                paymentStatus: 'completed',
                frequency: session.metadata?.frequency || 'one-time',
                projectId: session.metadata?.projectId || 'general',
                tier: session.metadata?.tier,
                isRecurring: session.mode === 'subscription',
                metadata: session.metadata,
                source: 'website',
                completedAt: new Date().toISOString(),
              },
            }),
          })
        } catch (error) {
          console.error('Failed to save donation to Strapi:', error)
          // Don't fail the webhook - Stripe already processed payment
        }

        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        console.log('✅ Subscription payment succeeded:', {
          invoiceId: invoice.id,
          amount: invoice.amount_paid,
          subscriptionId: invoice.subscription,
        })

        // Track subscription payment in Strapi
        try {
          const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337'
          const strapiToken = process.env.STRAPI_TOKEN

          await fetch(`${strapiUrl}/api/donations`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(strapiToken && { Authorization: `Bearer ${strapiToken}` }),
            },
            body: JSON.stringify({
              data: {
                amount: invoice.amount_paid / 100,
                currency: invoice.currency || 'usd',
                donorEmail: invoice.customer_email,
                paymentProvider: 'stripe',
                stripeSubscriptionId: invoice.subscription as string,
                paymentStatus: 'completed',
                frequency: 'monthly', // From subscription
                projectId: 'general',
                isRecurring: true,
                metadata: { invoiceId: invoice.id },
                source: 'website',
                completedAt: new Date().toISOString(),
              },
            }),
          })
        } catch (error) {
          console.error('Failed to log subscription payment:', error)
        }

        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        console.error('❌ Subscription payment failed:', {
          invoiceId: invoice.id,
          subscriptionId: invoice.subscription,
          reason: invoice.last_finalization_error?.message,
        })

        // Log failed subscription payment in Strapi
        try {
          const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337'
          const strapiToken = process.env.STRAPI_TOKEN

          await fetch(`${strapiUrl}/api/donations`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(strapiToken && { Authorization: `Bearer ${strapiToken}` }),
            },
            body: JSON.stringify({
              data: {
                amount: invoice.amount_due / 100,
                currency: invoice.currency || 'usd',
                donorEmail: invoice.customer_email,
                paymentProvider: 'stripe',
                stripeSubscriptionId: invoice.subscription as string,
                paymentStatus: 'failed',
                frequency: 'monthly',
                projectId: 'general',
                isRecurring: true,
                metadata: { invoiceId: invoice.id },
                failureReason: invoice.last_finalization_error?.message,
                failedAt: new Date().toISOString(),
                source: 'website',
              },
            }),
          })
        } catch (error) {
          console.error('Failed to log failed payment:', error)
        }

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        console.log('✅ Subscription cancelled:', {
          subscriptionId: subscription.id,
          cancelledAt: subscription.canceled_at,
        })

        // Mark subscription as cancelled in Strapi
        try {
          const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337'
          const strapiToken = process.env.STRAPI_TOKEN

          // Find donations with this subscription ID and update status
          const response = await fetch(
            `${strapiUrl}/api/donations?filters[stripeSubscriptionId][$eq]=${subscription.id}&pagination[limit]=100`,
            {
              headers: {
                'Content-Type': 'application/json',
                ...(strapiToken && { Authorization: `Bearer ${strapiToken}` }),
              },
            }
          )

          const { data: donations } = await response.json()

          // Update each donation record to mark as cancelled
          if (donations && donations.length > 0) {
            const cancelledAt = new Date(subscription.canceled_at! * 1000).toISOString()

            for (const donation of donations) {
              await fetch(`${strapiUrl}/api/donations/${donation.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  ...(strapiToken && { Authorization: `Bearer ${strapiToken}` }),
                },
                body: JSON.stringify({
                  data: {
                    paymentStatus: 'cancelled',
                    metadata: {
                      ...donation.attributes.metadata,
                      cancelledAt,
                      cancelReason: subscription.cancellation_details?.reason,
                    },
                  },
                }),
              })
            }
          }
        } catch (error) {
          console.error('Failed to mark subscription as cancelled:', error)
        }

        break
      }

      default:
        console.log('ℹ️ Unhandled Stripe event type:', event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      {
        error: 'Webhook processing failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 }
    )
  }
}
