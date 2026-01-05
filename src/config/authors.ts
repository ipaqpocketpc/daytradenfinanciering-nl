// Authors Configuration - Author pages for SEO

export interface Author {
  id: string
  slug: string
  name: string
  role: string
  bio: string
  avatar?: string
  expertise: string[]
  socialLinks?: {
    twitter?: string
    linkedin?: string
    website?: string
  }
  stats: {
    articlesWritten: number
    yearsExperience: number
    tradingSpecialty: string
  }
}

// All authors
export const authors: Author[] = [
  {
    id: "1",
    slug: "redactie",
    name: "Redactie",
    role: "Hoofdredacteur",
    bio: "Het redactieteam van Funded Trading Nederland bestaat uit ervaren traders en financieel schrijvers. We combineren jarenlange trading ervaring met diepgaande kennis van de Nederlandse prop trading markt om objectieve, betrouwbare informatie te bieden.",
    avatar: "/images/authors/redactie.png",
    expertise: [
      "Prop Trading Vergelijkingen",
      "Belasting & Fiscaal",
      "Trading Strategieën",
      "Risicomanagement",
      "Platform Reviews",
    ],
    stats: {
      articlesWritten: 25,
      yearsExperience: 8,
      tradingSpecialty: "Forex & Futures",
    },
  },
  {
    id: "2",
    slug: "thomas-van-den-berg",
    name: "Thomas van den Berg",
    role: "Senior Analyst",
    bio: "Thomas is een fulltime prop trader sinds 2019 met funded accounts bij meerdere firms. Hij specialiseert zich in technische analyse en deelt zijn praktijkervaring in diepgaande guides en reviews.",
    avatar: "/images/authors/thomas.png",
    expertise: [
      "Technische Analyse",
      "FTMO Challenges",
      "Forex Trading",
      "Price Action",
    ],
    socialLinks: {
      twitter: "https://twitter.com/thomastrading",
      linkedin: "https://linkedin.com/in/thomasvandenberg",
    },
    stats: {
      articlesWritten: 12,
      yearsExperience: 5,
      tradingSpecialty: "Forex",
    },
  },
  {
    id: "3",
    slug: "lisa-de-vries",
    name: "Lisa de Vries",
    role: "Content Manager",
    bio: "Lisa combineert haar achtergrond in financiële journalistiek met passie voor trading. Ze schrijft toegankelijke artikelen voor zowel beginners als gevorderde traders.",
    avatar: "/images/authors/lisa.png",
    expertise: [
      "Beginners Guides",
      "Trading Psychologie",
      "Prop Firm Nieuws",
      "Interview Series",
    ],
    stats: {
      articlesWritten: 18,
      yearsExperience: 4,
      tradingSpecialty: "Indices",
    },
  },
]

// Helper functions
export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug)
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find((author) => author.id === id)
}

export function getAllAuthors(): Author[] {
  return authors
}

export function getAuthorByName(name: string): Author | undefined {
  return authors.find((author) => author.name.toLowerCase() === name.toLowerCase())
}

// Default author for auto-generated content
export const defaultAuthor = authors[0] // Redactie
