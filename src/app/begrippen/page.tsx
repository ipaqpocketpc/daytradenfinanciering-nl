import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { Book, ArrowRight, Search } from "lucide-react"
import { Button, Badge } from "@/components/ui"
import { brand } from "@/config/brand"
import {
  glossaryTerms,
  glossaryCategories,
  getAlphabeticalTerms,
  getAvailableLetters,
  getTermsByLetter,
  getTermsByCategory,
  GlossaryCategory,
} from "@/config/glossary"

export const metadata: Metadata = {
  title: `Trading Begrippen | ${glossaryTerms.length}+ Termen Uitgelegd`,
  description: `Compleet overzicht van ${glossaryTerms.length}+ trading begrippen. Van Funded Account tot Drawdown - leer alle termen die je nodig hebt voor funded trading.`,
  alternates: {
    canonical: "/begrippen",
  },
  openGraph: {
    title: `Trading Begrippen | ${glossaryTerms.length}+ Termen Uitgelegd`,
    description: `Compleet overzicht van ${glossaryTerms.length}+ trading begrippen. Leer alle termen voor funded trading.`,
    url: `${brand.url}/begrippen`,
  },
}

export default function BegrippenPage() {
  const alphabeticalTerms = getAlphabeticalTerms()
  const availableLetters = getAvailableLetters()
  const categories = Object.keys(glossaryCategories) as GlossaryCategory[]

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[120px]" />

        <div className="relative container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
              <Book className="w-4 h-4 mr-2" />
              {glossaryTerms.length}+ begrippen
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Trading <span className="gradient-text">Begrippen</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
              Compleet overzicht van alle trading termen die je nodig hebt. Van
              basis begrippen tot geavanceerde funded trading terminologie.
            </p>

            {/* Letter Navigation */}
            <div className="flex flex-wrap justify-center gap-2">
              {availableLetters.map((letter) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="w-10 h-10 flex items-center justify-center bg-card border border-border hover:border-primary hover:bg-primary/10 rounded-lg font-semibold text-white transition-colors"
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Quick Links */}
      <section className="py-8 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const catInfo = glossaryCategories[category]
              const count = getTermsByCategory(category).length
              return (
                <a
                  key={category}
                  href={`#cat-${category}`}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors"
                >
                  <span className="font-medium text-white">{catInfo.name}</span>
                  <span className="text-sm text-muted-foreground">
                    ({count})
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            {/* Popular Terms */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <Search className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-white">
                  Meest Gezochte Begrippen
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "funded-account",
                  "drawdown",
                  "trading-challenge",
                  "prop-trading",
                ].map((slug) => {
                  const term = alphabeticalTerms.find((t) => t.slug === slug)
                  if (!term) return null
                  return (
                    <a
                      key={term.slug}
                      href={`#${term.slug}`}
                      className="group p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-white group-hover:text-primary transition-colors">
                            {term.term}
                          </h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            {term.shortDefinition}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Alphabetical List */}
            <div className="space-y-12">
              {availableLetters.map((letter) => {
                const termsForLetter = getTermsByLetter(letter)
                return (
                  <div
                    key={letter}
                    id={`letter-${letter}`}
                    className="scroll-mt-24"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-4xl font-bold text-primary">
                        {letter}
                      </span>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    <div className="space-y-4">
                      {termsForLetter.map((term) => (
                        <article
                          key={term.slug}
                          id={term.slug}
                          className="scroll-mt-24 p-6 bg-card rounded-xl border border-border hover:border-primary/20 transition-colors"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                            <h3 className="text-xl font-bold text-white">
                              {term.term}
                            </h3>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(term.category)}`}
                            >
                              {glossaryCategories[term.category].name}
                            </span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {term.definition}
                          </p>
                          {term.relatedTerms && term.relatedTerms.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-border">
                              <span className="text-sm text-muted-foreground mr-2">
                                Gerelateerd:
                              </span>
                              <div className="inline-flex flex-wrap gap-2">
                                {term.relatedTerms.map((slug) => {
                                  const related = alphabeticalTerms.find(
                                    (t) => t.slug === slug
                                  )
                                  if (!related) return null
                                  return (
                                    <a
                                      key={slug}
                                      href={`#${slug}`}
                                      className="text-sm text-primary hover:text-primary/80 hover:underline"
                                    >
                                      {related.term}
                                    </a>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </article>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* By Category */}
            <div className="mt-20 pt-16 border-t border-border">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                Begrippen per Categorie
              </h2>
              <div className="space-y-12">
                {categories.map((category) => {
                  const catInfo = glossaryCategories[category]
                  const terms = getTermsByCategory(category)
                  return (
                    <div
                      key={category}
                      id={`cat-${category}`}
                      className="scroll-mt-24"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-xl font-bold text-white">
                          {catInfo.name}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          ({terms.length} begrippen)
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {catInfo.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {terms.map((term) => (
                          <a
                            key={term.slug}
                            href={`#${term.slug}`}
                            className="px-3 py-1.5 bg-card border border-border hover:border-primary/30 hover:bg-primary/5 rounded-lg text-sm text-white transition-colors"
                          >
                            {term.term}
                          </a>
                        ))}
                      </div>
                    </div>
                  )
                })}
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
            Ken Je de Begrippen?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Nu je de terminologie kent, ben je klaar om te starten met trading
            kapitaal.
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

      {/* Schema.org DefinedTermSet */}
      <Script
        id="schema-glossary"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            name: "Trading Begrippen Glossary",
            description: `Compleet overzicht van ${glossaryTerms.length}+ trading en funded trading begrippen`,
            url: `${brand.url}/begrippen`,
            inLanguage: "nl",
            hasDefinedTerm: glossaryTerms.map((term) => ({
              "@type": "DefinedTerm",
              name: term.term,
              description: term.shortDefinition,
              url: `${brand.url}/begrippen#${term.slug}`,
            })),
          }),
        }}
      />

      {/* FAQ Schema */}
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
                name: "Wat is een Funded Account?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Een funded account is een handelsrekening waarbij je handelt met kapitaal van een financier. Na het succesvol afronden van een evaluatie krijg je toegang tot dit kapitaal en deel je de winsten met de financier.",
                },
              },
              {
                "@type": "Question",
                name: "Wat betekent Drawdown in trading?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Drawdown meet de daling van je accountwaarde vanaf een piek tot een dal, uitgedrukt als percentage. Bij funded trading zijn er maximale drawdown limieten die je niet mag overschrijden.",
                },
              },
              {
                "@type": "Question",
                name: "Wat is een Trading Challenge?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Een trading challenge is een evaluatietest van financiers om je vaardigheden te beoordelen. Je moet bepaalde winstdoelen halen terwijl je binnen risico limieten blijft om toegang te krijgen tot een funded account.",
                },
              },
            ],
          }),
        }}
      />
    </>
  )
}

function getCategoryColor(category: GlossaryCategory): string {
  const colors: Record<GlossaryCategory, string> = {
    basis: "bg-primary/10 text-primary",
    risicobeheer: "bg-red-500/10 text-red-400",
    strategie: "bg-secondary/10 text-secondary",
    technisch: "bg-purple-500/10 text-purple-400",
    "prop-trading": "bg-accent/10 text-accent",
  }
  return colors[category]
}
