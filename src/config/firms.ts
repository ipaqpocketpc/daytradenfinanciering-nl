export interface PropFirm {
  id: string
  name: string
  slug: string
  logo?: string
  description: string
  shortDescription: string

  // Pricing
  accountSizes: number[]
  challengePrices: Record<number, number>
  currency: "EUR" | "USD"

  // Profit & Payouts
  profitSplit: string
  profitSplitMin: number
  profitSplitMax: number
  payoutFrequency: string
  maxScaling?: number

  // Challenge Rules
  challengePhases: 1 | 2 | 3
  profitTarget: number[]
  maxDailyLoss: number
  maxTotalDrawdown: number
  timeLimit: string | null
  minTradingDays: number

  // Platforms & Instruments
  platforms: string[]
  instruments: string[]

  // Trust & Reviews
  rating: number
  reviewCount: number
  trustpilotUrl?: string
  foundedYear: number

  // Pros & Cons
  pros: string[]
  cons: string[]

  // Affiliate
  isPartner: boolean
  affiliateUrl?: string
  discountCode?: string
  discountPercentage?: number

  // Metadata
  priority: 1 | 2 | 3
  isActive: boolean

  // Verification
  lastVerified: string // ISO date string
}

export const firms: PropFirm[] = [
  {
    id: "ftmo",
    name: "FTMO",
    slug: "ftmo",
    description: "FTMO is opgericht in 2015 in Praag en is uitgegroeid tot de grootste prop trading firm ter wereld. Met meer dan €200 miljoen aan uitbetalingen en 25.000+ positieve reviews op Trustpilot, heeft FTMO een sterke reputatie opgebouwd.",
    shortDescription: "De grootste en meest bekende prop firm ter wereld. Betrouwbaar, snelle payouts en uitstekende support.",

    accountSizes: [10000, 20000, 40000, 80000, 160000],
    challengePrices: {
      10000: 89,
      20000: 250,
      40000: 345,
      80000: 540,
      160000: 1080,
    },
    currency: "EUR",

    profitSplit: "80-90%",
    profitSplitMin: 80,
    profitSplitMax: 90,
    payoutFrequency: "14 dagen",
    maxScaling: 2000000,

    challengePhases: 2,
    profitTarget: [10, 5],
    maxDailyLoss: 5,
    maxTotalDrawdown: 10,
    timeLimit: null,
    minTradingDays: 4,

    platforms: ["MT4", "MT5", "cTrader", "DXtrade"],
    instruments: ["Forex", "Indices", "Commodities", "Stocks", "Bonds"],

    rating: 4.8,
    reviewCount: 25847,
    trustpilotUrl: "https://www.trustpilot.com/review/ftmo.com",
    foundedYear: 2015,

    pros: [
      "Betrouwbaar & gevestigde reputatie",
      "Snelle payouts (14 dagen)",
      "Uitstekende klantenservice",
      "Gratis retakes bij 90% scaling",
      "Veel trading tools & educatie",
      "Scaling tot €2 miljoen",
      "Geen tijdslimiet",
    ],
    cons: [
      "Geen US traders toegestaan",
      "2-fase challenge (duurt langer)",
      "Relatief strenge regels",
      "Geen crypto trading",
      "Geen weekend holding",
    ],

    isPartner: true,
    affiliateUrl: "https://trader.ftmo.com/?affiliates=haJaFmeFdIhINEqaYyOC",
    discountCode: "FUNDEDNL",
    discountPercentage: 10,
    priority: 1,
    isActive: true,
    lastVerified: "2026-01-02",
  },
  {
    id: "apex",
    name: "Apex Trader Funding",
    slug: "apex-trader-funding",
    description: "Apex Trader Funding is een populaire futures prop firm die zich onderscheidt met een 100% profit retention op de eerste $25K winst. Met meer dan $598 miljoen aan uitbetalingen sinds 2022, is Apex een van de meest succesvolle futures prop firms.",
    shortDescription: "Populaire futures prop firm met 100% profit retention op eerste $25K. Ideaal voor futures traders.",

    accountSizes: [25000, 50000, 150000],
    challengePrices: {
      25000: 167,
      50000: 207,
      150000: 357,
    },
    currency: "USD",

    profitSplit: "90-100%",
    profitSplitMin: 90,
    profitSplitMax: 100,
    payoutFrequency: "8 dagen",
    maxScaling: 300000,

    challengePhases: 1,
    profitTarget: [6], // 6% profit target
    maxDailyLoss: 0, // Geen daily loss, alleen trailing
    maxTotalDrawdown: 2500, // Trailing drawdown voor $50K
    timeLimit: null,
    minTradingDays: 10,

    platforms: ["NinjaTrader", "Tradovate", "Rithmic", "TradingView"],
    instruments: ["Futures (ES, NQ, YM, RTY, MES, MNQ, etc.)"],

    rating: 4.7,
    reviewCount: 18420,
    trustpilotUrl: "https://www.trustpilot.com/review/apextraderfunding.com",
    foundedYear: 2021,

    pros: [
      "100% profit op eerste $25K",
      "1-fase challenge (sneller funded)",
      "Geen daily loss limiet",
      "Geen tijdslimiet",
      "Regelmatige kortingsacties (70-90% off)",
      "Tot 20 accounts toegestaan",
      "$598M+ uitbetaald",
    ],
    cons: [
      "Alleen futures trading",
      "Trailing drawdown kan lastig zijn",
      "Maandelijkse PA fee ($85)",
      "30% consistency rule",
      "$160 activatie fee",
    ],

    isPartner: false,
    affiliateUrl: "https://apextraderfunding.com",
    // discountCode: "FUNDEDNL80", // Apex regels aangepast - niet meer actief promoten
    // discountPercentage: 80,
    priority: 2,
    isActive: true,
    lastVerified: "2026-01-02",
  },
  {
    id: "the5ers",
    name: "The5%ers",
    slug: "the5ers",
    description: "The5%ers biedt unieke scaling mogelijkheden tot $4M en is bekend om hun flexibele programma's. Ze bieden HyperGrowth (1-step), HighStakes (2-step) en Bootcamp (3-step) challenges.",
    shortDescription: "Beste scaling tot $4M. Flexibele programma's voor verschillende trading stijlen.",

    accountSizes: [5000, 10000, 20000, 100000],
    challengePrices: {
      5000: 260,
      10000: 450,
      20000: 850,
      100000: 545,
    },
    currency: "USD",

    profitSplit: "tot 100%",
    profitSplitMin: 50,
    profitSplitMax: 100,
    payoutFrequency: "16 uur",
    maxScaling: 4000000,

    challengePhases: 2,
    profitTarget: [8, 5],
    maxDailyLoss: 5,
    maxTotalDrawdown: 10,
    timeLimit: null,
    minTradingDays: 3,

    platforms: ["MT5"],
    instruments: ["Forex", "Indices", "Commodities", "Crypto"],

    rating: 4.9,
    reviewCount: 12340,
    trustpilotUrl: "https://www.trustpilot.com/review/the5ers.com",
    foundedYear: 2016,

    pros: [
      "Beste scaling tot $4M",
      "Snelste payouts (16 uur gemiddeld)",
      "Meerdere challenge types",
      "Tot 100% profit split",
      "Crypto trading toegestaan",
    ],
    cons: [
      "Lagere profit split bij start",
      "Alleen MT5 platform",
      "Complexere programmastructuur",
    ],

    isPartner: false,
    priority: 2,
    isActive: true,
    lastVerified: "2026-01-02",
  },
  {
    id: "fundednext",
    name: "FundedNext",
    slug: "fundednext",
    description: "FundedNext is een snelgroeiende prop firm die bekendstaat om hun snelle scaling en competitieve voorwaarden. Uniek: 15% profit share al tijdens de challenge fase.",
    shortDescription: "Snelgroeiende prop firm met 15% profit share tijdens challenge. Tot 95% bij funded.",

    accountSizes: [6000, 15000, 25000, 50000, 100000, 200000],
    challengePrices: {
      6000: 60,
      15000: 120,
      25000: 200,
      50000: 300,
      100000: 550,
      200000: 1099,
    },
    currency: "USD",

    profitSplit: "80-95%",
    profitSplitMin: 80,
    profitSplitMax: 95,
    payoutFrequency: "5 dagen",
    maxScaling: 4000000,

    challengePhases: 2,
    profitTarget: [8, 5],
    maxDailyLoss: 5,
    maxTotalDrawdown: 10,
    timeLimit: null,
    minTradingDays: 5,

    platforms: ["MT4", "MT5", "cTrader", "Match-Trader"],
    instruments: ["Forex", "Indices", "Commodities", "Crypto"],

    rating: 4.6,
    reviewCount: 8750,
    trustpilotUrl: "https://www.trustpilot.com/review/fundednext.com",
    foundedYear: 2022,

    pros: [
      "15% profit share tijdens challenge",
      "Snelle scaling tot $4M",
      "Payouts binnen 24 uur",
      "Geen tijdslimiet",
      "Crypto trading toegestaan",
      "Geen activatie fee",
    ],
    cons: [
      "Relatief nieuwe firma",
      "95% split vereist add-on",
    ],

    isPartner: false,
    priority: 2,
    isActive: true,
    lastVerified: "2026-01-02",
  },
  {
    id: "dna-funded",
    name: "DNA Funded",
    slug: "dna-funded",
    description: "DNA Funded biedt een van de goedkoopste instapprijzen in de markt met eerlijke voorwaarden. Ondersteund door ASIC-gereguleerde DNA Markets.",
    shortDescription: "Goedkoopste optie met eerlijke voorwaarden. Backed by DNA Markets.",

    accountSizes: [5000, 10000, 25000, 50000, 100000, 200000],
    challengePrices: {
      5000: 49,
      10000: 79,
      25000: 159,
      50000: 249,
      100000: 399,
      200000: 699,
    },
    currency: "USD",

    profitSplit: "80-90%",
    profitSplitMin: 80,
    profitSplitMax: 90,
    payoutFrequency: "14 dagen",
    maxScaling: 600000,

    challengePhases: 2,
    profitTarget: [10, 5],
    maxDailyLoss: 5,
    maxTotalDrawdown: 10,
    timeLimit: null,
    minTradingDays: 5,

    platforms: ["MT4", "MT5"],
    instruments: ["Forex", "Indices", "Commodities"],

    rating: 4.7,
    reviewCount: 3420,
    trustpilotUrl: "https://www.trustpilot.com/review/dnafunded.com",
    foundedYear: 2023,

    pros: [
      "Lage instapprijzen vanaf $49",
      "ASIC-gereguleerde broker backing",
      "Geen tijdslimiet",
      "Lage trading kosten",
      "90% split add-on beschikbaar",
    ],
    cons: [
      "Nieuwere firma",
      "Beperkte scaling",
      "14 dagen payout cyclus",
    ],

    isPartner: false,
    priority: 2,
    isActive: true,
    lastVerified: "2026-01-02",
  },
  {
    id: "goat-funded",
    name: "Goat Funded Trader",
    slug: "goat-funded-trader",
    description: "Goat Funded Trader biedt flexibele challenge opties met tot 100% profit split en scaling tot $2M. Inclusief unieke $1 model voor beginners.",
    shortDescription: "Flexibele opties met tot 100% profit split. Scaling tot $2M.",

    accountSizes: [5000, 10000, 25000, 50000, 100000, 200000],
    challengePrices: {
      5000: 45,
      10000: 80,
      25000: 170,
      50000: 290,
      100000: 480,
      200000: 850,
    },
    currency: "USD",

    profitSplit: "80-100%",
    profitSplitMin: 80,
    profitSplitMax: 100,
    payoutFrequency: "Weekly",
    maxScaling: 2000000,

    challengePhases: 2,
    profitTarget: [8, 5],
    maxDailyLoss: 5,
    maxTotalDrawdown: 10,
    timeLimit: null,
    minTradingDays: 3,

    platforms: ["MT4", "MT5"],
    instruments: ["Forex", "Indices", "Commodities", "Crypto"],

    rating: 4.5,
    reviewCount: 2150,
    trustpilotUrl: "https://www.trustpilot.com/review/goatfundedtrader.com",
    foundedYear: 2022,

    pros: [
      "Tot 100% profit split",
      "Scaling tot $2M",
      "Crypto trading",
      "$1 model voor beginners",
      "Geen tijdslimiet",
    ],
    cons: [
      "Relatief nieuwe firma",
      "80% base profit split",
    ],

    isPartner: false,
    priority: 3,
    isActive: true,
    lastVerified: "2026-01-02",
  },
  {
    id: "bright-funded",
    name: "BrightFunded",
    slug: "brightfunded",
    description: "BrightFunded staat bekend om snelle payouts binnen 24 uur en tot 100% profit split via hun scaling plan. Ongelimiteerde scaling mogelijk.",
    shortDescription: "Snelle payouts binnen 24 uur. Tot 100% profit split via scaling.",

    accountSizes: [5000, 10000, 25000, 50000, 100000, 200000],
    challengePrices: {
      5000: 55,
      10000: 89,
      25000: 175,
      50000: 295,
      100000: 495,
      200000: 975,
    },
    currency: "EUR",

    profitSplit: "80-100%",
    profitSplitMin: 80,
    profitSplitMax: 100,
    payoutFrequency: "24 uur",
    maxScaling: 400000,

    challengePhases: 2,
    profitTarget: [8, 5],
    maxDailyLoss: 5,
    maxTotalDrawdown: 10,
    timeLimit: null,
    minTradingDays: 5,

    platforms: ["MT5", "cTrader", "DXtrade"],
    instruments: ["Forex", "Indices", "Commodities"],

    rating: 4.6,
    reviewCount: 1890,
    trustpilotUrl: "https://www.trustpilot.com/review/brightfunded.com",
    foundedYear: 2023,

    pros: [
      "Snelle payouts (24 uur)",
      "Tot 100% profit split",
      "Geen tijdslimiet",
      "Ongelimiteerde scaling",
      "Loyalty programma",
    ],
    cons: [
      "Nieuwere firma",
      "80% base split",
    ],

    isPartner: false,
    priority: 3,
    isActive: true,
    lastVerified: "2026-01-02",
  },
  {
    id: "e8-markets",
    name: "E8 Markets",
    slug: "e8-markets",
    description: "E8 Markets biedt zeer flexibele challenge opties met customizable drawdown (4-14%) en profit split (80-100%). Scaling tot $1M mogelijk.",
    shortDescription: "Zeer flexibel: customizable drawdown en profit split. Scaling tot $1M.",

    accountSizes: [5000, 25000, 50000, 100000, 200000, 500000],
    challengePrices: {
      5000: 33,
      25000: 165,
      50000: 295,
      100000: 495,
      200000: 895,
      500000: 1100,
    },
    currency: "USD",

    profitSplit: "80-100%",
    profitSplitMin: 80,
    profitSplitMax: 100,
    payoutFrequency: "14 dagen",
    maxScaling: 1000000,

    challengePhases: 2,
    profitTarget: [8, 5],
    maxDailyLoss: 5,
    maxTotalDrawdown: 8,
    timeLimit: null,
    minTradingDays: 0,

    platforms: ["MT4", "MT5"],
    instruments: ["Forex", "Indices", "Commodities", "Crypto", "Stocks", "Futures"],

    rating: 4.4,
    reviewCount: 5670,
    trustpilotUrl: "https://www.trustpilot.com/review/e8markets.com",
    foundedYear: 2021,

    pros: [
      "Zeer customizable (drawdown, split)",
      "Tot 100% profit split",
      "Scaling tot $1M",
      "Payout on demand",
      "Geen minimale trading dagen",
      "Stocks & Futures beschikbaar",
    ],
    cons: [
      "Complexe pricing structuur",
      "Add-ons kosten extra",
    ],

    isPartner: false,
    priority: 3,
    isActive: true,
    lastVerified: "2026-01-02",
  },
  {
    id: "topstep",
    name: "Topstep",
    slug: "topstep",
    description: "Topstep is een van de oudste en meest gevestigde futures prop firms (sinds 2012). Focus op educatie met hun Trading Combine® programma.",
    shortDescription: "Gevestigde futures prop firm sinds 2012. Focus op educatie en risicomanagement.",

    accountSizes: [50000, 100000, 150000],
    challengePrices: {
      50000: 49,
      100000: 99,
      150000: 149,
    },
    currency: "USD",

    profitSplit: "100%",
    profitSplitMin: 100,
    profitSplitMax: 100,
    payoutFrequency: "Dagelijks",
    maxScaling: 150000,

    challengePhases: 1,
    profitTarget: [6], // 6% profit target
    maxDailyLoss: 4,
    maxTotalDrawdown: 4.5,
    timeLimit: null,
    minTradingDays: 5,

    platforms: ["TopstepX", "NinjaTrader", "Tradovate", "TradingView"],
    instruments: ["Futures (CME)"],

    rating: 4.5,
    reviewCount: 7890,
    trustpilotUrl: "https://www.trustpilot.com/review/topstep.com",
    foundedYear: 2012,

    pros: [
      "Gevestigde reputatie (sinds 2012)",
      "100% profit (geen split!)",
      "Dagelijkse payouts",
      "Eigen TopstepX platform",
      "Geen activatie fee opties",
      "Commissie-vrij traden",
    ],
    cons: [
      "Alleen futures",
      "Strenge drawdown limieten",
      "Beperkte scaling",
      "$129 activatie fee (standaard)",
    ],

    isPartner: false,
    priority: 2,
    isActive: true,
    lastVerified: "2026-01-02",
  },
  {
    id: "seacrest-markets",
    name: "Seacrest Markets",
    slug: "seacrest-markets",
    description: "Seacrest Markets (voorheen MyFundedFX) is een FSCA-gereguleerde prop firm met meer dan $56M aan uitbetalingen. Biedt 1-step, 2-step en 3-step challenges.",
    shortDescription: "FSCA-gereguleerd. Voorheen MyFundedFX. Tot 92.75% profit split.",

    accountSizes: [5000, 10000, 25000, 50000, 100000, 200000],
    challengePrices: {
      5000: 50,
      10000: 50,
      25000: 100,
      50000: 100,
      100000: 100,
      200000: 100,
    },
    currency: "USD",

    profitSplit: "80-92.75%",
    profitSplitMin: 80,
    profitSplitMax: 92.75,
    payoutFrequency: "14 dagen",
    maxScaling: 600000,

    challengePhases: 2,
    profitTarget: [8, 5],
    maxDailyLoss: 5,
    maxTotalDrawdown: 8,
    timeLimit: null,
    minTradingDays: 3,

    platforms: ["MT5", "Match-Trader"],
    instruments: ["Forex", "Indices", "Commodities", "Crypto"],

    rating: 4.3,
    reviewCount: 4560,
    trustpilotUrl: "https://www.trustpilot.com/review/seacrestmarkets.io",
    foundedYear: 2022,

    pros: [
      "FSCA-gereguleerd",
      "$56M+ uitbetaald",
      "Zeer lage instapprijzen",
      "VIP tier tot 92.75% split",
      "500K+ traders",
    ],
    cons: [
      "Rebrand kan verwarrend zijn",
      "Minder platforms dan voorheen",
    ],

    isPartner: false,
    priority: 3,
    isActive: true,
    lastVerified: "2026-01-02",
  },
  {
    id: "fxify",
    name: "FXIFY",
    slug: "fxify",
    description: "FXIFY is een Nederlandse prop firm met zeer flexibele opties: 1, 2 of 3-fase challenges, instant funding en Lightning challenge. Tot $400K funding met scaling naar $4M.",
    shortDescription: "Nederlandse prop firm. Flexibel: 1/2/3-fase + instant + lightning challenges.",

    accountSizes: [5000, 10000, 25000, 50000, 100000, 200000, 400000],
    challengePrices: {
      5000: 59,
      10000: 89,
      25000: 199,
      50000: 379,
      100000: 549,
      200000: 1049,
      400000: 2950,
    },
    currency: "USD",

    profitSplit: "80-90%",
    profitSplitMin: 80,
    profitSplitMax: 90,
    payoutFrequency: "On demand",
    maxScaling: 4000000,

    challengePhases: 2,
    profitTarget: [10, 5],
    maxDailyLoss: 4,
    maxTotalDrawdown: 10,
    timeLimit: null,
    minTradingDays: 0,

    platforms: ["MT4", "MT5", "DXtrade", "TradingView"],
    instruments: ["Forex", "Indices", "Commodities", "Crypto", "Stocks"],

    rating: 4.6,
    reviewCount: 4320,
    trustpilotUrl: "https://www.trustpilot.com/review/fxify.com",
    foundedYear: 2022,

    pros: [
      "Nederlandse firma",
      "5 challenge types",
      "Eerste withdrawal on demand",
      "Scaling tot $4M",
      "EA's en copy trading toegestaan",
      "Geen minimale trading dagen",
    ],
    cons: [
      "Complexe pricing structuur",
      "Add-ons kosten extra",
    ],

    isPartner: false,
    priority: 2,
    isActive: true,
    lastVerified: "2026-01-02",
  },
  {
    id: "funded-trading-plus",
    name: "Funded Trading Plus",
    slug: "funded-trading-plus",
    description: "Funded Trading Plus biedt instant funding zonder evaluatie en traditionele challenges. Met scaling tot $2.5M en tot 100% profit split is het een populaire keuze voor serieuze traders.",
    shortDescription: "Instant funding beschikbaar met scaling tot $2.5M en tot 100% profit split.",

    accountSizes: [12500, 25000, 50000, 100000, 200000],
    challengePrices: {
      12500: 119,
      25000: 199,
      50000: 349,
      100000: 499,
      200000: 949,
    },
    currency: "USD",

    profitSplit: "80-100%",
    profitSplitMin: 80,
    profitSplitMax: 100,
    payoutFrequency: "Weekly",
    maxScaling: 2500000,

    challengePhases: 1,
    profitTarget: [10],
    maxDailyLoss: 4,
    maxTotalDrawdown: 6,
    timeLimit: null,
    minTradingDays: 0,

    platforms: ["MT4", "MT5"],
    instruments: ["Forex", "Indices", "Commodities", "Crypto"],

    rating: 4.7,
    reviewCount: 6780,
    trustpilotUrl: "https://www.trustpilot.com/review/fundedtradingplus.com",
    foundedYear: 2021,

    pros: [
      "Tot 100% profit split",
      "Instant funding optie",
      "Scaling tot $2.5M",
      "Weekly payouts",
      "Geen minimale handelsdagen",
      "Geen tijdslimiet",
    ],
    cons: [
      "Strengere drawdown regels",
      "Hogere prijzen dan sommige concurrenten",
    ],

    isPartner: false,
    priority: 2,
    isActive: true,
    lastVerified: "2026-01-02",
  },
  {
    id: "city-traders-imperium",
    name: "City Traders Imperium",
    slug: "city-traders-imperium",
    description: "City Traders Imperium (CTI) biedt diverse funding programma's met scaling tot $4M. Met instant funding, 1-step en 2-step challenges. Payouts binnen 24 uur en gratis CTI Academy.",
    shortDescription: "Scaling tot $4M. Payouts binnen 24 uur. Gratis Academy toegang.",

    accountSizes: [2500, 5000, 10000, 25000, 50000, 100000],
    challengePrices: {
      2500: 29,
      5000: 39,
      10000: 69,
      25000: 159,
      50000: 299,
      100000: 549,
    },
    currency: "USD",

    profitSplit: "70-100%",
    profitSplitMin: 70,
    profitSplitMax: 100,
    payoutFrequency: "24 uur",
    maxScaling: 4000000,

    challengePhases: 2,
    profitTarget: [10, 5],
    maxDailyLoss: 5,
    maxTotalDrawdown: 10,
    timeLimit: null,
    minTradingDays: 0,

    platforms: ["MT5", "Match-Trader"],
    instruments: ["Forex", "Indices", "Commodities", "Crypto"],

    rating: 4.5,
    reviewCount: 3890,
    trustpilotUrl: "https://www.trustpilot.com/review/citytradersimperium.com",
    foundedYear: 2018,

    pros: [
      "Scaling tot $4M",
      "Payouts binnen 24 uur",
      "Lage instapprijzen vanaf $29",
      "Gratis CTI Academy",
      "Geen news restricties",
      "Geen minimale handelsdagen",
    ],
    cons: [
      "Lagere profit split bij start (70%)",
      "Balance-based drawdown",
    ],

    isPartner: false,
    priority: 2,
    isActive: true,
    lastVerified: "2026-01-02",
  },
  {
    id: "funderpro",
    name: "FunderPro",
    slug: "funderpro",
    description: "FunderPro onderscheidt zich met dagelijkse payouts en scaling tot $5M. Payouts worden binnen 8 uur verwerkt. Minimum payout slechts $50.",
    shortDescription: "Dagelijkse payouts binnen 8 uur. Scaling tot $5M mogelijk.",

    accountSizes: [5000, 25000, 50000, 100000, 200000],
    challengePrices: {
      5000: 79,
      25000: 165,
      50000: 285,
      100000: 495,
      200000: 895,
    },
    currency: "USD",

    profitSplit: "80-90%",
    profitSplitMin: 80,
    profitSplitMax: 90,
    payoutFrequency: "Dagelijks",
    maxScaling: 5000000,

    challengePhases: 1,
    profitTarget: [10],
    maxDailyLoss: 5,
    maxTotalDrawdown: 10,
    timeLimit: null,
    minTradingDays: 5,

    platforms: ["MT4", "MT5"],
    instruments: ["Forex", "Indices", "Commodities", "Crypto"],

    rating: 4.4,
    reviewCount: 2450,
    trustpilotUrl: "https://www.trustpilot.com/review/funderpro.com",
    foundedYear: 2022,

    pros: [
      "Dagelijkse payouts",
      "Payouts binnen 8 uur",
      "Scaling tot $5M",
      "Minimum payout $50",
      "90% split met add-on",
    ],
    cons: [
      "80% base profit split",
      "Maandelijkse challenge fee",
      "$129 activatie fee",
    ],

    isPartner: false,
    priority: 3,
    isActive: true,
    lastVerified: "2026-01-02",
  },
  {
    id: "funding-pips",
    name: "Funding Pips",
    slug: "funding-pips",
    description: "Funding Pips biedt zeer competitieve prijzen vanaf $29 en scaling tot $2M. Meerdere challenge types: Zero (instant), 1-step, 2-step. Tot 100% profit split mogelijk.",
    shortDescription: "Vanaf $29. Scaling tot $2M. Zero reward denials policy.",

    accountSizes: [5000, 10000, 25000, 50000, 100000],
    challengePrices: {
      5000: 29,
      10000: 55,
      25000: 109,
      50000: 219,
      100000: 399,
    },
    currency: "USD",

    profitSplit: "60-100%",
    profitSplitMin: 60,
    profitSplitMax: 100,
    payoutFrequency: "Weekly",
    maxScaling: 2000000,

    challengePhases: 2,
    profitTarget: [8, 5],
    maxDailyLoss: 5,
    maxTotalDrawdown: 10,
    timeLimit: null,
    minTradingDays: 3,

    platforms: ["MT5", "cTrader", "Match-Trader"],
    instruments: ["Forex", "Indices", "Commodities", "Crypto"],

    rating: 4.5,
    reviewCount: 3120,
    trustpilotUrl: "https://www.trustpilot.com/review/fundingpips.com",
    foundedYear: 2022,

    pros: [
      "Zeer lage instapprijzen vanaf $29",
      "Tot 100% profit split",
      "Zero reward denials",
      "Scaling tot $2M",
      "Meerdere payout opties",
      "Fee terugbetaling na 4 payouts",
    ],
    cons: [
      "Lagere profit split bij start (60%)",
      "cTrader kost $20 extra",
    ],

    isPartner: false,
    priority: 3,
    isActive: true,
    lastVerified: "2026-01-02",
  },
  {
    id: "earn2trade",
    name: "Earn2Trade",
    slug: "earn2trade",
    description: "Earn2Trade is een gevestigde futures prop firm sinds 2017 met een sterke focus op trader educatie. Ze bieden het Gauntlet Mini™ en Gauntlet™ programma met echte futures trading bij partner brokers zoals Tradovate.",
    shortDescription: "Gevestigde futures prop firm sinds 2017. Echte futures trading met educatiefocus.",

    accountSizes: [25000, 50000, 100000, 150000, 200000],
    challengePrices: {
      25000: 150,
      50000: 170,
      100000: 315,
      150000: 350,
      200000: 550,
    },
    currency: "USD",

    profitSplit: "80-90%",
    profitSplitMin: 80,
    profitSplitMax: 90,
    payoutFrequency: "Dagelijks",
    maxScaling: 400000,

    challengePhases: 1,
    profitTarget: [6], // $1800-$11000 afhankelijk van account
    maxDailyLoss: 0, // Trailing drawdown
    maxTotalDrawdown: 2000, // Varies per account
    timeLimit: null,
    minTradingDays: 15,

    platforms: ["NinjaTrader", "Tradovate", "TSTrader", "TradingView"],
    instruments: ["Futures (CME, CBOT, NYMEX, COMEX)"],

    rating: 4.7,
    reviewCount: 4850,
    trustpilotUrl: "https://www.trustpilot.com/review/earn2trade.com",
    foundedYear: 2017,

    pros: [
      "Gevestigde firma sinds 2017",
      "Echte futures trading (geen simulated)",
      "Dagelijkse payouts",
      "Gratis educatie en coaching",
      "Meerdere partner brokers",
      "Geen maandelijkse fees tijdens challenge",
    ],
    cons: [
      "Alleen futures trading",
      "Trailing drawdown kan lastig zijn",
      "15 minimale trading dagen",
      "Maandelijkse fee na funding",
    ],

    isPartner: false,
    priority: 2,
    isActive: true,
    lastVerified: "2026-01-03",
  },
  {
    id: "sway-funded",
    name: "Sway Funded",
    slug: "sway-funded",
    description: "Sway Funded is een moderne prop firm die simulated trading aanbiedt met competitieve voorwaarden. Met snelle payouts en flexibele challenge opties is het een goede keuze voor traders die willen starten.",
    shortDescription: "Moderne prop firm met simulated trading. Snelle payouts en flexibele opties.",

    accountSizes: [7500, 20000, 50000, 100000],
    challengePrices: {
      7500: 89,
      20000: 179,
      50000: 329,
      100000: 529,
    },
    currency: "USD",

    profitSplit: "75-90%",
    profitSplitMin: 75,
    profitSplitMax: 90,
    payoutFrequency: "Bi-weekly",
    maxScaling: 1000000,

    challengePhases: 2,
    profitTarget: [8, 5],
    maxDailyLoss: 5,
    maxTotalDrawdown: 10,
    timeLimit: null,
    minTradingDays: 5,

    platforms: ["MT5", "cTrader"],
    instruments: ["Forex", "Indices", "Commodities", "Crypto"],

    rating: 4.3,
    reviewCount: 1240,
    trustpilotUrl: "https://www.trustpilot.com/review/swayfunded.com",
    foundedYear: 2023,

    pros: [
      "Competitieve prijzen",
      "Snelle payouts",
      "Scaling tot $1M",
      "Geen tijdslimiet",
      "Crypto trading toegestaan",
    ],
    cons: [
      "Nieuwere firma",
      "Simulated trading (geen echte markt)",
      "Lagere profit split bij start (75%)",
    ],

    isPartner: false,
    priority: 3,
    isActive: true,
    lastVerified: "2026-01-03",
  },
  {
    id: "the-trading-pit",
    name: "The Trading Pit",
    slug: "the-trading-pit",
    description: "The Trading Pit is een Europese prop firm gevestigd in Liechtenstein met diverse funding programma's. Winnaar van meerdere awards in 2024/2025. Biedt CFDs, Futures en Stocks trading met tot 80% profit split.",
    shortDescription: "Award-winnende Europese prop firm. CFDs, Futures en Stocks met 80% profit split.",

    accountSizes: [10000, 20000, 50000, 100000],
    challengePrices: {
      10000: 99,
      20000: 149,
      50000: 299,
      100000: 499,
    },
    currency: "USD",

    profitSplit: "60-80%",
    profitSplitMin: 60,
    profitSplitMax: 80,
    payoutFrequency: "14 dagen",
    maxScaling: 5000000,

    challengePhases: 2,
    profitTarget: [8, 5],
    maxDailyLoss: 5,
    maxTotalDrawdown: 10,
    timeLimit: null,
    minTradingDays: 3,

    platforms: ["MT5", "cTrader", "Match-Trader"],
    instruments: ["Forex", "Indices", "Commodities", "Stocks", "Futures"],

    rating: 4.4,
    reviewCount: 2890,
    trustpilotUrl: "https://www.trustpilot.com/review/thetradingpit.com",
    foundedYear: 2022,

    pros: [
      "Award-winnende firma",
      "Europees gereguleerd (Liechtenstein)",
      "Stocks en Futures beschikbaar",
      "Scaling tot $5M",
      "Geen tijdslimiet",
      "Meerdere challenge types",
    ],
    cons: [
      "Lagere profit split (60-80%)",
      "Langere payout cyclus",
      "Complexere fee structuur",
    ],

    isPartner: false,
    priority: 2,
    isActive: true,
    lastVerified: "2026-01-03",
  },
  {
    id: "oanda-prop-trader",
    name: "OANDA Prop Trader",
    slug: "oanda-prop-trader",
    description: "OANDA Prop Trader is het prop trading programma van OANDA, een van 's werelds meest gerespecteerde forex brokers (25+ jaar ervaring). Met de betrouwbaarheid van een gevestigde broker en competitieve voorwaarden.",
    shortDescription: "Prop trading van OANDA (25+ jaar). Betrouwbaar en gevestigd merk.",

    accountSizes: [10000, 25000, 50000, 100000],
    challengePrices: {
      10000: 99,
      25000: 199,
      50000: 379,
      100000: 699,
    },
    currency: "USD",

    profitSplit: "70-90%",
    profitSplitMin: 70,
    profitSplitMax: 90,
    payoutFrequency: "14 dagen",
    maxScaling: 500000,

    challengePhases: 2,
    profitTarget: [8, 5],
    maxDailyLoss: 5,
    maxTotalDrawdown: 10,
    timeLimit: null,
    minTradingDays: 5,

    platforms: ["OANDA Trade", "MT4", "MT5", "TradingView"],
    instruments: ["Forex", "Indices", "Commodities"],

    rating: 4.6,
    reviewCount: 1560,
    trustpilotUrl: "https://www.trustpilot.com/review/oanda.com",
    foundedYear: 2023,

    pros: [
      "Gevestigd merk (OANDA, 25+ jaar)",
      "Multi-gereguleerd (FCA, ASIC, etc.)",
      "Betrouwbare uitbetalingen",
      "TradingView integratie",
      "Lage spreads",
      "Professionele klantenservice",
    ],
    cons: [
      "Relatief nieuw prop programma",
      "Hogere prijzen dan sommige concurrenten",
      "Beperktere instrumenten (geen crypto)",
    ],

    isPartner: false,
    priority: 2,
    isActive: true,
    lastVerified: "2026-01-03",
  },
]

// Helper functions
export function getFirmBySlug(slug: string): PropFirm | undefined {
  return firms.find((firm) => firm.slug === slug)
}

export function getPartnerFirms(): PropFirm[] {
  return firms.filter((firm) => firm.isPartner)
}

export function getActiveFirms(): PropFirm[] {
  return firms.filter((firm) => firm.isActive)
}

export function getFirmsByPriority(priority: 1 | 2 | 3): PropFirm[] {
  return firms.filter((firm) => firm.priority === priority && firm.isActive)
}
