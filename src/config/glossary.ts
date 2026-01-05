// Glossary/Begrippen configuratie voor Funded Trading Nederland
// Bron: Info folder content + aanvullingen voor SEO

export interface GlossaryTerm {
  term: string
  slug: string
  definition: string
  shortDefinition: string // Voor previews
  category: GlossaryCategory
  relatedTerms?: string[] // Slugs van gerelateerde termen
  seoKeywords?: string[] // Extra zoekwoorden
}

export type GlossaryCategory =
  | 'basis'           // Fundamentele begrippen
  | 'risicobeheer'    // Risk management
  | 'strategie'       // Trading strategieën
  | 'technisch'       // Technische analyse & tools
  | 'prop-trading'    // Prop firm specifiek

export const glossaryCategories: Record<GlossaryCategory, { name: string; description: string }> = {
  'basis': {
    name: 'Basis Begrippen',
    description: 'Fundamentele trading termen die elke trader moet kennen'
  },
  'risicobeheer': {
    name: 'Risicobeheer',
    description: 'Begrippen rondom risk management en kapitaalbescherming'
  },
  'strategie': {
    name: 'Trading Strategie',
    description: 'Termen over handelsstrategieën en planning'
  },
  'technisch': {
    name: 'Technische Analyse',
    description: 'Tools, platforms en technische indicatoren'
  },
  'prop-trading': {
    name: 'Prop Trading',
    description: 'Specifieke termen voor funded/proprietary trading'
  }
}

