// Analytics & Tracking Configuration
// Daytradenfinanciering.nl

export const analyticsConfig = {
  // Google Analytics 4 Measurement ID
  gaMeasurementId: "G-VVZ1P75HHS",

  // Microsoft Clarity Project ID
  // TODO: Vervang met Clarity ID (optioneel)
  clarityProjectId: "",

  // Google Search Console verification
  googleSiteVerification: "",
}

// Affiliate Links Configuration
// Daytradenfinanciering.nl gebruikt alleen /go/kapitaal → FTMO
export const affiliateLinks: Record<
  string,
  {
    name: string
    url: string
    utmSource?: string
    utmMedium?: string
    utmCampaign?: string
  }
> = {
  // Primaire affiliate link: /go/kapitaal
  kapitaal: {
    name: "FTMO",
    url: "https://trader.ftmo.com/?affiliates=haJaFmeFdIhINEqaYyOC",
    utmSource: "daytradenfinanciering",
    utmMedium: "affiliate",
    utmCampaign: "kapitaal",
  },
  // Alias voor FTMO direct (fallback)
  ftmo: {
    name: "FTMO",
    url: "https://trader.ftmo.com/?affiliates=haJaFmeFdIhINEqaYyOC",
    utmSource: "daytradenfinanciering",
    utmMedium: "affiliate",
    utmCampaign: "ftmo-direct",
  },
}

// Helper function to get affiliate URL
export function getAffiliateUrl(slug: string): string | null {
  const affiliate = affiliateLinks[slug]
  if (!affiliate) return null
  return affiliate.url
}

// Helper function to get affiliate name
export function getAffiliateName(slug: string): string | null {
  const affiliate = affiliateLinks[slug]
  if (!affiliate) return null
  return affiliate.name
}

// All available affiliate slugs
export function getAllAffiliateSlugs(): string[] {
  return Object.keys(affiliateLinks)
}
