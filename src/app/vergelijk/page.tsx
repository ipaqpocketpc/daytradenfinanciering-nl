import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  Check,
  Star,
  ArrowUpRight,
  TrendingUp,
  Crown,
  Percent,
  Clock,
  Target,
  Shield,
  ChevronRight,
  Scale,
  Gift,
} from "lucide-react"
import { firms, PropFirm, getFirmBySlug } from "@/config/firms"
import { formatCurrency } from "@/lib/utils"
import { HeroSection } from "@/components/sections/HeroSection"
import { Button } from "@/components/ui"
import { getComparisonPairs } from "@/lib/comparison-content"
import { InteractiveComparator } from "@/components/comparison/InteractiveComparator"

export const metadata: Metadata = {
  title: `Prop Firms Vergelijken ${new Date().getFullYear()} | Complete Vergelijkingstabel`,
  description: `Vergelijk alle prop trading firms in één overzicht. Profit split, prijzen, voorwaarden en meer. Vind de beste prop firm voor jouw trading stijl.`,
}

function ComparisonRow({ firm, isPartner }: { firm: PropFirm; isPartner: boolean }) {
  const lowestPrice = Math.min(...Object.values(firm.challengePrices))
  const highestAccountSize = Math.max(...firm.accountSizes)

  return (
    <tr
      className={`
        border-b border-border hover:bg-card/50 transition-colors
        ${isPartner ? "bg-secondary/5" : ""}
      `}
    >
      {/* Firm Name */}
      <td className="py-5 px-4">
        <Link href={`/prop-firms/${firm.slug}`} className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0">
            <span className="font-bold text-xs text-muted-foreground">
              {firm.name.split(" ")[0].substring(0, 3)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white group-hover:text-primary transition-colors">
                {firm.name}
              </span>
              {isPartner && (
                <Crown className="w-4 h-4 text-secondary" />
              )}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3 h-3 text-accent fill-accent" />
              <span className="text-xs text-muted-foreground">{firm.rating}</span>
            </div>
          </div>
        </Link>
      </td>

      {/* Profit Split */}
      <td className="py-5 px-4 text-center">
        <span className="font-semibold text-secondary">{firm.profitSplit}</span>
      </td>

      {/* Account Sizes */}
      <td className="py-5 px-4 text-center">
        <span className="text-white">{formatCurrency(highestAccountSize, firm.currency)}</span>
      </td>

      {/* Price From */}
      <td className="py-5 px-4 text-center">
        <span className="text-white">{formatCurrency(lowestPrice, firm.currency)}</span>
      </td>

      {/* Phases */}
      <td className="py-5 px-4 text-center">
        <span className="text-white">{firm.challengePhases}</span>
      </td>

      {/* Profit Target */}
      <td className="py-5 px-4 text-center">
        <span className="text-white">{firm.profitTarget.join("% / ")}%</span>
      </td>

      {/* Max Drawdown */}
      <td className="py-5 px-4 text-center">
        <span className="text-white">{firm.maxTotalDrawdown}%</span>
      </td>

      {/* Payout */}
      <td className="py-5 px-4 text-center">
        <span className="text-white">{firm.payoutFrequency}</span>
      </td>

      {/* Platforms */}
      <td className="py-5 px-4 text-center">
        <div className="flex flex-wrap justify-center gap-1">
          {firm.platforms.slice(0, 2).map((platform) => (
            <span key={platform} className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
              {platform}
            </span>
          ))}
          {firm.platforms.length > 2 && (
            <span className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
              +{firm.platforms.length - 2}
            </span>
          )}
        </div>
      </td>

      {/* Action */}
      <td className="py-5 px-4">
        <div className="flex items-center gap-2">
          <Link
            href={`/prop-firms/${firm.slug}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary hover:text-white transition-all"
          >
            Review
            <ArrowUpRight className="w-3 h-3" />
          </Link>
          {firm.discountCode && firm.affiliateUrl && (
            <Link
              href={`/go/${firm.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-linear-to-r from-secondary to-secondary-dark text-white text-sm font-medium hover:shadow-glow-green transition-all"
            >
              <Gift className="w-3 h-3" />
              {firm.discountPercentage}%
            </Link>
          )}
        </div>
      </td>
    </tr>
  )
}

function MobileComparisonCard({ firm, isPartner }: { firm: PropFirm; isPartner: boolean }) {
  const lowestPrice = Math.min(...Object.values(firm.challengePrices))
  const highestAccountSize = Math.max(...firm.accountSizes)

  return (
    <div
      className={`
        p-5 rounded-xl border transition-all
        ${isPartner
          ? "bg-linear-to-b from-secondary/10 to-card border-secondary/30"
          : "bg-card border-border hover:border-primary/30"
        }
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center">
            <span className="font-bold text-xs text-muted-foreground">
              {firm.name.split(" ")[0].substring(0, 3)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{firm.name}</span>
              {isPartner && <Crown className="w-4 h-4 text-secondary" />}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-accent fill-accent" />
              <span className="text-xs text-muted-foreground">{firm.rating}</span>
            </div>
          </div>
        </div>
        {firm.discountCode && firm.discountPercentage && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/20 border border-accent/30">
            <Gift className="w-3 h-3 text-accent" />
            <span className="text-xs font-bold text-accent">{firm.discountPercentage}%</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="text-muted-foreground text-xs">Profit Split</div>
          <div className="font-semibold text-secondary">{firm.profitSplit}</div>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="text-muted-foreground text-xs">Vanaf</div>
          <div className="font-semibold text-white">{formatCurrency(lowestPrice, firm.currency)}</div>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="text-muted-foreground text-xs">Max Account</div>
          <div className="font-semibold text-white">{formatCurrency(highestAccountSize, firm.currency)}</div>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="text-muted-foreground text-xs">Payout</div>
          <div className="font-semibold text-white">{firm.payoutFrequency}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Link
          href={`/prop-firms/${firm.slug}`}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary hover:text-white transition-all"
        >
          Bekijk Review
          <ArrowUpRight className="w-4 h-4" />
        </Link>
        {firm.discountCode && firm.affiliateUrl && (
          <Link
            href={`/go/${firm.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-linear-to-r from-secondary to-secondary-dark text-white text-sm font-medium shadow-glow-green transition-all"
          >
            <Gift className="w-4 h-4" />
            {firm.discountPercentage}% Korting
          </Link>
        )}
      </div>
    </div>
  )
}

export default function VergelijkPage() {
  const sortedFirms = [...firms]
    .filter((f) => f.isActive)
    .sort((a, b) => {
      // Partners first, then by rating
      if (a.isPartner && !b.isPartner) return -1
      if (!a.isPartner && b.isPartner) return 1
      return b.rating - a.rating
    })

  const partnerFirms = sortedFirms.filter((f) => f.isPartner)
  const otherFirms = sortedFirms.filter((f) => !f.isPartner)

  return (
    <>
      <HeroSection
        title="Prop Firms Vergelijken"
        highlightedWord="Vergelijken"
        subtitle={`De complete vergelijkingstabel van ${sortedFirms.length}+ prop trading firms. Alle informatie die je nodig hebt om de juiste keuze te maken.`}
        badge="Vergelijkingstool"
      />

      {/* Quick Stats */}
      <section className="border-b border-border bg-card/50">
        <div className="container-wide py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">{sortedFirms.length}+</div>
                <div className="text-xs text-muted-foreground">Prop Firms</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Percent className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">Tot 100%</div>
                <div className="text-xs text-muted-foreground">Profit Split</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">€30</div>
                <div className="text-xs text-muted-foreground">Laagste prijs</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">100%</div>
                <div className="text-xs text-muted-foreground">Onafhankelijk</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Comparator */}
      <section className="py-16 border-b border-border">
        <div className="container-wide">
          <InteractiveComparator />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="container-wide">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Compleet Overzicht</h2>
            <p className="text-muted-foreground">
              Alle {sortedFirms.length} prop firms in één overzichtelijke tabel
            </p>
          </div>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto rounded-xl border border-border">
            <table className="w-full">
              <thead>
                <tr className="bg-card border-b border-border">
                  <th className="py-4 px-4 text-left text-sm font-semibold text-white">Prop Firm</th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-white">Profit Split</th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-white">Max Account</th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-white">Vanaf</th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-white">Fases</th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-white">Target</th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-white">Max DD</th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-white">Payout</th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-white">Platforms</th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-white"></th>
                </tr>
              </thead>
              <tbody>
                {sortedFirms.map((firm) => (
                  <ComparisonRow key={firm.id} firm={firm} isPartner={firm.isPartner} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {partnerFirms.length > 0 && (
              <div className="mb-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                  <Crown className="w-5 h-5 text-secondary" />
                  Aanbevolen
                </h3>
                <div className="space-y-4">
                  {partnerFirms.map((firm) => (
                    <MobileComparisonCard key={firm.id} firm={firm} isPartner={true} />
                  ))}
                </div>
              </div>
            )}

            <h3 className="text-lg font-semibold text-white mb-4">Alle Prop Firms</h3>
            <div className="space-y-4">
              {otherFirms.map((firm) => (
                <MobileComparisonCard key={firm.id} firm={firm} isPartner={false} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 border-t border-border bg-card/30">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">Waar moet je op letten?</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Bij het kiezen van een prop firm zijn er verschillende factoren die je moet overwegen.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                <Percent className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Profit Split</h3>
              <p className="text-muted-foreground text-sm">
                Hoeveel van je winst houd je zelf? Let op of dit een vast percentage is of kan groeien.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Challenge Regels</h3>
              <p className="text-muted-foreground text-sm">
                Profit targets, drawdown limieten en tijdslimieten bepalen hoe moeilijk de challenge is.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Payout Snelheid</h3>
              <p className="text-muted-foreground text-sm">
                Hoe snel krijg je je winst? Wekelijks, bi-weekly of maandelijks maakt verschil.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Scaling Plan</h3>
              <p className="text-muted-foreground text-sm">
                Kan je account groeien? Tot hoeveel kapitaal kun je opschalen?
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Betrouwbaarheid</h3>
              <p className="text-muted-foreground text-sm">
                Hoe lang bestaat de firma? Wat zeggen andere traders over hun ervaring?
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Trading Style</h3>
              <p className="text-muted-foreground text-sm">
                Past de prop firm bij jouw stijl? Sommige zijn beter voor scalpers, andere voor swing traders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Comparisons */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-2">Directe Vergelijkingen</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bekijk onze gedetailleerde 1-op-1 vergelijkingen tussen populaire prop firms.
            </p>
          </div>

          {/* FTMO Comparisons */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">F</span>
              FTMO Vergelijkingen
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {getComparisonPairs().filter(p => p.firm1 === 'ftmo').map((pair) => {
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
          </div>

          {/* Apex Comparisons */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary text-sm font-bold">A</span>
              Apex Trader Funding Vergelijkingen
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {getComparisonPairs().filter(p => p.firm1 === 'apex-trader-funding').map((pair) => {
                const f1 = getFirmBySlug(pair.firm1)
                const f2 = getFirmBySlug(pair.firm2)
                if (!f1 || !f2) return null

                return (
                  <Link
                    key={`${pair.firm1}-vs-${pair.firm2}`}
                    href={`/vergelijk/${pair.firm1}-vs-${pair.firm2}`}
                    className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all group"
                  >
                    <Scale className="w-5 h-5 text-secondary shrink-0" />
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
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Weet je welke prop firm je wilt?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Bekijk onze uitgebreide reviews voor meer details over elke prop firm.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="bg-linear-to-r from-primary to-primary-dark text-white shadow-glow-sm px-8 py-6 text-lg"
            >
              <Link href="/prop-firms" className="flex items-center gap-2">
                Bekijk Alle Reviews
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-border hover:border-primary/50 px-8 py-6 text-lg"
            >
              <Link href="/tools/winstcalculator" className="flex items-center gap-2">
                Bereken Potentiële Winst
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD for ItemList (Comparison) */}
      <Script
        id="schema-comparison"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Prop Firms Vergelijkingstabel",
            "description": `Complete vergelijking van ${sortedFirms.length}+ prop trading firms. Profit split, prijzen en voorwaarden.`,
            "url": "https://fundedtrading.nl/vergelijk",
            "numberOfItems": sortedFirms.length,
            "itemListOrder": "https://schema.org/ItemListOrderDescending",
            "itemListElement": sortedFirms.slice(0, 10).map((firm, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": firm.name,
                "url": `https://fundedtrading.nl/prop-firms/${firm.slug}`,
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": firm.rating,
                  "reviewCount": firm.reviewCount,
                },
              },
            })),
          }),
        }}
      />
    </>
  )
}
