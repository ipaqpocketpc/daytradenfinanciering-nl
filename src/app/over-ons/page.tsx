import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  Target,
  Lightbulb,
  TrendingUp,
  Users,
  ArrowRight,
  BookOpen,
  Rocket,
  Heart,
} from "lucide-react"
import { Button, Badge } from "@/components/ui"
import { brand } from "@/config/brand"

export const metadata: Metadata = {
  title: "Over Ons | Daytraden Financiering",
  description:
    "Daytraden Financiering helpt traders aan kapitaal. Ontdek wie we zijn en waarom we geloven dat iedereen met talent toegang verdient tot trading kapitaal.",
  alternates: {
    canonical: "/over-ons",
  },
  openGraph: {
    title: "Over Ons | Daytraden Financiering",
    description:
      "Ontdek wie we zijn en waarom we traders helpen aan kapitaal.",
    url: `${brand.url}/over-ons`,
  },
}

const ourMission = [
  {
    icon: Target,
    title: "Ons Doel",
    description:
      "De drempel naar professioneel traden verlagen. Je hebt talent nodig, geen spaargeld.",
  },
  {
    icon: BookOpen,
    title: "Onze Aanpak",
    description:
      "Duidelijke informatie zonder jargon. We leggen uit hoe trading financiering werkt, stap voor stap.",
  },
  {
    icon: Heart,
    title: "Onze Overtuiging",
    description:
      "Een goede trader wordt niet bepaald door zijn bankrekening, maar door zijn strategie en discipline.",
  },
]

const forWhoPoints = [
  {
    icon: Lightbulb,
    title: "De Ambitieuze Beginner",
    description:
      "Je wilt leren traden en zoekt een manier om te starten zonder duizenden euro's te riskeren.",
  },
  {
    icon: TrendingUp,
    title: "De Ervaren Trader",
    description:
      "Je hebt een winstgevende strategie maar mist het kapitaal om serieuze winst te maken.",
  },
  {
    icon: Users,
    title: "De Carrière-Switcher",
    description:
      "Je overweegt trading als nieuwe carrière en zoekt een realistische manier om te beginnen.",
  },
]

export default function OverOnsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[120px]" />

        <div className="relative container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
              Over Daytraden Financiering
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Trading Kapitaal{" "}
              <span className="gradient-text">Toegankelijk Maken</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Wij geloven dat talent belangrijker is dan vermogen. Daarom helpen
              we traders begrijpen hoe ze gefinancierd kunnen worden.
            </p>
          </div>
        </div>
      </section>

      {/* Het Probleem */}
      <section className="py-20 border-t border-border">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Het Probleem Dat Wij Zien
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Veel mensen willen traden, maar hebben niet het kapitaal om
                  serieus te beginnen. Een account van €500 bij een broker levert
                  misschien €50 per maand op - als je al winstgevend bent.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Tegelijkertijd zijn er financiers die kapitaal verstrekken aan
                  traders, maar weinig mensen weten hoe dit werkt of waar ze
                  moeten beginnen.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Dat is waar wij inspringen. Wij leggen uit hoe trading
                  financiering werkt, zodat jij een geïnformeerde beslissing kunt
                  nemen.
                </p>
              </div>

              <div className="bg-card rounded-2xl border border-border p-8">
                <div className="text-6xl font-bold text-primary mb-4">80%</div>
                <p className="text-white font-semibold mb-2">
                  Van traders noemt &quot;gebrek aan kapitaal&quot; als grootste
                  obstakel
                </p>
                <p className="text-sm text-muted-foreground">
                  Terwijl de oplossing - funded trading - al jaren
                  bestaat maar relatief onbekend is.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Onze Missie */}
      <section className="py-20 bg-card/30 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Wat Drijft Ons
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Onze missie is simpel: de informatie bieden die traders nodig
              hebben om gefinancierd te worden.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {ourMission.map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wat We Bieden */}
      <section className="py-20 border-t border-border">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Wat Je Hier Vindt
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Alles wat je moet weten over trading kapitaal krijgen, van de
              basics tot geavanceerde strategieën.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Uitleg & Educatie
                </h3>
                <p className="text-muted-foreground text-sm">
                  Begrijpelijke artikelen over hoe funded trading werkt,
                  wat de kosten zijn en wat je kunt verwachten.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                  <Rocket className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Praktische Tips
                </h3>
                <p className="text-muted-foreground text-sm">
                  Concrete tips voor het behalen van je challenge en het
                  succesvol traden met gefinancierd kapitaal.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Reële Verwachtingen
                </h3>
                <p className="text-muted-foreground text-sm">
                  Eerlijke informatie over wat wel en niet mogelijk is. Geen
                  onrealistische beloftes over snel rijk worden.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Stap-voor-Stap Gidsen
                </h3>
                <p className="text-muted-foreground text-sm">
                  Van je eerste kennismaking tot je eerste funded account - we
                  begeleiden je door het hele proces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voor Wie */}
      <section className="py-20 bg-card/30 border-t border-border">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Voor Wie Is Dit Bedoeld?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Of je nu net begint of al jaren tradet - als kapitaal je bottleneck
              is, ben je hier aan het juiste adres.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {forWhoPoints.map((item) => (
              <div
                key={item.title}
                className="p-8 rounded-2xl bg-card border border-border"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onze Belofte */}
      <section className="py-20 border-t border-border">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Onze Belofte
            </h2>
            <div className="space-y-6 text-left">
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Geen Onrealistische Beloftes
                </h3>
                <p className="text-muted-foreground">
                  We beloven niet dat je binnen een week rijk wordt. Trading
                  vereist tijd, oefening en discipline. We geven je de
                  informatie, maar het werk moet je zelf doen.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Begrijpelijke Taal
                </h3>
                <p className="text-muted-foreground">
                  Financiële wereld zit vol jargon. Wij schrijven zo dat ook
                  complete beginners het begrijpen. Geen onnodige vakterm
                  wanneer een gewoon woord volstaat.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Focus op Jouw Succes
                </h3>
                <p className="text-muted-foreground">
                  We verdienen alleen als jij slaagt. Daarom investeren we in
                  content die je echt helpt - niet in clickbait of holle
                  marketing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px]" />

        <div className="relative container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Klaar om te Beginnen?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Ontdek hoe je vandaag nog kunt starten met trading kapitaal - zonder
            eigen spaargeld te riskeren.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-glow-green btn-glow text-base px-8 h-14"
            >
              <Link href="/go/kapitaal" className="flex items-center gap-2">
                Begin Nu met Trading Kapitaal
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14">
              <Link href="/hoe-werkt-het">Lees Hoe Het Werkt</Link>
            </Button>
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
            name: "Over Daytraden Financiering",
            description:
              "Daytraden Financiering helpt traders aan kapitaal. Ontdek wie we zijn en waarom we geloven dat iedereen met talent toegang verdient tot trading kapitaal.",
            url: `${brand.url}/over-ons`,
            mainEntity: {
              "@type": "Organization",
              name: "Daytraden Financiering",
              url: brand.url,
              description:
                "Informatief platform over funded trading en trading kapitaal",
              areaServed: {
                "@type": "Country",
                name: "Netherlands",
              },
            },
          }),
        }}
      />
    </>
  )
}
