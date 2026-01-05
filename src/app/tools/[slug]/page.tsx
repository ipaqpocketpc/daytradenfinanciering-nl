import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Calculator,
  Target,
  TrendingDown,
  Scale,
  DollarSign,
  PiggyBank,
  BarChart2,
  Receipt,
  Clock,
  HelpCircle,
  ArrowUpRight,
  ChevronRight,
  Lightbulb,
  CheckCircle2,
  BookOpen,
  Info,
  Star,
  ExternalLink,
} from "lucide-react"
import {
  tools,
  getToolBySlug,
  getRelatedTools,
} from "@/config/tools"
import { getPartnerFirms } from "@/config/firms"
import { brand } from "@/config"
import { HeroSection } from "@/components/sections/HeroSection"
import { Button } from "@/components/ui"

// Import all calculator components
import {
  PositionSizeCalculator,
  DrawdownCalculator,
  RiskRewardCalculator,
  ChallengeROICalculator,
  ConsistencyCalculator,
  BreakEvenCalculator,
  PropFirmQuiz,
  BelastingCalculator,
  TradingSessionsClock,
} from "@/components/tools"

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  Target,
  TrendingDown,
  Scale,
  DollarSign,
  PiggyBank,
  BarChart2,
  Receipt,
  Clock,
  HelpCircle,
}

