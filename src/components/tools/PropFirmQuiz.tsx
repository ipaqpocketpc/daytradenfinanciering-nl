"use client"

import { useState, useMemo } from "react"
import {
  HelpCircle,
  ArrowLeft,
  CheckCircle,
  DollarSign,
  Target,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

interface QuizQuestion {
  id: string
  question: string
  description?: string
  options: {
    id: string
    label: string
    description?: string
    scores: Record<string, number>
  }[]
}

interface PropFirmProfile {
  id: string
  name: string
  slug: string
  shortDescription: string
  logo: string
  highlights: string[]
  bestFor: string[]
  profitSplit: string
  minChallengeFee: string
  isPartner: boolean
}

const propFirms: PropFirmProfile[] = [
  {
    id: "ftmo",
    name: "FTMO",
    slug: "ftmo",
    shortDescription: "De meest gerenommeerde prop firm met bewezen track record",
    logo: "FTMO",
    highlights: [
      "Geen consistency rule",
      "80-90% profit split",
      "Gratis retry bij falen fase 1",
      "Scaling tot €2M",
    ],
    bestFor: ["Ervaren traders", "Forex & indices", "Wie betrouwbaarheid zoekt"],
    profitSplit: "80-90%",
    minChallengeFee: "€89",
    isPartner: true,
  },
  {
    id: "apex",
    name: "Apex Trader Funding",
    slug: "apex-trader-funding",
    shortDescription: "Beste keuze voor futures traders met snelle evaluatie",
    logo: "APEX",
    highlights: [
      "100% profit op eerste $25k",
      "1-fase evaluatie",
      "Snelle payouts (bi-weekly)",
      "Goedkope reset optie",
    ],
    bestFor: ["Futures traders", "Wie snel funded wil zijn", "Budget-bewuste traders"],
    profitSplit: "100%/$25k, dan 90%",
    minChallengeFee: "$147/mnd",
    isPartner: true,
  },
  {
    id: "the5ers",
    name: "The5%ers",
    slug: "the5ers",
    shortDescription: "Direct live trading met instant funding opties",
    logo: "5%ERS",
    highlights: [
      "Instant funding beschikbaar",
      "Geen tijdslimiet",
      "Scaling plan tot $4M",
      "Lage instap vanaf €95",
    ],
    bestFor: ["Swing traders", "Wie geen tijdsdruk wil", "Kleinere budgetten"],
    profitSplit: "80%",
    minChallengeFee: "€95",
    isPartner: false,
  },
  {
    id: "fundednext",
    name: "FundedNext",
    slug: "fundednext",
    shortDescription: "Hoge profit split en fee refund met competitieve prijzen",
    logo: "FNEXT",
    highlights: [
      "Tot 90% profit split",
      "Fee refund bij succes",
      "15% winst tijdens challenge",
      "Scaling tot $4M",
    ],
    bestFor: ["Wie hoge profit split wil", "Agressieve traders", "Alle trading stijlen"],
    profitSplit: "80-90%",
    minChallengeFee: "$99",
    isPartner: false,
  },
  {
    id: "topstep",
    name: "Topstep",
    slug: "topstep",
    shortDescription: "Pionier in prop trading met focus op educatie",
    logo: "TOPSTEP",
    highlights: [
      "Uitstekende educatie",
      "Trading combine format",
      "Real-time coaching",
      "Geen maximum payout",
    ],
    bestFor: ["Beginners", "Futures traders", "Wie van educatie houdt"],
    profitSplit: "90%",
    minChallengeFee: "$165/mnd",
    isPartner: false,
  },
]

const quizQuestions: QuizQuestion[] = [
  {
    id: "experience",
    question: "Hoeveel ervaring heb je met trading?",
    description: "Dit helpt ons bepalen welke firms het beste bij je niveau passen",
    options: [
      {
        id: "beginner",
        label: "Beginner",
        description: "Minder dan 6 maanden actief traden",
        scores: { ftmo: 2, apex: 3, the5ers: 4, fundednext: 3, topstep: 5 },
      },
      {
        id: "intermediate",
        label: "Gemiddeld",
        description: "6 maanden tot 2 jaar ervaring",
        scores: { ftmo: 4, apex: 4, the5ers: 4, fundednext: 4, topstep: 3 },
      },
      {
        id: "advanced",
        label: "Gevorderd",
        description: "2+ jaar consistente ervaring",
        scores: { ftmo: 5, apex: 4, the5ers: 3, fundednext: 4, topstep: 2 },
      },
    ],
  },
  {
    id: "instrument",
    question: "Welke markten trade je het meest?",
    description: "Niet alle firms ondersteunen alle instrumenten",
    options: [
      {
        id: "forex",
        label: "Forex",
        description: "Valutaparen (EUR/USD, GBP/JPY, etc.)",
        scores: { ftmo: 5, apex: 1, the5ers: 5, fundednext: 5, topstep: 1 },
      },
      {
        id: "futures",
        label: "Futures",
        description: "ES, NQ, CL, GC, etc.",
        scores: { ftmo: 2, apex: 5, the5ers: 2, fundednext: 2, topstep: 5 },
      },
      {
        id: "indices",
        label: "Indices (CFDs)",
        description: "US30, NAS100, DAX, etc.",
        scores: { ftmo: 5, apex: 2, the5ers: 4, fundednext: 5, topstep: 2 },
      },
      {
        id: "mixed",
        label: "Mix van alles",
        description: "Ik trade meerdere markten",
        scores: { ftmo: 4, apex: 3, the5ers: 4, fundednext: 4, topstep: 3 },
      },
    ],
  },
  {
    id: "style",
    question: "Wat is je trading stijl?",
    description: "Sommige firms hebben regels die bepaalde stijlen beperken",
    options: [
      {
        id: "scalping",
        label: "Scalping",
        description: "Veel kleine trades, snelle in/uit",
        scores: { ftmo: 4, apex: 5, the5ers: 2, fundednext: 4, topstep: 4 },
      },
      {
        id: "daytrading",
        label: "Day Trading",
        description: "Trades sluiten voor einde dag",
        scores: { ftmo: 5, apex: 4, the5ers: 4, fundednext: 5, topstep: 4 },
      },
      {
        id: "swing",
        label: "Swing Trading",
        description: "Posities meerdere dagen vasthouden",
        scores: { ftmo: 4, apex: 2, the5ers: 5, fundednext: 4, topstep: 2 },
      },
      {
        id: "news",
        label: "News Trading",
        description: "Trading rond economische events",
        scores: { ftmo: 3, apex: 4, the5ers: 3, fundednext: 3, topstep: 4 },
      },
    ],
  },
  {
    id: "budget",
    question: "Wat is je budget voor een challenge?",
    description: "We matchen je met betaalbare opties",
    options: [
      {
        id: "low",
        label: "Tot €150",
        description: "Instapniveau",
        scores: { ftmo: 3, apex: 4, the5ers: 5, fundednext: 5, topstep: 3 },
      },
      {
        id: "medium",
        label: "€150 - €350",
        description: "Gemiddeld budget",
        scores: { ftmo: 5, apex: 4, the5ers: 4, fundednext: 5, topstep: 4 },
      },
      {
        id: "high",
        label: "€350 - €600",
        description: "Hoger budget",
        scores: { ftmo: 5, apex: 4, the5ers: 3, fundednext: 4, topstep: 4 },
      },
      {
        id: "unlimited",
        label: "€600+",
        description: "Budget is geen issue",
        scores: { ftmo: 5, apex: 4, the5ers: 3, fundednext: 4, topstep: 4 },
      },
    ],
  },
  {
    id: "priority",
    question: "Wat is het belangrijkst voor jou?",
    description: "We prioriteren firms die hierin uitblinken",
    options: [
      {
        id: "profitsplit",
        label: "Hoogste Profit Split",
        description: "Zo veel mogelijk van mijn winst houden",
        scores: { ftmo: 4, apex: 5, the5ers: 3, fundednext: 5, topstep: 4 },
      },
      {
        id: "reliability",
        label: "Betrouwbaarheid",
        description: "Gevestigde naam, zeker van payouts",
        scores: { ftmo: 5, apex: 4, the5ers: 4, fundednext: 3, topstep: 5 },
      },
      {
        id: "speed",
        label: "Snelheid",
        description: "Snel funded worden en snelle payouts",
        scores: { ftmo: 3, apex: 5, the5ers: 4, fundednext: 4, topstep: 3 },
      },
      {
        id: "flexibility",
        label: "Flexibiliteit",
        description: "Weinig regels, veel vrijheid",
        scores: { ftmo: 5, apex: 3, the5ers: 5, fundednext: 4, topstep: 3 },
      },
    ],
  },
  {
    id: "accountsize",
    question: "Welke account grootte zoek je?",
    description: "Beschikbare opties verschillen per firm",
    options: [
      {
        id: "small",
        label: "Tot $25.000",
        description: "Beginnen met een kleiner account",
        scores: { ftmo: 4, apex: 5, the5ers: 5, fundednext: 5, topstep: 4 },
      },
      {
        id: "medium",
        label: "$25.000 - $50.000",
        description: "Gemiddeld account",
        scores: { ftmo: 5, apex: 5, the5ers: 4, fundednext: 5, topstep: 5 },
      },
      {
        id: "large",
        label: "$50.000 - $100.000",
        description: "Groter account",
        scores: { ftmo: 5, apex: 5, the5ers: 4, fundednext: 5, topstep: 5 },
      },
      {
        id: "xlarge",
        label: "$100.000+",
        description: "Maximale account grootte",
        scores: { ftmo: 5, apex: 4, the5ers: 3, fundednext: 5, topstep: 4 },
      },
    ],
  },
  {
    id: "consistency",
    question: "Hoe consistent is je trading?",
    description: "Sommige firms hebben consistency rules die je kunnen beïnvloeden",
    options: [
      {
        id: "veryConsistent",
        label: "Zeer consistent",
        description: "Kleine dagelijkse winsten, weinig uitschieters",
        scores: { ftmo: 5, apex: 5, the5ers: 5, fundednext: 5, topstep: 5 },
      },
      {
        id: "moderate",
        label: "Redelijk consistent",
        description: "Af en toe een grotere dag",
        scores: { ftmo: 5, apex: 4, the5ers: 5, fundednext: 4, topstep: 4 },
      },
      {
        id: "variable",
        label: "Variabel",
        description: "Grotere ups en downs",
        scores: { ftmo: 5, apex: 2, the5ers: 5, fundednext: 3, topstep: 2 },
      },
      {
        id: "homerun",
        label: "Home-run stijl",
        description: "Weinig trades, maar grote winsten",
        scores: { ftmo: 5, apex: 1, the5ers: 5, fundednext: 2, topstep: 1 },
      },
    ],
  },
]

export function PropFirmQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  // Calculate scores
  const results = useMemo(() => {
    const scores: Record<string, number> = {
      ftmo: 0,
      apex: 0,
      the5ers: 0,
      fundednext: 0,
      topstep: 0,
    }

    Object.entries(answers).forEach(([questionId, optionId]) => {
      const question = quizQuestions.find(q => q.id === questionId)
      const option = question?.options.find(o => o.id === optionId)
      if (option) {
        Object.entries(option.scores).forEach(([firmId, score]) => {
          scores[firmId] = (scores[firmId] || 0) + score
        })
      }
    })

    // Sort firms by score
    const sortedFirms = propFirms
      .map(firm => ({
        ...firm,
        score: scores[firm.id] || 0,
        maxPossibleScore: quizQuestions.length * 5,
        matchPercentage: Math.round(((scores[firm.id] || 0) / (quizQuestions.length * 5)) * 100),
      }))
      .sort((a, b) => b.score - a.score)

    return sortedFirms
  }, [answers])

  const handleAnswer = (optionId: string) => {
    const questionId = quizQuestions[currentQuestion].id
    setAnswers({ ...answers, [questionId]: optionId })

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 300)
    } else {
      setTimeout(() => {
        setShowResults(true)
      }, 300)
    }
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  const progress = ((currentQuestion) / quizQuestions.length) * 100
  const currentQ = quizQuestions[currentQuestion]

  if (showResults) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Jouw Resultaten</h2>
          <p className="text-muted-foreground">
            Op basis van je antwoorden zijn dit de beste prop firms voor jou
          </p>
        </div>

        {/* Top 3 Results */}
        <div className="space-y-4">
          {results.slice(0, 3).map((firm, index) => (
            <div
              key={firm.id}
              className={`p-6 rounded-xl border transition-all ${
                index === 0
                  ? "bg-secondary/5 border-secondary/30"
                  : "bg-card border-border"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                    index === 0
                      ? "bg-secondary text-white"
                      : index === 1
                      ? "bg-gray-400 text-white"
                      : "bg-amber-600 text-white"
                  }`}>
                    #{index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{firm.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{firm.shortDescription}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{firm.matchPercentage}%</div>
                  <div className="text-xs text-muted-foreground">match</div>
                </div>
              </div>

              {/* Match bar */}
              <div className="h-2 rounded-full bg-background mb-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    index === 0 ? "bg-secondary" : "bg-primary"
                  }`}
                  style={{ width: `${firm.matchPercentage}%` }}
                />
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {firm.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Quick stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border pt-4">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>Profit Split: {firm.profitSplit}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  <span>Vanaf {firm.minChallengeFee}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-4 flex gap-3">
                <Link
                  href={`/prop-firms/${firm.slug}`}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold text-center transition-colors ${
                    firm.isPartner
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-background border border-border text-white hover:bg-background/80"
                  }`}
                >
                  Bekijk Review
                </Link>
                {firm.isPartner && (
                  <Link
                    href={`/prop-firms/${firm.slug}/kortingscode`}
                    className="py-3 px-4 rounded-lg font-semibold bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
                  >
                    Kortingscode
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Other options */}
        {results.length > 3 && (
          <div className="p-4 rounded-xl bg-card border border-border">
            <h4 className="font-medium text-white mb-3">Andere opties</h4>
            <div className="space-y-2">
              {results.slice(3).map((firm) => (
                <div key={firm.id} className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{firm.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{firm.matchPercentage}% match</span>
                    <Link
                      href={`/prop-firms/${firm.slug}`}
                      className="text-sm text-primary hover:underline"
                    >
                      Bekijk →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary of answers */}
        <div className="p-4 rounded-xl bg-card border border-border">
          <h4 className="font-medium text-white mb-3">Jouw Profiel</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {Object.entries(answers).map(([questionId, optionId]) => {
              const question = quizQuestions.find(q => q.id === questionId)
              const option = question?.options.find(o => o.id === optionId)
              return (
                <div key={questionId} className="p-2 rounded-lg bg-background">
                  <span className="text-muted-foreground">{question?.question.replace("?", "").slice(0, 20)}...</span>
                  <p className="text-white font-medium">{option?.label}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Restart */}
        <div className="text-center">
          <button
            onClick={restartQuiz}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-background border border-border text-white hover:bg-background/80 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Quiz Opnieuw Doen
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
          <HelpCircle className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Prop Firm Keuzehulp</h2>
          <p className="text-muted-foreground">
            Beantwoord {quizQuestions.length} vragen en ontdek welke prop firm het beste bij je past
          </p>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Vraag {currentQuestion + 1} van {quizQuestions.length}</span>
          <span>{Math.round(progress)}% voltooid</span>
        </div>
        <div className="h-2 rounded-full bg-background overflow-hidden">
          <div
            className="h-full bg-secondary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <h3 className="text-xl font-bold text-white mb-2">{currentQ.question}</h3>
        {currentQ.description && (
          <p className="text-muted-foreground mb-6">{currentQ.description}</p>
        )}

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option) => {
            const isSelected = answers[currentQ.id] === option.id
            return (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? "border-secondary bg-secondary/10"
                    : "border-border bg-background hover:border-secondary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-semibold ${isSelected ? "text-secondary" : "text-white"}`}>
                      {option.label}
                    </p>
                    {option.description && (
                      <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                    )}
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected
                      ? "border-secondary bg-secondary"
                      : "border-border"
                  }`}>
                    {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          disabled={currentQuestion === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            currentQuestion === 0
              ? "text-muted-foreground/50 cursor-not-allowed"
              : "text-muted-foreground hover:text-white"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Vorige
        </button>

        <div className="flex gap-1">
          {quizQuestions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index < currentQuestion
                  ? "bg-secondary"
                  : index === currentQuestion
                  ? "bg-white"
                  : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        <div className="w-24" /> {/* Spacer */}
      </div>

      {/* Quick exit info */}
      <div className="p-4 rounded-xl bg-background text-center">
        <p className="text-sm text-muted-foreground">
          💡 Je kunt de quiz op elk moment opnieuw starten door de pagina te vernieuwen
        </p>
      </div>
    </div>
  )
}
