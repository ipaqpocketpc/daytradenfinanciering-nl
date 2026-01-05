'use client'

import Script from 'next/script'
import { analyticsConfig } from '@/config/analytics'

export function GoogleAnalytics() {
  const measurementId = analyticsConfig.gaMeasurementId

  // Don't render if no measurement ID or placeholder
  if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

// Helper function to track custom events
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track affiliate link clicks
export function trackAffiliateClick(firmName: string, firmSlug: string, location?: string) {
  trackEvent('affiliate_click', 'affiliate', `${firmName}${location ? `_${location}` : ''}`)
  trackEvent('click', 'outbound', firmSlug)
}

// Track CTA button clicks
export function trackCTAClick(ctaName: string, location?: string) {
  trackEvent('click', 'cta', `${ctaName}${location ? `_${location}` : ''}`)
}

// Track tool usage
export function trackToolUsage(toolName: string, action: string) {
  trackEvent('tool_use', toolName, action)
}

// Track comparison views
export function trackComparisonView(firms: string[]) {
  trackEvent('view', 'comparison', firms.join('_vs_'))
}

// Track scroll depth
export function trackScrollDepth(percentage: number) {
  trackEvent('scroll', 'engagement', `${percentage}%`)
}

// Track page with UTM parameters
export function trackUTMSource() {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams(window.location.search)
  const utmSource = params.get('utm_source')
  const utmMedium = params.get('utm_medium')
  const utmCampaign = params.get('utm_campaign')

  if (utmSource) {
    trackEvent('campaign', 'traffic_source', `${utmSource}/${utmMedium || 'none'}/${utmCampaign || 'none'}`)
  }
}
