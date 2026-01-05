// Prop Firm Quiz configuratie
// Focus op firm aanbeveling, NIET op persona labels voor gebruikers

export interface QuizQuestion {
  id: string
  question: string
  options: QuizOption[]
}

export interface QuizOption {
  label: string
  value: string
  // Scoring: higher = more suited for that firm
  ftmoScore: number
  apexScore: number
  // Tags for generating reasons
  reasonTags: string[]
}

export interface QuizResult {
  recommendedFirm: 'ftmo' | 'apex'
  score: { ftmo: number; apex: number }
  matchPercentage: number
  reasons: string[]
  tips: string[]
  alternativeFirm: 'ftmo' | 'apex'
}

// Quiz vragen - praktische keuzes, geen persona labels
export const quizQuestions: QuizQuestion[] = [
  {
    id: 'experience',
    question: 'Hoeveel ervaring heb je met trading?',
    options: [
      {
        label: 'Ik ben volledig nieuw of begin net',
        value: 'new',
        ftmoScore: 3,
        apexScore: 1,
        reasonTags: ['education', 'structured']
      },
      {
        label: 'Ik heb wat ervaring opgedaan',
        value: 'some',
        ftmoScore: 2,
        apexScore: 2,
        reasonTags: ['growth']
      },
      {
        label: 'Ik handel al meerdere jaren',
        value: 'experienced',
        ftmoScore: 2,
        apexScore: 3,
        reasonTags: ['profit-split', 'flexibility']
      }
    ]
  },
  {
    id: 'market',
    question: 'Welke markt wil je het liefst handelen?',
    options: [
      {
        label: 'Forex (valutaparen)',
        value: 'forex',
        ftmoScore: 3,
        apexScore: 0,
        reasonTags: ['forex']
      },
      {
        label: 'Futures (indices, commodities)',
        value: 'futures',
        ftmoScore: 0,
        apexScore: 3,
        reasonTags: ['futures']
      },
      {
        label: 'Ik wil beide kunnen handelen',
        value: 'both',
        ftmoScore: 2,
        apexScore: 2,
        reasonTags: ['versatile']
      },
      {
        label: 'Ik weet het nog niet',
        value: 'unsure',
        ftmoScore: 2,
        apexScore: 1,
        reasonTags: ['education']
      }
    ]
  },
  {
    id: 'budget',
    question: 'Wat is je budget voor een challenge?',
    options: [
      {
        label: 'Zo laag mogelijk (onder €150)',
        value: 'low',
        ftmoScore: 1,
        apexScore: 3,
        reasonTags: ['affordable', 'discount']
      },
      {
        label: '€150 - €350',
        value: 'medium',
        ftmoScore: 2,
        apexScore: 2,
        reasonTags: ['value']
      },
      {
        label: '€350 - €600',
        value: 'high',
        ftmoScore: 3,
        apexScore: 2,
        reasonTags: ['larger-account']
      },
      {
        label: 'Meer dan €600 voor een groot account',
        value: 'premium',
        ftmoScore: 3,
        apexScore: 1,
        reasonTags: ['scaling', 'large-capital']
      }
    ]
  },
  {
    id: 'priority',
    question: 'Wat is voor jou het belangrijkst?',
    options: [
      {
        label: 'Hoogste profit split (meer winst houden)',
        value: 'profit',
        ftmoScore: 3,
        apexScore: 2,
        reasonTags: ['profit-split']
      },
      {
        label: 'Laagste instapkosten',
        value: 'costs',
        ftmoScore: 1,
        apexScore: 3,
        reasonTags: ['affordable', 'discount']
      },
      {
        label: 'Snelste uitbetalingen',
        value: 'payout',
        ftmoScore: 2,
        apexScore: 3,
        reasonTags: ['fast-payout']
      },
      {
        label: 'Beste educatie en ondersteuning',
        value: 'education',
        ftmoScore: 3,
        apexScore: 1,
        reasonTags: ['education', 'support']
      }
    ]
  },
  {
    id: 'style',
    question: 'Welke trading stijl past het beste bij jou?',
    options: [
      {
        label: 'Scalping (veel korte trades)',
        value: 'scalping',
        ftmoScore: 2,
        apexScore: 3,
        reasonTags: ['futures', 'fast-payout']
      },
      {
        label: 'Day trading (binnen een dag)',
        value: 'daytrading',
        ftmoScore: 2,
        apexScore: 2,
        reasonTags: ['versatile']
      },
      {
        label: 'Swing trading (meerdere dagen)',
        value: 'swing',
        ftmoScore: 3,
        apexScore: 1,
        reasonTags: ['forex', 'flexibility']
      },
      {
        label: 'Ik experimenteer nog',
        value: 'experimenting',
        ftmoScore: 2,
        apexScore: 1,
        reasonTags: ['education', 'structured']
      }
    ]
  },
  {
    id: 'time',
    question: 'Hoeveel tijd kun je besteden aan trading per dag?',
    options: [
      {
        label: 'Minder dan 1 uur',
        value: 'minimal',
        ftmoScore: 2,
        apexScore: 2,
        reasonTags: ['flexibility']
      },
      {
        label: '1-3 uur',
        value: 'moderate',
        ftmoScore: 2,
        apexScore: 2,
        reasonTags: ['value']
      },
      {
        label: '3+ uur (veel tijd beschikbaar)',
        value: 'fulltime',
        ftmoScore: 2,
        apexScore: 3,
        reasonTags: ['scalping', 'futures']
      }
    ]
  }
]

