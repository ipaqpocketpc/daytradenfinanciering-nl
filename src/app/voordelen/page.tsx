import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  ArrowRight,
  CheckCircle,
  Wallet,
  TrendingUp,
  Shield,
  Clock,
  Percent,
  Scale,
  Target,
  Users,
  BarChart3,
  Zap,
  Globe,
  Laptop,
  Award,
  RefreshCw,
} from "lucide-react"
import { Button, Badge } from "@/components/ui"
import { brand } from "@/config/brand"

export const metadata: Metadata = {
  title: "Voordelen van Funded Trading | Waarom Traders Kiezen voor Financiering",
  description:
    "Ontdek alle voordelen van funded trading: geen eigen kapitaal nodig, tot 90% winstdeling, beperkt risico en schaalbaar kapitaal.",
  alternates: {
    canonical: "/voordelen",
  },
  openGraph: {
    title: "Voordelen van Funded Trading | Waarom Traders Kiezen voor Financiering",
    description:
      "Ontdek alle voordelen van funded trading: geen eigen kapitaal nodig, tot 90% winstdeling.",
    url: `${brand.url}/voordelen`,
  },
}

export default function VoordelenPage() {
  const mainBenefits = [
    {
      icon: Wallet,
      title: "Geen Eigen Kapitaal Nodig",
      description:
        "Start met €89 in plaats van €10.000. Je krijgt het trading kapitaal, jij levert de skills.",
      stats: "€89 vs €10.000",
      color: "primary",
    },
    {
      icon: Shield,
      title: "Beperkt Persoonlijk Risico",
      description:
        "Je maximale verlies is de challenge fee. Je eigen spaargeld en vermogen blijven onaangetast.",
      stats: "Max verlies = fee",
      color: "secondary",
    },
    {
      icon: Percent,
      title: "Tot 90% Winstdeling",
      description:
        "Houd het overgrote deel van je winst. Bij eigen trading is dit 100%, maar je draagt ook 100% risico.",
      stats: "80-90% voor jou",
      color: "accent",
    },
    {
      icon: TrendingUp,
      title: "Schaalbaar Kapitaal",
      description:
        "Begin met €10K en groei naar €200K of meer. Bewijs jezelf en ontvang steeds meer kapitaal.",
      stats: "Tot €200.000+",
      color: "primary",
    },
    {
      icon: Clock,
      title: "Snelle Uitbetalingen",
      description:
        "Ontvang je winst binnen 24-48 uur. Geen lange wachttijden, geen ingewikkelde procedures.",
      stats: "24-48 uur",
      color: "secondary",
    },
    {
      icon: Scale,
      title: "Professionele Omgeving",
      description:
        "Toegang tot dezelfde platforms, tools en condities als institutionele traders.",
      stats: "Pro-niveau tools",
      color: "accent",
    },
  ]

  const comparisonPoints = [
    {
      aspect: "Startkapitaal",
      traditional: "€10.000 - €50.000 eigen geld",
      propFirm: "€89 - €495 challenge fee",
    },
    {
      aspect: "Risico",
      traditional: "100% eigen risico",
      propFirm: "Max verlies = challenge fee",
    },
    {
      aspect: "Winstpotentie",
      traditional: "Beperkt door eigen kapitaal",
      propFirm: "Tot €200.000 kapitaal beschikbaar",
    },
    {
      aspect: "Schalen",
      traditional: "Meer sparen of lenen",
      propFirm: "Bewijs skills → meer kapitaal",
    },
    {
      aspect: "Winstdeling",
      traditional: "100% (maar ook 100% risico)",
      propFirm: "80-90% (met beperkt risico)",
    },
    {
      aspect: "Professionele tools",
      traditional: "Vaak dure abonnementen",
      propFirm: "Inbegrepen in het programma",
    },
  ]

  const additionalBenefits = [
    {
      icon: Globe,
      title: "Trade Vanaf Overal",
      description:
        "Werk vanuit huis, een café of op reis. Je hebt alleen een laptop en internet nodig.",
    },
    {
      icon: Laptop,
      title: "Gratis Platforms",
      description:
        "Toegang tot MetaTrader 4/5, cTrader of andere platforms zonder extra kosten.",
    },
    {
      icon: Users,
      title: "Community & Support",
      description:
        "Actieve communities waar je kunt leren van andere funded traders.",
    },
    {
      icon: Award,
      title: "Geen Ervaring Vereist",
      description:
        "Je hoeft geen diploma of certificaat te hebben. Bewijs je skills in de challenge.",
    },
    {
      icon: RefreshCw,
      title: "Opnieuw Proberen",
      description:
        "Challenge niet gehaald? Je kunt altijd opnieuw starten. Leren van je fouten.",
    },
    {
      icon: Zap,
      title: "Snel Beginnen",
      description:
        "Na aanmelding kun je direct starten. Geen lange wachttijden of verificatieprocessen.",
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[150px]" />

        <div className="relative container-wide">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary/20 px-4 py-1.5">
              Voordelen
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Waarom Traders{" "}
              <span className="text-secondary">Financiering</span> Kiezen
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Ontdek waarom duizenden traders kiezen voor funded trading. Van
              beperkt risico tot schaalbaar kapitaal.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-glow-green"
              >
                <Link href="/go/kapitaal" className="flex items-center gap-2">
                  Krijg Nu Kapitaal
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border hover:border-secondary/50 text-white"
              >
                <Link href="/hoe-werkt-het">Hoe Werkt Het?</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Benefits Grid */}
      <section className="py-20 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Belangrijkste Voordelen
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              6 Redenen om voor Financiering te Kiezen
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                    benefit.color === "primary"
                      ? "bg-primary/10 group-hover:bg-primary/20"
                      : benefit.color === "secondary"
                        ? "bg-secondary/10 group-hover:bg-secondary/20"
                        : "bg-accent/10 group-hover:bg-accent/20"
                  }`}
                >
                  <benefit.icon
                    className={`w-7 h-7 ${
                      benefit.color === "primary"
                        ? "text-primary"
                        : benefit.color === "secondary"
                          ? "text-secondary"
                          : "text-accent"
                    }`}
                  />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {benefit.description}
                </p>
                <div
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                    benefit.color === "primary"
                      ? "bg-primary/10 text-primary"
                      : benefit.color === "secondary"
                        ? "bg-secondary/10 text-secondary"
                        : "bg-accent/10 text-accent"
                  }`}
                >
                  {benefit.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Vergelijking
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Eigen Kapitaal vs. Funded Trading
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Zie direct de voordelen van funded trading tegenover traditioneel
              traden
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              {/* Header */}
              <div className="grid grid-cols-3 bg-background/50">
                <div className="p-4 border-r border-border">
                  <span className="text-sm font-medium text-muted-foreground">
                    Aspect
                  </span>
                </div>
                <div className="p-4 border-r border-border">
                  <span className="text-sm font-medium text-red-400">
                    Traditioneel Traden
                  </span>
                </div>
                <div className="p-4">
                  <span className="text-sm font-medium text-secondary">
                    Funded Trading
                  </span>
                </div>
              </div>

              {/* Rows */}
              {comparisonPoints.map((point, index) => (
                <div
                  key={point.aspect}
                  className={`grid grid-cols-3 ${
                    index !== comparisonPoints.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  <div className="p-4 border-r border-border">
                    <span className="font-medium text-white">{point.aspect}</span>
                  </div>
                  <div className="p-4 border-r border-border flex items-center gap-2">
                    <span className="text-red-400/80">✕</span>
                    <span className="text-muted-foreground text-sm">
                      {point.traditional}
                    </span>
                  </div>
                  <div className="p-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                    <span className="text-white text-sm">{point.propFirm}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real Numbers */}
      <section className="py-20 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Rekenvoorbeeld
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              De Cijfers Spreken voor Zich
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Traditional */}
            <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <span className="text-red-400">✕</span>
                </div>
                Eigen Kapitaal
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-red-500/10">
                  <span className="text-muted-foreground">Nodig kapitaal</span>
                  <span className="text-white font-semibold">€25.000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-red-500/10">
                  <span className="text-muted-foreground">Bij 10% winst</span>
                  <span className="text-white font-semibold">€2.500</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-red-500/10">
                  <span className="text-muted-foreground">Jouw deel</span>
                  <span className="text-secondary font-semibold">
                    €2.500 (100%)
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Risico</span>
                  <span className="text-red-400 font-semibold">€25.000</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-red-500/10">
                <div className="text-sm text-red-400">
                  ROI op eigen kapitaal: 10%
                </div>
              </div>
            </div>

            {/* Funded Trading */}
            <div className="p-8 rounded-2xl bg-secondary/5 border border-secondary/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                </div>
                Funded Trading
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-secondary/10">
                  <span className="text-muted-foreground">Challenge fee</span>
                  <span className="text-white font-semibold">€155</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-secondary/10">
                  <span className="text-muted-foreground">
                    Kapitaal na challenge
                  </span>
                  <span className="text-white font-semibold">€25.000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-secondary/10">
                  <span className="text-muted-foreground">
                    Bij 10% winst (85% deel)
                  </span>
                  <span className="text-secondary font-semibold">€2.125</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Risico</span>
                  <span className="text-secondary font-semibold">€155</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-secondary/10">
                <div className="text-sm text-secondary">
                  ROI op investering: 1.271%
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-muted-foreground mb-6">
              Met funded trading heb je een veel hogere ROI op je
              investering, met beperkt risico.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-20 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              Extra Voordelen
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nog Meer Redenen om te Kiezen voor Financiering
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {additionalBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="p-6 rounded-xl bg-card border border-border hover:border-secondary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is It For */}
      <section className="py-20 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Voor Wie?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Is Funded Trading Iets voor Jou?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-card border border-secondary/30">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-secondary" />
                Ideaal Voor
              </h3>
              <ul className="space-y-4">
                {[
                  "Traders zonder startkapitaal",
                  "Wie niet wil riskeren met eigen geld",
                  "Beginnende traders die willen leren",
                  "Ervaren traders die willen schalen",
                  "Wie een flexibele werkplek zoekt",
                  "Traders met bewezen strategie",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-primary" />
                Je Hebt Nodig
              </h3>
              <ul className="space-y-4">
                {[
                  "Basiskennis van trading",
                  "Discipline om regels te volgen",
                  "Geduld voor consistente resultaten",
                  "€89+ voor de challenge fee",
                  "Een werkende trading strategie",
                  "Bereidheid om te leren",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />

        <div className="relative container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Overtuigd van de Voordelen?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Begin vandaag nog met je reis naar trading kapitaal. De voordelen
            zijn duidelijk - het is tijd voor actie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-glow-green btn-glow text-base px-8 h-14"
            >
              <Link href="/go/kapitaal" className="flex items-center gap-2">
                Krijg Nu Kapitaal
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border hover:border-primary/50 text-white text-base px-8 h-14"
            >
              <Link href="/kosten">Bekijk de Kosten</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <Script
        id="schema-benefits"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Voordelen van Funded Trading",
            description:
              "Ontdek alle voordelen van funded trading: geen eigen kapitaal nodig, tot 90% winstdeling, beperkt risico.",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: mainBenefits.map((benefit, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: benefit.title,
                description: benefit.description,
              })),
            },
          }),
        }}
      />
    </>
  )
}
