import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ExitIntentPopup } from "@/components/layout/ExitIntentPopup"
import { GoogleAnalytics, MicrosoftClarity, AnalyticsTracker } from "@/components/analytics"
import { seo, design } from "@/config"
import { analyticsConfig } from "@/config/analytics"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: seo.defaultTitle,
    template: seo.titleTemplate,
  },
  description: seo.defaultDescription,
  metadataBase: new URL(seo.siteUrl),
  openGraph: {
    type: "website",
    locale: seo.locale,
    siteName: seo.siteName,
    // OG images generated dynamically via opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    creator: seo.twitterHandle,
  },
  robots: seo.robots,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <head>
        {/* PWA Meta Tags */}
        <meta name="theme-color" content={design.themeColor} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Daytraden Financiering" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Daytraden Financiering" />
        <meta name="msapplication-TileColor" content={design.themeColor} />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="format-detection" content="telephone=no" />

        {/* Preconnect to analytics services */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {analyticsConfig.clarityProjectId && (
          <>
            <link rel="preconnect" href="https://www.clarity.ms" />
            <link rel="dns-prefetch" href="https://www.clarity.ms" />
          </>
        )}
        {analyticsConfig.googleSiteVerification && (
          <meta name="google-site-verification" content={analyticsConfig.googleSiteVerification} />
        )}
      </head>
      <body className={`${inter.variable} font-sans`}>
        <GoogleAnalytics />
        <MicrosoftClarity />
        <AnalyticsTracker />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ExitIntentPopup />
      </body>
    </html>
  )
}
