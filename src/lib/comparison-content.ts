// Comparison content generator for prop firm vs prop firm pages
import { PropFirm } from '@/config/firms'

export interface ComparisonContent {
  intro: string
  quickVerdict: {
    winner: 'firm1' | 'firm2' | 'tie'
    summary: string
    bestFor: { firm1: string; firm2: string }
  }
  categoryWinners: {
    category: string
    winner: 'firm1' | 'firm2' | 'tie'
    explanation: string
  }[]
  detailedAnalysis: {
    title: string
    content: string
  }[]
  faqs: { question: string; answer: string }[]
  conclusion: string
}

// Define all valid comparison pairs (partner-focused for Option 3)
export function getComparisonPairs(): { firm1: string; firm2: string }[] {
  const otherFirms = [
    'the5ers',
    'fundednext',
    'dna-funded',
    'goat-funded-trader',
    'brightfunded',
    'e8-markets',
    'topstep',
    'seacrest-markets',
    'fxify',
    'funded-trading-plus',
    'city-traders-imperium',
    'funderpro',
    'funding-pips',
  ]

  const pairs: { firm1: string; firm2: string }[] = []

  // Main partner comparison
  pairs.push({ firm1: 'ftmo', firm2: 'apex-trader-funding' })

  // FTMO vs others
  otherFirms.forEach(firm => {
    pairs.push({ firm1: 'ftmo', firm2: firm })
  })

  // Apex vs others
  otherFirms.forEach(firm => {
    pairs.push({ firm1: 'apex-trader-funding', firm2: firm })
  })

  return pairs
}

// Check if a comparison pair is valid
export function isValidComparison(slug1: string, slug2: string): boolean {
  const pairs = getComparisonPairs()
  return pairs.some(
    pair =>
      (pair.firm1 === slug1 && pair.firm2 === slug2) ||
      (pair.firm1 === slug2 && pair.firm2 === slug1)
  )
}

// Get canonical order for comparison (always alphabetical by firm1)
export function getCanonicalOrder(slug1: string, slug2: string): { firm1: string; firm2: string } {
  const pairs = getComparisonPairs()
  const match = pairs.find(
    pair =>
      (pair.firm1 === slug1 && pair.firm2 === slug2) ||
      (pair.firm1 === slug2 && pair.firm2 === slug1)
  )
  return match || { firm1: slug1, firm2: slug2 }
}

