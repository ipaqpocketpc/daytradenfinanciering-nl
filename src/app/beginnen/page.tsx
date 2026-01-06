import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  ArrowRight,
  CheckCircle,
  Wallet,
  TrendingUp,
  Target,
  Clock,
  Zap,
  BookOpen,
  Shield,
  ChevronRight,
  Play,
  Star,
  AlertCircle,
} from "lucide-react"
import { Button, Badge } from "@/components/ui"
import { brand } from "@/config/brand"

export const metadata: Metadata = {
  title: "Nu Beginnen | Start Vandaag met Trading Kapitaal",
  description:
    "Klaar om te starten? Volg deze stappen en krijg toegang tot trading kapitaal tot €200.000. Start vandaag nog met funded trading.",
  alternates: {
    canonical: "/beginnen",
  },
  openGraph: {
    title: "Nu Beginnen | Start Vandaag met Trading Kapitaal",
    description:
      "Klaar om te starten? Volg deze stappen en krijg toegang tot trading kapitaal tot €200.000.",
    url: `${brand.url}/beginnen`,
  },
}

export default function BeginnenPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/15 rounded-full blur-[120px]" />

        <div className="relative container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary/20 px-4 py-1.5">
              Start Nu
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Begin Vandaag met{" "}
              <span className="gradient-text">Trading Kapitaal</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Je bent klaar om de stap te zetten. Volg deze simpele stappen en
              krijg toegang tot kapitaal tot €200.000.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-glow-green btn-glow text-lg px-10 h-16"
            >
              <Link href="/go/kapitaal" className="flex items-center gap-3">
                <Play className="w-5 h-5" />
                Direct Starten
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-secondary" />
                Vanaf €89
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-secondary" />
                Tot €200.000 kapitaal
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-secondary" />
                80-90% winstdeling
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Steps */}
      <section className="py-20 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Snelle Start
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              In 3 Stappen Starten
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Van aanmelding tot je eerste trade - zo simpel is het
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                icon: Wallet,
                title: "Kies Je Account",
                description:
                  "Selecteer een account grootte die past bij je ervaring. Begin klein als je net start.",
                action: "€10K - €200K beschikbaar",
                color: "primary",
              },
              {
                step: "2",
                icon: Target,
                title: "Start de Challenge",
                description:
                  "Betaal de challenge fee en begin direct met traden. Bewijs dat je winstgevend kunt handelen.",
                action: "Direct toegang",
                color: "secondary",
              },
              {
                step: "3",
                icon: TrendingUp,
                title: "Word Funded",
                description:
                  "Haal de profit target en ontvang je funded account. Trade met echt kapitaal en houd 80-90% winst.",
                action: "Tot 90% winstdeling",
                color: "accent",
              },
            ].map((item) => (
              <div key={item.step} className="relative group">
                <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 h-full">
                  <div
                    className={`absolute -top-4 -left-4 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg ${
                      item.color === "primary"
                        ? "bg-primary shadow-glow-sm"
                        : item.color === "secondary"
                          ? "bg-secondary shadow-glow-green-sm"
                          : "bg-accent"
                    }`}
                  >
                    {item.step}
                  </div>

                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                      item.color === "primary"
                        ? "bg-primary/10"
                        : item.color === "secondary"
                          ? "bg-secondary/10"
                          : "bg-accent/10"
                    }`}
                  >
                    <item.icon
                      className={`w-7 h-7 ${
                        item.color === "primary"
                          ? "text-primary"
                          : item.color === "secondary"
                            ? "text-secondary"
                            : "text-accent"
                      }`}
                    />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <div
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm ${
                      item.color === "primary"
                        ? "bg-primary/10 text-primary"
                        : item.color === "secondary"
                          ? "bg-secondary/10 text-secondary"
                          : "bg-accent/10 text-accent"
                    }`}
                  >
                    {item.action}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-glow-green"
            >
              <Link href="/go/kapitaal" className="flex items-center gap-2">
                Begin Nu met Stap 1
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Preparation Checklist */}
      <section className="py-20 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Voorbereiding
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ben Je Klaar om te Starten?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Check deze punten voordat je begint
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: BookOpen,
                  title: "Basiskennis van Trading",
                  description:
                    "Je begrijpt hoe markten werken en kent basis ordertypen.",
                  required: true,
                },
                {
                  icon: Target,
                  title: "Een Trading Strategie",
                  description:
                    "Je hebt een plan voor wanneer je koopt en verkoopt.",
                  required: true,
                },
                {
                  icon: Shield,
                  title: "Risicobeheer",
                  description:
                    "Je weet hoeveel je per trade riskeert (max 1-2%).",
                  required: true,
                },
                {
                  icon: Clock,
                  title: "Tijd om te Traden",
                  description:
                    "Je hebt regelmatig tijd om de markten te volgen.",
                  required: true,
                },
                {
                  icon: Wallet,
                  title: "Challenge Fee Budget",
                  description: "Je hebt €89-€495 beschikbaar voor de fee.",
                  required: true,
                },
                {
                  icon: Zap,
                  title: "Demo Ervaring",
                  description:
                    "Je hebt geoefend op een demo account (aanbevolen).",
                  required: false,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                      item.required ? "bg-secondary/10" : "bg-primary/10"
                    }`}
                  >
                    <item.icon
                      className={`w-6 h-6 ${
                        item.required ? "text-secondary" : "text-primary"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1 flex items-center gap-2">
                      {item.title}
                      {item.required ? (
                        <span className="text-xs text-secondary">Vereist</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Aanbevolen
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-xl bg-secondary/5 border border-secondary/20">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-secondary shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-2">
                    Alles Afgevinkt?
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    Dan ben je klaar om te starten! Geen zorgen als je nog niet
                    alles perfect hebt - de challenge is ook een leerproces.
                  </p>
                  <Button
                    asChild
                    className="bg-secondary hover:bg-secondary/90 text-white"
                  >
                    <Link href="/go/kapitaal" className="flex items-center gap-2">
                      Ja, Ik Ben Klaar
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Account Recommendation */}
      <section className="py-20 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Aanbeveling
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welk Account Moet Je Kiezen?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-card border border-border">
              <div className="text-sm text-muted-foreground mb-4">
                Eerste Keer
              </div>
              <div className="text-3xl font-bold text-white mb-2">€10.000</div>
              <div className="text-primary font-semibold mb-6">Fee: €89</div>
              <p className="text-muted-foreground mb-6">
                Perfect om het proces te leren zonder groot risico. Ideaal voor
                beginners.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/go/kapitaal">Kies €10K</Link>
              </Button>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-secondary/50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-secondary text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Meest Gekozen
                </Badge>
              </div>
              <div className="text-sm text-secondary mb-4">Aanbevolen</div>
              <div className="text-3xl font-bold text-white mb-2">€50.000</div>
              <div className="text-secondary font-semibold mb-6">Fee: €275</div>
              <p className="text-muted-foreground mb-6">
                Beste balans tussen risico en beloning. Serieuze winst mogelijk.
              </p>
              <Button
                asChild
                className="w-full bg-secondary hover:bg-secondary/90 text-white"
              >
                <Link href="/go/kapitaal">Kies €50K</Link>
              </Button>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border">
              <div className="text-sm text-muted-foreground mb-4">Ervaren</div>
              <div className="text-3xl font-bold text-white mb-2">€100.000+</div>
              <div className="text-accent font-semibold mb-6">Fee: €495+</div>
              <p className="text-muted-foreground mb-6">
                Voor traders met bewezen track record. Maximale
                winstmogelijkheden.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/go/kapitaal">Kies €100K+</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-20 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-500/10 text-red-400 border-red-500/20">
              Let Op
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Voorkom Deze 5 Beginnerfouten
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                mistake: "Te groot starten",
                solution:
                  "Begin met €10K of €25K. Opschalen kan altijd later.",
              },
              {
                mistake: "Geen stop-loss gebruiken",
                solution:
                  "Altijd een stop-loss zetten. Bescherm je account tegen grote verliezen.",
              },
              {
                mistake: "Overtraden",
                solution:
                  "Kwaliteit boven kwantiteit. Wacht op je beste setups.",
              },
              {
                mistake: "Drawdown negeren",
                solution:
                  "Houd je daily drawdown in de gaten. Stop met traden als je dichtbij komt.",
              },
              {
                mistake: "Ongeduldig zijn",
                solution:
                  "Neem de tijd. Er is vaak geen tijdslimiet op de challenge.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h3 className="font-semibold text-white">{item.mistake}</h3>
                    <ChevronRight className="w-4 h-4 text-muted-foreground hidden sm:block" />
                    <span className="text-secondary text-sm">
                      {item.solution}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]" />

        <div className="relative container-wide text-center">
          <Badge className="mb-6 bg-white/5 text-white border-white/10">
            Je Bent Klaar
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Start Nu met{" "}
            <span className="text-secondary">Trading Kapitaal</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Je hebt alle informatie. Je weet hoe het werkt. Nu is het tijd om
            actie te ondernemen en je trading carrière te starten.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-glow-green btn-glow text-lg px-12 h-16"
          >
            <Link href="/go/kapitaal" className="flex items-center gap-3">
              <Wallet className="w-5 h-5" />
              Krijg Nu Kapitaal
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-6">
            Vanaf €89 • Tot €200.000 kapitaal • 80-90% winstdeling
          </p>
        </div>
      </section>

      {/* Schema.org */}
      <Script
        id="schema-start"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Begin met Funded Trading",
            description:
              "Start vandaag nog met funded trading en krijg toegang tot trading kapitaal tot €200.000.",
            mainEntity: {
              "@type": "HowTo",
              name: "Starten met Funded Trading",
              step: [
                {
                  "@type": "HowToStep",
                  position: 1,
                  name: "Kies je account grootte",
                },
                {
                  "@type": "HowToStep",
                  position: 2,
                  name: "Start de challenge",
                },
                {
                  "@type": "HowToStep",
                  position: 3,
                  name: "Word funded trader",
                },
              ],
            },
          }),
        }}
      />
    </>
  )
}
