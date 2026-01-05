'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  ChevronLeft,
  Target,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Lightbulb,
  Star
} from 'lucide-react'
import {
  quizQuestions,
  calculateQuizResult,
  firmInfo,
  QuizResult
} from '@/config/quiz'
import { trackEvent } from '@/components/analytics'

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<QuizResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const totalSteps = quizQuestions.length
  const progress = ((currentStep + 1) / totalSteps) * 100
  const currentQuestion = quizQuestions[currentStep]

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value }
    setAnswers(newAnswers)

    // Track answer
    trackEvent('quiz_answer', 'Quiz', `${currentQuestion.id}: ${value}`)

    if (currentStep < totalSteps - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300)
    } else {
      setIsCalculating(true)
      setTimeout(() => {
        const quizResult = calculateQuizResult(newAnswers)
        setResult(quizResult)
        setIsCalculating(false)

        trackEvent('quiz_completed', 'Quiz', quizResult.recommendedFirm)
      }, 1500)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setAnswers({})
    setResult(null)
    trackEvent('quiz_restart', 'Quiz')
  }

  // Show result
  if (result) {
    const recommended = firmInfo[result.recommendedFirm]
    const alternative = firmInfo[result.alternativeFirm]

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <section className="pt-32 md:pt-52 pb-16 px-4">
          <div className="container mx-auto max-w-3xl">
            {/* Result Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm mb-6">
                <CheckCircle2 className="h-4 w-4" />
                <span>Analyse compleet!</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Onze aanbeveling voor jou
              </h1>
              <p className="text-xl text-gray-300">
                Op basis van je antwoorden is dit de beste match
              </p>
            </motion.div>

            {/* Main Recommendation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-6 relative overflow-hidden"
            >
              {/* Match percentage badge */}
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                {result.matchPercentage}% match
              </div>

              <div className="flex items-start gap-4 mb-6">
                <Target className="h-12 w-12 text-blue-300 flex-shrink-0" />
                <div>
                  <span className="text-blue-200 text-sm uppercase tracking-wide">Beste keuze</span>
                  <h2 className="text-3xl font-bold mb-1">{recommended.name}</h2>
                  <p className="text-blue-100">{recommended.tagline}</p>
                </div>
              </div>

              {/* Highlights */}
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {recommended.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/90">
                    <Star className="h-4 w-4 text-yellow-300 flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Reasons */}
              {result.reasons.length > 0 && (
                <div className="bg-white/10 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold mb-2 text-blue-100">Waarom {recommended.name}?</h3>
                  <ul className="space-y-1">
                    {result.reasons.map((reason, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/90 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-300 flex-shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={recommended.ctaLink}
                  onClick={() => trackEvent('quiz_cta_click', 'Quiz', result.recommendedFirm)}
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Start met {recommended.name}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href={recommended.learnMoreLink}
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Meer informatie
                </Link>
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="h-6 w-6 text-amber-500" />
                <h3 className="font-bold text-gray-900 text-lg">Tips om te starten</h3>
              </div>
              <ul className="space-y-2">
                {result.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Alternative */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800 rounded-2xl p-6 mb-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-gray-400 text-sm">Alternatief</span>
                  <h3 className="text-xl font-bold text-white">{alternative.name}</h3>
                  <p className="text-gray-300 text-sm">{alternative.tagline}</p>
                </div>
                <Link
                  href={alternative.learnMoreLink}
                  onClick={() => trackEvent('quiz_alt_click', 'Quiz', result.alternativeFirm)}
                  className="inline-flex items-center gap-2 border border-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Bekijk
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Quiz opnieuw doen
              </button>
              <Link
                href="/vergelijk"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                Alle firms vergelijken
                <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    )
  }

  // Show calculating animation
  if (isCalculating) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"
          />
          <p className="text-xl text-white">Je aanbeveling wordt berekend...</p>
        </motion.div>
      </div>
    )
  }

  // Show quiz
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 pt-32 md:pt-52 pb-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold text-white mb-2">
                Vind jouw ideale Prop Firm
              </h1>
              <p className="text-gray-400">
                Beantwoord 6 korte vragen voor een persoonlijke aanbeveling
              </p>
            </motion.div>
          )}

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Vraag {currentStep + 1} van {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = answers[currentQuestion.id] === option.value
                  return (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <CheckCircle2 className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <span className={`font-medium ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                          {option.label}
                        </span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`inline-flex items-center gap-2 text-white transition-colors ${
                currentStep === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-blue-400'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
              Vorige
            </button>

            <Link
              href="/vergelijk"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Quiz overslaan
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
