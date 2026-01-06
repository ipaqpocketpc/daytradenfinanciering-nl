import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  ArrowRight,
  CheckCircle,
  Wallet,
  CreditCard,
  Info,
  AlertCircle,
  Percent,
  RefreshCw,
  Calculator,
  TrendingUp,
  Zap,
} from "lucide-react"
import { Button, Badge } from "@/components/ui"
import { brand } from "@/config/brand"

export const metadata: Metadata = {
  title: "Kosten van Funded Trading | Challenge Fees & Winstdeling Uitgelegd",
  description:
    "Wat kost funded trading? Ontdek challenge fees, winstdeling percentages en welk account bij je past. Transparant overzicht.",
  alternates: {
    canonical: "/kosten",
  },
  openGraph: {
    title: "Kosten van Funded Trading | Challenge Fees & Winstdeling Uitgelegd",
    description:
      "Wat kost funded trading? Ontdek challenge fees, winstdeling percentages en welk account bij je past.",
    url: `${brand.url}/kosten`,
  },
}

export default function KostenPage() {
  const accountSizes = [
    {
      size: "€10.000",
      fee: "€89",
      target: "€800-1.000",
      potential: "€680-850/maand",
      popular: false,
    },
    {
      size: "€25.000",
      fee: "€155",
      target: "€2.000-2.500",
      potential: "€1.700-2.125/maand",
      popular: false,
    },
    {
      size: "€50.000",
      fee: "€275",
      target: "€4.000-5.000",
      potential: "€3.400-4.250/maand",
      popular: true,
    },
    {
      size: "€100.000",
      fee: "€495",
      target: "€8.000-10.000",
      potential: "€6.800-8.500/maand",
      popular: false,
    },
    {
      size: "€200.000",
      fee: "€995",
      target: "€16.000-20.000",
      potential: "€13.600-17.000/maand",
      popular: false,
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[150px]" />

        <div className="relative container-wide">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 px-4 py-1.5">
              Transparant
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Wat Kost{" "}
              <span className="text-accent">Funded Trading</span>?
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Complete uitleg over challenge fees, winstdeling en welk account
              het beste bij je past. Geen verborgen kosten.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow"
              >
                <Link href="/go/kapitaal" className="flex items-center gap-2">
                  Bekijk Actuele Prijzen
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Breakdown */}
      <section className="py-20 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Kostenstructuur
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welke Kosten Zijn Er?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Funded trading heeft een simpele kostenstructuur
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Challenge Fee */}
            <div className="p-8 rounded-2xl bg-card border border-primary/30">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <CreditCard className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Challenge Fee
              </h3>
              <p className="text-muted-foreground mb-4">
                Eenmalige betaling om deel te nemen aan de evaluatie. Dit is je
                enige investering.
              </p>
              <div className="text-2xl font-bold text-primary">€89 - €995</div>
              <div className="text-sm text-muted-foreground">
                Afhankelijk van account grootte
              </div>
            </div>

            {/* Profit Split */}
            <div className="p-8 rounded-2xl bg-card border border-secondary/30">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <Percent className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Winstdeling</h3>
              <p className="text-muted-foreground mb-4">
                Na het behalen van de challenge deel je winst met de financier.
                Jij krijgt het meeste.
              </p>
              <div className="text-2xl font-bold text-secondary">80 - 90%</div>
              <div className="text-sm text-muted-foreground">Voor jou</div>
            </div>

            {/* No Hidden */}
            <div className="p-8 rounded-2xl bg-card border border-border">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <CheckCircle className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Geen Verborgen Kosten
              </h3>
              <p className="text-muted-foreground mb-4">
                Geen maandelijkse fees, geen data fees, geen platform kosten.
                Alles is inbegrepen.
              </p>
              <div className="text-2xl font-bold text-accent">€0</div>
              <div className="text-sm text-muted-foreground">Extra kosten</div>
            </div>
          </div>
        </div>
      </section>

      {/* Account Sizes Table */}
      <section className="py-20 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              Account Groottes
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Indicatieve Challenge Fees
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Prijzen kunnen variëren per aanbieder. Dit zijn richtprijzen.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-muted-foreground font-medium">
                      Account Grootte
                    </th>
                    <th className="text-left p-4 text-muted-foreground font-medium">
                      Challenge Fee
                    </th>
                    <th className="text-left p-4 text-muted-foreground font-medium">
                      Profit Target
                    </th>
                    <th className="text-left p-4 text-muted-foreground font-medium">
                      Potentiële Winst*
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {accountSizes.map((account) => (
                    <tr
                      key={account.size}
                      className={`border-b border-border hover:bg-card/50 transition-colors ${
                        account.popular ? "bg-secondary/5" : ""
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-white font-semibold">
                            {account.size}
                          </span>
                          {account.popular && (
                            <Badge className="bg-secondary/20 text-secondary border-secondary/30 text-xs">
                              Populair
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-primary font-semibold">
                          {account.fee}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-muted-foreground">
                          {account.target}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-secondary font-medium">
                          {account.potential}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-card border border-border flex items-start gap-3">
              <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                * Potentiële winst is berekend bij 10% maandelijks rendement met
                85% winstdeling. Werkelijke resultaten kunnen variëren. Trading
                brengt risico&apos;s met zich mee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Rekenvoorbeeld
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Wat is je Return on Investment?
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="p-8 rounded-2xl bg-card border border-primary/30">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calculator className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Voorbeeld: €50.000 Account
                  </h3>
                  <p className="text-muted-foreground">
                    De populairste keuze onder traders
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white mb-4">Investering</h4>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Challenge fee</span>
                    <span className="text-white font-semibold">€275</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">
                      Platform kosten
                    </span>
                    <span className="text-secondary font-semibold">€0</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-white font-semibold">
                      Totale investering
                    </span>
                    <span className="text-primary font-bold text-xl">€275</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-white mb-4">
                    Potentieel Rendement
                  </h4>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">
                      Bij 5% winst per maand
                    </span>
                    <span className="text-white">€2.500</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">
                      Jouw deel (85%)
                    </span>
                    <span className="text-secondary font-semibold">€2.125</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-white font-semibold">
                      ROI eerste maand
                    </span>
                    <span className="text-secondary font-bold text-xl">
                      673%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Na de eerste maand is je investering al terugverdiend. Elke
                    maand daarna is pure winst. Bij consistent traden kun je
                    opschalen naar grotere accounts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens If You Fail */}
      <section className="py-20 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Belangrijk
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Wat Als Je de Challenge Niet Haalt?
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-card border border-border">
                <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-6">
                  <AlertCircle className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Challenge Mislukt
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">•</span>
                    Je verliest de challenge fee
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">•</span>
                    Geen verdere kosten of verplichtingen
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">•</span>
                    Je eigen geld blijft veilig
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl bg-card border border-secondary/30">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                  <RefreshCw className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Opnieuw Proberen
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    Je kunt altijd opnieuw starten
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    Vaak korting op herstart (10-20%)
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    Leer van je fouten
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <Zap className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-2">Pro Tip</h4>
                  <p className="text-muted-foreground">
                    Begin met een kleiner account (€10K of €25K) om het proces
                    te leren. De challenge fee is lager en je kunt ervaring
                    opdoen. Opschalen kan altijd later.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Which Account */}
      <section className="py-20 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Advies
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welk Account Past bij Jou?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Beginner</h3>
              <div className="text-2xl font-bold text-primary mb-4">
                €10K - €25K
              </div>
              <p className="text-muted-foreground mb-6">
                Ideaal om te starten. Leer het proces met beperkt risico. Lagere
                challenge fees.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Fee: €89 - €155
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Minder druk
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Ruimte om te leren
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-secondary/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-secondary text-white">Aanbevolen</Badge>
              </div>
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Gemiddeld</h3>
              <div className="text-2xl font-bold text-secondary mb-4">
                €50K - €100K
              </div>
              <p className="text-muted-foreground mb-6">
                Balans tussen risico en beloning. Meest populair onder serieuze
                traders.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  Fee: €275 - €495
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  Serieuze winst mogelijk
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  Goede ROI
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                <Percent className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ervaren</h3>
              <div className="text-2xl font-bold text-accent mb-4">€200K+</div>
              <p className="text-muted-foreground mb-6">
                Voor bewezen traders die willen maximaliseren. Hogere fees, maar
                ook hogere winst.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  Fee: €995+
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  Maximale winst
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  Voor pro traders
                </li>
              </ul>
            </div>
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
            Klaar om te Investeren in Je Trading Carrière?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            De kosten zijn duidelijk. Met een kleine investering krijg je
            toegang tot kapitaal waar je anders jaren voor moet sparen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-glow-green btn-glow text-base px-8 h-14"
            >
              <Link href="/go/kapitaal" className="flex items-center gap-2">
                Start Nu - Vanaf €89
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border hover:border-primary/50 text-white text-base px-8 h-14"
            >
              <Link href="/beginnen">Hoe Begin Ik?</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <Script
        id="schema-pricing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Kosten van Funded Trading",
            description:
              "Transparant overzicht van challenge fees en winstdeling bij funded trading.",
            mainEntity: {
              "@type": "Product",
              name: "Funded Trading Challenge",
              description:
                "Evaluatie programma om trading kapitaal te verkrijgen",
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "89",
                highPrice: "995",
                priceCurrency: "EUR",
                offerCount: "5",
              },
            },
          }),
        }}
      />
    </>
  )
}
