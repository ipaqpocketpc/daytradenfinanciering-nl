import Link from "next/link"
import Script from "next/script"
import { Star, ArrowRight, Quote, MapPin, CheckCircle, Users, Target, Zap, ChevronRight } from "lucide-react"
import { Button, Badge } from "@/components/ui"
import { HeroSection, TrustBadges, FirmCard } from "@/components/sections"
import { firms, getTopCities, getPartnerFirms, generateCityStats, siteReviewStats } from "@/config"
import { formatCurrency, formatNumber } from "@/lib/utils"

export default function HomePage() {
  const currentYear = new Date().getFullYear()
  const partnerFirms = getPartnerFirms()
  const otherFirms = firms.filter((f) => !f.isPartner && f.isActive).slice(0, 3)
  const topCities = getTopCities(10)

  return (
    <>
      {/* Hero */}
      <HeroSection
        title="Vergelijk Prop Firms & Word Funded"
        highlightedWord="Funded"
        subtitle="De #1 vergelijkingssite voor prop trading firms in Nederland. Onafhankelijke reviews, eerlijke vergelijkingen en actuele prijzen."
        badge={`Actuele Data ${currentYear}`}
        primaryCta={{ label: "Vergelijk Nu", href: "/vergelijk" }}
        secondaryCta={{ label: "Bekijk Alle Firms", href: "/prop-firms" }}
      />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Featured Firms */}
      <section className="py-24">
        <div className="container-wide">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
                Top {currentYear}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Aanbevolen Prop Firms
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Geselecteerd op betrouwbaarheid, voorwaarden en trader reviews
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-border hover:border-primary/50 text-white self-start md:self-auto"
            >
              <Link href="/prop-firms" className="flex items-center gap-2">
                Alle Firms
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Firm cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerFirms.map((firm) => (
              <FirmCard key={firm.id} firm={firm} featured />
            ))}
            {otherFirms.map((firm) => (
              <FirmCard key={firm.id} firm={firm} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Vergelijk Direct
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Alle Prop Firms Naast Elkaar
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Vergelijk profit splits, prijzen en voorwaarden in één overzicht
            </p>
          </div>

          {/* Table */}
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-card border-b border-border">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Prop Firm</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Profit Split</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Vanaf</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Max Account</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Payout</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Rating</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {firms.slice(0, 6).map((firm) => {
                    const lowestPrice = Math.min(...Object.values(firm.challengePrices))
                    const maxAccount = firm.accountSizes[firm.accountSizes.length - 1]

                    return (
                      <tr
                        key={firm.id}
                        className={`
                          border-b border-border last:border-b-0 transition-colors
                          ${firm.isPartner
                            ? "bg-secondary/5 hover:bg-secondary/10"
                            : "bg-background hover:bg-card"
                          }
                        `}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-white">{firm.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-secondary font-semibold">{firm.profitSplit}</span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {formatCurrency(lowestPrice, firm.currency)}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {formatCurrency(maxAccount, firm.currency)}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{firm.payoutFrequency}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 text-accent fill-accent" />
                            <span className="text-white font-medium">{firm.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            asChild
                            size="sm"
                            variant={firm.isPartner ? "default" : "outline"}
                            className={firm.isPartner
                              ? "bg-gradient-to-r from-secondary to-secondary-dark text-white"
                              : "border-border hover:border-primary/50 text-white"
                            }
                          >
                            <Link href={`/prop-firms/${firm.slug}`}>
                              Review
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow"
            >
              <Link href="/vergelijk" className="flex items-center gap-2">
                Uitgebreide Vergelijking
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Hoe Het Werkt
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              In 3 Stappen Funded
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Van challenge naar funded account met kapitaal tot €400.000+
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Target,
                title: "Kies een Prop Firm",
                description: "Vergelijk voorwaarden, prijzen en reviews. Selecteer de firm die past bij jouw trading stijl en strategie.",
              },
              {
                step: "02",
                icon: Zap,
                title: "Haal de Challenge",
                description: "Bewijs je trading skills door de profit target te halen binnen de drawdown limieten. Meeste traders slagen binnen 30 dagen.",
              },
              {
                step: "03",
                icon: CheckCircle,
                title: "Trade & Verdien",
                description: "Word funded en ontvang tot 90% van je winst. Trade met kapitaal van de prop firm, zonder eigen risico.",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="relative group"
              >
                {/* Connector line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
                )}

                <div className="relative p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-sm font-bold text-white shadow-glow-sm">
                    {item.step}
                  </div>

                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-24 border-t border-border">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <MapPin className="w-3.5 h-3.5 mr-1" />
                Lokaal
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Prop Trading Per Stad
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Vind traders en informatie in jouw regio
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-border hover:border-primary/50 text-white self-start md:self-auto"
            >
              <Link href="/steden" className="flex items-center gap-2">
                Alle Steden
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {topCities.map((city) => {
              const stats = generateCityStats(city)
              return (
                <Link
                  key={city.id}
                  href={`/${city.slug}`}
                  className="group p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 text-center"
                >
                  <div className="font-semibold text-white group-hover:text-primary transition-colors">
                    {city.name}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {formatNumber(stats.tradersActive)}+ traders
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Ervaringen
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Wat Traders Zeggen
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Echte ervaringen van Nederlandse prop traders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Thomas V.",
                city: "Amsterdam",
                text: "Via Funded Trading Nederland ontdekte ik FTMO. Na 3 weken had ik mijn challenge gehaald. Nu funded met €50K!",
                rating: 5,
              },
              {
                name: "Lisa M.",
                city: "Rotterdam",
                text: "De vergelijking hielp me om de juiste keuze te maken. Apex past perfect bij mijn futures strategie.",
                rating: 5,
              },
              {
                name: "Mark J.",
                city: "Utrecht",
                text: "Eerlijke reviews met voor- en nadelen. Dat mis je bij andere sites. Tweede challenge nu bezig!",
                rating: 5,
              },
            ].map((review, index) => (
              <div
                key={index}
                className="relative p-6 rounded-xl bg-card border border-border"
              >
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />

                <div className="flex items-center gap-1 text-accent mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? "fill-accent" : "fill-none"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-white mb-6 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-white">{review.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {review.city}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden border-t border-border">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        <div className="absolute inset-0 bg-mesh opacity-50" />

        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />

        <div className="relative container-wide text-center">
          <Badge className="mb-6 bg-white/5 text-white border-white/10">
            Start Vandaag
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Klaar om <span className="gradient-text-accent">Funded</span> te Worden?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Vergelijk prop firms en vind de perfecte match voor jouw trading stijl.
            Begin vandaag nog je funded trading reis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-glow-green btn-glow text-base px-8 h-14"
            >
              <Link href="/vergelijk" className="flex items-center gap-2">
                Start Vergelijken
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border hover:border-primary/50 text-white text-base px-8 h-14"
            >
              <Link href="/prop-firms/ftmo">FTMO Review</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD for Organization */}
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Funded Trading Nederland",
            "alternateName": "FundedTrading.nl",
            "url": "https://fundedtrading.nl",
            "logo": "https://fundedtrading.nl/logo.png",
            "description": "De #1 vergelijkingssite voor prop trading firms in Nederland. Onafhankelijke reviews, eerlijke vergelijkingen en actuele prijzen.",
            "foundingDate": "2024",
            "areaServed": {
              "@type": "Country",
              "name": "Netherlands",
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": siteReviewStats.averageRating,
              "reviewCount": siteReviewStats.totalReviews,
              "bestRating": 5,
              "worstRating": 1,
            },
            "sameAs": [],
          }),
        }}
      />

      {/* Schema.org JSON-LD for WebSite */}
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Funded Trading Nederland",
            "url": "https://fundedtrading.nl",
            "description": "Vergelijk prop trading firms in Nederland. Vind de beste prop firm voor jouw trading stijl.",
            "publisher": {
              "@type": "Organization",
              "name": "Funded Trading Nederland",
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://fundedtrading.nl/prop-firms?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </>
  )
}