export const glossaryTerms: GlossaryTerm[] = [
  // === BASIS BEGRIPPEN ===
  {
    term: 'Funded Account',
    slug: 'funded-account',
    definition: 'Een funded account is een handelsrekening waarbij je handelt met kapitaal van een prop trading bedrijf in plaats van je eigen geld. Na het succesvol afronden van een evaluatie of challenge krijg je toegang tot dit kapitaal. Je deelt de winsten met het bedrijf, maar draagt geen risico voor verliezen. Dit maakt funded trading aantrekkelijk voor traders die hun strategie hebben bewezen maar niet over voldoende eigen kapitaal beschikken.',
    shortDefinition: 'Handelsrekening met kapitaal van een prop firm, geen eigen geld risico',
    category: 'prop-trading',
    relatedTerms: ['trading-challenge', 'prop-trading', 'handelskapitaal'],
    seoKeywords: ['wat is een funded account', 'funded account uitleg', 'funded trading account']
  },
  {
    term: 'Handelskapitaal',
    slug: 'handelskapitaal',
    definition: 'Handelskapitaal verwijst naar het bedrag dat beschikbaar is voor een trader om te handelen. Bij funded trading bedrijven zoals FTMO en Apex Trader Funding krijgen traders toegang tot significant handelskapitaal - vaak tussen €10.000 en €200.000 of meer. Dit vergroot je winstpotentieel aanzienlijk zonder dat je zelf grote bedragen hoeft te investeren.',
    shortDefinition: 'Het bedrag dat beschikbaar is om mee te handelen',
    category: 'basis',
    relatedTerms: ['funded-account', 'kapitaaltoewijzing']
  },
  {
    term: 'Leveraged Trading',
    slug: 'leveraged-trading',
    definition: 'Leveraged trading (hefboomhandel) maakt het mogelijk om met meer kapitaal te handelen dan je eigenlijk bezit. Een hefboom van 1:10 betekent dat je met €1.000 eigen inleg een positie van €10.000 kunt openen. Dit kan winsten vergroten, maar ook de verliezen. Daarom is goed risicobeheer essentieel bij het gebruik van leverage.',
    shortDefinition: 'Handelen met meer kapitaal dan je bezit via een hefboom',
    category: 'basis',
    relatedTerms: ['risicobeheer', 'drawdown'],
    seoKeywords: ['hefboom trading', 'leverage uitleg', 'hefboomhandel']
  },
  {
    term: 'Financieel Instrument',
    slug: 'financieel-instrument',
    definition: 'Een financieel instrument is elk type verhandelbaar financieel product zoals valutaparen (forex), aandelen, indices, grondstoffen, of derivaten zoals futures en opties. Funded trading bedrijven bieden toegang tot een divers scala aan instrumenten, waardoor traders kunnen diversifiëren en verschillende markten kunnen verkennen.',
    shortDefinition: 'Verhandelbaar financieel product zoals forex, aandelen of futures',
    category: 'basis',
    relatedTerms: ['handelsplatform']
  },

  // === RISICOBEHEER ===
  {
    term: 'Risicobeheer',
    slug: 'risicobeheer',
    definition: 'Risicobeheer (risk management) is cruciaal in trading en gaat over het beheren van financiële risico\'s om verliezen te minimaliseren. Dit omvat het instellen van stop-losses, het bepalen van positiegroottes, en het niet meer riskeren dan een bepaald percentage per trade. Prop firms stellen strikte regels en limieten om traders te helpen hun risico\'s effectief te beheren.',
    shortDefinition: 'Het beheren van financiële risico\'s om verliezen te beperken',
    category: 'risicobeheer',
    relatedTerms: ['drawdown', 'handelslimieten', 'kapitaaltoewijzing'],
    seoKeywords: ['risk management trading', 'risico beperken trading']
  },
  {
    term: 'Drawdown',
    slug: 'drawdown',
    definition: 'Drawdown meet de daling van je accountwaarde vanaf een piek tot een dal, uitgedrukt als percentage. Als je account van €10.000 naar €9.000 daalt, is je drawdown 10%. Bij prop firms zijn er meestal maximale drawdown limieten (bijvoorbeeld 5% dagelijks, 10% totaal). Het overschrijden van deze limieten betekent vaak dat je de challenge of het funded account verliest.',
    shortDefinition: 'De daling van accountwaarde van piek naar dal',
    category: 'risicobeheer',
    relatedTerms: ['risicobeheer', 'handelslimieten', 'trading-challenge'],
    seoKeywords: ['drawdown betekenis', 'max drawdown', 'drawdown berekenen']
  },
  {
    term: 'Handelslimieten',
    slug: 'handelslimieten',
    definition: 'Handelslimieten zijn restricties op het bedrag dat je kunt verhandelen of verliezen. Bij funded trading zijn er vaak dagelijkse verlieslimieten en maximale drawdown regels. Deze limieten zijn een belangrijk aspect van risicobeheer en helpen traders om niet in één slechte dag of week hun hele account te verliezen.',
    shortDefinition: 'Restricties op handelsvolume en maximale verliezen',
    category: 'risicobeheer',
    relatedTerms: ['drawdown', 'risicobeheer']
  },
  {
    term: 'Kapitaaltoewijzing',
    slug: 'kapitaaltoewijzing',
    definition: 'Kapitaaltoewijzing verwijst naar het verdelen van je handelskapitaal over verschillende trades of strategieën om risico\'s te spreiden. Een veelgebruikte regel is om niet meer dan 1-2% van je kapitaal per trade te riskeren. Dit zorgt ervoor dat zelfs een reeks verliezende trades je account niet fataal raakt.',
    shortDefinition: 'Het verdelen van kapitaal over trades om risico te spreiden',
    category: 'risicobeheer',
    relatedTerms: ['risicobeheer', 'handelskapitaal']
  },
  {
    term: 'Volatility Management',
    slug: 'volatility-management',
    definition: 'Volatility management gaat over het beheren van je posities en risico tijdens periodes van hoge of lage marktvolatiliteit. In volatiele markten kunnen prijzen snel bewegen, wat zowel kansen als risico\'s creëert. Goede traders passen hun positiegroottes en strategieën aan op basis van de huidige marktomstandigheden.',
    shortDefinition: 'Het aanpassen van je strategie aan marktvolatiliteit',
    category: 'risicobeheer',
    relatedTerms: ['risicobeheer', 'handelsstrategie']
  },

  // === STRATEGIE ===
  {
    term: 'Handelsstrategie',
    slug: 'handelsstrategie',
    definition: 'Een handelsstrategie is een systematische methode om handelsbeslissingen te nemen. Dit omvat je entry- en exit-criteria, risicomanagement regels, en welke markten of timeframes je handelt. Het is essentieel om een robuuste strategie te ontwikkelen die past bij je persoonlijkheid en doelen, en deze grondig te testen voordat je live gaat.',
    shortDefinition: 'Systematische methode voor het nemen van handelsbeslissingen',
    category: 'strategie',
    relatedTerms: ['trading-plan', 'backtesting', 'marktanalyse']
  },
  {
    term: 'Trading Plan',
    slug: 'trading-plan',
    definition: 'Een trading plan is een gedetailleerd document met je complete handelsstrategie, doelen, risicobeheer regels, en dagelijkse routine. Het beschrijft precies wanneer je trades opent en sluit, hoeveel je riskeert, en hoe je omgaat met verschillende marktscenario\'s. Een goed trading plan is essentieel voor consistentie en emotieloze besluitvorming.',
    shortDefinition: 'Gedetailleerd document met strategie, doelen en regels',
    category: 'strategie',
    relatedTerms: ['handelsstrategie', 'risicobeheer'],
    seoKeywords: ['trading plan maken', 'handelsplan opstellen']
  },
  {
    term: 'Profit Target',
    slug: 'profit-target',
    definition: 'Een profit target is het winstdoel dat een trader zich stelt voor een trade of een bepaalde periode. Bij funded trading challenges moet je vaak een specifiek profit target halen (bijvoorbeeld 8-10% winst) om te slagen en toegang te krijgen tot een funded account. Het is belangrijk om realistische targets te stellen die passen bij je strategie.',
    shortDefinition: 'Het winstdoel voor een trade of challenge',
    category: 'strategie',
    relatedTerms: ['trading-challenge', 'handelsstrategie']
  },
  {
    term: 'Marktanalyse',
    slug: 'marktanalyse',
    definition: 'Marktanalyse omvat het onderzoeken van financiële markten om handelsbeslissingen te maken. Er zijn twee hoofdvormen: fundamentele analyse (economische data, nieuws) en technische analyse (prijsgrafieken, indicators). De meeste succesvolle traders combineren beide methoden om een compleet beeld te krijgen.',
    shortDefinition: 'Het onderzoeken van markten voor handelsbeslissingen',
    category: 'strategie',
    relatedTerms: ['trading-indicator', 'handelsstrategie']
  },
  {
    term: 'Portfoliomanagement',
    slug: 'portfoliomanagement',
    definition: 'Portfoliomanagement betreft het beheren van een verzameling trades en posities. Dit omvat diversificatie over verschillende instrumenten, het balanceren van risico en rendement, en het regelmatig evalueren van je prestaties. Goed portfoliomanagement is essentieel voor lange-termijn succes in trading.',
    shortDefinition: 'Het beheren van een verzameling trades en posities',
    category: 'strategie',
    relatedTerms: ['kapitaaltoewijzing', 'risicobeheer']
  },

  // === TECHNISCH ===
  {
    term: 'Handelsplatform',
    slug: 'handelsplatform',
    definition: 'Een handelsplatform is software waarmee traders financiële instrumenten kunnen analyseren, kopen en verkopen. Populaire platforms zijn MetaTrader 4/5, TradingView, en NinjaTrader. FTMO en andere prop firms bieden toegang tot professionele handelsplatformen met geavanceerde charting tools en snelle orderuitvoering.',
    shortDefinition: 'Software om financiële instrumenten te verhandelen',
    category: 'technisch',
    relatedTerms: ['trading-indicator', 'handelsalgoritme'],
    seoKeywords: ['beste trading platform', 'handelsplatform kiezen']
  },
  {
    term: 'Trading Indicator',
    slug: 'trading-indicator',
    definition: 'Een trading indicator is een wiskundige berekening gebaseerd op prijs en/of volume die helpt bij het analyseren van markttrends. Voorbeelden zijn Moving Averages, RSI, MACD, en Bollinger Bands. Indicators zijn cruciaal voor technische analyse, maar moeten altijd in combinatie met andere factoren worden gebruikt.',
    shortDefinition: 'Wiskundige tool voor het analyseren van markttrends',
    category: 'technisch',
    relatedTerms: ['marktanalyse', 'handelsplatform'],
    seoKeywords: ['trading indicators uitleg', 'beste indicators']
  },
  {
    term: 'Handelsalgoritme',
    slug: 'handelsalgoritme',
    definition: 'Een handelsalgoritme (ook wel trading bot of EA - Expert Advisor) is een set van geprogrammeerde regels die automatisch handelsbeslissingen neemt en uitvoert. Dit kan efficiëntie en consistentie verbeteren door emoties uit het handelsproces te halen. Let op: niet alle prop firms staan geautomatiseerd handelen toe.',
    shortDefinition: 'Geprogrammeerde regels voor automatisch handelen',
    category: 'technisch',
    relatedTerms: ['handelsstrategie', 'backtesting'],
    seoKeywords: ['trading bot', 'expert advisor', 'automatisch traden']
  },
  {
    term: 'Backtesting',
    slug: 'backtesting',
    definition: 'Backtesting is het testen van een handelsstrategie op historische data om te zien hoe deze in het verleden zou hebben gepresteerd. Dit is cruciaal om de effectiviteit van een strategie te beoordelen voordat je er echt geld mee riskeert. Goede backtesting houdt rekening met transactiekosten, slippage, en verschillende marktomstandigheden.',
    shortDefinition: 'Het testen van een strategie op historische data',
    category: 'technisch',
    relatedTerms: ['handelsstrategie', 'trading-simulatie']
  },
  {
    term: 'Trading Simulatie',
    slug: 'trading-simulatie',
    definition: 'Trading simulatie (ook wel paper trading of demo trading) is een oefenomgeving waar je kunt handelen zonder echt geld te riskeren. Dit is perfect voor het testen van nieuwe strategieën, het wennen aan een handelsplatform, of het oefenen voor een prop firm challenge. De meeste prop firms bieden demo accounts aan.',
    shortDefinition: 'Oefenomgeving voor handelen zonder echt geld',
    category: 'technisch',
    relatedTerms: ['backtesting', 'handelsplatform'],
    seoKeywords: ['demo trading', 'paper trading', 'oefenaccount']
  },

  // === PROP TRADING ===
  {
    term: 'Proprietary Trading',
    slug: 'prop-trading',
    definition: 'Proprietary trading (prop trading) verwijst naar het handelen met het kapitaal van een bedrijf in plaats van met klantengeld of je eigen geld. Prop firms zoals FTMO en Apex Trader Funding bieden traders de mogelijkheid om te handelen met hun kapitaal na het slagen voor een evaluatie. De trader deelt de winsten met het bedrijf maar draagt geen persoonlijk risico voor verliezen.',
    shortDefinition: 'Handelen met kapitaal van een bedrijf, niet eigen geld',
    category: 'prop-trading',
    relatedTerms: ['funded-account', 'trading-challenge', 'winstverdeling'],
    seoKeywords: ['prop trading uitleg', 'proprietary trading nederland', 'prop firm']
  },
  {
    term: 'Trading Challenge',
    slug: 'trading-challenge',
    definition: 'Een trading challenge is een evaluatietest die prop trading bedrijven gebruiken om de vaardigheden en discipline van traders te beoordelen. Je handelt op een demo account en moet bepaalde doelen halen (profit target) terwijl je binnen de risico limieten blijft (max drawdown). Slagen voor deze challenge geeft toegang tot een funded account met echt kapitaal.',
    shortDefinition: 'Evaluatietest om toegang te krijgen tot funded kapitaal',
    category: 'prop-trading',
    relatedTerms: ['funded-account', 'profit-target', 'drawdown'],
    seoKeywords: ['ftmo challenge', 'prop firm challenge', 'trading challenge halen']
  },
  {
    term: 'Winstverdeling',
    slug: 'winstverdeling',
    definition: 'Winstverdeling (profit split) verwijst naar de afspraak tussen de trader en het prop trading bedrijf over hoe winsten worden verdeeld. Bij de meeste firms houden traders 70-90% van de winsten, terwijl de rest naar het bedrijf gaat. Sommige firms zoals Apex bieden zelfs 100% van de eerste winsten tot een bepaald bedrag.',
    shortDefinition: 'De verdeling van winsten tussen trader en prop firm',
    category: 'prop-trading',
    relatedTerms: ['performance-fee', 'funded-account'],
    seoKeywords: ['profit split', 'winstverdeling prop firm']
  },
  {
    term: 'Performance Fee',
    slug: 'performance-fee',
    definition: 'Een performance fee is het percentage van je winst dat naar de prop trading firm gaat. Als je profit split 80/20 is, is de performance fee effectief 20%. Dit is het verdienmodel van prop firms - ze verdienen alleen als jij succesvol bent, wat hun belangen aligneert met die van de trader.',
    shortDefinition: 'Het percentage winst dat naar de prop firm gaat',
    category: 'prop-trading',
    relatedTerms: ['winstverdeling', 'funded-account']
  },
  {
    term: 'Handelsaccount',
    slug: 'handelsaccount',
    definition: 'Een handelsaccount is de rekening waar je trades worden uitgevoerd. Bij funded trading bedrijven krijg je eerst een demo/evaluatie account om je vaardigheden te bewijzen. Na het slagen voor de challenge krijg je een funded account met echt kapitaal van het bedrijf.',
    shortDefinition: 'De rekening waar je trades worden uitgevoerd',
    category: 'prop-trading',
    relatedTerms: ['funded-account', 'trading-challenge']
  },
  {
    term: 'Handelsovereenkomst',
    slug: 'handelsovereenkomst',
    definition: 'Een handelsovereenkomst is het contract tussen jou en het prop trading bedrijf. Dit bevat alle voorwaarden, regels, winstverdeling afspraken, en wat er gebeurt bij overtreding van de regels. Het is essentieel om deze overeenkomst goed door te lezen voordat je begint met een prop firm.',
    shortDefinition: 'Contract met voorwaarden tussen trader en prop firm',
    category: 'prop-trading',
    relatedTerms: ['winstverdeling', 'handelslimieten']
  },
  {
    term: 'Trading Mentor',
    slug: 'trading-mentor',
    definition: 'Een trading mentor is een ervaren trader die begeleiding en advies biedt aan minder ervaren traders. Een goede mentor kan je helpen fouten te vermijden, je strategie te verbeteren, en de psychologische aspecten van trading te beheersen. Sommige prop firms bieden mentorship programma\'s aan als onderdeel van hun service.',
    shortDefinition: 'Ervaren trader die begeleiding en advies biedt',
    category: 'prop-trading',
    relatedTerms: ['handelsstrategie', 'trading-plan']
  },
]

