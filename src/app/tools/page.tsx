import { Metadata } from "next"
import Link from "next/link"
import {
  Calculator,
  GitCompare,
  HelpCircle,
  BookOpen,
  Calendar,
  Target,
  TrendingDown,
  Scale,
  DollarSign,
  PiggyBank,
  BarChart2,
  Receipt,
  Clock,
  ArrowUpRight,
  Star,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import {
  getActiveTools,
  getPriorityTools,
  getToolsByCategory,
  toolCategories,
  type Tool,
} from "@/config/tools"
import { brand } from "@/config"
import { HeroSection } from "@/components/sections/HeroSection"
import { Button } from "@/components/ui"

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  GitCompare,
  HelpCircle,
  BookOpen,
  Calendar,
  Target,
  TrendingDown,
  Scale,
  DollarSign,
  PiggyBank,
  BarChart2,
  Receipt,
  Clock,
}

const currentYear = new Date().getFullYear()

export const metadata: Metadata = {
  title: `Gratis Trading Tools | Calculators & Hulpmiddelen ${currentYear}`,
  description: `Gratis trading tools voor prop firm traders. Position size calculator, drawdown calculator, consistency checker en meer. Allemaal gratis en in het Nederlands.`,
}

// Tool Card Component
function ToolCard({ tool, featured = false }: { tool: Tool; featured?: boolean }) {
  const IconComponent = iconMap[tool.icon] || Calculator
  const colorClasses = {
    primary: {
      bg: "bg-primary/20",
      text: "text-primary",
      border: "hover:border-primary/30",
      glow: "",
    },
    secondary: {
      bg: "bg-secondary/20",
      text: "text-secondary",
      border: "hover:border-secondary/30",
      glow: featured ? "shadow-glow-green" : "",
    },
    accent: {
      bg: "bg-accent/20",
      text: "text-accent",
      border: "hover:border-accent/30",
      glow: "",
    },
  }
  const colors = colorClasses[tool.color]

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={`
        group relative p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1
        ${featured
          ? "bg-gradient-to-b from-card-elevated to-card border-secondary/30 " + colors.glow
          : "bg-card border-border " + colors.border
        }
      `}
    >
      {featured && (
        <div className="absolute -top-3 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-white flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Populair
          </span>
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
          <IconComponent className={`w-6 h-6 ${colors.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-white group-hover:${colors.text} transition-colors mb-1`}>
            {tool.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {tool.shortDescription}
          </p>
        </div>
        <ArrowUpRight className={`w-5 h-5 text-muted-foreground group-hover:${colors.text} transition-colors shrink-0`} />
      </div>

      {/* Features preview */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tool.seoKeywords.slice(0, 2).map((keyword) => (
          <span
            key={keyword}
            className="px-2 py-1 text-xs rounded-md bg-muted/50 text-muted-foreground"
          >
            {keyword}
          </span>
        ))}
      </div>
    </Link>
  )
}

// Category Section Component
function CategorySection({
  categoryKey,
  tools,
}: {
  categoryKey: keyof typeof toolCategories
  tools: Tool[]
}) {
  const category = toolCategories[categoryKey]
  const CategoryIcon = iconMap[category.icon] || Calculator

  if (tools.length === 0) return null

  return (
    <section className="py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <CategoryIcon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{category.name}</h2>
          <p className="text-sm text-muted-foreground">{category.description}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  )
}

export default function ToolsPage() {
  const priorityTools = getPriorityTools()
  const calculatorTools = getToolsByCategory("calculator")
  const vergelijkerTools = getToolsByCategory("vergelijker")
  const quizTools = getToolsByCategory("quiz")
  const referentieTools = getToolsByCategory("referentie")

  return (
    <>
      <HeroSection
        title="Gratis Trading Tools"
        highlightedWord="Tools"
        subtitle="Professionele calculators en hulpmiddelen voor prop firm traders. Allemaal gratis, in het Nederlands, en speciaal ontworpen voor jouw succes."
        badge={`${getActiveTools().length}+ Tools`}
      />

      {/* Featured/Priority Tools */}
      <section className="py-16 border-b border-border">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Meest Gebruikt</h2>
              <p className="text-sm text-muted-foreground">
                De populairste tools onder prop traders
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {priorityTools.slice(0, 6).map((tool) => (
              <ToolCard key={tool.id} tool={tool} featured />
            ))}
          </div>
        </div>
      </section>

      {/* All Categories */}
      <div className="container-wide">
        <CategorySection categoryKey="calculator" tools={calculatorTools} />

        {vergelijkerTools.length > 0 && (
          <div className="border-t border-border">
            <CategorySection categoryKey="vergelijker" tools={vergelijkerTools} />
          </div>
        )}

        {quizTools.length > 0 && (
          <div className="border-t border-border">
            <CategorySection categoryKey="quiz" tools={quizTools} />
          </div>
        )}

        {referentieTools.length > 0 && (
          <div className="border-t border-border">
            <CategorySection categoryKey="referentie" tools={referentieTools} />
          </div>
        )}
      </div>

      {/* Why Free Section */}
      <section className="py-16 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Waarom zijn deze tools gratis?
            </h2>
            <p className="text-muted-foreground mb-8">
              Wij geloven dat elke trader toegang moet hebben tot professionele tools.
              Door deze gratis aan te bieden, helpen we je betere trading beslissingen te maken.
              We verdienen via affiliate partnerships met prop firms - niet door jou voor tools te laten betalen.
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Calculator className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-white mb-2">100% Gratis</h3>
                <p className="text-sm text-muted-foreground">
                  Geen verborgen kosten, geen premium versies. Alle functies zijn gratis beschikbaar.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                  <Target className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-semibold text-white mb-2">Prop Firm Focused</h3>
                <p className="text-sm text-muted-foreground">
                  Speciaal ontworpen voor prop traders. Inclusief consistency rules, drawdown limits, etc.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-white mb-2">Nederlandse Uitleg</h3>
                <p className="text-sm text-muted-foreground">
                  Elke tool bevat uitgebreide uitleg, tips en FAQ&apos;s. Allemaal in het Nederlands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Klaar om te starten met prop trading?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Gebruik onze tools om je voor te bereiden, en bekijk onze aanbevolen prop firms.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="bg-linear-to-r from-secondary to-secondary-dark text-white shadow-glow-green px-8 py-6 text-lg"
            >
              <Link href="/prop-firms" className="flex items-center gap-2">
                Bekijk Prop Firms
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-border hover:border-primary/50 px-8 py-6 text-lg"
            >
              <Link href="/vergelijk" className="flex items-center gap-2">
                Vergelijk Firms
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Schema.org for Tool Collection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Gratis Trading Tools",
            "description": "Professionele trading calculators en hulpmiddelen voor prop firm traders",
            "url": "https://fundedtrading.nl/tools",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Funded Trading Nederland",
              "url": "https://fundedtrading.nl"
            },
            "about": {
              "@type": "Thing",
              "name": "Prop Trading Tools"
            },
            "numberOfItems": getActiveTools().length
          })
        }}
      />
    </>
  )
}
