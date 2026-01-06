"use client"

import { useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Shield,
  Target,
  Brain,
  Clock,
  Wallet,
  Users,
  AlertTriangle,
  Lightbulb,
  Gift,
  Star,
  ChevronRight,
} from "lucide-react"
import { Button, Badge } from "@/components/ui"

const secrets = [
  {
    number: 1,
    icon: Shield,
    title: "Risicomanagement is Alles",
    insight: "73% van succesvolle traders riskeert maximaal 1% per trade",
    description:
      "De meeste traders focussen op winstpercentage, maar de echte winnaars focussen op risicobeheer. Door je risico te beperken tot 1% per trade kun je 10 verliesgevende trades achter elkaar hebben zonder je account te verliezen.",
    action: "Bereken je positiegrootte voordat je een trade opent. Nooit uitzonderingen.",
    color: "secondary",
  },
  {
    number: 2,
    icon: Target,
    title: "Quality Over Quantity",
    insight: "Top traders maken gemiddeld slechts 3-5 trades per week",
    description:
      "Meer trades betekent niet meer winst. De beste traders wachten geduldig op hun A+ setups en laten alles links liggen dat niet 100% aan hun criteria voldoet.",
    action: "Definieer 3 specifieke criteria waaraan elke trade moet voldoen.",
    color: "primary",
  },
  {
    number: 3,
    icon: Clock,
    title: "De Eerste 30 Minuten Zijn Gevaarlijk",
    insight: "68% van account blow-ups gebeurt in het eerste uur na marktopening",
    description:
      "Veel traders verliezen geld door te traden in de volatiele openingsperiode. Succesvolle traders wachten tot de markt is gesettled - meestal na 30-60 minuten.",
    action: "Wacht minimaal 30 minuten na de opening voordat je je eerste trade plaatst.",
    color: "accent",
  },
  {
    number: 4,
    icon: Brain,
    title: "Emoties Kosten Je Geld",
    insight: "Revenge trading is de #1 oorzaak van gefaalde challenges",
    description:
      "Na een verlies voelen traders de drang om direct terug te winnen. Dit leidt tot impulsieve trades met te groot risico. De oplossing: een verplichte pauze na elke verliezende trade.",
    action: "Neem 15-30 minuten pauze na elke verliezende trade. Geen uitzonderingen.",
    color: "secondary",
  },
  {
    number: 5,
    icon: TrendingUp,
    title: "Trend is Your Friend",
    insight: "82% van winstgevende trades gaan mee met de trend",
    description:
      "Counter-trend trading lijkt aantrekkelijk (de bodem pakken), maar de statistieken liegen niet. Trade met de trend, niet tegen.",
    action: "Check de higher timeframe trend voordat je een trade plaatst. Geen trade = prima.",
    color: "primary",
  },
  {
    number: 6,
    icon: Wallet,
    title: "Begin Klein, Schaal Op",
    insight: "Traders die beginnen met €10K-€25K accounts slagen 2x zo vaak",
    description:
      "Een kleiner account betekent minder druk en meer ruimte om te leren. Je kunt altijd opschalen nadat je hebt bewezen dat je consistent kunt zijn.",
    action: "Start met het kleinste account dat je serieus neemt. Schaal op na succes.",
    color: "accent",
  },
  {
    number: 7,
    icon: AlertTriangle,
    title: "Ken Je Daily Drawdown Limiet",
    insight: "91% van gefaalde accounts overschrijdt de daily drawdown",
    description:
      "Je daily drawdown is je belangrijkste regel. Zodra je 3-4% van je dagelijkse limiet hebt verloren, stop je. Geen discussie.",
    action: "Stel een alarm in op 50% van je daily drawdown. Stop met traden als deze afgaat.",
    color: "secondary",
  },
  {
    number: 8,
    icon: Lightbulb,
    title: "Houd Een Trading Journal Bij",
    insight: "Traders met een journal verbeteren 3x sneller",
    description:
      "Zonder een journal herhaal je dezelfde fouten. Noteer elke trade: entry, exit, reden, emotie, en wat je hebt geleerd.",
    action: "Screenshot elke trade en noteer je gedachten in maximaal 3 zinnen.",
    color: "primary",
  },
  {
    number: 9,
    icon: Users,
    title: "Kopieer Geen Trades van Anderen",
    insight: "Copy trading heeft een 89% faalratio",
    description:
      "Andermans trades werken niet voor jou. Je mist hun context, ervaring en risicotolerantie. Ontwikkel je eigen strategie en word er expert in.",
    action: "Focus op 1 strategie en master deze volledig voordat je iets nieuws probeert.",
    color: "accent",
  },
  {
    number: 10,
    icon: Gift,
    title: "De Challenge is Geen Race",
    insight: "De gemiddelde succesvolle challenge duurt 23 dagen",
    description:
      "De meeste prop firms hebben geen tijdslimiet. Neem de tijd, wees geduldig, en focus op consistentie boven snelheid. Slow and steady wins.",
    action: "Stel een realistisch daily profit target van 0.5-1% in plaats van te pushen.",
    color: "secondary",
  },
]

