import { brand } from "./brand"

// Dynamic year for SEO titles
const currentYear = new Date().getFullYear()

export const seo = {
  siteName: brand.name,
  siteUrl: brand.url,

  // Default meta
  defaultTitle: `Trading Kapitaal Krijgen | Funded Trader Worden ${currentYear} | ${brand.name}`,
  titleTemplate: `%s | ${brand.name}`,
  defaultDescription: brand.description,

  // Open Graph
  // Dynamic OG images are generated via opengraph-image.tsx
  ogType: "website" as const,
  locale: "nl_NL",

  // Twitter
  twitterHandle: "@daytradenfinanc",
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
    title: `Trading Kapitaal Krijgen | Tot €200.000 Funded Account ${currentYear} | ${brand.name}`,
    description: "Ontdek hoe je trading kapitaal krijgt zonder eigen geld. Word een funded trader en handel met professioneel kapitaal. Compleet stappenplan.",
  },

  howItWorks: {
    title: `Hoe Werkt Funded Trading? | Stap voor Stap Uitgelegd ${currentYear}`,
    description: "Leer hoe funded trading werkt. Van evaluatie tot funded account. Compleet stappenplan om trading kapitaal te krijgen zonder eigen geld.",
  },

  benefits: {
    title: `Voordelen van Funded Trading | Waarom Trading Kapitaal ${currentYear}`,
    description: "Ontdek de voordelen van funded trading. Handel met professioneel kapitaal, geen eigen risico, en behoud tot 90% van je winst.",
  },

  costs: {
    title: `Kosten Funded Trading | Wat Kost een Trading Evaluatie ${currentYear}`,
    description: "Overzicht van de kosten voor funded trading. Evaluatie prijzen, terugbetaling bij succes, en waar je op moet letten.",
  },

  gettingStarted: {
    title: `Beginnen met Funded Trading | Eerste Stappen ${currentYear}`,
    description: "Stap voor stap beginnen met funded trading. Van voorbereiding tot je eerste funded account. Tips voor beginners.",
  },

  faq: {
    title: `Veelgestelde Vragen Funded Trading | FAQ ${currentYear}`,
    description: "Antwoorden op de meest gestelde vragen over funded trading. Alles over trading kapitaal, evaluaties en funded accounts.",
  },

  glossary: {
    title: `Trading Begrippen | Woordenlijst voor Traders ${currentYear}`,
    description: "Complete woordenlijst met trading begrippen. Van funded account tot drawdown - alle termen die je moet kennen als trader.",
  },

  blog: {
    title: `Daytraden Blog | Tips, Strategieën & Nieuws | ${brand.name}`,
    description: "Daytraden tips, strategieën en nieuws. Leer alles over trading kapitaal, funded trading en hoe je een succesvolle trader wordt.",
  },

  blogPost: (title: string) => ({
    title: `${title} | ${brand.name}`,
    description: `${title}. Lees meer op ${brand.name} - jouw gids voor trading kapitaal.`,
  }),

  contact: {
    title: `Contact | ${brand.name}`,
    description: `Neem contact op met ${brand.name}. Vragen over trading kapitaal of funded trading? We helpen je graag verder.`,
  },

  about: {
    title: `Over Ons | ${brand.name}`,
    description: `Over ${brand.name}. Onze missie is om traders te helpen aan trading kapitaal zonder eigen geld te investeren.`,
  },

  calculator: {
    title: "Funded Trading Calculator | Bereken je Potentiële Winst",
    description: "Bereken je potentiële winst als funded trader. Voer je account size, winstdeling en verwachte returns in.",
  },
}
