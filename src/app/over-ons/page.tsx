import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { CheckCircle, Users, TrendingUp, Shield, Target, ArrowRight } from "lucide-react"
import { HeroSection } from "@/components/sections/HeroSection"

export const metadata: Metadata = {
  title: "Over Funded Trading Nederland | Onafhankelijke Prop Firm Vergelijker",
  description: "Funded Trading Nederland is de #1 onafhankelijke vergelijkingssite voor prop trading firms in Nederland. Eerlijke reviews, actuele prijzen en objectieve vergelijkingen.",
}

const stats = [
  { value: "20+", label: "Prop Firms Vergeleken" },
  { value: "50+", label: "Steden in Nederland" },
  { value: "100%", label: "Onafhankelijk" },
  { value: "2024", label: "Opgericht" },
]

const values = [
  {
    icon: Shield,
    title: "Onafhankelijk & Eerlijk",
    description: "Wij worden niet betaald om firms hoger te zetten. Onze vergelijkingen zijn gebaseerd op feiten, niet op commissie.",
  },
  {
    icon: Target,
    title: "Data-Gedreven",
    description: "Elke vergelijking is gebaseerd op actuele data: prijzen, regels, profit splits en payout voorwaarden.",
  },
  {
    icon: Users,
    title: "Voor Nederlandse Traders",
    description: "Specifiek gericht op de Nederlandse markt. We begrijpen de vragen en behoeften van traders in Nederland.",
  },
  {
    icon: TrendingUp,
    title: "Altijd Actueel",
    description: "Prop firm voorwaarden veranderen regelmatig. Wij houden alles up-to-date zodat jij de juiste keuze maakt.",
  },
]

const whyUs = [
  "Vergelijk 20+ prop trading firms op één plek",
  "Actuele prijzen en voorwaarden",
  "Objectieve voor- en nadelen per firm",
  "Gratis tools zoals calculators en quizzes",
  "Nederlandse content, geen vertalingen",
  "Geen verborgen agenda's of gesponsorde rankings",
]

export default function OverOnsPage() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <HeroSection
        title="Over Funded Trading Nederland"
        highlightedWord="Nederland"
        subtitle="De #1 onafhankelijke vergelijkingssite voor prop trading firms. Wij helpen Nederlandse traders de beste keuze maken."
        badge="Onafhankelijk Sinds 2024"
      />

      {/* Stats */}
      <section className="border-b border-border bg-card/50">
        <div className="container-wide py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wat We Doen */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Wat is een Funded Trading Account?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Een funded trading account geeft je toegang tot handelskapitaal van een prop firm,
              zonder dat je eigen geld riskeert. Je betaalt een eenmalige fee voor een evaluatie
              (challenge), en bij succes krijg je een funded account met kapitaal van €10.000
              tot €200.000+. Je houdt 80-90% van de winst die je maakt.
            </p>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Waarom een Vergelijkingssite?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Er zijn tientallen prop trading firms, elk met andere regels, prijzen en voorwaarden.
              Het is tijdrovend om ze allemaal te onderzoeken. Daarom hebben wij Funded Trading
              Nederland opgericht: één plek waar je alle informatie vindt om de beste keuze te maken.
            </p>
          </div>
        </div>
      </section>

      {/* Onze Waarden */}
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Onze Waarden
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dit zijn de principes waar we niet van afwijken.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waarom Funded Trading Nederland */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Waarom Funded Trading Nederland?
              </h2>
              <p className="text-muted-foreground mb-8">
                Wij zijn geen prop firm en verkopen geen challenges. Wij zijn een
                onafhankelijk platform dat je helpt de juiste keuze te maken.
              </p>

              <ul className="space-y-4">
                {whyUs.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary/10 via-card to-secondary/10 rounded-2xl p-8 border border-border">
              <h3 className="text-2xl font-bold text-white mb-4">
                Klaar om te vergelijken?
              </h3>
              <p className="text-muted-foreground mb-6">
                Bekijk onze vergelijkingstool en vind de prop firm die het beste
                bij jouw trading stijl past.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/vergelijk"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                  Start Vergelijken
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/prop-firms"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-card border border-border text-white font-medium hover:border-primary/30 transition-colors"
                >
                  Bekijk Alle Firms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate Disclaimer */}
      <section className="py-12 bg-card/30 border-t border-border">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-lg font-semibold text-white mb-3">
              Transparantie over Affiliate Links
            </h3>
            <p className="text-sm text-muted-foreground">
              Funded Trading Nederland ontvangt een commissie wanneer je via onze links een
              challenge koopt bij een prop firm. Dit kost jou niets extra. Deze commissie helpt
              ons de site te onderhouden en actueel te houden. Belangrijk: onze reviews en
              rankings worden niet beïnvloed door affiliate partnerships. We plaatsen geen
              firma hoger omdat ze meer commissie betalen.
            </p>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <Script
        id="schema-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "Over Funded Trading Nederland",
            "description": "De #1 onafhankelijke vergelijkingssite voor prop trading firms in Nederland.",
            "url": "https://fundedtrading.nl/over-ons",
            "mainEntity": {
              "@type": "Organization",
              "name": "Funded Trading Nederland",
              "url": "https://fundedtrading.nl",
              "foundingDate": "2024",
              "description": "Onafhankelijke vergelijkingssite voor prop trading firms",
              "areaServed": {
                "@type": "Country",
                "name": "Netherlands",
              },
            },
          }),
        }}
      />
    </>
  )
}
