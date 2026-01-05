import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  Layers,
  TrendingUp,
  Zap,
  Globe,
  BarChart3,
  Bitcoin,
  Wallet,
  Percent,
  Clock,
  Target,
  GraduationCap,
  ArrowUpRight,
  ChevronRight,
  Sun,
  Moon,
  TrendingDown,
  BarChart2,
  Activity,
  Newspaper,
  DollarSign,
  PiggyBank,
  Shield,
  Scale,
  Calculator,
  AlertTriangle,
  PieChart,
  Lock,
  Brain,
  Heart,
  BookOpen,
  Users,
  Briefcase,
  Building,
  Flag,
  Timer,
  Bot,
  Cpu,
  Code,
  LineChart,
  CandlestickChart,
  Sparkles,
  Repeat,
  GitCompare,
  Smartphone,
  Monitor,
  HelpCircle,
  Receipt,
  Flame,
  Crosshair,
  Gauge,
  ArrowUpDown,
  Settings,
  Puzzle,
  CircleDot,
  Banknote,
  Coins,
  Award,
} from "lucide-react"
import { getAllCategories, getNichesByCategorySlug, nicheCategories, getFirmsForNiche } from "@/config/niches"
import type { NicheCategory } from "@/config/niches"
import { brand } from "@/config"
import { HeroSection } from "@/components/sections/HeroSection"
import { Button } from "@/components/ui"

// Extended icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  TrendingUp,
  Globe,
  BarChart3,
  Wallet,
  Percent,
  Clock,
  Target,
  GraduationCap,
  Bitcoin,
  Sun,
  Moon,
  TrendingDown,
  BarChart2,
  Activity,
  Layers,
  Newspaper,
  DollarSign,
  PiggyBank,
  Shield,
  Scale,
  Calculator,
  AlertTriangle,
  PieChart,
  Lock,
  Brain,
  Heart,
  BookOpen,
  Users,
  Briefcase,
  Building,
  Flag,
  Timer,
  Bot,
  Cpu,
  Code,
  LineChart,
  CandlestickChart,
  Sparkles,
  Repeat,
  GitCompare,
  Smartphone,
  Monitor,
  HelpCircle,
  Receipt,
  Flame,
  Crosshair,
  Gauge,
  ArrowUpDown,
  Settings,
  Puzzle,
  CircleDot,
  Banknote,
  Coins,
  Award,
}

// Category color mapping
const categoryColors: Record<NicheCategory, "primary" | "secondary" | "accent"> = {
  "trading-stijlen": "primary",
  "instrumenten": "secondary",
  "timeframes": "primary",
  "prop-firm-features": "accent",
  "platforms": "secondary",
  "ervaring-educatie": "primary",
  "trading-psychologie": "accent",
  "technische-analyse": "primary",
  "fundamentele-analyse": "secondary",
  "risicomanagement": "accent",
  "nederland-specifiek": "primary",
  "trading-sessies": "secondary",
  "automatisch-traden": "accent",
  "account-sizes": "primary",
  "vergelijkingen": "secondary",
}

const colorClasses = {
  primary: {
    bg: "bg-primary/20",
    text: "text-primary",
    border: "hover:border-primary/30",
  },
  secondary: {
    bg: "bg-secondary/20",
    text: "text-secondary",
    border: "hover:border-secondary/30",
  },
  accent: {
    bg: "bg-accent/20",
    text: "text-accent",
    border: "hover:border-accent/30",
  },
}

const currentYear = new Date().getFullYear()

export const metadata: Metadata = {
  title: `Prop Trading Categorieën | Vind de Beste Prop Firm ${currentYear}`,
  description: `Vergelijk prop trading firms per categorie: forex, futures, crypto, scalping, swing trading en meer. 167+ categorieën om de beste prop firm voor jouw trading stijl te vinden.`,
  keywords: "prop trading categorieën, prop firm vergelijken, trading stijlen, forex prop firm, futures prop firm, crypto prop firm",
  openGraph: {
    title: `Prop Trading Categorieën ${currentYear}`,
    description: `Vergelijk prop trading firms per categorie. 167+ categorieën voor elke trading stijl.`,
    type: "website",
  },
  alternates: {
    canonical: "https://fundedtrading.nl/categorie",
  },
}

