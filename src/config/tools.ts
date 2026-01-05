/**
 * Tools Configuration
 * Complete metadata for all trading tools
 */

export interface ToolTip {
  title: string
  description: string
}

export interface ToolFAQ {
  question: string
  answer: string
}

export interface Tool {
  id: string
  slug: string
  name: string
  shortName: string
  description: string
  shortDescription: string
  category: "calculator" | "vergelijker" | "quiz" | "referentie" | "planning"
  subcategory: "basis" | "prop-firm" | "risk" | "tijd" | "belasting" | "educatie"
  icon: string
  color: "primary" | "secondary" | "accent"
  isActive: boolean
  isPriority: boolean

  // SEO
  seoTitle: string
  seoDescription: string
  seoKeywords: string[]

  // Content
  whatIsIt: string // "Wat is [tool]?" sectie
  whyImportant: string // "Waarom is dit belangrijk?" sectie
  howToUse: string[] // Stappen voor gebruik
  tips: ToolTip[]
  faqs: ToolFAQ[]

  // Related
  relatedTools: string[] // slugs
  relatedFirms: string[] // slugs
  relatedCategories: string[] // slugs

  // Schema
  schemaType: "WebApplication" | "SoftwareApplication"
  applicationCategory: "FinanceApplication" | "UtilitiesApplication"
}

