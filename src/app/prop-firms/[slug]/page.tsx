import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"
import {
  Star,
  ExternalLink,
  Check,
  X,
  TrendingUp,
  Percent,
  Clock,
  Shield,
  Target,
  BarChart3,
  ArrowRight,
  Calendar,
  ChevronRight,
  Scale,
  ArrowUpRight,
  BadgeCheck,
  Copy,
  Gift,
} from "lucide-react"
import { firms, getFirmBySlug, PropFirm } from "@/config/firms"
import { getComparisonPairs } from "@/lib/comparison-content"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return firms.map((firm) => ({
    slug: firm.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const firm = getFirmBySlug(slug)

  if (!firm) {
    return {
      title: "Prop Firm niet gevonden",
    }
  }

  const currentYear = new Date().getFullYear()

  return {
    title: `${firm.name} Review ${currentYear} | Eerlijke Ervaring & Prijzen`,
    description: `Uitgebreide ${firm.name} review. ${firm.profitSplit} profit split, vanaf ${formatCurrency(Math.min(...Object.values(firm.challengePrices)), firm.currency)}. Lees onze eerlijke ervaring en vergelijk met andere prop firms.`,
  }
}

function PriceCard({ size, price, firm }: { size: number; price: number; firm: PropFirm }) {
  const isPopular = size === 50000 || size === 100000

  return (
    <div
      className={`
        relative p-5 rounded-xl border transition-all duration-300 hover:-translate-y-1
        ${isPopular
          ? "bg-linear-to-b from-primary/10 to-card border-primary/30 shadow-glow-sm"
          : "bg-card border-border hover:border-primary/20"
        }
      `}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium bg-primary text-white">
          Populair
        </div>
      )}
      <div className="text-center">
        <div className="text-2xl font-bold text-white mb-1">
          {formatCurrency(size, firm.currency)}
        </div>
        <div className="text-muted-foreground text-sm mb-4">Account grootte</div>
        <div className="text-3xl font-bold text-primary mb-1">
          {formatCurrency(price, firm.currency)}
        </div>
        <div className="text-muted-foreground text-xs">Challenge prijs</div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  color: "primary" | "secondary" | "accent"
}) {
  const colorClasses = {
    primary: "bg-primary/20 text-primary",
    secondary: "bg-secondary/20 text-secondary",
    accent: "bg-accent/20 text-accent",
  }

  return (
    <div className="p-5 rounded-xl bg-card border border-border group hover:border-primary/30 transition-all">
      <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

export default async function FirmDetailPage({ params }: PageProps) {
  const { slug } = await params
  const firm = getFirmBySlug(slug)

  if (!firm) {
    notFound()
  }

  const lowestPrice = Math.min(...Object.values(firm.challengePrices))
  const highestAccountSize = Math.max(...firm.accountSizes)

  // Get related firms (same priority, excluding current)
  const relatedFirms = firms
    .filter((f) => f.id !== firm.id && f.isActive)
    .slice(0, 3)

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-52 pb-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-background to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

        <div className="container-wide relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/prop-firms" className="hover:text-white transition-colors">Prop Firms</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{firm.name}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-20 h-20 rounded-xl bg-card border border-border flex items-center justify-center shrink-0">
                  <span className="font-bold text-lg text-muted-foreground">
                    {firm.name.split(" ")[0].substring(0, 4)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">{firm.name}</h1>
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(firm.rating) ? "text-accent fill-accent" : "text-muted-foreground/30"
                            }`}
                        />
                      ))}
                      <span className="ml-2 text-lg font-semibold text-white">{firm.rating}</span>
                    </div>
                    <span className="text-muted-foreground">
                      ({firm.reviewCount.toLocaleString("nl-NL")}+ reviews)
                    </span>
                    {firm.lastVerified && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/10 border border-secondary/20">
                        <BadgeCheck className="w-4 h-4 text-secondary" />
                        <span className="text-xs text-secondary font-medium">
                          Geverifieerd {new Date(firm.lastVerified).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {firm.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={Percent} label="Profit Split" value={firm.profitSplit} color="secondary" />
                <StatCard icon={Clock} label="Payout" value={firm.payoutFrequency} color="primary" />
                <StatCard icon={Target} label="Phases" value={`${firm.challengePhases}-fase`} color="accent" />
                <StatCard icon={Calendar} label="Opgericht" value={firm.foundedYear.toString()} color="primary" />
              </div>
            </div>

            {/* CTA Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 p-6 rounded-2xl bg-card border border-border shadow-xl">
                {/* Discount Badge */}
                {firm.discountCode && firm.discountPercentage && (
                  <div className="mb-4 -mt-2 -mx-2">
                    <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-linear-to-r from-accent/20 to-accent/10 border border-accent/30">
                      <Gift className="w-4 h-4 text-accent" />
                      <span className="text-accent font-bold">{firm.discountPercentage}% KORTING</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="text-muted-foreground text-sm mb-1">Vanaf</div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {formatCurrency(lowestPrice, firm.currency)}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Tot {formatCurrency(highestAccountSize, firm.currency)} account
                  </div>
                </div>

                {firm.affiliateUrl && firm.isPartner ? (
                  <>
                    <Button
                      asChild
                      className="w-full mb-3 bg-linear-to-r from-secondary to-secondary-dark text-white shadow-glow-green py-6 text-lg"
                    >
                      <Link
                        href={`/go/${firm.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        {firm.discountCode ? `Claim ${firm.discountPercentage}% Korting` : `Start Nu bij ${firm.name}`}
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                    </Button>

                    {/* Discount Code Display */}
                    {firm.discountCode && (
                      <div className="mb-4 p-3 rounded-lg bg-muted/50 border border-border">
                        <div className="text-xs text-muted-foreground text-center mb-2">Gebruik kortingscode:</div>
                        <div className="flex items-center justify-center gap-2">
                          <code className="px-3 py-1.5 rounded bg-background border border-border text-accent font-mono font-bold tracking-wider">
                            {firm.discountCode}
                          </code>
                          <button
                            className="p-1.5 rounded hover:bg-muted transition-colors"
                            title="Kopieer code"
                          >
                            <Copy className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Button
                    asChild
                    className="w-full mb-4 py-6 text-lg"
                  >
                    <Link href="/vergelijk" className="flex items-center justify-center gap-2">
                      Vergelijk Prop Firms
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                )}

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  Veilig & betrouwbaar
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-white mb-2">Challenge Prijzen</h2>
          <p className="text-muted-foreground mb-8">
            Kies de account grootte die past bij jouw trading kapitaal en risico appetijt.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(firm.challengePrices).map(([size, price]) => (
              <PriceCard
                key={size}
                size={parseInt(size)}
                price={price}
                firm={firm}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Challenge Rules */}
      <section className="py-16 border-t border-border bg-card/30">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-white mb-2">Challenge Regels</h2>
          <p className="text-muted-foreground mb-8">
            Wat je moet weten voordat je begint met de {firm.name} challenge.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-white mb-2">Profit Target</h3>
              <div className="space-y-1">
                {firm.profitTarget.map((target, index) => (
                  <div key={index} className="text-muted-foreground">
                    Fase {index + 1}: <span className="text-white font-medium">{target}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="font-semibold text-white mb-2">Max Drawdown</h3>
              <div className="space-y-1">
                <div className="text-muted-foreground">
                  Dagelijks: <span className="text-white font-medium">{firm.maxDailyLoss}%</span>
                </div>
                <div className="text-muted-foreground">
                  Totaal: <span className="text-white font-medium">{firm.maxTotalDrawdown}%</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-white mb-2">Tijdslimiet</h3>
              <div className="text-muted-foreground">
                {firm.timeLimit || "Geen tijdslimiet"}
              </div>
              <div className="text-muted-foreground mt-1">
                Min. dagen: <span className="text-white font-medium">{firm.minTradingDays}</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-white mb-2">Platforms</h3>
              <div className="flex flex-wrap gap-1">
                {firm.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-white mb-8">Voor- en Nadelen</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pros */}
            <div className="p-6 rounded-xl bg-secondary/5 border border-secondary/20">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-secondary mb-4">
                <Check className="w-5 h-5" />
                Voordelen
              </h3>
              <ul className="space-y-3">
                {firm.pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-red-400 mb-4">
                <X className="w-5 h-5" />
                Nadelen
              </h3>
              <ul className="space-y-3">
                {firm.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Instruments */}
      <section className="py-16 border-t border-border bg-card/30">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-white mb-2">Beschikbare Instrumenten</h2>
          <p className="text-muted-foreground mb-8">
            Trade de markten die je kent bij {firm.name}.
          </p>

          <div className="flex flex-wrap gap-3">
            {firm.instruments.map((instrument) => (
              <div
                key={instrument}
                className="px-4 py-2 rounded-lg bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-white transition-all"
              >
                {instrument}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Firms */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-white mb-2">Vergelijk met andere firms</h2>
          <p className="text-muted-foreground mb-8">
            Bekijk ook deze populaire alternatieven.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedFirms.map((relatedFirm) => (
              <Link
                key={relatedFirm.id}
                href={`/prop-firms/${relatedFirm.slug}`}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center">
                    <span className="font-bold text-xs text-muted-foreground">
                      {relatedFirm.name.split(" ")[0].substring(0, 4)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                      {relatedFirm.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-accent fill-accent" />
                      <span className="text-sm text-muted-foreground">{relatedFirm.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-muted-foreground">Profit Split</div>
                    <div className="font-medium text-white">{relatedFirm.profitSplit}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Vanaf</div>
                    <div className="font-medium text-white">
                      {formatCurrency(Math.min(...Object.values(relatedFirm.challengePrices)), relatedFirm.currency)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Comparisons */}
      {(() => {
        const firmComparisons = getComparisonPairs().filter(
          p => p.firm1 === firm.slug || p.firm2 === firm.slug
        )
        if (firmComparisons.length === 0) return null

        return (
          <section className="py-16 border-t border-border bg-card/30">
            <div className="container-wide">
              <h2 className="text-2xl font-bold text-white mb-2">{firm.name} Vergelijkingen</h2>
              <p className="text-muted-foreground mb-8">
                Bekijk hoe {firm.name} zich verhoudt tot andere populaire prop firms.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {firmComparisons.map((pair) => {
                  const f1 = getFirmBySlug(pair.firm1)
                  const f2 = getFirmBySlug(pair.firm2)
                  if (!f1 || !f2) return null

                  return (
                    <Link
                      key={`${pair.firm1}-vs-${pair.firm2}`}
                      href={`/vergelijk/${pair.firm1}-vs-${pair.firm2}`}
                      className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all group"
                    >
                      <Scale className="w-5 h-5 text-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-white font-medium group-hover:text-primary transition-colors">
                          {f1.name} vs {f2.name}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </Link>
                  )
                })}
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/vergelijk"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  Bekijk alle vergelijkingen
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )
      })()}

      {/* Bottom CTA */}
      <section className="py-16 border-t border-border bg-linear-to-b from-card/50 to-background">
        <div className="container-wide text-center">
          {/* Discount Banner */}
          {firm.discountCode && firm.discountPercentage && (
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-linear-to-r from-accent/20 to-accent/10 border border-accent/30">
              <Gift className="w-5 h-5 text-accent" />
              <span className="text-accent font-bold text-lg">{firm.discountPercentage}% KORTING</span>
              <span className="text-muted-foreground">met code</span>
              <code className="px-2 py-1 rounded bg-background border border-border text-accent font-mono font-bold">
                {firm.discountCode}
              </code>
            </div>
          )}

          <h2 className="text-3xl font-bold text-white mb-4">
            Klaar om te starten met {firm.name}?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Begin vandaag nog met je challenge en word een funded trader.
            Duizenden traders gingen je al voor.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {firm.affiliateUrl && firm.isPartner ? (
              <Button
                asChild
                className="bg-linear-to-r from-secondary to-secondary-dark text-white shadow-glow-green px-8 py-6 text-lg"
              >
                <Link
                  href={`/go/${firm.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  {firm.discountCode ? `Claim ${firm.discountPercentage}% Korting` : `Start Challenge bij ${firm.name}`}
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </Button>
            ) : null}
            <Button
              asChild
              variant="outline"
              className="border-border hover:border-primary/50 px-8 py-6 text-lg"
            >
              <Link href="/prop-firms" className="flex items-center gap-2">
                Bekijk Alle Prop Firms
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD for Product + AggregateRating */}
      <Script
        id="schema-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": `${firm.name} Prop Trading Challenge`,
            "description": firm.description,
            "brand": {
              "@type": "Brand",
              "name": firm.name,
            },
            "offers": {
              "@type": "AggregateOffer",
              "lowPrice": lowestPrice,
              "highPrice": Math.max(...Object.values(firm.challengePrices)),
              "priceCurrency": firm.currency === "EUR" ? "EUR" : "USD",
              "offerCount": Object.keys(firm.challengePrices).length,
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": firm.rating,
              "bestRating": 5,
              "worstRating": 1,
              "reviewCount": firm.reviewCount,
            },
          }),
        }}
      />

      {/* Schema.org JSON-LD for BreadcrumbList */}
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://fundedtrading.nl",
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Prop Firms",
                "item": "https://fundedtrading.nl/prop-firms",
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": firm.name,
                "item": `https://fundedtrading.nl/prop-firms/${firm.slug}`,
              },
            ],
          }),
        }}
      />
    </>
  )
}
