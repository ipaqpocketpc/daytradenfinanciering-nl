import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { ArrowRight, Quote, CheckCircle, Wallet, TrendingUp, Shield, Clock, Users, Percent, ChevronRight } from "lucide-react"
import { Button, Badge } from "@/components/ui"
import { brand } from "@/config/brand"
import { seoTemplates } from "@/config/seo"

export const metadata: Metadata = {
  title: seoTemplates.homepage.title,
  description: seoTemplates.homepage.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: seoTemplates.homepage.title,
    description: seoTemplates.homepage.description,
    url: brand.url,
  },
}

export default function HomePage() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      {/* Hero - Financing Focus */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[120px]" />

        <div className="relative container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary/20 px-4 py-1.5">
              {currentYear} &bull; Tot &euro;200.000 Kapitaal
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Krijg Trading{" "}
              <span className="gradient-text">Kapitaal</span>
              <br />
              Zonder Eigen Geld
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              {brand.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow btn-glow text-base px-8 h-14"
              >
                <Link href="/hoe-werkt-het" className="flex items-center gap-2">
                  Ontdek Hoe
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border hover:border-primary/50 text-white text-base px-8 h-14"
              >
                <Link href="/go/kapitaal">Direct Beginnen &rarr;</Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-secondary" />
                Geen eigen kapitaal nodig
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-secondary" />
                Tot 90% winstdeling
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-secondary" />
                Direct uitbetalen
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-24 border-t border-border">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Het Probleem
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Je wilt daytraden, maar je hebt geen &euro;10.000 of &euro;50.000 om te starten.
                Zonder kapitaal kun je niet traden. En zonder trades kun je geen ervaring opdoen.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">&times;</span>
                  Geen eigen spaargeld beschikbaar
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">&times;</span>
                  Te veel risico met eigen geld
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">&times;</span>
                  Demo accounts voelen niet echt
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-secondary/5 border border-secondary/20">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                De Oplossing
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Met funded trading krijg je tot &euro;200.000 om mee te traden.
                Jij houdt 80-90% van de winst. De financier neemt het risico.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                  Trade met professioneel kapitaal
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                  Start vanaf &euro;89 (challenge fee)
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                  Schaal op naar &euro;200.000+
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Steps */}
      <section className="py-24 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Simpel Proces
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              In 3 Stappen naar Trading Kapitaal
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Van ambitie naar funded trader - zo werkt het
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Wallet,
                title: "Kies Je Account",
                description: "Selecteer je gewenste kapitaal: €10.000, €25.000, €50.000 of meer. Betaal een eenmalige challenge fee vanaf €89.",
              },
              {
                step: "02",
                icon: TrendingUp,
                title: "Haal de Challenge",
                description: "Bewijs je trading skills. Behaal de profit target (meestal 8-10%) binnen de regels. De meeste traders doen dit binnen 30 dagen.",
              },
              {
                step: "03",
                icon: Percent,
                title: "Ontvang Kapitaal",
                description: "Gefeliciteerd! Je bent funded trader. Trade met professioneel kapitaal en houd 80-90% van alle winst die je maakt.",
              },
            ].map((item, index) => (
              <div key={item.step} className="relative group">
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
                )}

                <div className="relative p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300">
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-sm font-bold text-white shadow-glow-sm">
                    {item.step}
                  </div>

                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow"
            >
              <Link href="/hoe-werkt-het" className="flex items-center gap-2">
                Lees Meer Over Het Proces
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              Voordelen
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Waarom Traders voor Financiering Kiezen
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              De slimme manier om te starten met daytraden
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Wallet,
                title: "Geen Eigen Kapitaal Nodig",
                description: "Start met €89 in plaats van €10.000. Je krijgt het trading kapitaal.",
              },
              {
                icon: Shield,
                title: "Beperkt Risico",
                description: "Maximaal verlies is de challenge fee. Je eigen spaargeld blijft veilig.",
              },
              {
                icon: Percent,
                title: "Tot 90% Winstdeling",
                description: "Houd het overgrote deel van je winst. Sommige firms bieden zelfs 90%.",
              },
              {
                icon: TrendingUp,
                title: "Schaalbaar Kapitaal",
                description: "Begin met €10K, groei naar €200K of meer. Bewijs jezelf en ontvang meer kapitaal.",
              },
              {
                icon: Clock,
                title: "Snelle Uitbetaling",
                description: "Ontvang je winst binnen 24-48 uur. Sommige firms betalen zelfs dagelijks uit.",
              },
              {
                icon: Users,
                title: "Professionele Tools",
                description: "Toegang tot dezelfde platforms en tools als professionele traders.",
              },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className="p-6 rounded-xl bg-card border border-border hover:border-secondary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              className="border-border hover:border-secondary/50 text-white"
            >
              <Link href="/voordelen" className="flex items-center gap-2">
                Alle Voordelen Bekijken
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof - Financing Focused */}
      <section className="py-24 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Ervaringen
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Traders Die Funded Werden
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Echte verhalen van traders die kapitaal ontvingen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Mark D.",
                amount: "€50.000",
                text: "Ik had geen €50K om te traden. Via funded trading kreeg ik dat kapitaal voor slechts €155 challenge fee. Na 3 weken was ik funded trader!",
              },
              {
                name: "Sophie K.",
                amount: "€100.000",
                text: "Van €0 naar €100.000 trading kapitaal. Het voelt als een droom. Nu verdien ik 85% van alle winst die ik maak.",
              },
              {
                name: "Tom B.",
                amount: "€25.000",
                text: "Perfect voor mijn situatie. Geen risico met eigen spaargeld, maar wel echte trades met echt geld. Beste beslissing ooit.",
              },
            ].map((review, index) => (
              <div key={index} className="relative p-6 rounded-xl bg-card border border-border">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />

                <div className="text-secondary font-bold text-lg mb-4">
                  Funded: {review.amount}
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
                    <div className="text-sm text-muted-foreground">Funded Trader</div>
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

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />

        <div className="relative container-wide text-center">
          <Badge className="mb-6 bg-white/5 text-white border-white/10">
            Begin Vandaag
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Klaar voor{" "}
            <span className="gradient-text">Trading Kapitaal</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Stop met wachten tot je genoeg hebt gespaard. Word vandaag nog gefinancierd
            en begin met traden met kapitaal tot &euro;200.000.
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
              <Link href="/hoe-werkt-het">Lees Eerst Hoe Het Werkt</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD */}
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: brand.name,
            alternateName: "DaytradenFinanciering.nl",
            url: brand.url,
            logo: `${brand.url}/logo.png`,
            description: brand.description,
            foundingDate: "2024",
            areaServed: {
              "@type": "Country",
              name: "Netherlands",
            },
          }),
        }}
      />

      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: brand.name,
            url: brand.url,
            description: brand.description,
            publisher: {
              "@type": "Organization",
              name: brand.name,
            },
          }),
        }}
      />
    </>
  )
}