export const tools: Tool[] = [
  // ============================================
  // BASIS CALCULATORS
  // ============================================
  {
    id: "position-size",
    slug: "position-size-calculator",
    name: "Position Size Calculator",
    shortName: "Position Size",
    description: "Bereken de perfecte positiegrootte voor elke trade op basis van je accountgrootte, risicopercentage en stop-loss afstand. Essentieel voor prop firm traders om binnen drawdown limieten te blijven.",
    shortDescription: "Bereken je ideale positiegrootte",
    category: "calculator",
    subcategory: "basis",
    icon: "Target",
    color: "primary",
    isActive: true,
    isPriority: true,

    seoTitle: "Position Size Calculator | Positiegrootte Berekenen",
    seoDescription: "Gratis position size calculator voor forex, futures en crypto. Bereken je ideale lot size op basis van risico, stop-loss en accountgrootte. Perfect voor prop firm traders.",
    seoKeywords: ["position size calculator", "positiegrootte berekenen", "lot size calculator", "forex position sizing", "prop firm risk management"],

    whatIsIt: `Een Position Size Calculator is een essentieel hulpmiddel dat berekent hoeveel contracten, lots of eenheden je moet verhandelen per trade. Dit wordt bepaald door drie factoren: je accountgrootte, het percentage dat je wilt riskeren, en de afstand tot je stop-loss.

Voor prop firm traders is dit extra belangrijk omdat je werkt met strikte drawdown limieten. Een te grote positie kan je binnen één trade door je daily loss limit heen blazen. Een te kleine positie betekent dat je onnodig lang doet over het behalen van je profit target.

De formule is: Position Size = (Account × Risico%) ÷ (Stop-Loss in pips × Pip waarde)

Bijvoorbeeld: Met een €100.000 account, 1% risico en een 20 pip stop-loss op EUR/USD, zou je position size 0.50 lots zijn.`,

    whyImportant: `Position sizing is de #1 reden waarom traders hun prop firm challenge falen. Uit onderzoek blijkt dat 94% van traders hun eerste challenge niet haalt - niet door slechte trades, maar door verkeerde position sizing.

Bij prop firms heb je typisch een 5% daily loss limit en 10% max drawdown. Als je 2% per trade riskeert en 3 verliezende trades hebt, zit je al op 6% verlies - boven je daily limit.

Professionele traders riskeren meestal 0.5% tot 1% per trade. Dit geeft je ruimte voor een reeks verliezende trades zonder je account te verliezen.`,

    howToUse: [
      "Vul je accountgrootte in (bijv. €100.000 voor FTMO)",
      "Kies je risicopercentage (aanbevolen: 0.5% - 1%)",
      "Selecteer het instrument dat je wilt traden",
      "Vul je stop-loss afstand in pips of punten in",
      "De calculator toont je optimale position size"
    ],

    tips: [
      {
        title: "Gebruik 0.5% voor challenges",
        description: "Tijdens een prop firm challenge is 0.5% risico per trade veiliger dan 1%. Dit geeft je meer ruimte voor fouten."
      },
      {
        title: "Reken altijd VOOR je trade",
        description: "Bereken je position size voordat je de trade plaatst, niet erna. Dit voorkomt emotionele beslissingen."
      },
      {
        title: "Houd rekening met spreads",
        description: "Je effectieve stop-loss is groter dan je technische stop-loss door de spread. Tel de spread erbij op."
      },
      {
        title: "Pas aan voor volatiliteit",
        description: "Bij nieuwsevents of hoge volatiliteit, overweeg een kleinere position size of grotere stop-loss."
      },
      {
        title: "Check de daily loss limit",
        description: "Controleer of je position size + open trades niet boven je daily loss limit uitkomt."
      }
    ],

    faqs: [
      {
        question: "Hoeveel procent moet ik riskeren per trade?",
        answer: "Voor prop firm challenges raden we 0.5% tot 1% aan. Dit geeft je genoeg ruimte om een serie verliezende trades te overleven zonder je daily loss limit te raken. Professionele traders riskeren zelden meer dan 2%."
      },
      {
        question: "Wat is het verschil tussen lots, mini lots en micro lots?",
        answer: "Een standard lot is 100.000 eenheden, een mini lot is 10.000 eenheden (0.1 lot), en een micro lot is 1.000 eenheden (0.01 lot). De meeste prop firms rekenen in standard lots."
      },
      {
        question: "Moet ik mijn position size aanpassen als mijn account groeit?",
        answer: "Ja! Als je account groeit van €100.000 naar €105.000, mag je position size ook groeien. Herbereken na elke significante winst of verlies."
      },
      {
        question: "Hoe werkt position sizing bij futures?",
        answer: "Bij futures reken je met contracten in plaats van lots. De tick value verschilt per contract (bijv. ES = $12.50 per tick). Onze calculator ondersteunt ook futures."
      },
      {
        question: "Kan ik meerdere trades tegelijk openen?",
        answer: "Ja, maar tel al je open risico bij elkaar op. Als je al 0.5% risico open hebt staan, en je opent nog een trade met 0.5%, is je totale risico 1%."
      }
    ],

    relatedTools: ["drawdown-calculator", "risk-reward-calculator", "pip-waarde-calculator"],
    relatedFirms: ["ftmo", "apex-trader-funding"],
    relatedCategories: ["scalping", "forex", "beginners"],

    schemaType: "WebApplication",
    applicationCategory: "FinanceApplication"
  },

  {
    id: "drawdown",
    slug: "drawdown-calculator",
    name: "Drawdown Calculator",
    shortName: "Drawdown",
    description: "Bereken hoeveel je account daalt na een serie verliezende trades. Essentieel om te begrijpen hoe snel je tegen drawdown limieten aanloopt bij prop firms.",
    shortDescription: "Bereken je drawdown na verliezen",
    category: "calculator",
    subcategory: "risk",
    icon: "TrendingDown",
    color: "accent",
    isActive: true,
    isPriority: true,

    seoTitle: "Drawdown Calculator | Trading Drawdown Berekenen",
    seoDescription: "Gratis drawdown calculator voor traders. Bereken hoeveel je account daalt na verliezende trades. Check of je binnen prop firm limieten blijft.",
    seoKeywords: ["drawdown calculator", "drawdown berekenen", "prop firm drawdown", "max drawdown calculator", "trading verlies berekenen"],

    whatIsIt: `Een Drawdown Calculator laat zien hoeveel je account in waarde daalt na een serie verliezende trades. Dit is cruciaal voor prop firm traders omdat je strikte limieten hebt: typisch 5% daily drawdown en 10% maximum drawdown.

Drawdown wordt berekend als percentage vanaf je hoogste punt (high-water mark). Als je account van €100.000 naar €105.000 groeit en dan zakt naar €98.000, is je drawdown 6.7% (niet 2%).

De formule is: Drawdown % = ((Hoogste waarde - Huidige waarde) ÷ Hoogste waarde) × 100

Deze calculator simuleert ook wat er gebeurt na meerdere verliezende trades achter elkaar, zodat je kunt zien hoe snel je in de gevarenzone komt.`,

    whyImportant: `Drawdown management is waarom de meeste traders falen bij prop firms. Je kunt 10 winnende trades hebben, maar 3 slechte trades kunnen je hele challenge verpesten.

Stel je riskeert 2% per trade. Na 5 verliezende trades op rij:
- Trade 1: €100.000 → €98.000 (-2%)
- Trade 2: €98.000 → €96.040 (-2%)
- Trade 3: €96.040 → €94.119 (-2%)
- Trade 4: €94.119 → €92.237 (-2%)
- Trade 5: €92.237 → €90.392 (-2%)

Je bent nu 9.6% in drawdown - bijna op de 10% limiet! Met 1% risico zou je na 5 verliezen slechts 4.9% in drawdown zijn.`,

    howToUse: [
      "Vul je startbalans in (bijv. €100.000)",
      "Vul je risico per trade in (bijv. 1%)",
      "Kies het aantal opeenvolgende verliezen dat je wilt simuleren",
      "Bekijk hoe je balans daalt en wanneer je limieten bereikt",
      "Experimenteer met verschillende risicopercentages"
    ],

    tips: [
      {
        title: "Ken je limieten",
        description: "FTMO heeft 5% daily en 10% max drawdown. Apex heeft trailing drawdown. Ken je limieten voor je begint."
      },
      {
        title: "Trailing vs Static drawdown",
        description: "Bij trailing drawdown beweegt je limiet mee met winst. Bij static blijft de limiet op je startbalans. Dit maakt een groot verschil!"
      },
      {
        title: "Stop voor je de limiet raakt",
        description: "Stel een persoonlijke limiet in die LAGER is dan de firm's limiet. Stop bij 4% daily in plaats van 5%."
      },
      {
        title: "Recovery is moeilijker dan verlies",
        description: "Na 10% verlies heb je 11.1% winst nodig om break-even te draaien. Na 50% verlies heb je 100% nodig!"
      },
      {
        title: "Track je high-water mark",
        description: "Je drawdown wordt berekend vanaf je hoogste punt, niet je startpunt. Houd dit bij."
      }
    ],

    faqs: [
      {
        question: "Wat is het verschil tussen trailing en static drawdown?",
        answer: "Bij static drawdown is je limiet altijd berekend vanaf je startbalans. Bij trailing drawdown beweegt de limiet mee omhoog als je winst maakt, maar nooit omlaag. Trailing is strenger omdat je je 'ruimte' niet terugkrijgt na winst."
      },
      {
        question: "Hoe wordt daily drawdown berekend?",
        answer: "Daily drawdown wordt berekend vanaf de hoogste waarde van je account die dag (inclusief open trades). Als je dag begint op €100.000 en je maakt €2.000 winst, dan wordt je daily drawdown berekend vanaf €102.000."
      },
      {
        question: "Reset de daily drawdown elke dag?",
        answer: "Ja, bij de meeste firms reset de daily drawdown om middernacht serverijd. Dit is meestal 00:00 GMT of de tijd van de broker."
      },
      {
        question: "Tellen open trades mee voor drawdown?",
        answer: "Ja! Je drawdown wordt berekend op basis van equity (balans + open P&L), niet alleen je balans. Een open verlies van €3.000 telt mee."
      },
      {
        question: "Wat gebeurt er als ik de drawdown limiet raak?",
        answer: "Bij de meeste prop firms wordt je account direct gesloten en is je challenge gefaald. Er is meestal geen waarschuwing - je moet zelf je limieten monitoren."
      }
    ],

    relatedTools: ["position-size-calculator", "daily-loss-calculator", "consistency-calculator"],
    relatedFirms: ["ftmo", "apex-trader-funding"],
    relatedCategories: ["beginners", "beste-profit-split"],

    schemaType: "WebApplication",
    applicationCategory: "FinanceApplication"
  },

  {
    id: "risk-reward",
    slug: "risk-reward-calculator",
    name: "Risk/Reward Calculator",
    shortName: "Risk/Reward",
    description: "Bereken de risk/reward ratio van je trades en ontdek welke win rate je nodig hebt om winstgevend te zijn. Essentieel voor het evalueren van trade setups.",
    shortDescription: "Bereken je risk/reward ratio",
    category: "calculator",
    subcategory: "basis",
    icon: "Scale",
    color: "secondary",
    isActive: true,
    isPriority: true,

    seoTitle: "Risk/Reward Calculator | R:R Ratio Berekenen",
    seoDescription: "Gratis risk/reward calculator. Bereken je R:R ratio en ontdek welke win rate je nodig hebt. Optimaliseer je trading strategie voor prop firms.",
    seoKeywords: ["risk reward calculator", "r:r ratio berekenen", "risk reward ratio", "trading ratio calculator", "win rate calculator"],

    whatIsIt: `De Risk/Reward Calculator berekent de verhouding tussen je potentiële winst en je potentiële verlies op een trade. Een R:R van 1:2 betekent dat je €2 kunt winnen voor elke €1 die je riskeert.

De formule is: R:R = (Take Profit - Entry) ÷ (Entry - Stop Loss)

Maar deze calculator gaat verder: hij berekent ook welke win rate (winstpercentage) je nodig hebt om winstgevend te zijn met jouw R:R ratio.

Met een 1:2 R:R heb je slechts 33.3% win rate nodig om break-even te draaien. Met een 1:1 R:R heb je 50% nodig. Dit inzicht verandert hoe je naar trading kijkt.`,

    whyImportant: `Veel traders focussen op win rate, maar R:R ratio is net zo belangrijk. Je kunt 70% van je trades verliezen en toch winstgevend zijn - als je R:R goed genoeg is.

Voorbeeld met 1:3 R:R (risico €100, reward €300):
- 10 trades, 3 winnaars, 7 verliezers
- Verlies: 7 × €100 = €700
- Winst: 3 × €300 = €900
- Netto: +€200 (met slechts 30% win rate!)

Voor prop firm challenges is dit cruciaal. Je hoeft niet elke trade te winnen - je moet alleen de juiste trades nemen met goede R:R.`,

    howToUse: [
      "Vul je entry prijs in",
      "Vul je stop-loss prijs in",
      "Vul je take-profit prijs in",
      "De calculator toont je R:R ratio",
      "Bekijk de minimale win rate die je nodig hebt"
    ],

    tips: [
      {
        title: "Minimum 1:1.5 R:R",
        description: "Neem geen trades met een R:R lager dan 1:1.5. Dit geeft je een buffer voor commissies en slippage."
      },
      {
        title: "Ken je werkelijke win rate",
        description: "Track je trades om je echte win rate te kennen. Vergelijk dit met de vereiste win rate voor je R:R."
      },
      {
        title: "Partials nemen beïnvloedt R:R",
        description: "Als je 50% winst neemt bij 1R en de rest laat lopen, verandert je effectieve R:R. Reken dit mee."
      },
      {
        title: "Asymmetrische kansen zoeken",
        description: "De beste trades hebben hoge R:R met redelijke kans op succes. Zoek naar 1:3+ setups."
      },
      {
        title: "R:R per strategie meten",
        description: "Verschillende strategieën hebben verschillende R:R profielen. Meet ze apart."
      }
    ],

    faqs: [
      {
        question: "Wat is een goede risk/reward ratio?",
        answer: "Een minimum van 1:1.5 wordt aanbevolen, maar 1:2 of hoger is beter. Hoe hoger je R:R, hoe lager je win rate mag zijn om winstgevend te blijven."
      },
      {
        question: "Hoe bereken ik de benodigde win rate?",
        answer: "De formule is: Benodigde Win Rate = 1 ÷ (1 + R:R). Bij 1:2 R:R is dit 1 ÷ 3 = 33.3%. Onze calculator doet dit automatisch."
      },
      {
        question: "Is een hogere R:R altijd beter?",
        answer: "Niet per se. Een 1:10 R:R klinkt geweldig, maar als je win rate daardoor naar 5% zakt, ben je slechter af dan met 1:2 R:R en 40% win rate."
      },
      {
        question: "Hoe houd ik rekening met commissies?",
        answer: "Trek commissies af van je winst en tel ze op bij je verlies. Als je €5 commissie betaalt, is je echte verlies €100 + €5 = €105."
      },
      {
        question: "Moet ik altijd mijn take-profit halen?",
        answer: "Niet noodzakelijk. Trailing stops kunnen je winst vergroten voorbij je oorspronkelijke TP, maar verlagen ook je win rate. Test wat werkt voor jouw strategie."
      }
    ],

    relatedTools: ["position-size-calculator", "winstcalculator", "break-even-calculator"],
    relatedFirms: ["ftmo", "the5ers"],
    relatedCategories: ["scalping", "swing-trading"],

    schemaType: "WebApplication",
    applicationCategory: "FinanceApplication"
  },

  {
    id: "pip-waarde",
    slug: "pip-waarde-calculator",
    name: "Pip Waarde Calculator",
    shortName: "Pip Waarde",
    description: "Bereken de waarde van een pip voor elk valutapaar in je accountvaluta. Onmisbaar voor accurate position sizing en risk management.",
    shortDescription: "Bereken pip waarde per lot",
    category: "calculator",
    subcategory: "basis",
    icon: "DollarSign",
    color: "primary",
    isActive: true,
    isPriority: false,

    seoTitle: "Pip Waarde Calculator | Pip Value Berekenen",
    seoDescription: "Gratis pip waarde calculator voor alle valutaparen. Bereken hoeveel een pip waard is in euro's voor accurate position sizing.",
    seoKeywords: ["pip waarde calculator", "pip value calculator", "pip berekenen forex", "pip waarde euro", "forex pip calculator"],

    whatIsIt: `Een Pip Waarde Calculator berekent hoeveel één pip beweging waard is in je accountvaluta (meestal EUR of USD). Dit verschilt per valutapaar en per lot size.

Voor EUR/USD met een USD account is 1 pip = $10 per standard lot. Maar voor GBP/JPY of exotische paren is de berekening complexer.

De formule is: Pip Waarde = (Pip in decimaal ÷ Wisselkoers) × Lot Size

Bijvoorbeeld: Voor USD/JPY bij koers 150.00 met een USD account:
Pip Waarde = (0.01 ÷ 150.00) × 100.000 = $6.67 per standard lot`,

    whyImportant: `Zonder accurate pip waarde kun je je position size niet correct berekenen. Dit leidt tot:
- Te veel risico nemen (onbewust)
- Inconsistente risk management
- Verrassingen bij je P&L

Vooral bij cross-pairs (zonder USD) en exotische paren is de pip waarde niet intuïtief. EUR/AUD heeft een andere pip waarde dan EUR/USD, ook al trade je allebei met euro's.

Voor prop firm traders is precisie essentieel. Een fout van 20% in je pip waarde betekent 20% fout in je risico.`,

    howToUse: [
      "Selecteer het valutapaar dat je wilt traden",
      "Kies je accountvaluta (EUR of USD)",
      "Selecteer je lot size (standard, mini, of micro)",
      "De calculator toont de pip waarde",
      "Gebruik dit voor je position size berekening"
    ],

    tips: [
      {
        title: "JPY paren zijn anders",
        description: "Bij JPY paren is een pip 0.01 in plaats van 0.0001. De calculator houdt hier rekening mee."
      },
      {
        title: "Check bij volatiele markten",
        description: "Pip waarde verandert met wisselkoersen. Bij grote bewegingen, herbereken."
      },
      {
        title: "Exotische paren hebben hogere waarde",
        description: "USD/ZAR of EUR/TRY hebben vaak hogere pip waardes. Pas je position size aan."
      },
      {
        title: "Account currency matters",
        description: "Een EUR account heeft andere pip waardes dan een USD account voor dezelfde pairs."
      },
      {
        title: "Futures werken met ticks",
        description: "Bij futures heet het 'tick value' in plaats van pip waarde. Andere calculator nodig."
      }
    ],

    faqs: [
      {
        question: "Wat is een pip precies?",
        answer: "Een pip is de kleinste standaard prijsbeweging in forex, meestal het vierde decimaal (0.0001). Bij JPY paren is het het tweede decimaal (0.01)."
      },
      {
        question: "Wat is een pipette?",
        answer: "Een pipette is 1/10 van een pip, het vijfde decimaal. Brokers tonen dit voor precisere prijzen, maar risico wordt meestal in hele pips berekend."
      },
      {
        question: "Waarom verschilt pip waarde per paar?",
        answer: "Omdat de quote currency (tweede valuta) anders is. Bij EUR/USD is de quote USD, bij EUR/GBP is het GBP. De conversie naar je accountvaluta maakt het verschil."
      },
      {
        question: "Hoe werkt dit bij een EUR account?",
        answer: "Als je account in EUR is en je tradet EUR/USD, moet de pip waarde (in USD) geconverteerd worden naar EUR tegen de huidige wisselkoers."
      },
      {
        question: "Verandert pip waarde tijdens mijn trade?",
        answer: "Ja, technisch gezien wel. Maar het verschil is meestal klein genoeg om te negeren, tenzij je zeer grote posities hebt of de markt extreem beweegt."
      }
    ],

    relatedTools: ["position-size-calculator", "margin-calculator", "winstcalculator"],
    relatedFirms: ["ftmo", "apex-trader-funding"],
    relatedCategories: ["forex", "beginners"],

    schemaType: "WebApplication",
    applicationCategory: "FinanceApplication"
  },

  // ============================================
  // PROP FIRM SPECIFIC CALCULATORS
  // ============================================
  {
    id: "challenge-roi",
    slug: "challenge-roi-calculator",
    name: "Challenge ROI Calculator",
    shortName: "Challenge ROI",
    description: "Bereken de return on investment van je prop firm challenge. Hoeveel moet je verdienen om je challenge fee terug te verdienen en daadwerkelijk winst te maken?",
    shortDescription: "Bereken je challenge rendement",
    category: "calculator",
    subcategory: "prop-firm",
    icon: "PiggyBank",
    color: "accent",
    isActive: true,
    isPriority: true,

    seoTitle: "Challenge ROI Calculator | Prop Firm Kosten Berekenen",
    seoDescription: "Bereken of een prop firm challenge de investering waard is. Hoeveel winst heb je nodig om je fee terug te verdienen? Gratis ROI calculator.",
    seoKeywords: ["prop firm roi calculator", "challenge kosten berekenen", "prop firm investering", "challenge fee terugverdienen", "prop trading kosten"],

    whatIsIt: `De Challenge ROI Calculator berekent hoeveel winst je moet maken om je prop firm challenge fee terug te verdienen - en wanneer je daadwerkelijk geld begint te verdienen.

Dit is crucialer dan de meeste traders denken. Een €345 FTMO challenge met 80% profit split betekent:
- Je moet €431 bruto winst maken om je fee terug te verdienen (€431 × 80% = €345)
- Alles daarboven is pas echte winst

De calculator berekent ook:
- Break-even punt in percentage van je account
- Hoeveel trading dagen je gemiddeld nodig hebt
- Vergelijking tussen verschillende prop firms`,

    whyImportant: `Veel traders kijken alleen naar de profit split, maar vergeten de challenge fee. Dit kan je werkelijke rendement flink verlagen.

Voorbeeld FTMO €100k account:
- Challenge fee: €540
- Je maakt €5.000 winst in je eerste maand
- Payout: €5.000 × 80% = €4.000
- Minus fee: €4.000 - €540 = €3.460 netto

Je effectieve profit split is geen 80%, maar 69% in de eerste maand!

Deze calculator helpt je:
1. Realistische verwachtingen te hebben
2. Prop firms eerlijk te vergelijken
3. Te bepalen of een challenge de investering waard is`,

    howToUse: [
      "Selecteer de prop firm of vul handmatig in",
      "Kies de accountgrootte",
      "Vul de challenge fee in",
      "Vul de profit split in",
      "Bekijk je break-even punt en effectieve rendement"
    ],

    tips: [
      {
        title: "Reken met meerdere pogingen",
        description: "De meeste traders halen de challenge niet in één keer. Reken met 2-3 challenge fees voor een realistisch beeld."
      },
      {
        title: "Vergeet maandelijkse fees niet",
        description: "Sommige firms (zoals Apex) hebben maandelijkse kosten. Tel deze mee in je ROI berekening."
      },
      {
        title: "Check kortingscodes",
        description: "Vrijwel elke prop firm heeft kortingscodes. Dit kan je ROI significant verbeteren."
      },
      {
        title: "Factor in je tijd",
        description: "Een goedkopere challenge die 60 dagen duurt versus een duurdere die 30 dagen duurt - wat is je tijd waard?"
      },
      {
        title: "Bereken je opportunity cost",
        description: "Geld in een challenge is geld dat je niet elders kunt investeren. Weeg dit mee."
      }
    ],

    faqs: [
      {
        question: "Krijg ik mijn challenge fee terug als ik slaag?",
        answer: "Bij de meeste firms (FTMO, FundedNext) wordt de fee terugbetaald bij je eerste payout nadat je geslaagd bent. Bij sommige firms is dit pas na een bepaald winstbedrag."
      },
      {
        question: "Wat als ik de challenge niet haal?",
        answer: "Dan ben je je challenge fee kwijt. Daarom is het belangrijk om meerdere pogingen in je budget te calculeren en om goed voorbereid te beginnen."
      },
      {
        question: "Zijn duurdere challenges beter?",
        answer: "Niet per se. Grotere accounts hebben dezelfde procentuele targets, maar hogere absolute bedragen. Begin met een account size die past bij je vaardigheden."
      },
      {
        question: "Hoe vergelijk ik firms met verschillende profit splits?",
        answer: "Gebruik onze calculator om de effectieve ROI te berekenen. Een 90% split met hogere fee kan slechter zijn dan 80% split met lagere fee."
      },
      {
        question: "Telt de free retry mee in de ROI?",
        answer: "Ja! Een gratis herkansing (bij veel firms beschikbaar) verdubbelt effectief je kansen voor dezelfde kosten. Dit verbetert je verwachte ROI significant."
      }
    ],

    relatedTools: ["break-even-calculator", "winstcalculator", "prop-firm-vergelijker"],
    relatedFirms: ["ftmo", "apex-trader-funding", "the5ers"],
    relatedCategories: ["goedkoop", "beginners"],

    schemaType: "WebApplication",
    applicationCategory: "FinanceApplication"
  },

  {
    id: "consistency",
    slug: "consistency-calculator",
    name: "Consistency Rule Calculator",
    shortName: "Consistency",
    description: "Check of je trading voldoet aan de consistency rule van je prop firm. Voorkom verrassingen bij je payout aanvraag.",
    shortDescription: "Check je consistency score",
    category: "calculator",
    subcategory: "prop-firm",
    icon: "BarChart2",
    color: "secondary",
    isActive: true,
    isPriority: true,

    seoTitle: "Consistency Rule Calculator | Prop Firm Consistency Check",
    seoDescription: "Gratis consistency rule calculator. Check of je trades voldoen aan de consistency eisen van Apex, FundedNext en andere prop firms.",
    seoKeywords: ["consistency rule calculator", "prop firm consistency", "consistency check", "apex consistency rule", "payout denied consistency"],

    whatIsIt: `De Consistency Rule Calculator checkt of je tradingresultaten voldoen aan de consistency eisen van prop firms. Deze regel zegt dat geen enkele dag of trade meer dan een bepaald percentage van je totale winst mag zijn.

Bijvoorbeeld bij Apex (30% regel):
- Je totale winst is €3.000
- Je beste dag was €1.200
- €1.200 ÷ €3.000 = 40%
- Dit is BOVEN de 30% limiet = PAYOUT DENIED

De calculator voorkomt dit door:
1. Je huidige consistency score te tonen
2. Te berekenen hoeveel extra winst je nodig hebt
3. Aan te geven wanneer je veilig kunt uitbetalen`,

    whyImportant: `De consistency rule is de #1 reden voor payout denials bij prop firms. Traders behalen hun profit target, vragen een payout aan, en worden dan verrast door de afwijzing.

Dit is extra frustrerend omdat:
- De regel niet altijd duidelijk gecommuniceerd wordt
- Je dashboard soms geen consistentie score toont
- Je achteraf je beste dag niet kunt "ongedaan maken"

De enige oplossing is vooraf plannen. Weet je beste dag en bereken hoeveel totale winst je nodig hebt voordat je uitbetaalt.`,

    howToUse: [
      "Selecteer je prop firm en hun consistency percentage",
      "Vul je dagelijkse winsten/verliezen in",
      "De calculator toont je hoogste dag en totale winst",
      "Bekijk je huidige consistency score",
      "Zie hoeveel extra winst je nodig hebt voor payout"
    ],

    tips: [
      {
        title: "Track vanaf dag 1",
        description: "Begin meteen met het bijhouden van je dagelijkse resultaten. Achteraf reconstrueren is lastig en foutgevoelig."
      },
      {
        title: "Vermijd één grote dag",
        description: "Hoe verleidelijk ook, probeer niet je hele profit target in één dag te halen. Dit maakt je consistency kapot."
      },
      {
        title: "Spread je winsten",
        description: "Beter 10 dagen van €300 dan 3 dagen van €1.000. Consistente kleine winsten zijn het doel."
      },
      {
        title: "Stop op tijd",
        description: "Als je een goede dag hebt, overweeg te stoppen. Je kunt de winst niet 'ongedaan maken' voor consistency."
      },
      {
        title: "Bereken VOOR je payout vraagt",
        description: "Check je consistency score voordat je een payout aanvraagt. Eenmaal aangevraagd is er geen weg terug."
      }
    ],

    faqs: [
      {
        question: "Wat is de consistency rule precies?",
        answer: "De consistency rule zegt dat geen enkele tradingdag meer dan X% van je totale winst mag uitmaken. Bij Apex is dit 30%, bij andere firms 40-50%. Dit voorkomt dat traders één lucky trade hebben en direct uitbetalen."
      },
      {
        question: "Hebben alle prop firms een consistency rule?",
        answer: "Nee! FTMO heeft bijvoorbeeld geen consistency rule. Check altijd de specifieke regels van je firm. Onze prop firm vergelijker toont dit per firm."
      },
      {
        question: "Hoe los ik een consistency probleem op?",
        answer: "Je moet meer winst maken op andere dagen totdat je beste dag onder het percentage zakt. Als je beste dag €1.000 is en de regel is 30%, heb je €3.333+ totale winst nodig."
      },
      {
        question: "Telt een verliesdag mee voor consistency?",
        answer: "Verlies vermindert je totale winst, wat je consistency score kan verslechteren (je beste dag wordt een groter percentage van een kleiner totaal)."
      },
      {
        question: "Wordt consistency per trade of per dag berekend?",
        answer: "Dit verschilt per firm. De meeste firms rekenen per dag. Sommige rekenen per trade of per week. Check je firm's specifieke regels."
      }
    ],

    relatedTools: ["drawdown-calculator", "daily-loss-calculator", "payout-calculator"],
    relatedFirms: ["apex-trader-funding", "fundednext"],
    relatedCategories: ["snelste-payout", "beste-profit-split"],

    schemaType: "WebApplication",
    applicationCategory: "FinanceApplication"
  },

  {
    id: "break-even",
    slug: "break-even-calculator",
    name: "Break-Even Calculator",
    shortName: "Break-Even",
    description: "Bereken hoeveel winstgevende trades je nodig hebt om break-even te draaien na verlies. Inclusief commissies en je R:R ratio.",
    shortDescription: "Bereken je break-even punt",
    category: "calculator",
    subcategory: "prop-firm",
    icon: "Scale",
    color: "primary",
    isActive: true,
    isPriority: true,

    seoTitle: "Break-Even Calculator | Trading Break Even Berekenen",
    seoDescription: "Bereken hoeveel winnende trades je nodig hebt om break-even te draaien. Inclusief recovery na drawdown en commissiekosten.",
    seoKeywords: ["break even calculator", "trading break even", "recovery calculator", "drawdown recovery", "hoeveel trades nodig"],

    whatIsIt: `De Break-Even Calculator berekent hoeveel winstgevende trades je nodig hebt om te herstellen van verlies. Dit is complexer dan je denkt door het compound effect.

Na 10% verlies heb je niet 10% winst nodig, maar 11.1%:
- Start: €100.000
- Na -10%: €90.000
- Om terug te komen: €90.000 × 1.111 = €100.000

De calculator berekent ook:
- Hoeveel trades met jouw R:R ratio
- Hoeveel dagen bij jouw gemiddelde
- Of je binnen je prop firm tijdslimiet blijft`,

    whyImportant: `Veel traders onderschatten hoe moeilijk recovery is. Dit leidt tot:
- Overmatig risico nemen na verlies (om sneller te herstellen)
- Depressie wanneer recovery langer duurt dan verwacht
- Gefaalde challenges door tijdsdruk

Hier is een eye-opener:
| Verlies | Nodig voor Recovery |
|---------|---------------------|
| 5%      | 5.3%                |
| 10%     | 11.1%               |
| 20%     | 25.0%               |
| 50%     | 100.0%              |

Hoe meer je verliest, hoe moeilijker herstel wordt. Prevention is better than cure.`,

    howToUse: [
      "Vul je huidige drawdown percentage in",
      "Vul je gemiddelde R:R ratio in",
      "Vul je gemiddelde win rate in",
      "De calculator toont hoeveel trades je nodig hebt",
      "Bekijk de geschatte tijd voor recovery"
    ],

    tips: [
      {
        title: "Voorkom in plaats van herstellen",
        description: "Het beste break-even plan is om niet in significante drawdown te komen. Risico management is key."
      },
      {
        title: "Verlaag je risico tijdens recovery",
        description: "Paradoxaal genoeg zou je tijdens drawdown minder moeten riskeren, niet meer. Dit beschermt tegen verder verlies."
      },
      {
        title: "Focus op R:R, niet op frequentie",
        description: "Meer trades nemen versnelt je recovery niet als je R:R niet goed is. Kwaliteit boven kwantiteit."
      },
      {
        title: "Wees realistisch over tijd",
        description: "Als je berekent dat je 20 winstgevende trades nodig hebt met 50% win rate, zijn dat 40 trades. Plan dit in."
      },
      {
        title: "Accepteer de situatie",
        description: "Emotioneel accepteren dat recovery tijd kost helpt je betere beslissingen te nemen."
      }
    ],

    faqs: [
      {
        question: "Waarom is 50% verlies 100% recovery nodig?",
        answer: "Percentages werken op een kleinere basis na verlies. €100.000 -50% = €50.000. €50.000 +100% = €100.000. Je moet je resterende bedrag verdubbelen."
      },
      {
        question: "Moet ik meer riskeren om sneller te herstellen?",
        answer: "Absoluut niet! Dit is de grootste fout. Meer risico bij drawdown vergroot de kans op nog meer verlies. Blijf bij je normale risicopercentage of verlaag het."
      },
      {
        question: "Hoeveel trades per dag is realistisch?",
        answer: "Dit hangt af van je strategie. Scalpers kunnen 5-10+ trades doen, swing traders misschien 1-2 per week. Wees eerlijk over je werkelijke gemiddelde."
      },
      {
        question: "Wat als mijn challenge tijd bijna op is?",
        answer: "Forceer geen trades. De meeste firms bieden herkansingen of hebben geen strikte tijdslimiet. Beter een nieuwe challenge dan je account kapot traden."
      },
      {
        question: "Hoe tel ik commissies mee?",
        answer: "Trek commissies af van je gemiddelde winst per trade. Als je €100 wint maar €5 commissie betaalt, is je netto winst €95 voor recovery berekeningen."
      }
    ],

    relatedTools: ["drawdown-calculator", "risk-reward-calculator", "challenge-roi-calculator"],
    relatedFirms: ["ftmo", "apex-trader-funding"],
    relatedCategories: ["beginners", "1-fase-challenge"],

    schemaType: "WebApplication",
    applicationCategory: "FinanceApplication"
  },

  // ============================================
  // QUIZZES & INTERACTIVE TOOLS
  // ============================================
  {
    id: "prop-firm-quiz",
    slug: "prop-firm-quiz",
    name: "Prop Firm Keuzehulp",
    shortName: "Keuzehulp",
    description: "Beantwoord 7 simpele vragen en ontdek welke prop firm het beste bij jouw trading stijl, budget en doelen past.",
    shortDescription: "Welke prop firm past bij jou?",
    category: "quiz",
    subcategory: "educatie",
    icon: "HelpCircle",
    color: "secondary",
    isActive: true,
    isPriority: true,

    seoTitle: "Prop Firm Keuzehulp | Welke Prop Firm Past Bij Mij?",
    seoDescription: "Ontdek in 2 minuten welke prop firm het beste bij je past. Beantwoord 7 vragen over je trading stijl, budget en doelen.",
    seoKeywords: ["welke prop firm kiezen", "prop firm quiz", "beste prop firm voor mij", "prop firm vergelijken", "prop firm beginners"],

    whatIsIt: `De Prop Firm Keuzehulp is een interactieve quiz die je helpt de perfecte prop firm te vinden. In 7 vragen analyseren we:

1. Je trading stijl (scalping, day trading, swing)
2. Je ervaring niveau
3. Je budget
4. Gewenste instrumenten (forex, futures, crypto)
5. Belangrijkste prioriteiten (profit split, payout snelheid, etc.)
6. Risicotolerantie
7. Tijdsbeschikbaarheid

Op basis van je antwoorden matchen we je met de top 3 prop firms die het beste bij je passen, inclusief een persoonlijk advies.`,

    whyImportant: `Er zijn 50+ prop firms en ze zijn allemaal "de beste" volgens hun eigen marketing. Beginners verliezen uren aan research en maken toch de verkeerde keuze.

Veelgemaakte fouten:
- Kiezen op basis van alleen prijs (goedkoop ≠ beste waarde)
- Niet checken of je strategie is toegestaan
- Belangrijke regels over het hoofd zien
- Kiezen wat anderen aanbevelen zonder eigen behoeften te overwegen

Deze quiz voorkomt dit door gerichte vragen te stellen en objectieve matches te maken.`,

    howToUse: [
      "Klik op 'Start Quiz'",
      "Beantwoord 7 korte vragen eerlijk",
      "Bekijk je top 3 aanbevolen prop firms",
      "Lees de persoonlijke toelichting",
      "Klik door naar gedetailleerde reviews"
    ],

    tips: [
      {
        title: "Wees eerlijk over je ervaring",
        description: "Kiezen voor een 'advanced' firm als beginner leidt tot frustratie. Begin passend bij je niveau."
      },
      {
        title: "Budget is niet alles",
        description: "Een €100 challenge die je 3x faalt kost meer dan een €300 challenge die je in één keer haalt."
      },
      {
        title: "Check de regels van je match",
        description: "Na de quiz, lees altijd de volledige regels van je aanbevolen firm. Kleine details kunnen belangrijk zijn."
      },
      {
        title: "Overweeg meerdere firms",
        description: "Veel succesvolle traders werken met 2-3 firms tegelijk voor risicospreiding en kansvergroting."
      },
      {
        title: "Hertest na ervaring",
        description: "Je voorkeuren veranderen met ervaring. Doe de quiz opnieuw na 6 maanden trading."
      }
    ],

    faqs: [
      {
        question: "Hoe bepaalt de quiz welke firm bij me past?",
        answer: "We gebruiken een gewogen scoringsysteem. Elk antwoord geeft punten aan firms die matchen met die voorkeur. De firms met de hoogste totaalscore worden aanbevolen."
      },
      {
        question: "Zijn de aanbevelingen objectief?",
        answer: "Ja. Hoewel we affiliate zijn van sommige firms, beïnvloedt dit de quiz niet. De algoritme kijkt puur naar jouw antwoorden en firm kenmerken."
      },
      {
        question: "Wat als geen firm perfect past?",
        answer: "Geen enkele firm is perfect voor iedereen. We tonen je top 3 met voor- en nadelen, zodat je zelf de beste afweging kunt maken."
      },
      {
        question: "Kan ik de quiz opnieuw doen?",
        answer: "Ja, zo vaak als je wilt. Je antwoorden worden niet opgeslagen. Probeer verschillende scenario's om te zien hoe aanbevelingen veranderen."
      },
      {
        question: "Waarom maar 7 vragen?",
        answer: "We hebben getest wat het minimum is voor accurate aanbevelingen zonder gebruikers te vervelen. 7 vragen geeft 95% van de nauwkeurigheid van 20 vragen."
      }
    ],

    relatedTools: ["prop-firm-vergelijker", "challenge-roi-calculator", "trading-stijl-test"],
    relatedFirms: ["ftmo", "apex-trader-funding", "the5ers"],
    relatedCategories: ["beginners", "goedkoop", "forex", "futures"],

    schemaType: "WebApplication",
    applicationCategory: "FinanceApplication"
  },

  // ============================================
  // NEDERLAND SPECIFIEK
  // ============================================
  {
    id: "belasting",
    slug: "belasting-calculator",
    name: "Trading Belasting Calculator NL",
    shortName: "Belasting NL",
    description: "Bereken hoeveel belasting je betaalt over je prop trading inkomsten in Nederland. Box 1 vs Box 3, zzp vs particulier.",
    shortDescription: "Bereken je trading belasting",
    category: "calculator",
    subcategory: "belasting",
    icon: "Receipt",
    color: "accent",
    isActive: true,
    isPriority: true,

    seoTitle: "Trading Belasting Calculator Nederland | Box 1 vs Box 3",
    seoDescription: "Bereken hoeveel belasting je betaalt over prop trading inkomsten in Nederland. Verschil tussen Box 1 en Box 3, als zzp'er of particulier.",
    seoKeywords: ["trading belasting nederland", "prop trading belasting", "box 1 box 3 trading", "belasting trading winst", "forex belasting nederland"],

    whatIsIt: `De Trading Belasting Calculator helpt Nederlandse traders te berekenen hoeveel belasting ze betalen over prop trading inkomsten.

In Nederland kan trading inkomen op twee manieren belast worden:

**Box 1 (Inkomen uit werk):**
- Als je trading je hoofdinkomen is
- Als je als zzp'er/ondernemer tradet
- Progressief tarief: 36.97% tot 49.50%

**Box 3 (Vermogen):**
- Als je tradet met eigen vermogen
- Forfaitair rendement over je vermogen
- Let op: prop trading valt meestal NIET in Box 3!

Deze calculator helpt je bepalen welke situatie op jou van toepassing is en hoeveel je betaalt.`,

    whyImportant: `Belasting is de grootste "verborgen kost" voor traders. Veel Nederlandse traders:
- Vergeten belasting te reserveren
- Weten niet welke box van toepassing is
- Worden verrast door een naheffing

Voorbeeld:
- Je verdient €50.000 met prop trading
- Box 1 belasting: ~€18.000 (36%)
- Wat je overhoudt: €32.000

Als je geen rekening houdt met belasting en alles uitgeeft, heb je een probleem.

Disclaimer: Deze calculator is indicatief. Raadpleeg altijd een belastingadviseur voor je specifieke situatie.`,

    howToUse: [
      "Vul je verwachte trading inkomen in",
      "Selecteer je situatie (zzp, werknemer, of particulier)",
      "Geef aan of je andere inkomsten hebt",
      "De calculator toont je geschatte belasting",
      "Bekijk hoeveel je maandelijks moet reserveren"
    ],

    tips: [
      {
        title: "Reserveer 40% voor belasting",
        description: "Als vuistregel: zet 40% van je trading winst apart voor belasting. Beter te veel dan te weinig."
      },
      {
        title: "Overweeg een bv bij hoog inkomen",
        description: "Bij €100.000+ per jaar kan een bv fiscaal voordeliger zijn. Raadpleeg een adviseur."
      },
      {
        title: "Houd administratie bij",
        description: "Bewaar alle payout confirmaties, challenge kosten, en trading gerelateerde uitgaven als aftrekposten."
      },
      {
        title: "Challenge fees zijn kosten",
        description: "Gefaalde challenge fees kunnen mogelijk als bedrijfskosten worden afgetrokken. Check met je adviseur."
      },
      {
        title: "Voorlopige aanslag aanvragen",
        description: "Bij wisselend inkomen kun je een voorlopige aanslag aanvragen om boetes te voorkomen."
      }
    ],

    faqs: [
      {
        question: "Is prop trading Box 1 of Box 3?",
        answer: "Prop trading is bijna altijd Box 1 omdat je een vergoeding ontvangt voor je activiteiten (de profit split). Je tradet niet met eigen vermogen, dus Box 3 is niet van toepassing."
      },
      {
        question: "Moet ik me registreren als zzp'er?",
        answer: "Als trading je structurele inkomen is, moet je waarschijnlijk bij de KvK registreren. Bij incidenteel bijverdienen kan het onder 'overig inkomen' vallen. Raadpleeg een adviseur."
      },
      {
        question: "Kan ik kosten aftrekken?",
        answer: "Als ondernemer/zzp'er wel: challenge fees, software, cursussen, hardware. Als particulier is dit beperkt. De regels zijn complex."
      },
      {
        question: "Wanneer moet ik belasting betalen?",
        answer: "Je doet aangifte in het jaar na je inkomsten (bijv. inkomen 2024 → aangifte 2025). Betaling is meestal voor 1 juli of in termijnen."
      },
      {
        question: "Wat als ik verlies maak?",
        answer: "Verliezen kunnen mogelijk verrekend worden met toekomstige winsten. Als ondernemer zijn de mogelijkheden groter dan als particulier."
      }
    ],

    relatedTools: ["winstcalculator", "challenge-roi-calculator"],
    relatedFirms: ["ftmo", "apex-trader-funding"],
    relatedCategories: ["beginners"],

    schemaType: "WebApplication",
    applicationCategory: "FinanceApplication"
  },

  // ============================================
  // TIJD & PLANNING TOOLS
  // ============================================
  {
    id: "trading-sessies",
    slug: "trading-sessies-klok",
    name: "Trading Sessies Klok",
    shortName: "Sessie Klok",
    description: "Realtime overzicht van forex en futures trading sessies in Nederlandse tijd. Zie wanneer de markten het meest actief zijn.",
    shortDescription: "Bekijk actieve trading sessies",
    category: "referentie",
    subcategory: "tijd",
    icon: "Clock",
    color: "primary",
    isActive: true,
    isPriority: true,

    seoTitle: "Trading Sessies Klok | Forex Handelstijden NL",
    seoDescription: "Realtime forex en futures trading sessies in Nederlandse tijd. Zie de Sydney, Tokyo, London en New York sessies en hun overlaps.",
    seoKeywords: ["forex trading tijden", "trading sessies", "beste tijd om te traden", "forex market hours", "trading sessie overlap"],

    whatIsIt: `De Trading Sessies Klok toont realtime welke forex en futures markten open zijn, allemaal in Nederlandse tijd (CET/CEST).

De vier belangrijkste sessies:
- **Sydney:** 23:00 - 08:00 CET (rustig)
- **Tokyo:** 01:00 - 10:00 CET (Aziatische volatiliteit)
- **London:** 09:00 - 18:00 CET (hoogste volume)
- **New York:** 14:00 - 23:00 CET (Amerikaanse volatiliteit)

De klok toont ook session overlaps - de periodes met de hoogste volatiliteit en beste trading kansen.`,

    whyImportant: `Timing is cruciaal in trading. De markt gedraagt zich heel anders tijdens verschillende sessies:

- **London/NY overlap (14:00-18:00 CET):** Hoogste volume, beste liquiditeit, meeste beweging
- **Aziatische sessie (01:00-08:00 CET):** Rustig, ranging markten, JPY pairs actiever
- **Dead zone (21:00-23:00 CET):** Weinig volume, onvoorspelbare bewegingen

Voor Nederlandse traders is dit extra relevant omdat:
1. De London sessie perfect in je werkdag valt
2. De NY overlap nog in de avond is
3. De Aziatische sessie midden in de nacht is`,

    howToUse: [
      "Open de klok op elk moment",
      "Zie welke sessies nu actief zijn (groen)",
      "Check de session overlaps voor optimale timing",
      "Plan je trading rond de actieve periodes",
      "Let op zomer/wintertijd wijzigingen"
    ],

    tips: [
      {
        title: "Focus op overlaps",
        description: "De London/NY overlap (14:00-18:00 CET) is de beste tijd voor forex trading. Hoogste volume en beweging."
      },
      {
        title: "Vermijd session opens",
        description: "De eerste 15-30 minuten van een sessie kunnen chaotisch zijn. Wacht op duidelijke richting."
      },
      {
        title: "Match pairs met sessies",
        description: "Trade EUR en GBP pairs tijdens London, USD pairs tijdens NY, JPY pairs tijdens Tokyo."
      },
      {
        title: "Let op news events",
        description: "Belangrijke nieuws (NFP, ECB) komt op vaste tijden. Combineer dit met de sessieklok."
      },
      {
        title: "Pas aan voor zomer/wintertijd",
        description: "De VS en EU schakelen op verschillende data. Check de klok rond maart en november."
      }
    ],

    faqs: [
      {
        question: "Welke sessie is het beste voor beginners?",
        answer: "De London sessie (09:00-12:00 CET) voor duidelijke trends, of de late NY sessie (20:00-22:00 CET) voor rustigere condities om te oefenen."
      },
      {
        question: "Wanneer zijn de markten gesloten?",
        answer: "Forex is 24/5 open, van zondag 23:00 tot vrijdag 23:00 CET. In het weekend is er geen forex trading mogelijk."
      },
      {
        question: "Waarom is de overlap zo belangrijk?",
        answer: "Tijdens overlaps zijn de meeste traders actief, wat zorgt voor meer volume, betere liquiditeit, tightere spreads en grotere price movements."
      },
      {
        question: "Hoe zit het met futures?",
        answer: "CME futures (ES, NQ, etc.) volgen eigen uren. Ze zijn open van zondag 18:00 tot vrijdag 17:00 ET, met een dagelijkse pauze van 17:00-18:00 ET."
      },
      {
        question: "Moet ik 's nachts traden voor de Aziatische sessie?",
        answer: "Niet per se. Als Europeaan heb je prima toegang tot London en NY. De Aziatische sessie is optioneel en vaak rustig voor forex majors."
      }
    ],

    relatedTools: ["pip-waarde-calculator", "position-size-calculator"],
    relatedFirms: ["ftmo", "apex-trader-funding"],
    relatedCategories: ["forex", "futures", "scalping"],

    schemaType: "WebApplication",
    applicationCategory: "UtilitiesApplication"
  },
]

