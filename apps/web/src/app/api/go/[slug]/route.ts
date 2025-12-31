import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  
  const result = await payload.find({
    collection: 'affiliate-links',
    where: { cloakedSlug: { equals: slug }, isActive: { equals: true } },
    limit: 1,
  })

  if (!result.docs || result.docs.length === 0) {
    return NextResponse.json({ error: 'Link not found' }, { status: 404 })
  }

  const link = result.docs[0]
  
  // Track click
  await payload.update({
    collection: 'affiliate-links',
    id: link.id,
    data: { analytics: { clicks: (link.analytics?.clicks || 0) + 1 } },
  })

  return NextResponse.redirect(link.originalUrl, { status: 302 })
}