// Tool component mapping - maps slug to actual calculator component
const toolComponents: Record<string, React.ComponentType> = {
  "position-size-calculator": PositionSizeCalculator,
  "drawdown-calculator": DrawdownCalculator,
  "risk-reward-calculator": RiskRewardCalculator,
  "challenge-roi-calculator": ChallengeROICalculator,
  "consistency-calculator": ConsistencyCalculator,
  "break-even-calculator": BreakEvenCalculator,
  "prop-firm-quiz": PropFirmQuiz,
  "belasting-calculator": BelastingCalculator,
  "trading-sessies-klok": TradingSessionsClock,
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return tools
    .filter((tool) => tool.isActive)
    .map((tool) => ({
      slug: tool.slug,
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    return { title: "Tool niet gevonden" }
  }

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    keywords: tool.seoKeywords,
  }
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const relatedTools = getRelatedTools(tool)
  const partnerFirms = getPartnerFirms()
  const IconComponent = iconMap[tool.icon] || Calculator

  const colorClasses = {
    primary: { bg: "bg-primary/20", text: "text-primary", border: "border-primary/30" },
    secondary: { bg: "bg-secondary/20", text: "text-secondary", border: "border-secondary/30" },
    accent: { bg: "bg-accent/20", text: "text-accent", border: "border-accent/30" },
  }
  const colors = colorClasses[tool.color]

  // Schema.org data
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "description": tool.description,
    "url": `https://fundedtrading.nl/tools/${tool.slug}`,
    "applicationCategory": tool.applicationCategory,
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and a modern browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "creator": {
      "@type": "Organization",
      "name": "Funded Trading Nederland",
      "url": "https://fundedtrading.nl"
    },
    "inLanguage": "nl-NL"
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tool.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `Hoe gebruik je de ${tool.name}`,
    "description": `Stap-voor-stap uitleg voor het gebruik van de ${tool.name} voor prop trading.`,
    "step": tool.howToUse.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": `Stap ${index + 1}`,
      "text": step
    })),
    "tool": {
      "@type": "HowToTool",
      "name": tool.name
    }
  }

  return (
    <>
      {/* Hero */}
      <HeroSection
        title={tool.name}
        highlightedWord={tool.shortName}
        subtitle={tool.description}
        badge={tool.category === "calculator" ? "Gratis Calculator" : "Gratis Tool"}
      />

      {/* Main Tool Section */}
      <section className="py-16 border-b border-border">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tool Component Area */}
            <div className="lg:col-span-2">
              <div className={`p-8 rounded-2xl bg-card border ${colors.border}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center`}>
                    <IconComponent className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{tool.name}</h2>
                    <p className="text-sm text-muted-foreground">{tool.shortDescription}</p>
                  </div>
                </div>

                {/* Render the actual tool component */}
                {(() => {
                  const ToolComponent = toolComponents[tool.slug]
                  if (ToolComponent) {
                    return <ToolComponent />
                  }
                  // Fallback for tools without a component yet
                  return (
                    <div className="p-8 rounded-xl bg-muted/30 border border-border text-center">
                      <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        <Calculator className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {tool.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Deze tool wordt binnenkort beschikbaar gemaakt met volledige functionaliteit.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        In de tussentijd kun je onderstaande uitleg en tips lezen.
                      </p>
                    </div>
                  )
                })()}

                {/* Quick tip under calculator */}
                <div className="mt-6 p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white">Pro tip</p>
                      <p className="text-sm text-muted-foreground">
                        {tool.tips[0]?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Partner CTA */}
              <div className="p-6 rounded-xl bg-linear-to-b from-card-elevated to-card border border-secondary/30 shadow-glow-green">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-secondary" />
                  <span className="font-semibold text-white">Aanbevolen Prop Firms</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Klaar om te beginnen? Bekijk onze aanbevolen prop firms.
                </p>
                {partnerFirms.slice(0, 2).map((firm) => (
                  <Link
                    key={firm.id}
                    href={`/prop-firms/${firm.slug}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors mb-2 last:mb-0"
                  >
                    <span className="font-medium text-white">{firm.name}</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </Link>
                ))}
                <Button
                  asChild
                  className="w-full mt-4 bg-secondary hover:bg-secondary-dark text-white"
                >
                  <Link href="/prop-firms">
                    Alle Prop Firms
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Related Tools */}
              {relatedTools.length > 0 && (
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-white mb-4">Gerelateerde Tools</h3>
                  <div className="space-y-3">
                    {relatedTools.map((relatedTool) => {
                      const RelatedIcon = iconMap[relatedTool.icon] || Calculator
                      return (
                        <Link
                          key={relatedTool.id}
                          href={`/tools/${relatedTool.slug}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                            <RelatedIcon className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium text-white group-hover:text-primary transition-colors block truncate">
                              {relatedTool.shortName}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What Is It Section */}
      <section className="py-16 border-b border-border bg-card/30">
        <div className="container-wide">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Info className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Wat is een {tool.name}?
              </h2>
            </div>
            <div className="prose prose-invert max-w-none">
              {tool.whatIsIt.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Important Section */}
      <section className="py-16 border-b border-border">
        <div className="container-wide">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Waarom is dit belangrijk?
              </h2>
            </div>
            <div className="prose prose-invert max-w-none">
              {tool.whyImportant.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How To Use Section */}
      <section className="py-16 border-b border-border bg-card/30">
        <div className="container-wide">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Hoe gebruik je deze tool?
              </h2>
            </div>
            <div className="space-y-4">
              {tool.howToUse.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl bg-card border border-border"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-accent">{index + 1}</span>
                  </div>
                  <p className="text-muted-foreground pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 border-b border-border">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Tips van Experts</h2>
              <p className="text-sm text-muted-foreground">
                {tool.tips.length} praktische tips voor betere resultaten
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tool.tips.map((tip, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border hover:border-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-white">{tip.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 border-b border-border bg-card/30">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Veelgestelde Vragen</h2>
              <p className="text-sm text-muted-foreground">
                Antwoorden op de meest gestelde vragen
              </p>
            </div>
          </div>

          <div className="max-w-3xl space-y-4">
            {tool.faqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <h3 className="font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Tools Section */}
      <section className="py-16 border-b border-border">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Meer Trading Tools</h2>
                <p className="text-sm text-muted-foreground">
                  Ontdek onze andere gratis tools
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link href="/tools" className="flex items-center gap-2">
                Alle Tools
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.slice(0, 4).map((relatedTool) => {
              const RelatedIcon = iconMap[relatedTool.icon] || Calculator
              const relatedColors = colorClasses[relatedTool.color]
              return (
                <Link
                  key={relatedTool.id}
                  href={`/tools/${relatedTool.slug}`}
                  className="group p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${relatedColors.bg} flex items-center justify-center`}>
                      <RelatedIcon className={`w-5 h-5 ${relatedColors.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-white group-hover:text-primary transition-colors block truncate">
                        {relatedTool.shortName}
                      </span>
                      <span className="text-xs text-muted-foreground truncate block">
                        {relatedTool.shortDescription}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link href="/tools" className="flex items-center gap-2">
                Alle Tools
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Klaar om te starten met prop trading?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Gebruik deze tool om je voor te bereiden, en bekijk welke prop firm het beste bij je past.
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
              <Link href="/tools" className="flex items-center gap-2">
                Meer Tools
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 border-t border-border bg-muted/20">
        <div className="container-wide">
          <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto">
            <strong>Disclaimer:</strong> Deze tool is bedoeld voor educatieve doeleinden.
            De berekeningen zijn indicatief en kunnen afwijken van werkelijke resultaten.
            Trading brengt risico&apos;s met zich mee. Raadpleeg een financieel adviseur
            voor persoonlijk advies. {brand.name} geeft geen financieel advies.
          </p>
        </div>
      </section>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  )
}
