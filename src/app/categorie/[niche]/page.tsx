import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Script from "next/script"
import {
  Star,
  ArrowUpRight,
  Check,
  Crown,
  ChevronRight,
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
} from "lucide-react"
import { niches, getNicheBySlug, getFirmsForNiche, getRelatedNiches, nicheCategories } from "@/config/niches"
import { getActiveTools } from "@/config/tools"
import { brand } from "@/config"
import { formatCurrency } from "@/lib/utils"
import { generateNicheContent } from "@/lib/niche-content"
import { HeroSection } from "@/components/sections/HeroSection"
import { Button } from "@/components/ui"
import { Lightbulb, BarChart, BookOpenCheck, AlertCircle } from "lucide-react"

// Extended icon mapping for all 167 niches
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

interface PageProps {
  params: Promise<{ niche: string }>
}

export async function generateStaticParams() {
  return niches.map((niche) => ({
    niche: niche.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { niche: nicheSlug } = await params
  const niche = getNicheBySlug(nicheSlug)

  if (!niche) {
    return {
      title: "Pagina niet gevonden",
    }
  }

  const currentYear = new Date().getFullYear()
  getFirmsForNiche(niche) // For validation

  return {
    title: `${niche.title} ${currentYear}`,
    description: niche.description,
    keywords: niche.seoKeywords.join(", "),
    openGraph: {
      title: `${niche.title} ${currentYear}`,
      description: niche.description,
      type: "website",
    },
    alternates: {
      canonical: `https://fundedtrading.nl/categorie/${niche.slug}`,
    },
    other: {
      "article:modified_time": new Date().toISOString(),
      "og:locale": "nl_NL",
    },
  }
}

export default async function NichePage({ params }: PageProps) {
  const { niche: nicheSlug } = await params
  const niche = getNicheBySlug(nicheSlug)

  if (!niche) {
    notFound()
  }

  const firms = getFirmsForNiche(niche)
  const relatedNiches = getRelatedNiches(niche)
  const tools = getActiveTools()
  const Icon = iconMap[niche.icon] || TrendingUp
  const currentYear = new Date().getFullYear()
  const categoryInfo = nicheCategories[niche.category]

  // Generate rich content for this niche (1000-1500 words)
  const content = generateNicheContent(niche)

  // Find related tools based on niche
  const relatedTools = tools.filter(tool =>
    tool.relatedCategories?.includes(niche.slug) ||
    niche.relatedNiches?.some(rn => tool.relatedCategories?.includes(rn))
  ).slice(0, 3)

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://fundedtrading.nl/categorie/${niche.slug}`,
        "url": `https://fundedtrading.nl/categorie/${niche.slug}`,
        "name": `${niche.title} ${currentYear}`,
        "description": niche.description,
        "isPartOf": {
          "@id": "https://fundedtrading.nl/#website"
        },
        "dateModified": new Date().toISOString(),
        "inLanguage": "nl-NL",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://fundedtrading.nl"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Categorieën",
              "item": "https://fundedtrading.nl/categorie"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": niche.name,
              "item": `https://fundedtrading.nl/categorie/${niche.slug}`
            }
          ]
        }
      },
      {
        "@type": "ItemList",
        "name": `Top Prop Firms voor ${niche.name}`,
        "description": niche.description,
        "numberOfItems": firms.length,
        "itemListElement": firms.slice(0, 10).map((firm, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": firm.name,
          "url": `https://fundedtrading.nl/prop-firms/${firm.slug}`
        }))
      },
      // Add FAQPage schema with generated FAQs (always 5 FAQs per page)
      {
        "@type": "FAQPage",
        "mainEntity": content.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  }

  return (
    <>
      {/* Schema.org JSON-LD */}
      <Script
        id="schema-niche"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <HeroSection
        title={niche.title}
        highlightedWord={niche.title.includes(niche.name) ? niche.name : "Prop Firms"}
        subtitle={niche.description}
        badge={`${currentYear} Gids`}
      />

      {/* Breadcrumb */}
      <section className="border-b border-border bg-card/30">
        <div className="container-wide py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/categorie" className="hover:text-primary transition-colors">Categorieën</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{niche.name}</span>
          </nav>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border bg-card/50">
        <div className="container-wide py-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {niche.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border"
              >
                <Check className="w-4 h-4 text-secondary" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Firms List */}
      <section className="py-16">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Top {firms.length} Prop Firms voor {niche.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                Gerangschikt op geschiktheid voor {niche.name.toLowerCase()}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {firms.map((firm, index) => {
              const lowestPrice = Math.min(...Object.values(firm.challengePrices))
              const isPartner = firm.isPartner

              return (
                <Link
                  key={firm.id}
                  href={`/prop-firms/${firm.slug}`}
                  className={`
                    group flex flex-col md:flex-row md:items-center gap-4 p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1
                    ${isPartner
                      ? "bg-gradient-to-r from-card-elevated to-card border-secondary/30 shadow-glow-green"
                      : "bg-card border-border hover:border-primary/30"
                    }
                  `}
                >
                  {/* Rank */}
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shrink-0
                    ${index < 2 ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground"}
                  `}>
                    {index + 1}
                  </div>

                  {/* Firm Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0">
                      <span className="font-bold text-xs text-muted-foreground">
                        {firm.name.split(" ")[0].substring(0, 4)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white group-hover:text-primary transition-colors truncate">
                          {firm.name}
                        </h3>
                        {isPartner && (
                          <Crown className="w-4 h-4 text-secondary shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 text-accent fill-accent" />
                        <span className="text-sm text-muted-foreground">{firm.rating}</span>
                        <span className="text-xs text-muted-foreground/60">
                          ({firm.reviewCount.toLocaleString("nl-NL")}+)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 md:gap-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-secondary">{firm.profitSplit}</div>
                      <div className="text-xs text-muted-foreground">Profit Split</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        {formatCurrency(lowestPrice, firm.currency)}
                      </div>
                      <div className="text-xs text-muted-foreground">Vanaf</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{firm.payoutFrequency}</div>
                      <div className="text-xs text-muted-foreground">Payout</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                    Bekijk Review
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Rich Introduction Section - 300-500 words */}
      <section className="py-16 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-muted-foreground leading-relaxed">
                {content.intro.split('\n').map((paragraph, idx) => (
                  paragraph.trim() && (
                    <p key={idx} className="mb-4">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 border-t border-border">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
              <BarChart className="w-5 h-5 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {niche.name} Statistieken
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {content.statistics.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border text-center"
              >
                <div className="text-2xl font-bold text-secondary mb-2">{stat.value}</div>
                <div className="font-medium text-white mb-1">{stat.label}</div>
                {stat.description && (
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              {content.howItWorks.split('\n').map((line, idx) => {
                const trimmed = line.trim()
                if (!trimmed) return null

                // Handle headers
                if (trimmed.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="text-2xl font-bold text-white mt-8 mb-4">
                      {trimmed.replace('## ', '')}
                    </h2>
                  )
                }
                if (trimmed.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-xl font-semibold text-white mt-6 mb-3">
                      {trimmed.replace('### ', '')}
                    </h3>
                  )
                }

                // Handle list items
                if (trimmed.startsWith('- ')) {
                  return (
                    <div key={idx} className="flex items-start gap-3 mb-2 ml-4">
                      <Check className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{trimmed.replace('- ', '')}</span>
                    </div>
                  )
                }

                // Handle numbered items
                if (/^\d+\./.test(trimmed)) {
                  const text = trimmed.replace(/^\d+\.\s*/, '')
                  return (
                    <div key={idx} className="flex items-start gap-3 mb-3 ml-4">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm shrink-0">
                        {trimmed.match(/^\d+/)?.[0]}
                      </span>
                      <span
                        className="text-muted-foreground"
                        dangerouslySetInnerHTML={{
                          __html: text.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
                        }}
                      />
                    </div>
                  )
                }

                // Regular paragraph
                return (
                  <p
                    key={idx}
                    className="text-muted-foreground mb-4"
                    dangerouslySetInnerHTML={{
                      __html: trimmed.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
                    }}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Important Section */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              {content.whyImportant.split('\n').map((line, idx) => {
                const trimmed = line.trim()
                if (!trimmed) return null

                // Handle headers
                if (trimmed.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-3">
                      <BookOpenCheck className="w-7 h-7 text-accent" />
                      {trimmed.replace('## ', '')}
                    </h2>
                  )
                }

                // Handle list items
                if (trimmed.startsWith('- ')) {
                  return (
                    <div key={idx} className="flex items-start gap-3 mb-2 ml-4">
                      <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{trimmed.replace('- ', '')}</span>
                    </div>
                  )
                }

                // Regular paragraph
                return (
                  <p key={idx} className="text-muted-foreground mb-4">
                    {trimmed}
                  </p>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contextual Tools Section with Internal Links */}
      <section className="py-12 border-t border-border bg-gradient-to-b from-secondary/5 to-transparent">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-card border border-secondary/20">
              <div className="prose prose-invert max-w-none">
                {content.toolsCallout.split('\n').map((line, idx) => {
                  const trimmed = line.trim()
                  if (!trimmed) return null

                  // Handle headers
                  if (trimmed.startsWith('### ')) {
                    return (
                      <h3 key={idx} className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-secondary" />
                        {trimmed.replace('### ', '')}
                      </h3>
                    )
                  }

                  // Regular paragraph with links
                  return (
                    <p
                      key={idx}
                      className="text-muted-foreground mb-3"
                      dangerouslySetInnerHTML={{
                        __html: trimmed.replace(
                          /\[([^\]]+)\]\(([^)]+)\)/g,
                          '<a href="$2" class="text-secondary hover:text-secondary/80 font-medium underline underline-offset-4">$1</a>'
                        )
                      }}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              5 Tips voor {niche.name}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {content.tips.map((tip, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border hover:border-accent/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <h3 className="font-semibold text-white">{tip.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Always shows 5 FAQs */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Veelgestelde vragen over {niche.name}
              </h2>
            </div>

            <div className="space-y-4">
              {content.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border"
                >
                  <h3 className="font-semibold text-white mb-3 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm shrink-0">
                      {index + 1}
                    </span>
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground pl-9">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Tools - Internal Linking */}
      {relatedTools.length > 0 && (
        <section className="py-16 border-t border-border bg-card/30">
          <div className="container-wide">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Handige Tools voor {niche.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Gratis calculators en tools om je te helpen
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedTools.map((tool) => {
                const ToolIcon = iconMap[tool.icon] || Calculator
                return (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    className="group p-6 rounded-xl bg-card border border-border hover:border-secondary/30 transition-all hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4">
                      <ToolIcon className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="font-semibold text-white group-hover:text-secondary transition-colors mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{tool.shortDescription}</p>
                  </Link>
                )
              })}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                Bekijk alle tools
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Related Niches - Internal Linking */}
      {relatedNiches.length > 0 && (
        <section className="py-16 border-t border-border">
          <div className="container-wide">
            <h2 className="text-xl font-bold text-white mb-6">
              Gerelateerde categorieën
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedNiches.map((relatedNiche) => {
                const RelatedIcon = iconMap[relatedNiche.icon] || TrendingUp
                const firmCount = getFirmsForNiche(relatedNiche).length
                return (
                  <Link
                    key={relatedNiche.id}
                    href={`/categorie/${relatedNiche.slug}`}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <RelatedIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white group-hover:text-primary transition-colors truncate">
                        {relatedNiche.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{firmCount} prop firms</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Category Section */}
      <section className="py-16 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Layers className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Meer in {categoryInfo.name}
              </h2>
              <p className="text-sm text-muted-foreground">{categoryInfo.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {niches
              .filter((n) => n.category === niche.category && n.id !== niche.id)
              .slice(0, 8)
              .map((otherNiche) => {
                const OtherIcon = iconMap[otherNiche.icon] || TrendingUp
                return (
                  <Link
                    key={otherNiche.id}
                    href={`/categorie/${otherNiche.slug}`}
                    className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-accent/30 transition-all"
                  >
                    <OtherIcon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                    <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">
                      {otherNiche.name}
                    </span>
                  </Link>
                )
              })}
          </div>

          <div className="mt-6">
            <Link
              href="/categorie"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
            >
              Bekijk alle categorieën
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border bg-gradient-to-b from-card/50 to-background">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Klaar om te starten met {niche.name}?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Vergelijk alle prop firms en vind de beste match voor jouw {niche.name.toLowerCase()} strategie.
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
