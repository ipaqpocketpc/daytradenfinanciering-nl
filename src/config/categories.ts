import { getCurrentYear } from "@/lib/utils"

export interface CategoryInfo {
  slug: string
  title: string
  description: string
  metaTitle: string
  metaDescription: string
  icon: string // lucide icon name
  color: "primary" | "secondary" | "accent"
}

// Use function to get dynamic year in SEO titles
const year = getCurrentYear()

export const categories: CategoryInfo[] = [
  {
    slug: "challenge-tips",
    title: "Challenge Tips",
    description:
      "Alles wat je moet weten om je prop firm challenge in één keer te halen",
    metaTitle: `Prop Firm Challenge Tips | Haal Je Challenge in Één Keer [${year}]`,
    metaDescription:
      "Complete gids met bewezen tips om je prop firm challenge te halen. Risicomanagement, mindset, strategieën en de fouten die je moet vermijden.",
    icon: "Target",
    color: "primary",
  },
  {
    slug: "kapitaal-opschalen",
    title: "Kapitaal Opschalen",
    description:
      "Van €10.000 naar €200.000+ trading kapitaal via het scaling plan",
    metaTitle: `Trading Kapitaal Opschalen | Van €10K naar €200K+ [Gids ${year}]`,
    metaDescription:
      "Leer hoe je via het scaling plan je trading kapitaal opbouwt van €10.000 naar €200.000+. Stap-voor-stap uitleg met concrete voorbeelden.",
    icon: "TrendingUp",
    color: "secondary",
  },
  {
    slug: "uitbetalingen",
    title: "Uitbetalingen & Payouts",
    description: "Hoe werken uitbetalingen bij prop firms? Complete uitleg",
    metaTitle: `Prop Firm Uitbetalingen | Payout Proces & Winstdeling [${year} Gids]`,
    metaDescription:
      "Alles over prop firm uitbetalingen: wanneer, hoeveel, welke methodes. Van 80% naar 90% profit split en hoe je snel je eerste payout krijgt.",
    icon: "Wallet",
    color: "accent",
  },
  {
    slug: "veelgemaakte-fouten",
    title: "Veelgemaakte Fouten",
    description:
      "De meest voorkomende fouten die traders maken en hoe je ze vermijdt",
    metaTitle: `7 Fouten Waardoor Traders Hun Challenge Falen | Vermijd Dit [${year}]`,
    metaDescription:
      "Ontdek de 7 meest voorkomende fouten die traders maken bij prop firm challenges. Leer hoe je ze vermijdt en verhoog je slagingskans aanzienlijk.",
    icon: "AlertTriangle",
    color: "primary",
  },
  {
    slug: "ftmo-regels",
    title: "FTMO Challenge Regels",
    description: "Alle FTMO regels uitgelegd: profit targets, drawdown en meer",
    metaTitle: `FTMO Challenge Regels ${year} | Profit Target, Drawdown & Alle Regels`,
    metaDescription:
      "Complete uitleg van alle FTMO challenge regels: 10% profit target, 5% daily loss, 10% max loss. Plus verification fase en funded account regels.",
    icon: "BookOpen",
    color: "secondary",
  },
]

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return categories.find((cat) => cat.slug === slug)
}

export function getAllCategorySlugs(): string[] {
  return categories.map((cat) => cat.slug)
}