// Helper functies
export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find(term => term.slug === slug)
}

export function getTermsByCategory(category: GlossaryCategory): GlossaryTerm[] {
  return glossaryTerms.filter(term => term.category === category)
}

export function getAllCategories(): GlossaryCategory[] {
  return Object.keys(glossaryCategories) as GlossaryCategory[]
}

export function searchTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase()
  return glossaryTerms.filter(term =>
    term.term.toLowerCase().includes(lowerQuery) ||
    term.definition.toLowerCase().includes(lowerQuery) ||
    term.seoKeywords?.some(kw => kw.toLowerCase().includes(lowerQuery))
  )
}

export function getRelatedTerms(term: GlossaryTerm): GlossaryTerm[] {
  if (!term.relatedTerms) return []
  return term.relatedTerms
    .map(slug => getTermBySlug(slug))
    .filter((t): t is GlossaryTerm => t !== undefined)
}

// Sorteer alfabetisch
export function getAlphabeticalTerms(): GlossaryTerm[] {
  return [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term, 'nl'))
}

// Get letters die termen hebben
export function getAvailableLetters(): string[] {
  const letters = new Set(glossaryTerms.map(term => term.term[0].toUpperCase()))
  return Array.from(letters).sort()
}

// Get termen per letter
export function getTermsByLetter(letter: string): GlossaryTerm[] {
  return glossaryTerms
    .filter(term => term.term[0].toUpperCase() === letter.toUpperCase())
    .sort((a, b) => a.term.localeCompare(b.term, 'nl'))
}
