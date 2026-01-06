// Glossary/Begrippen configuratie voor Daytraden Financiering
// Trading termen en begrippen uitgelegd

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
  | "basis" // Fundamentele begrippen
  | "risicobeheer" // Risk management
  | "strategie" // Trading strategieën
  | "technisch" // Technische analyse & tools
  | "prop-trading" // Funded trading specifiek

export const glossaryCategories: Record<
  GlossaryCategory,
  { name: string; description: string }
> = {
  basis: {
    name: "Basis Begrippen",
    description: "Fundamentele trading termen die elke trader moet kennen",
  },
  risicobeheer: {
    name: "Risicobeheer",
    description: "Begrippen rondom risk management en kapitaalbescherming",
  },
  strategie: {
    name: "Trading Strategie",
    description: "Termen over handelsstrategieën en planning",
  },
  technisch: {
    name: "Technische Analyse",
    description: "Tools, platforms en technische indicatoren",
  },
  "prop-trading": {
    name: "Funded Trading",
    description: "Specifieke termen voor funded trading en trading financiering",
  },
}

export const glossaryTerms: GlossaryTerm[] = [
  // === BASIS BEGRIPPEN ===
  {
    term: "Funded Account",
    slug: "funded-account",
    definition:
      "Een funded account is een handelsrekening waarbij je handelt met kapitaal van een financier in plaats van je eigen geld. Na het succesvol afronden van een evaluatie of challenge krijg je toegang tot dit kapitaal. Je deelt de winsten met het bedrijf, maar draagt geen risico voor verliezen. Dit maakt funded trading aantrekkelijk voor traders die hun strategie hebben bewezen maar niet over voldoende eigen kapitaal beschikken.",
    shortDefinition:
      "Handelsrekening met kapitaal van een financier, geen eigen geld risico",
    category: "prop-trading",
    relatedTerms: ["trading-challenge", "prop-trading", "handelskapitaal"],
    seoKeywords: [
      "wat is een funded account",
      "funded account uitleg",
      "funded trading account",
    ],
  },
  {
    term: "Handelskapitaal",
    slug: "handelskapitaal",
    definition:
      "Handelskapitaal verwijst naar het bedrag dat beschikbaar is voor een trader om te handelen. Bij funded trading financiers krijgen traders toegang tot significant handelskapitaal - vaak tussen €10.000 en €200.000 of meer. Dit vergroot je winstpotentieel aanzienlijk zonder dat je zelf grote bedragen hoeft te investeren.",
    shortDefinition: "Het bedrag dat beschikbaar is om mee te handelen",
    category: "basis",
    relatedTerms: ["funded-account", "kapitaaltoewijzing"],
  },
  {
    term: "Leveraged Trading",
    slug: "leveraged-trading",
    definition:
      "Leveraged trading (hefboomhandel) maakt het mogelijk om met meer kapitaal te handelen dan je eigenlijk bezit. Een hefboom van 1:10 betekent dat je met €1.000 eigen inleg een positie van €10.000 kunt openen. Dit kan winsten vergroten, maar ook de verliezen. Daarom is goed risicobeheer essentieel bij het gebruik van leverage.",
    shortDefinition:
      "Handelen met meer kapitaal dan je bezit via een hefboom",
    category: "basis",
    relatedTerms: ["risicobeheer", "drawdown"],
    seoKeywords: ["hefboom trading", "leverage uitleg", "hefboomhandel"],
  },
  {
    term: "Financieel Instrument",
    slug: "financieel-instrument",
    definition:
      "Een financieel instrument is elk type verhandelbaar financieel product zoals valutaparen (forex), aandelen, indices, grondstoffen, of derivaten zoals futures en opties. Funded trading aanbieders bieden toegang tot een divers scala aan instrumenten, waardoor traders kunnen diversifiëren en verschillende markten kunnen verkennen.",
    shortDefinition:
      "Verhandelbaar financieel product zoals forex, aandelen of futures",
    category: "basis",
    relatedTerms: ["handelsplatform"],
  },
  {
    term: "Pip",
    slug: "pip",
    definition:
      "Een pip (Percentage in Point) is de kleinste prijsbeweging in een valutapaar. Voor de meeste forex paren is dit de vierde decimaal (0.0001). Als EUR/USD stijgt van 1.1000 naar 1.1001, is dat een stijging van 1 pip. Bij JPY paren is een pip de tweede decimaal. De waarde van een pip hangt af van je positiegrootte.",
    shortDefinition: "Kleinste prijsbeweging in een valutapaar",
    category: "basis",
    relatedTerms: ["leveraged-trading", "financieel-instrument"],
    seoKeywords: ["pip betekenis", "pip waarde berekenen", "wat is een pip"],
  },
  {
    term: "Lot Size",
    slug: "lot-size",
    definition:
      "Lot size is de standaard eenheid voor het meten van positiegroottes in forex trading. Een standaard lot is 100.000 eenheden van de basisvaluta. Er zijn ook mini lots (10.000), micro lots (1.000) en nano lots (100). Je lot size bepaalt hoeveel elke pip waard is en dus je potentiële winst of verlies per trade.",
    shortDefinition: "Standaard eenheid voor positiegroottes in forex",
    category: "basis",
    relatedTerms: ["pip", "leveraged-trading"],
    seoKeywords: ["lot size forex", "lot grootte", "mini lot"],
  },

  // === RISICOBEHEER ===
  {
    term: "Risicobeheer",
    slug: "risicobeheer",
    definition:
      "Risicobeheer (risk management) is cruciaal in trading en gaat over het beheren van financiële risico's om verliezen te minimaliseren. Dit omvat het instellen van stop-losses, het bepalen van positiegroottes, en het niet meer riskeren dan een bepaald percentage per trade. Financiers stellen strikte regels en limieten om traders te helpen hun risico's effectief te beheren.",
    shortDefinition:
      "Het beheren van financiële risico's om verliezen te beperken",
    category: "risicobeheer",
    relatedTerms: ["drawdown", "handelslimieten", "kapitaaltoewijzing"],
    seoKeywords: ["risk management trading", "risico beperken trading"],
  },
  {
    term: "Drawdown",
    slug: "drawdown",
    definition:
      "Drawdown meet de daling van je accountwaarde vanaf een piek tot een dal, uitgedrukt als percentage. Als je account van €10.000 naar €9.000 daalt, is je drawdown 10%. Bij funded trading zijn er meestal maximale drawdown limieten (bijvoorbeeld 5% dagelijks, 10% totaal). Het overschrijden van deze limieten betekent vaak dat je de challenge of het funded account verliest.",
    shortDefinition: "De daling van accountwaarde van piek naar dal",
    category: "risicobeheer",
    relatedTerms: ["risicobeheer", "handelslimieten", "trading-challenge"],
    seoKeywords: ["drawdown betekenis", "max drawdown", "drawdown berekenen"],
  },
  {
    term: "Daily Drawdown",
    slug: "daily-drawdown",
    definition:
      "Daily drawdown is de maximale verlies die je op één handelsdag mag maken, uitgedrukt als percentage van je startkapitaal of dagelijkse balans. Dit is een belangrijke regel bij funded trading, meestal rond de 5%. Als je deze limiet overschrijdt, verlies je vaak direct je account, ongeacht je totale performance.",
    shortDefinition: "Maximaal toegestaan verlies op één dag",
    category: "risicobeheer",
    relatedTerms: ["drawdown", "handelslimieten"],
    seoKeywords: [
      "daily drawdown betekenis",
      "dagelijks verlies limiet",
    ],
  },
  {
    term: "Handelslimieten",
    slug: "handelslimieten",
    definition:
      "Handelslimieten zijn restricties op het bedrag dat je kunt verhandelen of verliezen. Bij funded trading zijn er vaak dagelijkse verlieslimieten en maximale drawdown regels. Deze limieten zijn een belangrijk aspect van risicobeheer en helpen traders om niet in één slechte dag of week hun hele account te verliezen.",
    shortDefinition: "Restricties op handelsvolume en maximale verliezen",
    category: "risicobeheer",
    relatedTerms: ["drawdown", "risicobeheer"],
  },
  {
    term: "Kapitaaltoewijzing",
    slug: "kapitaaltoewijzing",
    definition:
      "Kapitaaltoewijzing verwijst naar het verdelen van je handelskapitaal over verschillende trades of strategieën om risico's te spreiden. Een veelgebruikte regel is om niet meer dan 1-2% van je kapitaal per trade te riskeren. Dit zorgt ervoor dat zelfs een reeks verliezende trades je account niet fataal raakt.",
    shortDefinition: "Het verdelen van kapitaal over trades om risico te spreiden",
    category: "risicobeheer",
    relatedTerms: ["risicobeheer", "handelskapitaal"],
  },
  {
    term: "Stop Loss",
    slug: "stop-loss",
    definition:
      "Een stop loss is een order die automatisch je positie sluit wanneer de prijs een bepaald niveau bereikt, om je verlies te beperken. Het instellen van stop losses is fundamenteel voor risicobeheer. Als je bijvoorbeeld koopt op €100 en je stop loss op €95 zet, wordt je positie automatisch gesloten als de prijs naar €95 daalt.",
    shortDefinition: "Order die automatisch verlies beperkt bij bepaalde prijs",
    category: "risicobeheer",
    relatedTerms: ["risicobeheer", "take-profit"],
    seoKeywords: ["stop loss instellen", "stop loss betekenis"],
  },
  {
    term: "Take Profit",
    slug: "take-profit",
    definition:
      "Een take profit is een order die automatisch je positie sluit wanneer de prijs een bepaald winstniveau bereikt. Dit voorkomt dat je winst verliest door te lang vast te houden. Als je koopt op €100 en take profit zet op €110, wordt je positie automatisch gesloten met €10 winst wanneer de prijs dat niveau bereikt.",
    shortDefinition: "Order die automatisch winst veiligstelt bij bepaalde prijs",
    category: "risicobeheer",
    relatedTerms: ["stop-loss", "handelsstrategie"],
    seoKeywords: ["take profit instellen", "winst nemen"],
  },
  {
    term: "Volatility Management",
    slug: "volatility-management",
    definition:
      "Volatility management gaat over het beheren van je posities en risico tijdens periodes van hoge of lage marktvolatiliteit. In volatiele markten kunnen prijzen snel bewegen, wat zowel kansen als risico's creëert. Goede traders passen hun positiegroottes en strategieën aan op basis van de huidige marktomstandigheden.",
    shortDefinition: "Het aanpassen van je strategie aan marktvolatiliteit",
    category: "risicobeheer",
    relatedTerms: ["risicobeheer", "handelsstrategie"],
  },

  // === STRATEGIE ===
  {
    term: "Handelsstrategie",
    slug: "handelsstrategie",
    definition:
      "Een handelsstrategie is een systematische methode om handelsbeslissingen te nemen. Dit omvat je entry- en exit-criteria, risicomanagement regels, en welke markten of timeframes je handelt. Het is essentieel om een robuuste strategie te ontwikkelen die past bij je persoonlijkheid en doelen, en deze grondig te testen voordat je live gaat.",
    shortDefinition:
      "Systematische methode voor het nemen van handelsbeslissingen",
    category: "strategie",
    relatedTerms: ["trading-plan", "backtesting", "marktanalyse"],
  },
  {
    term: "Trading Plan",
    slug: "trading-plan",
    definition:
      "Een trading plan is een gedetailleerd document met je complete handelsstrategie, doelen, risicobeheer regels, en dagelijkse routine. Het beschrijft precies wanneer je trades opent en sluit, hoeveel je riskeert, en hoe je omgaat met verschillende marktscenario's. Een goed trading plan is essentieel voor consistentie en emotieloze besluitvorming.",
    shortDefinition: "Gedetailleerd document met strategie, doelen en regels",
    category: "strategie",
    relatedTerms: ["handelsstrategie", "risicobeheer"],
    seoKeywords: ["trading plan maken", "handelsplan opstellen"],
  },
  {
    term: "Profit Target",
    slug: "profit-target",
    definition:
      "Een profit target is het winstdoel dat een trader zich stelt voor een trade of een bepaalde periode. Bij funded trading challenges moet je vaak een specifiek profit target halen (bijvoorbeeld 8-10% winst) om te slagen en toegang te krijgen tot een funded account. Het is belangrijk om realistische targets te stellen die passen bij je strategie.",
    shortDefinition: "Het winstdoel voor een trade of challenge",
    category: "strategie",
    relatedTerms: ["trading-challenge", "handelsstrategie"],
  },
  {
    term: "Marktanalyse",
    slug: "marktanalyse",
    definition:
      "Marktanalyse omvat het onderzoeken van financiële markten om handelsbeslissingen te maken. Er zijn twee hoofdvormen: fundamentele analyse (economische data, nieuws) en technische analyse (prijsgrafieken, indicators). De meeste succesvolle traders combineren beide methoden om een compleet beeld te krijgen.",
    shortDefinition: "Het onderzoeken van markten voor handelsbeslissingen",
    category: "strategie",
    relatedTerms: ["trading-indicator", "handelsstrategie"],
  },
  {
    term: "Scalping",
    slug: "scalping",
    definition:
      "Scalping is een trading strategie waarbij je probeert winst te maken op zeer kleine prijsbewegingen door een groot aantal trades te maken. Scalpers houden posities meestal slechts seconden tot minuten vast. Dit vereist snelle besluitvorming, lage transactiekosten, en goede executie. Let op: niet alle financiers staan scalping toe.",
    shortDefinition: "Strategie met veel kleine trades voor kleine winsten",
    category: "strategie",
    relatedTerms: ["handelsstrategie", "daytrading"],
    seoKeywords: ["scalping strategie", "scalpen uitleg"],
  },
  {
    term: "Daytrading",
    slug: "daytrading",
    definition:
      "Daytrading is een handelsstijl waarbij alle posities binnen dezelfde handelsdag worden geopend en gesloten. Daytraders houden geen posities overnight aan, wat het risico van gaps en nieuwsgebeurtenissen buiten markturen vermijdt. Dit is een populaire stijl bij funded trading omdat het past bij de drawdown regels.",
    shortDefinition: "Handelen waarbij alle posities dezelfde dag sluiten",
    category: "strategie",
    relatedTerms: ["scalping", "swing-trading"],
    seoKeywords: ["daytrading uitleg", "daytraden beginnen"],
  },
  {
    term: "Swing Trading",
    slug: "swing-trading",
    definition:
      "Swing trading is een handelsstijl waarbij posities dagen tot weken worden aangehouden om te profiteren van prijsswings. Swing traders gebruiken vaak technische analyse om entry- en exitpunten te bepalen. Dit vereist minder schermtijd dan daytrading maar vraagt wel om geduld en goed risicobeheer voor overnight posities.",
    shortDefinition: "Posities aanhouden voor dagen tot weken",
    category: "strategie",
    relatedTerms: ["daytrading", "handelsstrategie"],
    seoKeywords: ["swing trading strategie", "swing traden"],
  },

  // === TECHNISCH ===
  {
    term: "Handelsplatform",
    slug: "handelsplatform",
    definition:
      "Een handelsplatform is software waarmee traders financiële instrumenten kunnen analyseren, kopen en verkopen. Populaire platforms zijn MetaTrader 4/5, TradingView, en NinjaTrader. Financiers bieden toegang tot professionele handelsplatformen met geavanceerde charting tools en snelle orderuitvoering.",
    shortDefinition: "Software om financiële instrumenten te verhandelen",
    category: "technisch",
    relatedTerms: ["trading-indicator", "handelsalgoritme"],
    seoKeywords: ["beste trading platform", "handelsplatform kiezen"],
  },
  {
    term: "MetaTrader",
    slug: "metatrader",
    definition:
      "MetaTrader (MT4 en MT5) is het meest gebruikte handelsplatform ter wereld, ontwikkeld door MetaQuotes. Het biedt geavanceerde charting, technische indicatoren, en de mogelijkheid om Expert Advisors (automatische trading bots) te draaien. De meeste financiers ondersteunen MetaTrader vanwege de populariteit en betrouwbaarheid.",
    shortDefinition: "Populairste trading platform, MT4 en MT5",
    category: "technisch",
    relatedTerms: ["handelsplatform", "handelsalgoritme"],
    seoKeywords: ["metatrader 4", "metatrader 5", "mt4 vs mt5"],
  },
  {
    term: "Trading Indicator",
    slug: "trading-indicator",
    definition:
      "Een trading indicator is een wiskundige berekening gebaseerd op prijs en/of volume die helpt bij het analyseren van markttrends. Voorbeelden zijn Moving Averages, RSI, MACD, en Bollinger Bands. Indicators zijn cruciaal voor technische analyse, maar moeten altijd in combinatie met andere factoren worden gebruikt.",
    shortDefinition: "Wiskundige tool voor het analyseren van markttrends",
    category: "technisch",
    relatedTerms: ["marktanalyse", "handelsplatform"],
    seoKeywords: ["trading indicators uitleg", "beste indicators"],
  },
  {
    term: "Handelsalgoritme",
    slug: "handelsalgoritme",
    definition:
      "Een handelsalgoritme (ook wel trading bot of EA - Expert Advisor) is een set van geprogrammeerde regels die automatisch handelsbeslissingen neemt en uitvoert. Dit kan efficiëntie en consistentie verbeteren door emoties uit het handelsproces te halen. Let op: niet alle financiers staan geautomatiseerd handelen toe.",
    shortDefinition: "Geprogrammeerde regels voor automatisch handelen",
    category: "technisch",
    relatedTerms: ["handelsstrategie", "backtesting"],
    seoKeywords: ["trading bot", "expert advisor", "automatisch traden"],
  },
  {
    term: "Backtesting",
    slug: "backtesting",
    definition:
      "Backtesting is het testen van een handelsstrategie op historische data om te zien hoe deze in het verleden zou hebben gepresteerd. Dit is cruciaal om de effectiviteit van een strategie te beoordelen voordat je er echt geld mee riskeert. Goede backtesting houdt rekening met transactiekosten, slippage, en verschillende marktomstandigheden.",
    shortDefinition: "Het testen van een strategie op historische data",
    category: "technisch",
    relatedTerms: ["handelsstrategie", "trading-simulatie"],
  },
  {
    term: "Trading Simulatie",
    slug: "trading-simulatie",
    definition:
      "Trading simulatie (ook wel paper trading of demo trading) is een oefenomgeving waar je kunt handelen zonder echt geld te riskeren. Dit is perfect voor het testen van nieuwe strategieën, het wennen aan een handelsplatform, of het oefenen voor een trading challenge. De meeste financiers bieden demo accounts aan.",
    shortDefinition: "Oefenomgeving voor handelen zonder echt geld",
    category: "technisch",
    relatedTerms: ["backtesting", "handelsplatform"],
    seoKeywords: ["demo trading", "paper trading", "oefenaccount"],
  },

  // === FUNDED TRADING ===
  {
    term: "Funded Trading",
    slug: "prop-trading",
    definition:
      "Funded trading verwijst naar het handelen met het kapitaal van een financier in plaats van met je eigen geld. Aanbieders van trading kapitaal bieden traders de mogelijkheid om te handelen met hun kapitaal na het slagen voor een evaluatie. De trader deelt de winsten met het bedrijf maar draagt geen persoonlijk risico voor verliezen.",
    shortDefinition: "Handelen met kapitaal van een financier, niet eigen geld",
    category: "prop-trading",
    relatedTerms: ["funded-account", "trading-challenge", "winstverdeling"],
    seoKeywords: [
      "funded trading uitleg",
      "trading financiering nederland",
      "funded trader worden",
    ],
  },
  {
    term: "Trading Challenge",
    slug: "trading-challenge",
    definition:
      "Een trading challenge is een evaluatietest die financiers gebruiken om de vaardigheden en discipline van traders te beoordelen. Je handelt op een demo account en moet bepaalde doelen halen (profit target) terwijl je binnen de risico limieten blijft (max drawdown). Slagen voor deze challenge geeft toegang tot een funded account met echt kapitaal.",
    shortDefinition: "Evaluatietest om toegang te krijgen tot funded kapitaal",
    category: "prop-trading",
    relatedTerms: ["funded-account", "profit-target", "drawdown"],
    seoKeywords: [
      "trading challenge",
      "trading challenge halen",
      "evaluatie funded trading",
    ],
  },
  {
    term: "Winstverdeling",
    slug: "winstverdeling",
    definition:
      "Winstverdeling (profit split) verwijst naar de afspraak tussen de trader en de financier over hoe winsten worden verdeeld. Bij de meeste aanbieders houden traders 70-90% van de winsten, terwijl de rest naar het bedrijf gaat. Sommige aanbieders bieden zelfs 100% van de eerste winsten tot een bepaald bedrag.",
    shortDefinition: "De verdeling van winsten tussen trader en financier",
    category: "prop-trading",
    relatedTerms: ["performance-fee", "funded-account"],
    seoKeywords: ["profit split", "winstverdeling funded trading"],
  },
  {
    term: "Performance Fee",
    slug: "performance-fee",
    definition:
      "Een performance fee is het percentage van je winst dat naar de financier gaat. Als je profit split 80/20 is, is de performance fee effectief 20%. Dit is het verdienmodel van financiers - ze verdienen alleen als jij succesvol bent, wat hun belangen aligneert met die van de trader.",
    shortDefinition: "Het percentage winst dat naar de financier gaat",
    category: "prop-trading",
    relatedTerms: ["winstverdeling", "funded-account"],
  },
  {
    term: "Challenge Fee",
    slug: "challenge-fee",
    definition:
      "De challenge fee is het bedrag dat je betaalt om deel te nemen aan een trading evaluatie. Dit is meestal een eenmalige betaling die varieert van €89 tot €995 afhankelijk van de accountgrootte. Bij sommige aanbieders krijg je de fee terug na je eerste succesvolle uitbetaling als funded trader.",
    shortDefinition: "Eenmalige betaling om aan een challenge deel te nemen",
    category: "prop-trading",
    relatedTerms: ["trading-challenge", "funded-account"],
    seoKeywords: ["challenge kosten", "trading challenge fee"],
  },
  {
    term: "Payout",
    slug: "payout",
    definition:
      "Een payout is de uitbetaling van je winst als funded trader. De frequentie varieert per financier - sommige bieden wekelijkse payouts, andere tweewekelijks of maandelijks. Het uitbetalingsproces is meestal eenvoudig en kan via bankoverschrijving of crypto plaatsvinden.",
    shortDefinition: "Uitbetaling van je winst als funded trader",
    category: "prop-trading",
    relatedTerms: ["winstverdeling", "funded-account"],
    seoKeywords: ["payout funded trading", "uitbetaling trading"],
  },
  {
    term: "Scaling Plan",
    slug: "scaling-plan",
    definition:
      "Een scaling plan is een programma waarbij financiers je accountgrootte verhogen naarmate je consistent winstgevend bent. Na een bepaalde periode van succes (bijvoorbeeld 3 maanden consistent positief) kan je account worden geschaald van €50.000 naar €100.000 of meer. Dit beloont goede prestaties en vergroot je winstpotentieel.",
    shortDefinition: "Programma om je accountgrootte te verhogen bij succes",
    category: "prop-trading",
    relatedTerms: ["funded-account", "handelskapitaal"],
    seoKeywords: ["scaling plan funded trading", "account verhogen"],
  },
  {
    term: "Handelsaccount",
    slug: "handelsaccount",
    definition:
      "Een handelsaccount is de rekening waar je trades worden uitgevoerd. Bij funded trading aanbieders krijg je eerst een demo/evaluatie account om je vaardigheden te bewijzen. Na het slagen voor de challenge krijg je een funded account met echt kapitaal van de financier.",
    shortDefinition: "De rekening waar je trades worden uitgevoerd",
    category: "prop-trading",
    relatedTerms: ["funded-account", "trading-challenge"],
  },
  {
    term: "Trading Regels",
    slug: "trading-regels",
    definition:
      "Trading regels zijn de voorwaarden die financiers stellen aan hun traders. Dit omvat typisch: maximale daily drawdown (5%), maximale totale drawdown (10%), profit target tijdens de challenge (8-10%), en minimum aantal trading dagen. Het niet naleven van deze regels kan leiden tot verlies van je account.",
    shortDefinition: "Voorwaarden en limieten van de financier",
    category: "prop-trading",
    relatedTerms: ["drawdown", "handelslimieten", "trading-challenge"],
    seoKeywords: ["trading regels funded", "trading voorwaarden"],
  },
]

