import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { TrendingUp, ArrowUpRight, Star, Crown, Percent, Clock, DollarSign, Gift } from "lucide-react"
import { firms, PropFirm } from "@/config/firms"
import { formatCurrency } from "@/lib/utils"
import { HeroSection } from "@/components/sections/HeroSection"

export const metadata: Metadata = {
  title: `Prop Firms Vergelijken | Beste Keuze ${new Date().getFullYear()}`,
  description: `Vergelijk alle ${firms.length}+ prop trading firms. Vind de beste prop firm voor jouw trading stijl met onze uitgebreide reviews en vergelijkingen.`,
}

function FirmRow({ firm, rank }: { firm: PropFirm; rank: number }) {
  const lowestPrice = Math.min(...Object.values(firm.challengePrices))
  const isPartner = firm.isPartner

  return (
    <div
      className={`
        relative grid grid-cols-12 gap-4 p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1
        ${isPartner
          ? "bg-linear-to-r from-card-elevated to-card border-secondary/30 hover:border-secondary/50 shadow-glow-green"
          : "bg-card border-border hover:border-primary/30"
        }
      `}
    >
      {/* Discount Badge */}
      {firm.discountCode && firm.discountPercentage && (
        <div className="absolute -top-2 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent text-background text-xs font-bold">
          <Gift className="w-3 h-3" />
          {firm.discountPercentage}% KORTING
        </div>
      )}

      {/* Rank */}
      <div className="col-span-1 flex items-center">
        <div className={`
          w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg
          ${rank <= 2 ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground"}
        `}>
          {rank}
        </div>
      </div>

      {/* Firm Info */}
      <div className="col-span-3 flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0">
          <span className="font-bold text-xs text-muted-foreground">
            {firm.name.split(" ")[0].substring(0, 4)}
          </span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white">
              {firm.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 text-accent fill-accent" />
            <span className="text-sm text-muted-foreground">{firm.rating}</span>
            <span className="text-xs text-muted-foreground/60">
              ({firm.reviewCount.toLocaleString("nl-NL")}+)
            </span>
          </div>
        </div>
      </div>

      {/* Profit Split */}
      <div className="col-span-2 flex items-center">
        <div className="text-center">
          <div className="text-lg font-bold text-white">{firm.profitSplit}</div>
          <div className="text-xs text-muted-foreground">Profit Split</div>
        </div>
      </div>

      {/* Prijs vanaf */}
      <div className="col-span-2 flex items-center">
        <div className="text-center">
          <div className="text-lg font-bold text-white">
            {formatCurrency(lowestPrice, firm.currency)}
          </div>
          <div className="text-xs text-muted-foreground">Vanaf</div>
        </div>
      </div>

      {/* Payout */}
      <div className="col-span-2 flex items-center">
        <div className="text-center">
          <div className="text-lg font-bold text-white">{firm.payoutFrequency}</div>
          <div className="text-xs text-muted-foreground">Payout</div>
        </div>
      </div>

      {/* CTA */}
      <div className="col-span-2 flex items-center justify-end gap-2">
        <Link
          href={`/prop-firms/${firm.slug}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary hover:text-white transition-all"
        >
          Review
          <ArrowUpRight className="w-4 h-4" />
        </Link>
        {firm.discountCode && firm.affiliateUrl && (
          <Link
            href={`/go/${firm.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-secondary to-secondary-dark text-white font-medium text-sm shadow-glow-green transition-all"
          >
            <Gift className="w-4 h-4" />
            Korting
          </Link>
        )}
      </div>
    </div>
  )
}

function MobileFirmCard({ firm, rank }: { firm: PropFirm; rank: number }) {
  const lowestPrice = Math.min(...Object.values(firm.challengePrices))
  const isPartner = firm.isPartner

  return (
    <div
      className={`
        relative p-5 rounded-xl border transition-all duration-300
        ${isPartner
          ? "bg-linear-to-b from-card-elevated to-card border-secondary/30 shadow-glow-green"
          : "bg-card border-border hover:border-primary/30"
        }
      `}
    >
      {/* Discount Badge */}
      {firm.discountCode && firm.discountPercentage && (
        <div className="absolute -top-2 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent text-background text-xs font-bold">
          <Gift className="w-3 h-3" />
          {firm.discountPercentage}%
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`
            w-8 h-8 rounded-lg flex items-center justify-center font-bold
            ${rank <= 2 ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground"}
          `}>
            {rank}
          </div>
          <div>
            <h3 className="font-semibold text-white">{firm.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3 h-3 text-accent fill-accent" />
              <span className="text-xs text-muted-foreground">{firm.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="text-sm font-bold text-white">{firm.profitSplit}</div>
          <div className="text-xs text-muted-foreground">Split</div>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="text-sm font-bold text-white">
            {formatCurrency(lowestPrice, firm.currency)}
          </div>
          <div className="text-xs text-muted-foreground">Vanaf</div>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="text-sm font-bold text-white">{firm.payoutFrequency}</div>
          <div className="text-xs text-muted-foreground">Payout</div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-2">
        <Link
          href={`/prop-firms/${firm.slug}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary hover:text-white transition-all"
        >
          Bekijk Review
          <ArrowUpRight className="w-4 h-4" />
        </Link>
        {firm.discountCode && firm.affiliateUrl && (
          <Link
            href={`/go/${firm.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-linear-to-r from-secondary to-secondary-dark text-white font-medium text-sm shadow-glow-green transition-all"
          >
            <Gift className="w-4 h-4" />
            {firm.discountPercentage}% Korting
          </Link>
        )}
      </div>
    </div>
  )
}

export default function PropFirmsPage() {
  const currentYear = new Date().getFullYear()
  const sortedFirms = [...firms]
    .filter((f) => f.isActive)
    .sort((a, b) => a.priority - b.priority || b.rating - a.rating)

  const partnerFirms = sortedFirms.filter((f) => f.isPartner)
  const otherFirms = sortedFirms.filter((f) => !f.isPartner)

  return (
    <>
      <HeroSection
        title="Alle Prop Trading Firms"
        highlightedWord="Prop"
        subtitle={`Vergelijk ${sortedFirms.length}+ prop firms en vind de perfecte match voor jouw trading stijl. Objectieve reviews, actuele prijzen en eerlijke vergelijkingen.`}
        badge={`${currentYear} Rankings`}
      />

      {/* Stats Bar */}
      <section className="border-b border-border bg-card/50">
        <div className="container-wide py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{sortedFirms.length}+</div>
              <div className="text-sm text-muted-foreground">Prop Firms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Onafhankelijk</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">Live</div>
              <div className="text-sm text-muted-foreground">Prijzen & Data</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">Expert</div>
              <div className="text-sm text-muted-foreground">Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-wide">
          {/* Partner Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Crown className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Aanbevolen Prop Firms</h2>
                <p className="text-sm text-muted-foreground">Onze top keuzes voor {currentYear}</p>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:flex flex-col gap-3">
              {partnerFirms.map((firm, index) => (
                <FirmRow key={firm.id} firm={firm} rank={index + 1} />
              ))}
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden grid gap-4">
              {partnerFirms.map((firm, index) => (
                <MobileFirmCard key={firm.id} firm={firm} rank={index + 1} />
              ))}
            </div>
          </div>

          {/* All Firms Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Alle Prop Firms</h2>
                <p className="text-sm text-muted-foreground">Volledig overzicht met reviews</p>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:flex flex-col gap-3">
              {otherFirms.map((firm, index) => (
                <FirmRow key={firm.id} firm={firm} rank={partnerFirms.length + index + 1} />
              ))}
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden grid gap-4">
              {otherFirms.map((firm, index) => (
                <MobileFirmCard key={firm.id} firm={firm} rank={partnerFirms.length + index + 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Hoe kiezen we de beste prop firms?
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Onze rankings zijn gebaseerd op uitgebreid onderzoek en echte trading ervaring.
              We kijken naar betrouwbaarheid, voorwaarden, kosten en gebruikerservaringen.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Percent className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-white mb-2">Voorwaarden</h3>
                <p className="text-sm text-muted-foreground">
                  Profit split, drawdown limieten, en challenge regels vergeleken.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-white mb-2">Prijs-Kwaliteit</h3>
                <p className="text-sm text-muted-foreground">
                  Challenge kosten vs. wat je krijgt - eerlijke waarde analyse.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-white mb-2">Betrouwbaarheid</h3>
                <p className="text-sm text-muted-foreground">
                  Payout snelheid, klantenservice en track record.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD for ItemList */}
      <Script
        id="schema-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Beste Prop Trading Firms",
            "description": `Vergelijk alle ${sortedFirms.length}+ prop trading firms. Vind de beste prop firm voor jouw trading stijl.`,
            "numberOfItems": sortedFirms.length,
            "itemListElement": sortedFirms.slice(0, 10).map((firm, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": firm.name,
                "description": firm.description,
                "url": `https://fundedtrading.nl/prop-firms/${firm.slug}`,
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": firm.rating,
                  "reviewCount": firm.reviewCount,
                  "bestRating": 5,
                  "worstRating": 1,
                },
              },
            })),
          }),
        }}
      />
    </>
  )
}