// Helper functions
export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug)
}

export function getActiveTools(): Tool[] {
  return tools.filter((tool) => tool.isActive)
}

export function getPriorityTools(): Tool[] {
  return tools.filter((tool) => tool.isActive && tool.isPriority)
}

export function getToolsByCategory(category: Tool["category"]): Tool[] {
  return tools.filter((tool) => tool.isActive && tool.category === category)
}

export function getToolsBySubcategory(subcategory: Tool["subcategory"]): Tool[] {
  return tools.filter((tool) => tool.isActive && tool.subcategory === subcategory)
}

export function getRelatedTools(tool: Tool): Tool[] {
  return tool.relatedTools
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is Tool => t !== undefined && t.isActive)
}

// Categories for display
export const toolCategories = {
  calculator: {
    name: "Calculators",
    description: "Bereken alles wat je nodig hebt voor je trading",
    icon: "Calculator",
  },
  vergelijker: {
    name: "Vergelijkers",
    description: "Vergelijk prop firms en hun voorwaarden",
    icon: "GitCompare",
  },
  quiz: {
    name: "Quizzes & Tests",
    description: "Ontdek wat het beste bij je past",
    icon: "HelpCircle",
  },
  referentie: {
    name: "Referentie Tools",
    description: "Handige informatie altijd bij de hand",
    icon: "BookOpen",
  },
  planning: {
    name: "Planning Tools",
    description: "Plan je trading journey",
    icon: "Calendar",
  },
}

export const toolSubcategories = {
  basis: { name: "Basis Calculators", description: "Essentiële trading berekeningen" },
  "prop-firm": { name: "Prop Firm Tools", description: "Specifiek voor prop firm traders" },
  risk: { name: "Risk Management", description: "Beheer je risico's" },
  tijd: { name: "Tijd & Planning", description: "Timing en planning" },
  belasting: { name: "Belasting & Financiën", description: "Nederlandse belastingzaken" },
  educatie: { name: "Educatie", description: "Leer en ontdek" },
}