// Reason messages gebaseerd op tags
const reasonMessages: Record<string, { ftmo: string; apex: string }> = {
  'education': {
    ftmo: 'Uitgebreide educatieve materialen en ondersteuning',
    apex: ''
  },
  'structured': {
    ftmo: 'Duidelijke, gestructureerde challenge opbouw',
    apex: ''
  },
  'forex': {
    ftmo: 'Gespecialiseerd in forex trading met uitstekende spreads',
    apex: ''
  },
  'futures': {
    ftmo: '',
    apex: 'Gespecialiseerd in futures trading'
  },
  'affordable': {
    ftmo: '',
    apex: 'Zeer betaalbare instapkosten'
  },
  'discount': {
    ftmo: '',
    apex: 'Regelmatig hoge kortingen (tot 80% off)'
  },
  'profit-split': {
    ftmo: 'Tot 90% profit split voor traders',
    apex: '100% van je eerste $25.000 winst is voor jou'
  },
  'fast-payout': {
    ftmo: '',
    apex: 'Bi-weekly uitbetalingen voor snelle toegang tot winst'
  },
  'scaling': {
    ftmo: 'Schaalbare accounts tot €200.000+',
    apex: ''
  },
  'large-capital': {
    ftmo: 'Grote accounts met uitstekende voorwaarden',
    apex: ''
  },
  'support': {
    ftmo: 'Bekend om uitstekende trader support',
    apex: ''
  },
  'flexibility': {
    ftmo: 'Flexibele regels voor verschillende trading stijlen',
    apex: ''
  },
  'versatile': {
    ftmo: 'Ondersteunt diverse trading stijlen',
    apex: 'Flexibiliteit in je trading aanpak'
  }
}

// Tips per firm
const firmTips: Record<'ftmo' | 'apex', string[]> = {
  ftmo: [
    'Begin met een demo account om te oefenen',
    'Focus op risicobeheer - blijf binnen de 5% dagelijkse limiet',
    'Maak gebruik van de gratis educatieve content',
    'Er is geen minimale handelsdagen vereiste'
  ],
  apex: [
    'Wacht op kortingsacties voor de beste deal',
    'Je houdt 100% van je eerste $25.000 aan winst',
    'Bi-weekly payouts geven snelle toegang tot winst',
    'Geen minimale handelsdagen vereist'
  ]
}

// Calculate quiz result
export function calculateQuizResult(answers: Record<string, string>): QuizResult {
  let ftmoScore = 0
  let apexScore = 0
  const collectedTags: string[] = []

  // Calculate scores based on answers
  for (const [questionId, answerValue] of Object.entries(answers)) {
    const question = quizQuestions.find(q => q.id === questionId)
    if (!question) continue

    const option = question.options.find(o => o.value === answerValue)
    if (!option) continue

    ftmoScore += option.ftmoScore
    apexScore += option.apexScore
    collectedTags.push(...option.reasonTags)
  }

  const recommendedFirm: 'ftmo' | 'apex' = ftmoScore >= apexScore ? 'ftmo' : 'apex'
  const alternativeFirm: 'ftmo' | 'apex' = recommendedFirm === 'ftmo' ? 'apex' : 'ftmo'

  const totalScore = ftmoScore + apexScore
  const winnerScore = recommendedFirm === 'ftmo' ? ftmoScore : apexScore
  const matchPercentage = totalScore > 0 ? Math.round((winnerScore / totalScore) * 100) : 50

  // Get unique reasons based on collected tags
  const uniqueTags = [...new Set(collectedTags)]
  const reasons = uniqueTags
    .map(tag => reasonMessages[tag]?.[recommendedFirm])
    .filter(Boolean)
    .slice(0, 4)

  return {
    recommendedFirm,
    alternativeFirm,
    score: { ftmo: ftmoScore, apex: apexScore },
    matchPercentage: Math.max(55, Math.min(92, matchPercentage)),
    reasons,
    tips: firmTips[recommendedFirm]
  }
}

// Firm info voor result page
export const firmInfo = {
  ftmo: {
    name: 'FTMO',
    tagline: 'De meest betrouwbare keuze voor forex traders',
    highlights: [
      'Tot 90% profit split',
      '€10.000 - €200.000 accounts',
      'Gevestigde reputatie sinds 2015',
      '14 dagen payout cyclus'
    ],
    ctaLink: '/go/ftmo',
    learnMoreLink: '/prop-firms/ftmo'
  },
  apex: {
    name: 'Apex Trader Funding',
    tagline: 'De beste keuze voor futures traders',
    highlights: [
      '100% van eerste $25K winst',
      'Regelmatig 50-80% korting',
      'Bi-weekly uitbetalingen',
      'Geen minimale handelsdagen'
    ],
    ctaLink: '/go/apex',
    learnMoreLink: '/prop-firms/apex-trader-funding'
  }
}
