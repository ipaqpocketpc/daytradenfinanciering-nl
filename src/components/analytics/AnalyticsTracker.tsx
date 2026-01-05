'use client'

import { useEffect, useRef } from 'react'
import { trackScrollDepth, trackUTMSource } from './GoogleAnalytics'

export function AnalyticsTracker() {
  const trackedDepths = useRef<Set<number>>(new Set())

  useEffect(() => {
    // Track UTM parameters on mount
    trackUTMSource()

    // Track scroll depth
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return

      const scrollPercentage = Math.round((window.scrollY / scrollHeight) * 100)

      // Track at 25%, 50%, 75%, 100%
      const thresholds = [25, 50, 75, 100]
      thresholds.forEach((threshold) => {
        if (scrollPercentage >= threshold && !trackedDepths.current.has(threshold)) {
          trackedDepths.current.add(threshold)
          trackScrollDepth(threshold)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}
