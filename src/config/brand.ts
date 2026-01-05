export const brand = {
  // Display name for SEO - used in text content
  name: "Funded Trading Nederland",
  // Domain name - used for technical references only
  domain: "fundedtrading.nl",
  url: "https://fundedtrading.nl",

  tagline: "Vergelijk Prop Firms & Word Funded",
  description: "De #1 vergelijkingssite voor prop trading firms in Nederland. Onafhankelijke reviews, eerlijke vergelijkingen en actuele prijzen.",

  // Contact
  email: "info@fundedtrading.nl",

  // Affiliate Partners
  partners: ["ftmo", "apex-trader-funding"],

  // Legal
  disclaimer: `Funded Trading Nederland biedt informatieve vergelijkingen van prop trading firms. Wij geven geen financieel advies. Trading met hefboom brengt risico's met zich mee en is niet geschikt voor iedereen. Je kunt meer verliezen dan je inleg. Raadpleeg een financieel adviseur voordat je begint met traden.`,
  affiliateDisclosure: "Funded Trading Nederland ontvangt commissie wanneer je via onze links een challenge koopt. Dit beïnvloedt onze reviews niet.",

  // Social (optional, add when needed)
  social: {
    // twitter: "https://twitter.com/fundedtradingnl",
    // linkedin: "https://linkedin.com/company/fundedtradingnl",
  },
}

export const navigation = {
  main: [
    { name: "Prop Firms", href: "/prop-firms" },
    { name: "Tools", href: "/tools" },
    { name: "Vergelijk", href: "/vergelijk" },
    { name: "Blog", href: "/blog" },
    { name: "Ervaringen", href: "/ervaringen" },
  ],
  footer: {
    propFirms: [
      { name: "FTMO Review", href: "/prop-firms/ftmo" },
      { name: "Apex Review", href: "/prop-firms/apex-trader-funding" },
      { name: "The5%ers Review", href: "/prop-firms/the5ers" },
      { name: "FundedNext Review", href: "/prop-firms/fundednext" },
      { name: "Alle Firms", href: "/prop-firms" },
    ],
    tools: [
      { name: "Position Size Calculator", href: "/tools/position-size-calculator" },
      { name: "Drawdown Calculator", href: "/tools/drawdown-calculator" },
      { name: "Challenge ROI Calculator", href: "/tools/challenge-roi-calculator" },
      { name: "Prop Firm Quiz", href: "/tools/prop-firm-quiz" },
      { name: "Alle Tools", href: "/tools" },
    ],
    vergelijk: [
      { name: "Vergelijk Tool", href: "/vergelijk" },
      { name: "Blog", href: "/blog" },
      { name: "Ervaringen", href: "/ervaringen" },
      { name: "Steden", href: "/steden" },
      { name: "Categorieën", href: "/categorie" },
    ],
    overOns: [
      { name: "Over Ons", href: "/over-ons" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Disclaimer", href: "/disclaimer" },
    ],
  },
}
