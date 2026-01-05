// Analytics & Tracking Configuration
// Plaats hier je Google Analytics en Microsoft Clarity IDs

export const analyticsConfig = {
  // Google Analytics 4 Measurement ID
  // Vind deze in Google Analytics > Admin > Data Streams > Web
  gaMeasurementId: "G-37VNCK8RF7",

  // Microsoft Clarity Project ID
  // Vind deze op clarity.microsoft.com > Project Settings
  clarityProjectId: "", // TODO: Vervang met je Clarity ID (optioneel)

  // Google Search Console verification
  googleSiteVerification: "", // TODO: Voeg toe indien nodig
}

// Affiliate Links Configuration
// Alle affiliate links op één centrale plek
// URLs zijn verborgen achter /go/[slug] routes
export const affiliateLinks: Record<string, {
  name: string
  url: string
  // Extra tracking parameters
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}> = {
  // === PARTNER FIRMS (primair pushen) ===
  ftmo: {
    name: "FTMO",
    url: "https://trader.ftmo.com/?affiliates=haJaFmeFdIhINEqaYyOC",
    utmSource: "fundedtrading",
    utmMedium: "affiliate",
    utmCampaign: "propfirm",
  },
  // === ANDERE FIRMS (kunnen later partners worden) ===
  "apex-trader-funding": {
    name: "Apex Trader Funding",
    url: "https://apextraderfunding.com", // Niet meer actief promoten (regels aangepast)
  },
  the5ers: {
    name: "The5%ers",
    url: "https://the5ers.com", // Geen affiliate link (nog)
  },
  fundednext: {
    name: "FundedNext",
    url: "https://fundednext.com", // Geen affiliate link (nog)
  },
  "dna-funded": {
    name: "DNA Funded",
    url: "https://dnafunded.com",
  },
  "goat-funded-trader": {
    name: "Goat Funded Trader",
    url: "https://goatfundedtrader.com",
  },
  brightfunded: {
    name: "BrightFunded",
    url: "https://brightfunded.com",
  },
  "e8-markets": {
    name: "E8 Markets",
    url: "https://e8markets.com",
  },
  topstep: {
    name: "Topstep",
    url: "https://topstep.com",
  },
  "seacrest-markets": {
    name: "Seacrest Markets",
    url: "https://seacrestmarkets.io",
  },
  fxify: {
    name: "FXIFY",
    url: "https://fxify.com",
  },
  "funded-trading-plus": {
    name: "Funded Trading Plus",
    url: "https://fundedtradingplus.com",
  },
  "city-traders-imperium": {
    name: "City Traders Imperium",
    url: "https://citytradersimperium.com",
  },
  funderpro: {
    name: "FunderPro",
    url: "https://funderpro.com",
  },
  "funding-pips": {
    name: "Funding Pips",
    url: "https://fundingpips.com",
  },
  // === NIEUWE FIRMS ===
  earn2trade: {
    name: "Earn2Trade",
    url: "https://earn2trade.com",
  },
  "sway-funded": {
    name: "Sway Funded",
    url: "https://swayfunded.com",
  },
  "the-trading-pit": {
    name: "The Trading Pit",
    url: "https://thetradingpit.com",
  },
  "oanda-prop-trader": {
    name: "OANDA Prop Trader",
    url: "https://www.oanda.com/prop-trader",
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