export default function CategorieenPage() {
  const allCategories = getAllCategories()

  // Calculate total niches
  const totalNiches = allCategories.reduce((acc, cat) => acc + cat.count, 0)

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Prop Trading Categorieën ${currentYear}`,
    "description": `Vergelijk prop trading firms per categorie. ${totalNiches} categorieën voor elke trading stijl.`,
    "url": "https://fundedtrading.nl/categorie",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Trading Categorieën",
      "numberOfItems": allCategories.length,
      "itemListElement": allCategories.map((cat, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": nicheCategories[cat.slug].name,
        "url": `https://fundedtrading.nl/categorie#${cat.slug}`
      }))
    }
  }

  return (
    <>
      {/* Schema.org JSON-LD */}
      <Script
        id="schema-categories"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <HeroSection
        title="Prop Trading Categorieën"
        highlightedWord="Categorieën"
        subtitle={`Vind de perfecte prop firm voor jouw trading stijl. ${totalNiches} categorieën om uit te kiezen, van trading strategieën tot specifieke platforms.`}
        badge={`${totalNiches}+ Categorieën`}
      />

      {/* Quick Stats */}
      <section className="border-b border-border bg-card/50">
        <div className="container-wide py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">{totalNiches}</div>
              <div className="text-sm text-muted-foreground">Categorieën</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary">{allCategories.length}</div>
              <div className="text-sm text-muted-foreground">Hoofdcategorieën</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">10+</div>
              <div className="text-sm text-muted-foreground">Prop Firms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{currentYear}</div>
              <div className="text-sm text-muted-foreground">Up-to-date</div>
            </div>
          </div>
        </div>
      </section>

      {/* All Categories */}
      {allCategories.map((category) => {
        const categoryData = nicheCategories[category.slug]
        const niches = getNichesByCategorySlug(category.slug)
        const CategoryIcon = iconMap[categoryData.icon] || Layers
        const color = categoryColors[category.slug]
        const colors = colorClasses[color]

        return (
          <section
            key={category.slug}
            id={category.slug}
            className="py-16 border-b border-border"
          >
            <div className="container-wide">
              <div className="flex items-center gap-3 mb-8">
                <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                  <CategoryIcon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{categoryData.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {categoryData.description} • {category.count} categorieën
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {niches.map((niche) => {
                  const NicheIcon = iconMap[niche.icon] || TrendingUp
                  const firmCount = getFirmsForNiche(niche).length

                  return (
                    <Link
                      key={niche.id}
                      href={`/categorie/${niche.slug}`}
                      className={`group p-5 rounded-xl bg-card border border-border ${colors.border} transition-all hover:-translate-y-1`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}>
                          <NicheIcon className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className={`font-semibold text-white group-hover:${colors.text} transition-colors truncate`}>
                              {niche.name}
                            </h3>
                            <ChevronRight className={`w-4 h-4 text-muted-foreground group-hover:${colors.text} transition-colors shrink-0`} />
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {niche.shortDescription}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 text-xs rounded-md ${colors.bg} ${colors.text}`}>
                              {firmCount} firms
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )
      })}

      {/* Quick Navigation */}
      <section className="py-16 border-b border-border bg-card/30">
        <div className="container-wide">
          <h2 className="text-xl font-bold text-white mb-6">Snelnavigatie</h2>
          <div className="flex flex-wrap gap-3">
            {allCategories.map((category) => {
              const categoryData = nicheCategories[category.slug]
              const CategoryIcon = iconMap[categoryData.icon] || Layers
              const color = categoryColors[category.slug]
              const colors = colorClasses[color]

              return (
                <a
                  key={category.slug}
                  href={`#${category.slug}`}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border ${colors.border} transition-all`}
                >
                  <CategoryIcon className={`w-4 h-4 text-muted-foreground group-hover:${colors.text} transition-colors`} />
                  <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">
                    {categoryData.name}
                  </span>
                  <span className="text-xs text-muted-foreground/60">({category.count})</span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-card/50 to-background">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Weet je niet welke categorie?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Gebruik onze vergelijkingstool om alle prop firms naast elkaar te zetten en de beste keuze te maken.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-glow-green px-8 py-6 text-lg"
            >
              <Link href="/vergelijk" className="flex items-center gap-2">
                Vergelijk Alle Firms
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-border hover:border-primary/50 px-8 py-6 text-lg"
            >
              <Link href="/prop-firms" className="flex items-center gap-2">
                Bekijk Reviews
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
