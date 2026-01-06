import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { ArrowRight, HelpCircle, ChevronDown } from "lucide-react"
import { Button, Badge } from "@/components/ui"
import { brand } from "@/config/brand"

export const metadata: Metadata = {
  title: "Veelgestelde Vragen | Alles Over Funded Trading",
  description:
    "Antwoorden op de meest gestelde vragen over funded trading, challenges, winstdeling en meer. Vind direct je antwoord.",
  alternates: {
    canonical: "/veelgestelde-vragen",
  },
  openGraph: {
    title: "Veelgestelde Vragen | Alles Over Funded Trading",
    description:
      "Antwoorden op de meest gestelde vragen over funded trading.",
    url: `${brand.url}/veelgestelde-vragen`,
  },
}

const faqCategories = [
  {
    name: "Basisvragen",
    color: "primary",
    faqs: [
      {
        question: "Wat is funded trading?",
        answer:
          "Funded trading is een model waarbij je trading kapitaal krijgt van een externe financier. Je hoeft geen eigen geld te investeren - alleen een eenmalige challenge fee. Na het behalen van een evaluatie krijg je toegang tot kapitaal tot €200.000 om mee te traden, en je houdt 80-90% van alle winst.",
      },
      {
        question: "Hoe verschilt dit van een normale broker?",
        answer:
          "Bij een normale broker moet je je eigen geld storten en draag je 100% van het risico. Bij funded trading krijg je kapitaal van een externe financier. Je riskeert alleen de challenge fee (€89-€995), niet je eigen spaargeld. De financier neemt het kapitaalrisico.",
      },
      {
        question: "Is funded trading legaal?",
        answer:
          "Ja, funded trading is volledig legaal. Het zijn legitieme financiële bedrijven die hun kapitaal laten beheren door externe traders. Het is een zakelijke overeenkomst waarbij jij als trader optreedt en winst deelt met de financier.",
      },
      {
        question: "Heb ik ervaring nodig om te beginnen?",
        answer:
          "Je hebt basiskennis van trading nodig en een werkende strategie. Je hoeft geen certificaat of diploma te hebben. De challenge is je 'sollicitatie' - als je die haalt, heb je bewezen dat je kunt traden. Wel raden we aan eerst te oefenen op een demo account.",
      },
    ],
  },
  {
    name: "De Challenge",
    color: "secondary",
    faqs: [
      {
        question: "Wat is een trading challenge?",
        answer:
          "Een trading challenge is een evaluatieperiode waarin je moet bewijzen dat je winstgevend kunt traden. Je krijgt een demo account met gesimuleerd kapitaal en moet een profit target behalen (meestal 8-10%) terwijl je binnen bepaalde risico-regels blijft. Als je slaagt, krijg je een funded account.",
      },
      {
        question: "Hoe lang duurt de challenge?",
        answer:
          "De meeste challenges hebben geen tijdslimiet - je kunt er zo lang over doen als je wilt. Sommige traders halen het in een week, anderen doen er maanden over. Het belangrijkste is consistentie, niet snelheid.",
      },
      {
        question: "Wat is het profit target?",
        answer:
          "Het profit target is meestal 8-10% van je accountgrootte. Voor een €50.000 account betekent dit €4.000-€5.000 winst maken. Dit klinkt veel, maar met hefboom en een goede strategie is het haalbaar voor consistente traders.",
      },
      {
        question: "Wat gebeurt er als ik de challenge niet haal?",
        answer:
          "Als je de drawdown limiet overschrijdt of andere regels breekt, is de challenge mislukt en verlies je de fee. Je kunt altijd opnieuw beginnen met een nieuwe challenge. Sommige firms bieden korting op een herstart (10-20%).",
      },
      {
        question: "Zijn er meerdere fases?",
        answer:
          "De meeste evaluaties hebben 2 fases: eerst een challenge met hogere targets, dan een verificatie met lagere targets. Sommige aanbieders bieden 1-fase opties aan - sneller funded, maar vaak iets hogere fees of strengere regels.",
      },
    ],
  },
  {
    name: "Kosten & Winst",
    color: "accent",
    faqs: [
      {
        question: "Wat kost een funded trading challenge?",
        answer:
          "Challenge fees variëren van €89 (€10K account) tot €995 (€200K account). Dit is een eenmalige betaling. Er zijn geen maandelijkse kosten, geen data fees en geen platform kosten. Alles is inbegrepen.",
      },
      {
        question: "Hoeveel winst kan ik maken?",
        answer:
          "Dit hangt af van je trading skills en accountgrootte. Met een €50.000 account en 5% maandelijks rendement, verdien je €2.125/maand (bij 85% profit split). Top traders maken consistent €5.000-€10.000+ per maand.",
      },
      {
        question: "Hoe werkt de winstdeling?",
        answer:
          "Na het behalen van de challenge deel je winst met de financier. De meeste aanbieders geven 80-85% aan de trader, sommige zelfs 90%. Als je €1.000 winst maakt met 85% split, ontvang jij €850.",
      },
      {
        question: "Hoe snel krijg ik mijn geld?",
        answer:
          "Uitbetalingen zijn meestal wekelijks of tweewekelijks beschikbaar. Je kunt je winst aanvragen via bank transfer of crypto. De meeste transfers zijn binnen 24-48 uur verwerkt.",
      },
      {
        question: "Krijg ik de challenge fee terug?",
        answer:
          "Veel aanbieders betalen de challenge fee terug bij je eerste winstuitbetaling als funded trader. Check dit bij de specifieke aanbieder - het is een mooie bonus maar niet altijd gegarandeerd.",
      },
    ],
  },
  {
    name: "Regels & Risico",
    color: "primary",
    faqs: [
      {
        question: "Wat is maximum drawdown?",
        answer:
          "Maximum drawdown is de limiet op hoeveel je mag verliezen. Bij de meeste firms is dit 10% van je startkapitaal. Voor een €50.000 account betekent dit dat je nooit meer dan €5.000 totaal mag verliezen.",
      },
      {
        question: "Wat is daily drawdown?",
        answer:
          "Daily drawdown is de limiet op hoeveel je op één dag mag verliezen, meestal 5%. Dit wordt berekend vanaf je dagelijkse startbalans. Als je €50.000 hebt, mag je maximaal €2.500 op één dag verliezen.",
      },
      {
        question: "Wat zijn de trading regels?",
        answer:
          "Standaard regels zijn: maximum daily drawdown (5%), maximum total drawdown (10%), profit target behalen, minimaal aantal trading dagen (4-5). Sommige firms hebben extra regels zoals geen weekend holding of consistency rules.",
      },
      {
        question: "Kan ik mijn eigen geld verliezen?",
        answer:
          "Nee, je riskeert alleen de challenge fee. Als je als funded trader verliezen maakt, is dat kapitaal van de financier. Je persoonlijke risico is beperkt tot de fee die je hebt betaald.",
      },
      {
        question: "Wat als ik de regels breek als funded trader?",
        answer:
          "Als je de drawdown limieten overschrijdt, verlies je je funded account. Je kunt opnieuw beginnen met een nieuwe challenge. Je bestaande winst tot dat moment wordt meestal nog wel uitbetaald.",
      },
    ],
  },
  {
    name: "Praktisch",
    color: "secondary",
    faqs: [
      {
        question: "Welke markten kan ik traden?",
        answer:
          "Als funded trader kun je meestal handelen in forex (valutaparen), indices (DAX, S&P500, Nasdaq), commodities (goud, olie) en soms crypto. Forex en indices zijn het populairst vanwege de liquiditeit en spreads.",
      },
      {
        question: "Welk platform gebruik ik?",
        answer:
          "Voor funded trading kun je meestal kiezen uit MetaTrader 4, MetaTrader 5 of cTrader. Deze platforms zijn gratis en werken op Windows, Mac en mobiel. Je krijgt toegang na aanmelding.",
      },
      {
        question: "Kan ik meerdere accounts hebben?",
        answer:
          "Ja, je kunt vaak meerdere funded accounts hebben. Sommige traders hebben 3-5 accounts tegelijk om hun kapitaal te maximaliseren. Check de specifieke regels van je aanbieder.",
      },
      {
        question: "Moet ik de hele dag traden?",
        answer:
          "Nee, je bepaalt je eigen schema. Sommige traders traden 30 minuten per dag, anderen full-time. Je hoeft geen vaste uren te maken - alleen resultaten tellen.",
      },
      {
        question: "Werkt dit ook vanuit Nederland/België?",
        answer:
          "Ja, funded trading werkt wereldwijd. Je kunt vanuit Nederland, België of elk ander land deelnemen. Je hebt alleen internet nodig. Uitbetalingen gaan naar je persoonlijke bankrekening.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[150px]" />

        <div className="relative container-wide">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
              FAQ
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Veelgestelde{" "}
              <span className="gradient-text">Vragen</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Antwoorden op alle vragen over funded trading, challenges
              en hoe je trading kapitaal krijgt.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 border-t border-border">
        <div className="container-wide">
          <div className="flex flex-wrap gap-3">
            {faqCategories.map((category) => (
              <a
                key={category.name}
                href={`#${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category.color === "primary"
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : category.color === "secondary"
                      ? "bg-secondary/10 text-secondary hover:bg-secondary/20"
                      : "bg-accent/10 text-accent hover:bg-accent/20"
                }`}
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      {faqCategories.map((category) => (
        <section
          key={category.name}
          id={category.name.toLowerCase().replace(/\s+/g, "-")}
          className="py-16 border-t border-border"
        >
          <div className="container-wide">
            <div className="flex items-center gap-4 mb-10">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  category.color === "primary"
                    ? "bg-primary/10"
                    : category.color === "secondary"
                      ? "bg-secondary/10"
                      : "bg-accent/10"
                }`}
              >
                <HelpCircle
                  className={`w-6 h-6 ${
                    category.color === "primary"
                      ? "text-primary"
                      : category.color === "secondary"
                        ? "text-secondary"
                        : "text-accent"
                  }`}
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {category.name}
              </h2>
            </div>

            <div className="space-y-4 max-w-4xl">
              {category.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-xl bg-card border border-border overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-white pr-8">
                      {faq.question}
                    </h3>
                    <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-180 shrink-0" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Still Questions */}
      <section className="py-20 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Nog Vragen?
            </h2>
            <p className="text-muted-foreground mb-8">
              Staat je vraag er niet tussen? Neem contact met ons op of bekijk
              onze andere pagina&apos;s voor meer informatie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-primary-dark text-white"
              >
                <Link href="/contact">Contact Opnemen</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/begrippen">Begrippen Uitleg</Link>
              </Button>
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
            Klaar om te Starten?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Nu je al je antwoorden hebt, is het tijd om actie te ondernemen.
          </p>
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
        </div>
      </section>

      {/* Schema.org FAQ */}
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqCategories.flatMap((category) =>
              category.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              }))
            ),
          }),
        }}
      />
    </>
  )
}
