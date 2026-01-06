import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  ArrowRight,
  CheckCircle,
  Wallet,
  TrendingUp,
  Shield,
  Target,
  Clock,
  Percent,
  AlertTriangle,
  ChevronRight,
  Play,
  Award,
  BarChart3,
  Calendar,
  Zap,
} from "lucide-react"
import { Button, Badge } from "@/components/ui"
import { brand } from "@/config/brand"

export const metadata: Metadata = {
  title: "Hoe Werkt Het? | Trading Kapitaal Krijgen Uitgelegd",
  description:
    "Ontdek stap voor stap hoe je trading kapitaal krijgt via funded trading. Van aanmelding tot funded trader - alles uitgelegd.",
  alternates: {
    canonical: "/hoe-werkt-het",
  },
  openGraph: {
    title: "Hoe Werkt Het? | Trading Kapitaal Krijgen Uitgelegd",
    description:
      "Ontdek stap voor stap hoe je trading kapitaal krijgt via funded trading.",
    url: `${brand.url}/hoe-werkt-het`,
  },
}

export default function HoeWerktHetPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[150px]" />

        <div className="relative container-wide">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
              Complete Uitleg
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Hoe Krijg Je{" "}
              <span className="gradient-text">Trading Kapitaal</span>?
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Stap voor stap uitgelegd: van je eerste aanmelding tot je eerste
              uitbetaling als funded trader. Geen eigen kapitaal nodig.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow"
              >
                <Link href="/go/kapitaal" className="flex items-center gap-2">
                  Direct Beginnen
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border hover:border-primary/50 text-white"
              >
                <Link href="/kosten">Bekijk Kosten</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Play,
                label: "Startinvestering",
                value: "Vanaf €89",
                subtext: "Eenmalige challenge fee",
              },
              {
                icon: Target,
                label: "Profit Target",
                value: "8-10%",
                subtext: "Te behalen doel",
              },
              {
                icon: Calendar,
                label: "Geen Tijdslimiet",
                value: "∞",
                subtext: "Bij de meeste firms",
              },
              {
                icon: Percent,
                label: "Winstdeling",
                value: "Tot 90%",
                subtext: "Jouw deel van de winst",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-xl bg-card border border-border text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground/70 mt-1">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Concept Explained */}
      <section className="py-20 border-t border-border">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              Het Concept
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Wat is Funded Trading?
            </h2>
            <p className="text-lg text-muted-foreground">
              Met funded trading krijg je toegang tot professioneel trading
              kapitaal. In ruil hiervoor deel je een percentage van de winst met
              de financier.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <span className="text-red-400 text-lg">✕</span>
                </div>
                Traditioneel Traden
              </h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  Je hebt €10.000+ eigen kapitaal nodig
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  100% van het risico is voor jou
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  Verliezen komen uit je eigen zak
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  Moeilijk om op te schalen
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-secondary/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                </div>
                Funded Trading
              </h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                  Start met slechts €89-€155
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                  Maximaal verlies = challenge fee
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                  Tot €200.000 trading kapitaal
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                  80-90% winstdeling voor jou
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Phases */}
      <section className="py-20 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Het Proces
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              De 4 Fases naar Trading Kapitaal
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Van start tot funded trader - dit is het complete proces
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Phase 1 */}
            <div className="relative">
              <div className="absolute left-8 top-20 bottom-0 w-px bg-gradient-to-b from-primary to-transparent hidden md:block" />

              <div className="flex gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-glow shrink-0">
                  1
                </div>
                <div className="flex-1 p-8 rounded-2xl bg-card border border-border">
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                    <Wallet className="w-6 h-6 text-primary" />
                    Kies Je Account Grootte
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Selecteer hoeveel kapitaal je wilt beheren. De meeste prop
                    firms bieden accounts van €10.000 tot €200.000. Grotere
                    accounts hebben hogere challenge fees maar ook hogere
                    winstpotentie.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-background/50 border border-border">
                      <div className="text-lg font-semibold text-white">
                        €10.000 Account
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Challenge fee: ~€89
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50 border border-border">
                      <div className="text-lg font-semibold text-white">
                        €100.000 Account
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Challenge fee: ~€495
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="relative">
              <div className="absolute left-8 top-20 bottom-0 w-px bg-gradient-to-b from-secondary to-transparent hidden md:block" />

              <div className="flex gap-6">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-white font-bold text-xl shadow-glow-green shrink-0">
                  2
                </div>
                <div className="flex-1 p-8 rounded-2xl bg-card border border-border">
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                    <Target className="w-6 h-6 text-secondary" />
                    De Evaluatie Challenge
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Je start met een evaluatie periode. Hier moet je bewijzen dat
                    je winstgevend kunt traden. Challenges hebben meestal een
                    profit target van 8-10% met een maximaal drawdown van 5-10%.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <Target className="w-5 h-5 text-primary mb-2" />
                      <div className="font-semibold text-white">
                        Profit Target
                      </div>
                      <div className="text-sm text-muted-foreground">
                        8-10% van je account
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                      <Shield className="w-5 h-5 text-red-400 mb-2" />
                      <div className="font-semibold text-white">
                        Max Drawdown
                      </div>
                      <div className="text-sm text-muted-foreground">
                        5-10% verlies limiet
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                      <Clock className="w-5 h-5 text-secondary mb-2" />
                      <div className="font-semibold text-white">Tijdslimiet</div>
                      <div className="text-sm text-muted-foreground">
                        Vaak onbeperkt
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="relative">
              <div className="absolute left-8 top-20 bottom-0 w-px bg-gradient-to-b from-accent to-transparent hidden md:block" />

              <div className="flex gap-6">
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-white font-bold text-xl shrink-0">
                  3
                </div>
                <div className="flex-1 p-8 rounded-2xl bg-card border border-border">
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                    <Award className="w-6 h-6 text-accent" />
                    Verificatie Fase
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Na het behalen van de eerste evaluatie volgt vaak een tweede
                    fase met iets lagere targets. Dit bevestigt dat je resultaten
                    consistent zijn en niet op geluk gebaseerd.
                  </p>
                  <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="w-5 h-5 text-accent" />
                      <span className="font-semibold text-white">
                        Sommige firms bieden 1-staps evaluaties
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Sneller funded, maar vaak iets strengere regels of hogere
                      fees.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="flex gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-glow shrink-0">
                4
              </div>
              <div className="flex-1 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/30">
                <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  Funded Trader Status
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Gefeliciteerd! Je trade nu met echt kapitaal. Je ontvangt
                  80-90% van alle winst die je maakt. Uitbetalingen zijn meestal
                  wekelijks of tweewekelijks.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
                    <Percent className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-white">
                      80-90% winstdeling
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm text-white">
                      Snelle uitbetaling
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                    <BarChart3 className="w-4 h-4 text-accent" />
                    <span className="text-sm text-white">
                      Schaalbaar kapitaal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Rules */}
      <section className="py-20 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Regels
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Belangrijke Trading Regels
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Om je account te beschermen en je kapitaal te behouden, gelden
              deze regels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Maximum Daily Drawdown",
                description:
                  "Je mag op één dag maximaal 5% van je account verliezen. Overschrijd je dit? Challenge mislukt.",
                important: true,
              },
              {
                icon: AlertTriangle,
                title: "Maximum Total Drawdown",
                description:
                  "Je totale verlies mag nooit meer dan 10% bedragen (vanaf je startkapitaal).",
                important: true,
              },
              {
                icon: Calendar,
                title: "Minimum Trading Dagen",
                description:
                  "De meeste challenges vereisen minimaal 4-5 trading dagen voordat je kunt afronden.",
                important: false,
              },
              {
                icon: Clock,
                title: "Geen Weekend Trading",
                description:
                  "Posities moeten voor het weekend gesloten zijn (bij sommige firms).",
                important: false,
              },
              {
                icon: BarChart3,
                title: "Lot Size Limieten",
                description:
                  "Er kunnen limieten zijn op hoeveel je per trade mag inzetten.",
                important: false,
              },
              {
                icon: Target,
                title: "Consistency Rule",
                description:
                  "Sommige firms vereisen dat je winst consistent is (geen enkele dag >30% van totale winst).",
                important: false,
              },
            ].map((rule) => (
              <div
                key={rule.title}
                className={`p-6 rounded-xl bg-card border transition-all duration-300 ${
                  rule.important
                    ? "border-red-500/30 hover:border-red-500/50"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    rule.important ? "bg-red-500/10" : "bg-primary/10"
                  }`}
                >
                  <rule.icon
                    className={`w-6 h-6 ${
                      rule.important ? "text-red-400" : "text-primary"
                    }`}
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {rule.title}
                  {rule.important && (
                    <span className="ml-2 text-xs text-red-400 font-normal">
                      Kritiek
                    </span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {rule.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips for Success */}
      <section className="py-20 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              Tips
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              5 Tips om Je Challenge te Halen
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Verhoog je slagingskans met deze bewezen strategieën
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                number: "01",
                title: "Begin met een kleiner account",
                description:
                  "Start met €10K of €25K om het proces te leren. Opschalen kan altijd later.",
              },
              {
                number: "02",
                title: "Behandel het als echt geld",
                description:
                  "Veel traders falen omdat ze roekeloos worden. Trade alsof het je eigen spaargeld is.",
              },
              {
                number: "03",
                title: "Focus op risicobeheer",
                description:
                  "Riskeer nooit meer dan 1-2% per trade. De drawdown regels zijn de belangrijkste.",
              },
              {
                number: "04",
                title: "Haast je niet",
                description:
                  "Er is meestal geen tijdslimiet. Neem de tijd om consistent te zijn.",
              },
              {
                number: "05",
                title: "Oefen eerst op een demo",
                description:
                  "Zorg dat je strategie bewezen winstgevend is voordat je aan een challenge begint.",
              },
            ].map((tip) => (
              <div
                key={tip.number}
                className="flex gap-6 p-6 rounded-xl bg-card border border-border hover:border-secondary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="text-secondary font-bold">{tip.number}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Vragen
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Veelgestelde Vragen
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Hoeveel geld heb ik nodig om te starten?",
                answer:
                  "Je kunt starten vanaf €89 voor een €10.000 account. Dit is de eenmalige challenge fee. Je hebt geen trading kapitaal nodig - dat krijg je als funded trader.",
              },
              {
                question: "Wat gebeurt er als ik de challenge niet haal?",
                answer:
                  "Je verliest de challenge fee, maar niet meer dan dat. Je kunt opnieuw proberen met een nieuwe challenge. Sommige firms bieden kortingen op een herstart.",
              },
              {
                question: "Hoe snel kan ik uitbetaald worden?",
                answer:
                  "Na het behalen van de challenge en je eerste winst als funded trader, kun je meestal binnen 1-2 weken je eerste uitbetaling aanvragen. Daarna zijn uitbetalingen vaak wekelijks mogelijk.",
              },
              {
                question: "Kan ik meerdere accounts hebben?",
                answer:
                  "Ja, je kunt meerdere funded accounts hebben. Sommige traders hebben meerdere accounts om hun kapitaal te maximaliseren.",
              },
              {
                question: "Welke markten kan ik traden?",
                answer:
                  "Als funded trader kun je meestal forex, indices, commodities en crypto traden. Forex en indices zijn het meest populair.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              asChild
              variant="outline"
              className="border-border hover:border-primary/50 text-white"
            >
              <Link href="/veelgestelde-vragen" className="flex items-center gap-2">
                Meer Vragen Bekijken
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />

        <div className="relative container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Klaar om te Beginnen?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Nu je weet hoe het werkt, is het tijd voor actie. Krijg toegang tot
            trading kapitaal en start je reis als funded trader.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-glow-green btn-glow text-base px-8 h-14"
            >
              <Link href="/go/kapitaal" className="flex items-center gap-2">
                Start Nu - Krijg Kapitaal
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border hover:border-primary/50 text-white text-base px-8 h-14"
            >
              <Link href="/kosten">Bekijk Alle Kosten</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <Script
        id="schema-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Hoe krijg je trading kapitaal via funded trading",
            description:
              "Stap voor stap uitleg over hoe je trading kapitaal kunt krijgen zonder eigen geld via funded trading.",
            totalTime: "P30D",
            estimatedCost: {
              "@type": "MonetaryAmount",
              currency: "EUR",
              value: "89-495",
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Kies je account grootte",
                text: "Selecteer hoeveel kapitaal je wilt beheren, van €10.000 tot €200.000.",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Voltooi de evaluatie challenge",
                text: "Behaal de profit target van 8-10% binnen de drawdown regels.",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Doorloop de verificatie fase",
                text: "Bevestig je consistentie met een tweede evaluatie met lagere targets.",
              },
              {
                "@type": "HowToStep",
                position: 4,
                name: "Word funded trader",
                text: "Trade met echt kapitaal en ontvang 80-90% van je winst.",
              },
            ],
          }),
        }}
      />

      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Hoeveel geld heb ik nodig om te starten met funded trading?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Je kunt starten vanaf €89 voor een €10.000 account. Dit is de eenmalige challenge fee. Je hebt geen trading kapitaal nodig - dat krijg je als funded trader.",
                },
              },
              {
                "@type": "Question",
                name: "Wat gebeurt er als ik de challenge niet haal?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Je verliest de challenge fee, maar niet meer dan dat. Je kunt opnieuw proberen met een nieuwe challenge.",
                },
              },
              {
                "@type": "Question",
                name: "Hoe snel kan ik uitbetaald worden als funded trader?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Na het behalen van de challenge en je eerste winst als funded trader, kun je meestal binnen 1-2 weken je eerste uitbetaling aanvragen.",
                },
              },
            ],
          }),
        }}
      />
    </>
  )
}
