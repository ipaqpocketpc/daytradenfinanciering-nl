import { NextRequest, NextResponse } from 'next/server'
import { getAffiliateUrl, getAffiliateName } from '@/config/analytics'

// GET /go/[firm] - Redirect to affiliate URL with tracking
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ firm: string }> }
) {
  const { firm } = await params
  const firmSlug = firm.toLowerCase()

  // Get affiliate URL
  const affiliateUrl = getAffiliateUrl(firmSlug)
  const firmName = getAffiliateName(firmSlug)

  // If no affiliate found, redirect to prop-firms page
  if (!affiliateUrl) {
    return NextResponse.redirect(new URL('/prop-firms', request.url))
  }

  // Log the click (server-side)
  // In production, you might want to store this in a database
  console.log(`[Affiliate Click] ${firmName} (${firmSlug}) - ${new Date().toISOString()}`)

  // Get referrer for tracking
  const referrer = request.headers.get('referer') || 'direct'
  const userAgent = request.headers.get('user-agent') || 'unknown'

  // You could send this to a logging service or database
  // await logAffiliateClick({ firmSlug, firmName, referrer, userAgent, timestamp: new Date() })

  // Create redirect response
  // Using 307 (Temporary Redirect) so it can be changed later
  // and browsers don't cache it permanently
  const response = NextResponse.redirect(affiliateUrl, {
    status: 307,
  })

  // Add headers to prevent caching of the redirect itself
  // (so we can always track clicks)
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')

  return response
}

// Optional: HEAD request for link checkers
export async function HEAD(
  request: NextRequest,
  { params }: { params: Promise<{ firm: string }> }
) {
  const { firm } = await params
  const firmSlug = firm.toLowerCase()
  const affiliateUrl = getAffiliateUrl(firmSlug)

  if (!affiliateUrl) {
    return new NextResponse(null, { status: 404 })
  }

  return new NextResponse(null, {
    status: 200,
    headers: {
      'X-Affiliate-Url': 'hidden', // Don't expose actual URL in HEAD
    },
  })
}
