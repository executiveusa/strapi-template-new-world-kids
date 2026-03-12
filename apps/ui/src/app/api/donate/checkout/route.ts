/**
 * Stripe Checkout Session Creator
 * Handles one-time and recurring donations
 */

import { NextRequest, NextResponse } from 'next/server'

// Mock Stripe for demonstration
// In production, use: import Stripe from 'stripe'
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

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

    // TODO: Implement real Stripe session creation
    // For now, return mock response
    const mockSessionId = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // In production:
    /*
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
            unit_amount: body.amount * 100,
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
    */

    return NextResponse.json({
      sessionId: mockSessionId,
      message: 'Mock Stripe session created. Configure STRIPE_SECRET_KEY for production.',
    })
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
    // TODO: Verify Stripe webhook signature
    // const sig = request.headers.get('stripe-signature')
    // const event = await stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)

    // Mock webhook handling
    const payload = await request.json()

    switch (payload.type) {
      case 'charge.succeeded':
        // Log donation
        console.log('✅ Donation successful:', {
          amount: payload.data.object.amount,
          email: payload.data.object.billing_details.email,
        })

        // TODO: Update donations table
        // await db.donations.create({
        //   amount: payload.data.object.amount / 100,
        //   donor_email: payload.data.object.billing_details.email,
        //   payment_provider: 'stripe',
        //   payment_provider_id: payload.data.object.id,
        //   payment_status: 'completed',
        // })

        break

      case 'customer.subscription.created':
        console.log('✅ Subscription created:', payload.data.object.id)
        // TODO: Track subscription in database

        break

      case 'charge.failed':
        console.error('❌ Donation failed:', payload.data.object.id)
        // TODO: Log failed donation attempt

        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 400 }
    )
  }
}
