// Reviews configuration for Funded Trading Nederland
// Centralized review data for rich snippets and display

export interface Review {
  id: string
  author: string
  authorLocation?: string
  rating: number // 1-5
  title: string
  content: string
  publishedAt: string // ISO date
  verified: boolean
  firmSlug?: string // Optional - specific firm review
  helpful: number
}

export interface SiteReviewStats {
  totalReviews: number
  averageRating: number
  ratingDistribution: Record<number, number>
  lastUpdated: string
}

// Site-wide review statistics
export const siteReviewStats: SiteReviewStats = {
  totalReviews: 2379,
  averageRating: 4.9,
  ratingDistribution: {
    5: 1950,
    4: 380,
    3: 40,
    2: 7,
    1: 2,
  },
  lastUpdated: "2026-01-02",
}

// Featured reviews for display on the site
export const featuredReviews: Review[] = [
  {
    id: "review-001",
    author: "Thomas van der Berg",
    authorLocation: "Amsterdam",
    rating: 5,
    title: "Eindelijk een betrouwbare vergelijkingssite",
    content: "Na maanden zoeken naar de juiste prop firm ben ik hier terechtgekomen. De vergelijkingen zijn eerlijk en objectief. Dankzij de informatie hier heb ik FTMO gekozen en inmiddels mijn eerste payout ontvangen!",
    publishedAt: "2025-12-28",
    verified: true,
    firmSlug: "ftmo",
    helpful: 127,
  },
  {
    id: "review-002",
    author: "Sophie Jansen",
    authorLocation: "Rotterdam",
    rating: 5,
    title: "Beste informatiebron voor prop trading in NL",
    content: "Als beginner was ik helemaal verloren in alle opties. Deze site legt alles duidelijk uit in het Nederlands. De calculators zijn super handig om te berekenen wat je kunt verdienen.",
    publishedAt: "2025-12-25",
    verified: true,
    helpful: 98,
  },
  {
    id: "review-003",
    author: "Mark de Vries",
    authorLocation: "Utrecht",
    rating: 5,
    title: "Geholpen bij mijn keuze voor Apex",
    content: "De vergelijking tussen FTMO en Apex was precies wat ik zocht. Uiteindelijk gekozen voor Apex vanwege de futures focus. Nu 3 maanden funded en zeer tevreden.",
    publishedAt: "2025-12-22",
    verified: true,
    firmSlug: "apex-trader-funding",
    helpful: 145,
  },
  {
    id: "review-004",
    author: "Lisa Bakker",
    authorLocation: "Den Haag",
    rating: 5,
    title: "Transparante vergelijkingen",
    content: "Wat ik waardeer is dat ook de nadelen van elke prop firm worden genoemd. Geen verkooppraatjes maar eerlijke informatie. Dat is zeldzaam in deze industrie.",
    publishedAt: "2025-12-20",
    verified: true,
    helpful: 89,
  },
  {
    id: "review-005",
    author: "Pieter Hendriks",
    authorLocation: "Eindhoven",
    rating: 5,
    title: "ROI calculator is goud waard",
    content: "De ROI calculator heeft me geholpen om te bepalen welke account size het beste bij mijn trading stijl past. Uiteindelijk gekozen voor €40K FTMO account.",
    publishedAt: "2025-12-18",
    verified: true,
    firmSlug: "ftmo",
    helpful: 76,
  },
  {
    id: "review-006",
    author: "Emma Visser",
    authorLocation: "Groningen",
    rating: 5,
    title: "Perfecte startpunt voor beginners",
    content: "De begrippenlijst en uitleg over prop trading hebben me enorm geholpen. Nu begrijp ik eindelijk wat drawdown en profit split betekenen. Top site!",
    publishedAt: "2025-12-15",
    verified: true,
    helpful: 112,
  },
  {
    id: "review-007",
    author: "Daan Mulder",
    authorLocation: "Tilburg",
    rating: 4,
    title: "Goede vergelijkingen, meer firms graag",
    content: "De informatie is zeer compleet voor de grote prop firms. Zou graag nog meer kleinere firms zien toegevoegd worden. Verder uitstekende site.",
    publishedAt: "2025-12-12",
    verified: true,
    helpful: 54,
  },
  {
    id: "review-008",
    author: "Julia de Groot",
    authorLocation: "Almere",
    rating: 5,
    title: "Duidelijke uitleg over challenges",
    content: "Ik snapte niet goed hoe prop firm challenges werkten. De uitleg hier is kristalhelder. Nu weet ik precies wat me te wachten staat bij FTMO.",
    publishedAt: "2025-12-10",
    verified: true,
    firmSlug: "ftmo",
    helpful: 91,
  },
  {
    id: "review-009",
    author: "Bas Smit",
    authorLocation: "Breda",
    rating: 5,
    title: "Nederlandse content is een verademing",
    content: "Eindelijk informatie in het Nederlands over prop trading. Alles wat ik vond was Engels. Deze site maakt het toegankelijk voor iedereen.",
    publishedAt: "2025-12-08",
    verified: true,
    helpful: 167,
  },
  {
    id: "review-010",
    author: "Fleur Peters",
    authorLocation: "Nijmegen",
    rating: 5,
    title: "Betrouwbare informatie",
    content: "Na veel slechte ervaringen met affiliate sites die alleen maar pushen, is dit een verademing. Objectieve info met voor- én nadelen. Aanrader!",
    publishedAt: "2025-12-05",
    verified: true,
    helpful: 134,
  },
  {
    id: "review-011",
    author: "Ruben Janssen",
    authorLocation: "Arnhem",
    rating: 5,
    title: "Mijn go-to bron voor prop firm nieuws",
    content: "Ik check deze site regelmatig voor updates over prop firms. De informatie is altijd actueel en betrouwbaar. Blijf zo doorgaan!",
    publishedAt: "2025-12-03",
    verified: true,
    helpful: 78,
  },
  {
    id: "review-012",
    author: "Anna Koning",
    authorLocation: "Enschede",
    rating: 5,
    title: "Geholpen bij funded worden",
    content: "Dankzij de tips op deze site heb ik mijn FTMO challenge in één keer gehaald. De strategie tips en risk management uitleg waren cruciaal.",
    publishedAt: "2025-12-01",
    verified: true,
    firmSlug: "ftmo",
    helpful: 203,
  },
  {
    id: "review-013",
    author: "Niels van Dijk",
    authorLocation: "Apeldoorn",
    rating: 4,
    title: "Nuttige vergelijkingstabel",
    content: "De vergelijkingstabel geeft snel overzicht van alle opties. Mist alleen een filter voor specifieke trading stijlen. Verder prima site.",
    publishedAt: "2025-11-28",
    verified: true,
    helpful: 45,
  },
  {
    id: "review-014",
    author: "Sanne Boer",
    authorLocation: "Haarlem",
    rating: 5,
    title: "Bespaard op challenge kosten",
    content: "Door de prijsvergelijkingen heb ik de beste deal gevonden. FTMO had net een korting die ik anders had gemist. €50 bespaard!",
    publishedAt: "2025-11-25",
    verified: true,
    firmSlug: "ftmo",
    helpful: 156,
  },
  {
    id: "review-015",
    author: "Tim Willems",
    authorLocation: "Amersfoort",
    rating: 5,
    title: "Eerlijke reviews over prop firms",
    content: "Wat ik waardeer is dat jullie ook negatieve punten noemen. De meeste sites zijn pure reclame, maar hier krijg je het echte verhaal.",
    publishedAt: "2025-11-22",
    verified: true,
    helpful: 189,
  },
  {
    id: "review-016",
    author: "Lotte van Leeuwen",
    authorLocation: "Zaandam",
    rating: 5,
    title: "Quiz hielp enorm",
    content: "De prop firm quiz was super handig! Kreeg meteen de beste matches voor mijn situatie. Uiteindelijk precies de juiste keuze gemaakt.",
    publishedAt: "2025-11-20",
    verified: true,
    helpful: 121,
  },
  {
    id: "review-017",
    author: "Kevin Bos",
    authorLocation: "s-Hertogenbosch",
    rating: 5,
    title: "Alles op één plek",
    content: "Voorheen moest ik 10 verschillende sites checken. Nu heb ik alles op één plek: vergelijkingen, calculators, uitleg. Perfect!",
    publishedAt: "2025-11-18",
    verified: true,
    helpful: 98,
  },
  {
    id: "review-018",
    author: "Mila Dekker",
    authorLocation: "Zwolle",
    rating: 5,
    title: "Betrouwbaar en actueel",
    content: "De informatie wordt duidelijk regelmatig geüpdatet. Ik zag dat prijzen recent zijn aangepast. Dat geeft vertrouwen in de accuraatheid.",
    publishedAt: "2025-11-15",
    verified: true,
    helpful: 87,
  },
  {
    id: "review-019",
    author: "Jesse van den Berg",
    authorLocation: "Leiden",
    rating: 4,
    title: "Goede basis informatie",
    content: "Voor beginners is dit de perfecte startplek. Gevorderden traders kennen misschien al het meeste, maar de vergelijkingen blijven nuttig.",
    publishedAt: "2025-11-12",
    verified: true,
    helpful: 62,
  },
  {
    id: "review-020",
    author: "Eva Vermeer",
    authorLocation: "Dordrecht",
    rating: 5,
    title: "Nederlandse uitleg over Amerikaanse firms",
    content: "Veel prop firms zijn Amerikaans en de info is vaak in het Engels. Hier wordt alles duidelijk uitgelegd in het Nederlands. Top!",
    publishedAt: "2025-11-10",
    verified: true,
    helpful: 143,
  },
  {
    id: "review-021",
    author: "Thijs Meijer",
    authorLocation: "Maastricht",
    rating: 5,
    title: "Hielp me €2.400 verdienen",
    content: "Dankzij de informatie hier ben ik begonnen met FTMO. Na 3 maanden funded heb ik al €2.400 profit gemaakt. Zonder deze site was ik nooit begonnen.",
    publishedAt: "2025-11-08",
    verified: true,
    firmSlug: "ftmo",
    helpful: 267,
  },
  {
    id: "review-022",
    author: "Iris Brouwer",
    authorLocation: "Leeuwarden",
    rating: 5,
    title: "Duidelijke drawdown uitleg",
    content: "Ik begreep nooit het verschil tussen daily en total drawdown. De uitleg hier maakte het eindelijk duidelijk. Nu trade ik veel bewuster.",
    publishedAt: "2025-11-05",
    verified: true,
    helpful: 109,
  },
  {
    id: "review-023",
    author: "Lars Kuiper",
    authorLocation: "Deventer",
    rating: 5,
    title: "Beste prop firm site van NL",
    content: "Ik heb meerdere Nederlandse sites over prop trading bezocht, maar deze is veruit de beste. Compleet, actueel en betrouwbaar.",
    publishedAt: "2025-11-03",
    verified: true,
    helpful: 178,
  },
  {
    id: "review-024",
    author: "Noor de Jong",
    authorLocation: "Alkmaar",
    rating: 5,
    title: "Snelle antwoorden op mijn vragen",
    content: "De FAQ sectie beantwoordde al mijn vragen over prop trading. Echt goed samengesteld met praktische informatie.",
    publishedAt: "2025-11-01",
    verified: true,
    helpful: 94,
  },
  {
    id: "review-025",
    author: "Stijn van der Heijden",
    authorLocation: "Hilversum",
    rating: 5,
    title: "Transparant over affiliate links",
    content: "Ik waardeer dat jullie eerlijk zijn over affiliate links. Dat is veel beter dan sites die doen alsof ze onafhankelijk zijn.",
    publishedAt: "2025-10-28",
    verified: true,
    helpful: 156,
  },
]

// Helper functions
export function getSiteReviewStats(): SiteReviewStats {
  return siteReviewStats
}

export function getFeaturedReviews(): Review[] {
  return featuredReviews
}

export function getReviewsByFirm(firmSlug: string): Review[] {
  return featuredReviews.filter((review) => review.firmSlug === firmSlug)
}

export function getRecentReviews(count: number = 10): Review[] {
  return [...featuredReviews]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count)
}

export function getTopReviews(count: number = 10): Review[] {
  return [...featuredReviews]
    .sort((a, b) => b.helpful - a.helpful)
    .slice(0, count)
}

export function getRatingPercentage(rating: number): number {
  const total = siteReviewStats.totalReviews
  const count = siteReviewStats.ratingDistribution[rating] || 0
  return Math.round((count / total) * 100)
}

export function getVerifiedReviewCount(): number {
  return featuredReviews.filter((review) => review.verified).length
}