// Helper functies
export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((term) => term.slug === slug)
}

export function getTermsByCategory(category: GlossaryCategory): GlossaryTerm[] {
  return glossaryTerms.filter((term) => term.category === category)
}

export function getAllCategories(): GlossaryCategory[] {
  return Object.keys(glossaryCategories) as GlossaryCategory[]
}

export function searchTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase()
  return glossaryTerms.filter(
    (term) =>
      term.term.toLowerCase().includes(lowerQuery) ||
      term.definition.toLowerCase().includes(lowerQuery) ||
      term.seoKeywords?.some((kw) => kw.toLowerCase().includes(lowerQuery))
  )
}

export function getRelatedTerms(term: GlossaryTerm): GlossaryTerm[] {
  if (!term.relatedTerms) return []
  return term.relatedTerms
    .map((slug) => getTermBySlug(slug))
    .filter((t): t is GlossaryTerm => t !== undefined)
}

// Sorteer alfabetisch
export function getAlphabeticalTerms(): GlossaryTerm[] {
  return [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term, "nl"))
}

// Get letters die termen hebben
export function getAvailableLetters(): string[] {
  const letters = new Set(
    glossaryTerms.map((term) => term.term[0].toUpperCase())
  )
  return Array.from(letters).sort()
}

// Get termen per letter
export function getTermsByLetter(letter: string): GlossaryTerm[] {
  return glossaryTerms
    .filter((term) => term.term[0].toUpperCase() === letter.toUpperCase())
    .sort((a, b) => a.term.localeCompare(b.term, "nl"))
}