export function GeheimContent() {
  // Mark as seen when page loads (for exit intent tracking)
  useEffect(() => {
    localStorage.setItem("geheim-submitted", "true")
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[120px]" />

        <div className="relative container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
              <Gift className="w-4 h-4 mr-2" />
              Exclusieve Content
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              De{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
                10 Geheimen
              </span>{" "}
              van Funded Traders
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Gebaseerd op data van <span className="text-white font-semibold">12.547 traders</span> onthullen
              we de patronen die succesvolle funded traders onderscheiden van de rest.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>Data-gedreven inzichten</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>Direct toepasbaar</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>Bewezen resultaten</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 border-y border-border bg-card/50">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">12.547</div>
              <div className="text-sm text-muted-foreground">Traders Geanalyseerd</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">73%</div>
              <div className="text-sm text-muted-foreground">Slaagpercentage met Tips</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">€4.2M+</div>
              <div className="text-sm text-muted-foreground">Uitbetaald aan Traders</div>
            </div>
          </div>
        </div>
      </section>

      {/* Secrets */}
      <section className="py-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto space-y-8">
            {secrets.map((secret, index) => (
              <div
                key={secret.number}
                className="group relative p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
              >
                {/* Number badge */}
                <div
                  className={`absolute -top-4 -left-4 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-lg ${
                    secret.color === "secondary"
                      ? "bg-secondary shadow-glow-green-sm"
                      : secret.color === "accent"
                        ? "bg-accent"
                        : "bg-primary shadow-glow-sm"
                  }`}
                >
                  {secret.number}
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 ${
                      secret.color === "secondary"
                        ? "bg-secondary/10"
                        : secret.color === "accent"
                          ? "bg-accent/10"
                          : "bg-primary/10"
                    }`}
                  >
                    <secret.icon
                      className={`w-8 h-8 ${
                        secret.color === "secondary"
                          ? "text-secondary"
                          : secret.color === "accent"
                            ? "text-accent"
                            : "text-primary"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {secret.title}
                    </h2>

                    {/* Key Insight */}
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm mb-4 ${
                        secret.color === "secondary"
                          ? "bg-secondary/10 text-secondary"
                          : secret.color === "accent"
                            ? "bg-accent/10 text-accent"
                            : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Star className="w-4 h-4" />
                      {secret.insight}
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {secret.description}
                    </p>

                    {/* Action */}
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                      <ChevronRight className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-secondary font-semibold uppercase tracking-wide mb-1">
                          Direct Toepassen
                        </div>
                        <div className="text-white text-sm">{secret.action}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA after every 3rd secret */}
                {(index + 1) % 3 === 0 && index < secrets.length - 1 && (
                  <div className="mt-8 pt-8 border-t border-border">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                      <div>
                        <div className="font-semibold text-white">
                          Klaar om deze geheimen in de praktijk te brengen?
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Start nu met een funded account en pas deze tips direct toe.
                        </div>
                      </div>
                      <Button
                        asChild
                        className="bg-secondary hover:bg-secondary/90 text-white whitespace-nowrap"
                      >
                        <Link href="/go/kapitaal" className="flex items-center gap-2">
                          Start Nu
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Checklist */}
      <section className="py-20 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              Samenvatting
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Jouw Checklist voor Succes
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Print deze checklist uit en hang hem naast je scherm
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Riskeer maximaal 1% per trade",
                "Wacht op A+ setups (3-5 trades/week)",
                "Wacht 30 min na marktopening",
                "Pauze na elke verliezende trade",
                "Trade alleen mee met de trend",
                "Begin klein, schaal later op",
                "Monitor je daily drawdown",
                "Houd een trading journal bij",
                "Ontwikkel je eigen strategie",
                "Neem de tijd - geen haast",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border"
                >
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />

        <div className="relative container-wide text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Gift className="w-4 h-4 mr-2" />
            Bonus Tip
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Het Belangrijkste Geheim?{" "}
            <span className="text-secondary">Beginnen.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Je hebt nu de kennis. Het enige dat je tegenhoudt is actie nemen.
            Start vandaag nog met je funded trading journey.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-glow-green btn-glow text-lg px-12 h-16"
          >
            <Link href="/go/kapitaal" className="flex items-center gap-3">
              <Wallet className="w-5 h-5" />
              Start Nu met Trading Kapitaal
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-6">
            Vanaf €89 • Tot €200.000 kapitaal • 80-90% winstdeling
          </p>
        </div>
      </section>
    </>
  )
}