// Generate comparison content
export function generateComparisonContent(firm1: PropFirm, firm2: PropFirm): ComparisonContent {
  // Determine winner based on various factors including reliability (betrouwbaarheid)
  const getOverallWinner = (): 'firm1' | 'firm2' | 'tie' => {
    let score1 = 0
    let score2 = 0

    // Rating (1 point)
    if (firm1.rating > firm2.rating) score1++
    else if (firm2.rating > firm1.rating) score2++

    // Profit split (1 point)
    if (firm1.profitSplitMax > firm2.profitSplitMax) score1++
    else if (firm2.profitSplitMax > firm1.profitSplitMax) score2++

    // Price (lowest wins) (1 point)
    const minPrice1 = Math.min(...Object.values(firm1.challengePrices))
    const minPrice2 = Math.min(...Object.values(firm2.challengePrices))
    if (minPrice1 < minPrice2) score1++
    else if (minPrice2 < minPrice1) score2++

    // BETROUWBAARHEID: Years active (1.5 points - older firm is more reliable)
    const currentYear = new Date().getFullYear()
    const yearsActive1 = currentYear - firm1.foundedYear
    const yearsActive2 = currentYear - firm2.foundedYear
    if (yearsActive1 > yearsActive2) score1 += 1.5
    else if (yearsActive2 > yearsActive1) score2 += 1.5

    // BETROUWBAARHEID: Review count (1.5 points - more reviews = more trustworthy)
    if (firm1.reviewCount > firm2.reviewCount) score1 += 1.5
    else if (firm2.reviewCount > firm1.reviewCount) score2 += 1.5

    // Partner bonus (1 point - verified partners)
    if (firm1.isPartner) score1 += 1
    if (firm2.isPartner) score2 += 1

    if (score1 > score2) return 'firm1'
    if (score2 > score1) return 'firm2'
    return 'tie'
  }

  const overallWinner = getOverallWinner()

  // Generate category winners
  const categoryWinners: ComparisonContent['categoryWinners'] = [
    {
      category: 'Betrouwbaarheid',
      winner: firm1.rating >= firm2.rating ? (firm1.rating > firm2.rating ? 'firm1' : 'tie') : 'firm2',
      explanation: `${firm1.name} heeft een rating van ${firm1.rating}/5 met ${firm1.reviewCount.toLocaleString()} reviews, terwijl ${firm2.name} een ${firm2.rating}/5 rating heeft met ${firm2.reviewCount.toLocaleString()} reviews. ${firm1.rating >= firm2.rating ? firm1.name : firm2.name} scoort ${firm1.rating === firm2.rating ? 'gelijk' : 'hoger'} op klanttevredenheid.`,
    },
    {
      category: 'Prijs',
      winner: (() => {
        const min1 = Math.min(...Object.values(firm1.challengePrices))
        const min2 = Math.min(...Object.values(firm2.challengePrices))
        if (min1 < min2) return 'firm1'
        if (min2 < min1) return 'firm2'
        return 'tie'
      })(),
      explanation: `De goedkoopste challenge bij ${firm1.name} start vanaf ${firm1.currency === 'EUR' ? '€' : '$'}${Math.min(...Object.values(firm1.challengePrices))}, terwijl ${firm2.name} begint bij ${firm2.currency === 'EUR' ? '€' : '$'}${Math.min(...Object.values(firm2.challengePrices))}. ${Math.min(...Object.values(firm1.challengePrices)) <= Math.min(...Object.values(firm2.challengePrices)) ? firm1.name : firm2.name} is de goedkopere optie.`,
    },
    {
      category: 'Profit Split',
      winner: firm1.profitSplitMax > firm2.profitSplitMax ? 'firm1' : (firm2.profitSplitMax > firm1.profitSplitMax ? 'firm2' : 'tie'),
      explanation: `${firm1.name} biedt ${firm1.profitSplit} profit split, ${firm2.name} biedt ${firm2.profitSplit}. ${firm1.profitSplitMax >= firm2.profitSplitMax ? firm1.name : firm2.name} biedt de hoogste maximale profit split.`,
    },
    {
      category: 'Snelheid naar Funding',
      winner: firm1.challengePhases < firm2.challengePhases ? 'firm1' : (firm2.challengePhases < firm1.challengePhases ? 'firm2' : 'tie'),
      explanation: `${firm1.name} heeft een ${firm1.challengePhases}-fase challenge${firm1.timeLimit ? ` met ${firm1.timeLimit}` : ' zonder tijdslimiet'}. ${firm2.name} heeft een ${firm2.challengePhases}-fase challenge${firm2.timeLimit ? ` met ${firm2.timeLimit}` : ' zonder tijdslimiet'}. ${firm1.challengePhases <= firm2.challengePhases ? firm1.name : firm2.name} is sneller om funded te worden.`,
    },
    {
      category: 'Platforms',
      winner: firm1.platforms.length > firm2.platforms.length ? 'firm1' : (firm2.platforms.length > firm1.platforms.length ? 'firm2' : 'tie'),
      explanation: `${firm1.name} ondersteunt ${firm1.platforms.join(', ')}. ${firm2.name} ondersteunt ${firm2.platforms.join(', ')}. ${firm1.platforms.length >= firm2.platforms.length ? firm1.name : firm2.name} biedt meer platformkeuze.`,
    },
    {
      category: 'Instrumenten',
      winner: firm1.instruments.length > firm2.instruments.length ? 'firm1' : (firm2.instruments.length > firm1.instruments.length ? 'firm2' : 'tie'),
      explanation: `${firm1.name} biedt trading in ${firm1.instruments.join(', ')}. ${firm2.name} ondersteunt ${firm2.instruments.join(', ')}. ${firm1.instruments.length >= firm2.instruments.length ? firm1.name : firm2.name} heeft een breder aanbod.`,
    },
  ]

  // Detailed analysis sections
  const detailedAnalysis: ComparisonContent['detailedAnalysis'] = [
    {
      title: 'Challenge Structuur',
      content: `De challenge structuur verschilt aanzienlijk tussen beide firms. ${firm1.name} hanteert een ${firm1.challengePhases}-fase systeem met profit targets van ${firm1.profitTarget.join('% / ')}%. De maximale dagelijkse drawdown is ${firm1.maxDailyLoss}% en de totale drawdown ${firm1.maxTotalDrawdown}%. ${firm1.timeLimit ? `Er geldt een tijdslimiet van ${firm1.timeLimit}.` : 'Er geldt geen tijdslimiet.'}

${firm2.name} werkt met een ${firm2.challengePhases}-fase challenge met targets van ${firm2.profitTarget.join('% / ')}%. De daily drawdown is ${firm2.maxDailyLoss}% met een totale drawdown van ${firm2.maxTotalDrawdown}%. ${firm2.timeLimit ? `De tijdslimiet is ${firm2.timeLimit}.` : 'Ook hier geen tijdslimiet.'}

${firm1.minTradingDays !== firm2.minTradingDays ? `Let op: ${firm1.name} vereist minimaal ${firm1.minTradingDays} handelsdagen, terwijl ${firm2.name} ${firm2.minTradingDays} dagen vereist.` : `Beide firms vereisen minimaal ${firm1.minTradingDays} handelsdagen.`}`,
    },
    {
      title: 'Payout Systeem',
      content: `Bij ${firm1.name} ontvang je ${firm1.profitSplit} van je winsten met een payout frequentie van ${firm1.payoutFrequency}. ${firm1.maxScaling ? `Scaling is mogelijk tot ${firm1.currency === 'EUR' ? '€' : '$'}${firm1.maxScaling.toLocaleString()}.` : ''}

${firm2.name} biedt ${firm2.profitSplit} profit split met ${firm2.payoutFrequency} uitbetalingen. ${firm2.maxScaling ? `Je kunt opschalen tot ${firm2.currency === 'EUR' ? '€' : '$'}${firm2.maxScaling.toLocaleString()}.` : ''}

De payout snelheid kan een doorslaggevende factor zijn. ${firm1.payoutFrequency.toLowerCase().includes('week') ? `${firm1.name} betaalt wekelijks uit, wat aantrekkelijk is voor traders die regelmatig hun winsten willen opnemen.` : ''} ${firm2.payoutFrequency.toLowerCase().includes('week') ? `${firm2.name} biedt wekelijkse payouts.` : ''}`,
    },
    {
      title: 'Voor Wie Geschikt?',
      content: `**${firm1.name}** is ideaal voor:
${firm1.instruments.includes('Futures') ? '• Futures traders die met CME-markten willen werken' : '• Forex en CFD traders'}
${firm1.challengePhases === 1 ? '• Traders die snel funded willen worden' : '• Traders die structuur en duidelijke fases waarderen'}
${firm1.profitSplitMax >= 90 ? '• Traders die een hoge profit split belangrijk vinden' : '• Traders die betrouwbaarheid belangrijker vinden dan de hoogste split'}
${firm1.isPartner ? '• Traders die een bewezen, betrouwbare prop firm zoeken' : ''}

**${firm2.name}** past beter bij:
${firm2.instruments.includes('Futures') ? '• Futures traders' : '• Forex en multi-asset traders'}
${firm2.challengePhases === 1 ? '• Traders die de kortste route naar funding willen' : '• Traders die liever in fases werken'}
${firm2.profitSplitMax >= 90 ? '• Traders die maximale winstdeling nastreven' : '• Traders die andere factoren belangrijker vinden'}
${firm2.isPartner ? '• Traders die een betrouwbare prop firm met bewezen track record zoeken' : ''}`,
    },
  ]

  // FAQs
  const faqs: ComparisonContent['faqs'] = [
    {
      question: `Wat is het grootste verschil tussen ${firm1.name} en ${firm2.name}?`,
      answer: `Het belangrijkste verschil zit in de challenge structuur en instrumenten. ${firm1.name} biedt een ${firm1.challengePhases}-fase challenge met focus op ${firm1.instruments.slice(0, 2).join(' en ')}, terwijl ${firm2.name} een ${firm2.challengePhases}-fase model hanteert gericht op ${firm2.instruments.slice(0, 2).join(' en ')}.`,
    },
    {
      question: `Welke prop firm is goedkoper: ${firm1.name} of ${firm2.name}?`,
      answer: `${(() => {
        const min1 = Math.min(...Object.values(firm1.challengePrices))
        const min2 = Math.min(...Object.values(firm2.challengePrices))
        if (min1 < min2) return `${firm1.name} is goedkoper met challenges vanaf ${firm1.currency === 'EUR' ? '€' : '$'}${min1}, vergeleken met ${firm2.currency === 'EUR' ? '€' : '$'}${min2} bij ${firm2.name}.`
        if (min2 < min1) return `${firm2.name} is goedkoper met challenges vanaf ${firm2.currency === 'EUR' ? '€' : '$'}${min2}, vergeleken met ${firm1.currency === 'EUR' ? '€' : '$'}${min1} bij ${firm1.name}.`
        return `Beide firms hebben vergelijkbare instapprijzen rond ${firm1.currency === 'EUR' ? '€' : '$'}${min1}.`
      })()}`,
    },
    {
      question: `Kan ik crypto traden bij ${firm1.name} of ${firm2.name}?`,
      answer: `${firm1.instruments.some(i => i.toLowerCase().includes('crypto')) ? `${firm1.name} ondersteunt crypto trading.` : `${firm1.name} ondersteunt geen crypto.`} ${firm2.instruments.some(i => i.toLowerCase().includes('crypto')) ? `${firm2.name} biedt wel crypto trading.` : `${firm2.name} biedt ook geen crypto.`}`,
    },
    {
      question: `Welke prop firm heeft de beste profit split?`,
      answer: `${firm1.name} biedt ${firm1.profitSplit} en ${firm2.name} biedt ${firm2.profitSplit}. ${firm1.profitSplitMax >= firm2.profitSplitMax ? `${firm1.name} heeft de hoogste maximale split van ${firm1.profitSplitMax}%.` : `${firm2.name} biedt een hogere maximale split van ${firm2.profitSplitMax}%.`}`,
    },
    {
      question: `Welke prop firm is beter voor beginners?`,
      answer: `Voor beginners adviseren we ${(() => {
        const score1 = (firm1.rating >= 4.5 ? 1 : 0) + (firm1.isPartner ? 1 : 0) + (firm1.reviewCount > 5000 ? 1 : 0)
        const score2 = (firm2.rating >= 4.5 ? 1 : 0) + (firm2.isPartner ? 1 : 0) + (firm2.reviewCount > 5000 ? 1 : 0)
        return score1 >= score2 ? firm1.name : firm2.name
      })()} vanwege de hogere betrouwbaarheid en betere klantenondersteuning.`,
    },
  ]

  // Intro
  const intro = `Ben je benieuwd of ${firm1.name} of ${firm2.name} beter bij jouw trading stijl past? In deze uitgebreide vergelijking zetten we beide prop firms naast elkaar op basis van prijs, profit split, challenge regels, platforms en meer.

${firm1.name}${firm1.foundedYear ? `, opgericht in ${firm1.foundedYear},` : ''} ${firm1.shortDescription.toLowerCase()} ${firm2.name}${firm2.foundedYear ? `, opgericht in ${firm2.foundedYear},` : ''} ${firm2.shortDescription.toLowerCase()}

Beide firms zijn beschikbaar voor Nederlandse traders en bieden legitieme funding mogelijkheden. Maar welke past het beste bij jouw situatie? Lees verder voor een gedetailleerde analyse.`

  // Quick verdict
  const quickVerdict: ComparisonContent['quickVerdict'] = {
    winner: overallWinner,
    summary: overallWinner === 'tie'
      ? `${firm1.name} en ${firm2.name} zijn beide uitstekende keuzes met elk hun eigen sterke punten. Je keuze hangt af van je persoonlijke voorkeuren.`
      : `In onze vergelijking komt ${overallWinner === 'firm1' ? firm1.name : firm2.name} als beste uit de bus voor de meeste traders. Dit betekent niet dat ${overallWinner === 'firm1' ? firm2.name : firm1.name} een slechte keuze is - de beste prop firm hangt af van jouw specifieke situatie.`,
    bestFor: {
      firm1: firm1.instruments.includes('Futures')
        ? 'Futures traders die met CME-markten willen handelen'
        : (firm1.challengePhases === 1
          ? 'Traders die snel funded willen worden'
          : 'Traders die betrouwbaarheid en structuur waarderen'),
      firm2: firm2.instruments.includes('Futures')
        ? 'Futures traders'
        : (firm2.challengePhases === 1
          ? 'Traders die de snelste route naar funding zoeken'
          : 'Traders die flexibiliteit en keuze belangrijk vinden'),
    },
  }

  // Conclusion
  const winnerName = overallWinner === 'tie' ? 'beide firms' : (overallWinner === 'firm1' ? firm1.name : firm2.name)
  const conclusion = `Na deze uitgebreide vergelijking tussen ${firm1.name} en ${firm2.name} kunnen we concluderen dat ${overallWinner === 'tie' ? 'beide uitstekende opties zijn' : `${winnerName} voor de meeste traders de betere keuze is`}.

${firm1.isPartner || firm2.isPartner ? `We kunnen ${[firm1, firm2].filter(f => f.isPartner).map(f => f.name).join(' en ')} van harte aanbevelen op basis van onze ervaring.` : ''}

Onthoud dat de "beste" prop firm afhankelijk is van jouw trading stijl, ervaring en doelen. ${firm1.instruments.includes('Futures') !== firm2.instruments.includes('Futures')
    ? 'Als je voornamelijk futures wilt traden, is de keuze duidelijk. Voor forex en CFD traders hangt het af van je prioriteiten.'
    : 'Bekijk welke factoren voor jou het belangrijkst zijn: prijs, profit split, snelheid naar funding, of platformkeuze.'}

Tip: Veel traders werken uiteindelijk met meerdere prop firms tegelijk om hun kapitaal te diversifiëren.`

  return {
    intro,
    quickVerdict,
    categoryWinners,
    detailedAnalysis,
    faqs,
    conclusion,
  }
}

// Get comparison slug (canonical format)
export function getComparisonSlug(firm1Slug: string, firm2Slug: string): string {
  const canonical = getCanonicalOrder(firm1Slug, firm2Slug)
  return `${canonical.firm1}-vs-${canonical.firm2}`
}
