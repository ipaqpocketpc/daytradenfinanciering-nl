import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"
import {
  Users,
  TrendingUp,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  Star,
  Crown,
  ChevronRight,
  Zap,
  Globe,
  Wallet,
  Percent,
  Clock,
  Target,
  GraduationCap,
  Bitcoin,
  Layers,
  Lightbulb,
  HelpCircle,
  Rocket,
  MapPin,
} from "lucide-react"
import { cities, getCityBySlug, generateCityStats } from "@/config/cities"
import { firms } from "@/config/firms"
import { getNichesByCategorySlug } from "@/config/niches"
import { generateCityContent } from "@/lib/city-content"

// Icon mapping for niches
const nicheIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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
}
import { formatCurrency } from "@/lib/utils"
import { HeroSection } from "@/components/sections/HeroSection"
import { Button } from "@/components/ui"

interface PageProps {
  params: Promise<{ stad: string }>
}

export async function generateStaticParams() {
  return cities.map((city) => ({
    stad: city.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { stad } = await params
  const city = getCityBySlug(stad)

  if (!city) {
    return {
      title: "Stad niet gevonden",
    }
  }

  const currentYear = new Date().getFullYear()
  const stats = generateCityStats(city)

  return {
    title: `Prop Trading ${city.name} | Funded Worden in ${currentYear}`,
    description: `Prop trading in ${city.name}: ${stats.tradersActive}+ actieve traders, ${stats.accountsOpened}+ funded accounts. Vergelijk de beste prop firms en start met traden in ${city.name}.`,
  }
}

export default async function CityPage({ params }: PageProps) {
  const { stad } = await params
  const city = getCityBySlug(stad)

  if (!city) {
    notFound()
  }

  const stats = generateCityStats(city)
  const content = generateCityContent(city)
  const topFirms = [...firms].filter((f) => f.isActive).sort((a, b) => b.rating - a.rating).slice(0, 3)

  return (
    <>
      <HeroSection
        title={`Prop Trading ${city.name}`}
        highlightedWord={city.name}
        subtitle={`Word een funded trader in ${city.name}. ${stats.tradersActive.toLocaleString("nl-NL")}+ traders gingen je voor. Vergelijk de beste prop firms en start vandaag nog met je challenge.`}
        badge={city.province}
      />

      {/* City Stats */}
      <section className="border-b border-border bg-card/50">
        <div className="container-wide py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {content.statistics.map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-muted/30">
                <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Intro */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Prop Trading in {city.name}
                  </h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  {content.intro.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Why This City */}
              <div>
                <div className="prose prose-invert max-w-none">
                  {content.whyThisCity.split("\n").map((line, index) => {
                    if (line.startsWith("## ")) {
                      return (
                        <h2 key={index} className="text-xl font-bold text-white mt-8 mb-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-secondary" />
                          </div>
                          {line.replace("## ", "")}
                        </h2>
                      )
                    }
                    if (line.startsWith("**") && line.endsWith("**")) {
                      return (
                        <p key={index} className="font-semibold text-white mt-4 mb-2">
                          {line.replace(/\*\*/g, "")}
                        </p>
                      )
                    }
                    if (line.startsWith("- ")) {
                      return (
                        <li key={index} className="text-muted-foreground ml-4">
                          {line.replace("- ", "")}
                        </li>
                      )
                    }
                    if (line.trim()) {
                      return (
                        <p key={index} className="text-muted-foreground leading-relaxed mb-3">
                          {line}
                        </p>
                      )
                    }
                    return null
                  })}
                </div>
              </div>

              {/* Networking Section */}
              <div>
                <div className="prose prose-invert max-w-none">
                  {content.networking.split("\n").map((line, index) => {
                    if (line.startsWith("## ")) {
                      return (
                        <h2 key={index} className="text-xl font-bold text-white mt-8 mb-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                            <Users className="w-5 h-5 text-accent" />
                          </div>
                          {line.replace("## ", "")}
                        </h2>
                      )
                    }
                    if (line.startsWith("**") && line.endsWith("**")) {
                      return (
                        <p key={index} className="font-semibold text-white mt-4 mb-2">
                          {line.replace(/\*\*/g, "")}
                        </p>
                      )
                    }
                    if (line.startsWith("- ")) {
                      return (
                        <li key={index} className="text-muted-foreground ml-4">
                          {line.replace("- ", "")}
                        </li>
                      )
                    }
                    if (line.trim()) {
                      return (
                        <p key={index} className="text-muted-foreground leading-relaxed mb-3">
                          {line}
                        </p>
                      )
                    }
                    return null
                  })}
                </div>
              </div>

              {/* Getting Started */}
              <div>
                <div className="prose prose-invert max-w-none">
                  {content.gettingStarted.split("\n").map((line, index) => {
                    if (line.startsWith("## ")) {
                      return (
                        <h2 key={index} className="text-xl font-bold text-white mt-8 mb-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Rocket className="w-5 h-5 text-primary" />
                          </div>
                          {line.replace("## ", "")}
                        </h2>
                      )
                    }
                    if (line.startsWith("### ")) {
                      return (
                        <h3 key={index} className="text-lg font-semibold text-white mt-6 mb-2">
                          {line.replace("### ", "")}
                        </h3>
                      )
                    }
                    if (line.startsWith("- ")) {
                      return (
                        <li key={index} className="text-muted-foreground ml-4">
                          {line.replace("- ", "")}
                        </li>
                      )
                    }
                    if (line.trim()) {
                      return (
                        <p key={index} className="text-muted-foreground leading-relaxed mb-3">
                          {line}
                        </p>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Tips */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-white">Tips voor {city.name}</h3>
                </div>
                <div className="space-y-4">
                  {content.tips.map((tip, index) => (
                    <div key={index} className="pb-4 border-b border-border last:border-0 last:pb-0">
                      <h4 className="font-medium text-white text-sm mb-1">{tip.title}</h4>
                      <p className="text-xs text-muted-foreground">{tip.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools Callout */}
              <div className="p-6 rounded-xl bg-gradient-to-b from-primary/10 to-primary/5 border border-primary/20">
                <h3 className="font-semibold text-white mb-4">Handige Tools</h3>
                <div className="space-y-3">
                  <Link
                    href="/tools/position-size-calculator"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ArrowUpRight className="w-3 h-3" />
                    Position Size Calculator
                  </Link>
                  <Link
                    href="/tools/risk-reward-calculator"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ArrowUpRight className="w-3 h-3" />
                    Risk-Reward Calculator
                  </Link>
                  <Link
                    href="/tools/drawdown-calculator"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ArrowUpRight className="w-3 h-3" />
                    Drawdown Calculator
                  </Link>
                  <Link
                    href="/tools/challenge-roi-calculator"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ArrowUpRight className="w-3 h-3" />
                    Challenge ROI Calculator
                  </Link>
                </div>
                <div className="mt-4 pt-4 border-t border-primary/20">
                  <Link
                    href="/tools"
                    className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors"
                  >
                    Bekijk alle tools
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Quick Stats Card */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-white mb-4">{city.name} in cijfers</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Provincie</span>
                    <span className="text-sm font-medium text-white">{city.province}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Inwoners</span>
                    <span className="text-sm font-medium text-white">
                      {city.inhabitants.toLocaleString("nl-NL")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Traders</span>
                    <span className="text-sm font-medium text-secondary">
                      {stats.tradersActive.toLocaleString("nl-NL")}+
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Populairste Firm</span>
                    <span className="text-sm font-medium text-primary">{stats.popularFirm}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Firms */}
      <section className="py-16 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Crown className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Populair in {city.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                De beste prop firms voor traders in {city.name}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topFirms.map((firm) => {
              const lowestPrice = Math.min(...Object.values(firm.challengePrices))
              const isPartner = firm.isPartner

              return (
                <div
                  key={firm.id}
                  className={`
                    relative p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1
                    ${isPartner
                      ? "bg-gradient-to-b from-card-elevated to-card border-secondary/30 shadow-glow-green"
                      : "bg-card border-border hover:border-primary/30"
                    }
                  `}
                >
                  {isPartner && (
                    <div className="absolute -top-3 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-white">
                        Aanbevolen
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-4 mt-2">
                    <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center">
                      <span className="font-bold text-xs text-muted-foreground">
                        {firm.name.split(" ")[0].substring(0, 4)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{firm.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-accent fill-accent" />
                        <span className="text-sm text-muted-foreground">{firm.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="text-xs text-muted-foreground">Profit Split</div>
                      <div className="font-semibold text-secondary">{firm.profitSplit}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="text-xs text-muted-foreground">Vanaf</div>
                      <div className="font-semibold text-white">
                        {formatCurrency(lowestPrice, firm.currency)}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/prop-firms/${firm.slug}`}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary hover:text-white transition-all"
                  >
                    Bekijk Review
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              )
            })}
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="border-border hover:border-primary/50">
              <Link href="/prop-firms" className="flex items-center gap-2">
                Bekijk Alle Prop Firms
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trading Categorieën */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Layers className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Prop Trading Categorieën
              </h2>
              <p className="text-sm text-muted-foreground">
                Vind de beste prop firm voor jouw trading stijl
              </p>
            </div>
          </div>

          {/* Trading Stijl */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              Trading Stijl
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {getNichesByCategorySlug("trading-stijlen").slice(0, 5).map((niche) => {
                const NicheIcon = nicheIconMap[niche.icon] || TrendingUp
                return (
                  <Link
                    key={niche.id}
                    href={`/categorie/${niche.slug}`}
                    className="group p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                        <NicheIcon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-medium text-white group-hover:text-primary transition-colors block truncate">
                          {niche.name}
                        </span>
                        <span className="text-xs text-muted-foreground truncate block">
                          {niche.shortDescription}
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Instrumenten */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              Instrumenten
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {getNichesByCategorySlug("instrumenten").slice(0, 5).map((niche) => {
                const NicheIcon = nicheIconMap[niche.icon] || TrendingUp
                return (
                  <Link
                    key={niche.id}
                    href={`/categorie/${niche.slug}`}
                    className="group p-4 rounded-xl bg-card border border-border hover:border-secondary/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                        <NicheIcon className="w-4 h-4 text-secondary" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-medium text-white group-hover:text-secondary transition-colors block truncate">
                          {niche.name}
                        </span>
                        <span className="text-xs text-muted-foreground truncate block">
                          {niche.shortDescription}
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              Populaire Kenmerken
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {getNichesByCategorySlug("prop-firm-features").slice(0, 5).map((niche) => {
                const NicheIcon = nicheIconMap[niche.icon] || TrendingUp
                return (
                  <Link
                    key={niche.id}
                    href={`/categorie/${niche.slug}`}
                    className="group p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                        <NicheIcon className="w-4 h-4 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-medium text-white group-hover:text-accent transition-colors block truncate">
                          {niche.name}
                        </span>
                        <span className="text-xs text-muted-foreground truncate block">
                          {niche.shortDescription}
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Veelgestelde vragen over prop trading in {city.name}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {content.faqs.map((faq, index) => (
              <div key={index} className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Begin vandaag met prop trading in {city.name}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sluit je aan bij {stats.tradersActive.toLocaleString("nl-NL")}+ traders in {city.name}
            en start je reis naar funded trader.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-glow-green px-8 py-6 text-lg"
            >
              <Link href="/vergelijk" className="flex items-center gap-2">
                Vergelijk Prop Firms
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

      {/* Schema.org JSON-LD for FAQPage */}
      <Script
        id="schema-city-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": content.faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Schema.org JSON-LD for LocalBusiness/City */}
      <Script
        id="schema-city-local"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": `Prop Trading ${city.name}`,
            "description": `Prop trading informatie voor traders in ${city.name}. ${stats.tradersActive}+ actieve traders, ${stats.accountsOpened}+ funded accounts.`,
            "url": `https://fundedtrading.nl/${city.slug}`,
            "about": {
              "@type": "City",
              "name": city.name,
              "containedInPlace": {
                "@type": "State",
                "name": city.province,
              },
            },
            "provider": {
              "@type": "Organization",
              "name": "Funded Trading Nederland",
              "url": "https://fundedtrading.nl",
            },
          }),
        }}
      />
    </>
  )
}
