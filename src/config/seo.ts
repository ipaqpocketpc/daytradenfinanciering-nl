import { brand } from "./brand"

// Dynamic year for SEO titles
const currentYear = new Date().getFullYear()

export const seo = {
  siteName: brand.name,
  siteUrl: brand.url,

  // Default meta
  defaultTitle: `Prop Firms Vergelijken | Beste Keuze ${currentYear} | ${brand.name}`,
  titleTemplate: `%s | ${brand.name}`,
  defaultDescription: brand.description,

  // Open Graph
  ogImage: "/og-image.jpg",
  ogType: "website" as const,
  locale: "nl_NL",

  // Twitter
  twitterHandle: "@fundedtradingnl",
  twitterCardType: "summary_large_image" as const,

  // Robots
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
}

// SEO Templates for different page types
export const seoTemplates = {
  homepage: {
    title: `Prop Firms Vergelijken | Beste Keuze ${currentYear} | FundedTrading.nl`,
    description: "Vergelijk de beste prop trading firms in Nederland. Vind de juiste prop firm voor jou. FTMO, Apex en meer. Onafhankelijke reviews en eerlijke vergelijkingen.",
  },

  firmDetail: (firmName: string) => ({
    title: `${firmName} Review ${currentYear} | Eerlijke Ervaring & Prijzen | FundedTrading`,
    description: `Complete ${firmName} review ${currentYear}. Prijzen, profit split, challenge regels en onze eerlijke ervaring. Is ${firmName} de beste prop firm voor jou?`,
  }),

  firmKortingscode: (firmName: string) => ({
    title: `${firmName} Kortingscode ${currentYear} | Bespaar op je Challenge`,
    description: `Actuele ${firmName} kortingscode ${currentYear}. Bespaar op je prop trading challenge met de nieuwste kortingen en acties.`,
  }),

  firmReview: (firmName: string) => ({
    title: `${firmName} Review & Ervaringen ${currentYear} | Uitgebreide Analyse`,
    description: `Uitgebreide ${firmName} review met echte ervaringen. Voor- en nadelen, prijzen, regels en tips voor het halen van je challenge.`,
  }),

  vergelijk: (firm1: string, firm2: string) => ({
    title: `${firm1} vs ${firm2} | Welke Prop Firm is Beter?`,
    description: `${firm1} vs ${firm2} vergelijking. Profit split, prijzen, regels en meer. Ontdek welke prop firm het beste bij jouw trading stijl past.`,
  }),

  city: (cityName: string) => ({
    title: `Prop Trading ${cityName} | Funded Worden in ${currentYear}`,
    description: `Prop trading in ${cityName}. Actieve traders, populairste prop firms en lokale statistieken. Start vandaag met funded trading in ${cityName}.`,
  }),

  wijk: (wijkName: string, cityName: string) => ({
    title: `Prop Trading ${wijkName}, ${cityName} | FundedTrading.nl`,
    description: `Prop trading in ${wijkName}, ${cityName}. Lokale statistieken en informatie over funded traders in ${wijkName}.`,
  }),

  propFirmsOverview: {
    title: `Alle Prop Firms Vergelijken | Top 20+ Reviews ${currentYear} | FundedTrading.nl`,
    description: "Complete lijst van alle prop trading firms. Vergelijk FTMO, Apex, The5%ers en meer. Actuele prijzen, profit splits en eerlijke reviews.",
  },

  vergelijkTool: {
    title: `Prop Firms Vergelijken | Interactieve Tool ${currentYear} | FundedTrading.nl`,
    description: "Vergelijk prop trading firms side-by-side. Filter op profit split, prijs, challenge type en meer. Vind de perfecte prop firm voor jou.",
  },

  blog: {
    title: "Prop Trading Blog | Nieuws, Tips & Guides | FundedTrading.nl",
    description: "Prop trading nieuws, tips en uitgebreide guides. Leer alles over prop firms, challenges en hoe je funded kunt worden.",
  },

  calculator: {
    title: "Prop Trading Winstcalculator | Bereken je Potentiële Winst",
    description: "Bereken je potentiële winst als funded trader. Voer je account size, profit split en verwachte returns in.",
  },
}
