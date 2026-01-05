import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Book, ChevronRight, ArrowRight } from 'lucide-react'
import {
  glossaryTerms,
  glossaryCategories,
  getAlphabeticalTerms,
  getAvailableLetters,
  getTermsByLetter,
  getTermsByCategory,
  GlossaryCategory
} from '@/config/glossary'

const currentYear = new Date().getFullYear()

export const metadata: Metadata = {
  title: `Trading Begrippen & Terminologie | Glossary ${currentYear} | FundedTrading.nl`,
  description: `Compleet overzicht van ${glossaryTerms.length}+ trading begrippen. Van Funded Account tot Drawdown - leer alle termen die je nodig hebt voor prop trading.`,
  keywords: [
    'trading begrippen',
    'funded trading uitleg',
    'wat is een funded account',
    'drawdown betekenis',
    'prop trading terminologie',
    'trading glossary nederlands',
  ],
  openGraph: {
    title: `Trading Begrippen & Terminologie | Glossary ${currentYear}`,
    description: `Compleet overzicht van ${glossaryTerms.length}+ trading begrippen. Leer alle termen voor prop trading.`,
    type: 'website',
  },
}

export default function BegrippenPage() {
  const alphabeticalTerms = getAlphabeticalTerms()
  const availableLetters = getAvailableLetters()
  const categories = Object.keys(glossaryCategories) as GlossaryCategory[]

  // Schema.org DefinedTermSet
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Trading Begrippen Glossary',
    description: `Compleet overzicht van ${glossaryTerms.length}+ trading en prop trading begrippen`,
    url: 'https://fundedtrading.nl/begrippen',
    inLanguage: 'nl',
    hasDefinedTerm: glossaryTerms.map(term => ({
      '@type': 'DefinedTerm',
      name: term.term,
      description: term.shortDefinition,
      url: `https://fundedtrading.nl/begrippen#${term.slug}`,
    })),
  }

  // FAQ Schema for popular terms
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Wat is een Funded Account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Een funded account is een handelsrekening waarbij je handelt met kapitaal van een prop trading bedrijf. Na het succesvol afronden van een evaluatie krijg je toegang tot dit kapitaal en deel je de winsten met het bedrijf.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat betekent Drawdown in trading?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Drawdown meet de daling van je accountwaarde vanaf een piek tot een dal, uitgedrukt als percentage. Bij prop firms zijn er maximale drawdown limieten die je niet mag overschrijden.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wat is een Trading Challenge?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Een trading challenge is een evaluatietest van prop firms om je vaardigheden te beoordelen. Je moet bepaalde winstdoelen halen terwijl je binnen risico limieten blijft om toegang te krijgen tot een funded account.',
        },
      },
    ],
  }

  return (
    <>
      <Script
        id="schema-glossary"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white pt-32 md:pt-52 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm mb-6">
              <Book className="h-4 w-4" />
              <span>{glossaryTerms.length}+ begrippen</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Trading Begrippen & Terminologie
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Compleet overzicht van alle trading termen die je nodig hebt voor funded trading.
              Van basis begrippen tot geavanceerde prop trading terminologie.
            </p>

            {/* Quick Jump to Letter */}
            <div className="flex flex-wrap justify-center gap-2">
              {availableLetters.map(letter => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-blue-600 rounded-lg font-semibold transition-colors"
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Quick Links */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => {
              const catInfo = glossaryCategories[category]
              const count = getTermsByCategory(category).length
              return (
                <a
                  key={category}
                  href={`#cat-${category}`}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="font-medium">{catInfo.name}</span>
                  <span className="text-sm text-gray-500">({count})</span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Popular Terms Highlight */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Meest Gezochte Begrippen</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {['funded-account', 'drawdown', 'trading-challenge', 'prop-trading'].map(slug => {
                  const term = alphabeticalTerms.find(t => t.slug === slug)
                  if (!term) return null
                  return (
                    <a
                      key={term.slug}
                      href={`#${term.slug}`}
                      className="group p-4 bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                            {term.term}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {term.shortDefinition}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Alphabetical List */}
            <div className="space-y-12">
              {availableLetters.map(letter => {
                const termsForLetter = getTermsByLetter(letter)
                return (
                  <div key={letter} id={`letter-${letter}`} className="scroll-mt-24">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-4xl font-bold text-blue-600">{letter}</span>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>
                    <div className="space-y-6">
                      {termsForLetter.map(term => (
                        <article
                          key={term.slug}
                          id={term.slug}
                          className="scroll-mt-24 p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                            <h3 className="text-xl font-bold">{term.term}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(term.category)}`}>
                              {glossaryCategories[term.category].name}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {term.definition}
                          </p>
                          {term.relatedTerms && term.relatedTerms.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <span className="text-sm text-gray-500 mr-2">Gerelateerd:</span>
                              <div className="inline-flex flex-wrap gap-2">
                                {term.relatedTerms.map(slug => {
                                  const related = alphabeticalTerms.find(t => t.slug === slug)
                                  if (!related) return null
                                  return (
                                    <a
                                      key={slug}
                                      href={`#${slug}`}
                                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
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
            <div className="mt-20 pt-16 border-t">
              <h2 className="text-2xl font-bold mb-8 text-center">Begrippen per Categorie</h2>
              <div className="space-y-12">
                {categories.map(category => {
                  const catInfo = glossaryCategories[category]
                  const terms = getTermsByCategory(category)
                  return (
                    <div key={category} id={`cat-${category}`} className="scroll-mt-24">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-xl font-bold">{catInfo.name}</h3>
                        <span className="text-sm text-gray-500">({terms.length} begrippen)</span>
                      </div>
                      <p className="text-gray-600 mb-4">{catInfo.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {terms.map(term => (
                          <a
                            key={term.slug}
                            href={`#${term.slug}`}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-blue-100 rounded-lg text-sm transition-colors"
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Klaar om te starten met Funded Trading?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Nu je de begrippen kent, vergelijk de beste prop trading firms en vind de juiste voor jou.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/vergelijk"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Vergelijk Prop Firms
              <ChevronRight className="h-5 w-5" />
            </Link>
            <Link
              href="/prop-firms"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Bekijk Alle Firms
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function getCategoryColor(category: GlossaryCategory): string {
  const colors: Record<GlossaryCategory, string> = {
    'basis': 'bg-gray-100 text-gray-700',
    'risicobeheer': 'bg-red-100 text-red-700',
    'strategie': 'bg-green-100 text-green-700',
    'technisch': 'bg-purple-100 text-purple-700',
    'prop-trading': 'bg-blue-100 text-blue-700',
  }
  return colors[category]
}
