// Blog Configuration - Ready for n8n auto-generated content

// Dynamic year for SEO titles
const currentYear = new Date().getFullYear()

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string // Markdown content
  author: {
    name: string
    avatar?: string
  }
  category: BlogCategory
  tags: string[]
  publishedAt: string // ISO date string
  updatedAt?: string
  readingTime: number // minutes
  featured: boolean
  seoTitle?: string
  seoDescription?: string
  coverImage?: string
}

export type BlogCategory =
  | "nieuws"
  | "tips"
  | "vergelijking"
  | "analyse"
  | "gids"
  | "interview"

export const blogCategories: Record<BlogCategory, { name: string; description: string; color: string }> = {
  nieuws: {
    name: "Nieuws",
    description: "Laatste nieuws over prop trading firms en de industrie",
    color: "bg-blue-500/20 text-blue-400",
  },
  tips: {
    name: "Tips & Tricks",
    description: "Praktische tips om je trading te verbeteren",
    color: "bg-green-500/20 text-green-400",
  },
  vergelijking: {
    name: "Vergelijking",
    description: "Diepgaande vergelijkingen tussen prop firms",
    color: "bg-purple-500/20 text-purple-400",
  },
  analyse: {
    name: "Analyse",
    description: "Marktanalyses en trading inzichten",
    color: "bg-orange-500/20 text-orange-400",
  },
  gids: {
    name: "Gids",
    description: "Uitgebreide handleidingen en tutorials",
    color: "bg-cyan-500/20 text-cyan-400",
  },
  interview: {
    name: "Interview",
    description: "Gesprekken met succesvolle traders",
    color: "bg-pink-500/20 text-pink-400",
  },
}

// Default author for auto-generated content
export const defaultAuthor = {
  name: "Redactie",
  avatar: "/images/authors/redactie.png",
}

// Example blog posts - these will be replaced/augmented by n8n
export const blogPosts: BlogPost[] = [
  {
    id: "mk1sorwd2nebv",
    slug: "3-simpele-tips-voor-je-eerste-prop-trading-challenge",
    title: "3 Simpele Tips Voor Je Eerste Prop Trading Challenge",
    excerpt: "Ontdek de 3 essentiële tips die je helpen slagen voor je eerste prop trading challenge. Praktische adviezen voor beginners.",
    content: `# 3 Simpele Tips Voor Je Eerste Prop Trading Challenge

Je eerste prop trading challenge kan overweldigend aanvoelen. Met tientallen firms beschikbaar en verschillende regels om te onthouden, weet je misschien niet waar je moet beginnen. Gelukkig hoef je het wiel niet opnieuw uit te vinden. Met deze drie simpele maar krachtige tips verhoog je significant je kansen op succes.

## Tip 1: Start Klein en Kies de Juiste Firm

De grootste fout die beginners maken? Te groot beginnen. Kies voor een kleinere account size (€10.000-€25.000) bij je eerste poging. Dit geeft je:

- **Lagere kosten** voor de challenge
- **Minder druk** tijdens het traden
- **Meer ruimte** om fouten te maken en te leren
- **Betere focus** op je strategie

Voor beginners raden we [FTMO](/prop-firms/ftmo) aan als eerste keuze. Hun regels zijn helder, de support is uitstekend, en ze hebben bewezen betrouwbaar te zijn. FTMO biedt ook een gratis trial waarmee je hun platform kunt testen zonder risico.

**Let op:** Hoewel FTMO uitstekend is voor beginners, zijn hun regels wel strikt. Zorg dat je de maximum daily loss en overall loss limieten goed begrijpt voordat je start.

## Tip 2: Focus op Risicomanagement, Niet op Winst

Dit klinkt tegenstrijdig, maar de meeste succesvolle prop traders denken eerst aan wat ze kunnen verliezen, niet aan wat ze kunnen winnen.

### Praktische risicomanagement regels:

- **Nooit meer dan 1-2% per trade** riskeren
- **Stop loss altijd instellen** voordat je de trade opent
- **Maximum 3-5 trades per dag** - meer leidt tot emotioneel traden
- **Houd een trading dagboek** bij om patronen te herkennen

De meeste prop firms hebben strikte drawdown regels. Bij FTMO mag je bijvoorbeeld maximaal 5% op één dag verliezen en 10% in totaal. Door je risico per trade te beperken, voorkom je dat één slechte dag je hele challenge verpest.

## Tip 3: Oefen Eerst Met Demo Accounts

Spring niet meteen in een betaalde challenge. Gebruik minimaal 2-4 weken om te oefenen:

### Wat te oefenen:
- **Platform navigatie** - ken elk knopje
- **Order types** - market orders, limit orders, stop losses
- **Emotioneel management** - hoe reageer je op verlies?
- **Strategie verfijning** - welke setups werken het best?

Veel firms, waaronder FTMO, bieden uitgebreide demo accounts. Gebruik deze tijd om ook verschillende [prop firms te vergelijken](/vergelijk) en te kijken welke het beste bij jouw trading stijl past.

## Veelgemaakte Beginnerfouten Vermijden

**Overtrading:** De neiging om te veel te traden omdat je snel het target wilt halen. Geduld is cruciaal.

**Emotioneel traden:** Na een verlies direct proberen het terug te winnen. Dit leidt vaak tot nog grotere verliezen.

**Regels negeren:** Elke firm heeft specifieke regels. Lees deze grondig en houd je eraan.

## Conclusie: Start Slim, Niet Snel

Succes in prop trading komt niet van geluk, maar van voorbereiding en discipline. Begin met een kleinere challenge bij een betrouwbare firm zoals [FTMO](/prop-firms/ftmo), focus op risicomanagement boven winst, en oefen grondig voordat je echt geld riskeert.

Wil je meer firms vergelijken? Bekijk ons complete [overzicht van prop firms](/prop-firms) of gebruik onze [vergelijkingstool](/vergelijk) om de perfecte match voor jouw situatie te vinden. Met de juiste voorbereiding en mindset is jouw eerste prop trading challenge het begin van een succesvolle trading carrière.

Onthoud: elke succesvolle prop trader is ooit begonnen waar jij nu staat. Het verschil ligt in de aanpak.`,
    author: {
      name: "Redactie"
    },
    category: "tips",
    tags: ["prop trading tips","beginners","FTMO","risicomanagement","trading challenge","prop firms"],
    publishedAt: "2026-01-05T23:31:48.157Z",
    readingTime: 3,
    featured: false
  },
  {
    id: "mk1pyy85o22lw",
    slug: "prop-trading-trends-2026-wat-verandert-er-voor-traders",
    title: "Prop Trading Trends 2026: Wat Verandert Er Voor Traders?",
    excerpt: "Ontdek de belangrijkste ontwikkelingen in prop trading voor 2026 en hoe FTMO en Apex Trader Funding vooroplopen in innovatie.",
    content: `# Prop Trading Trends 2026: Wat Verandert Er Voor Traders?

De prop trading industrie evolueert in razend tempo. Voor traders die zich voorbereiden op 2026 is het cruciaal om te begrijpen welke veranderingen er aankomen en hoe deze hun trading carrière kunnen beïnvloeden. Van technologische innovaties tot regelgeving - de wereld van proprietary trading staat voor significante verschuivingen.

## Technologische Revolutie in Prop Trading

### AI-Gedreven Risk Management
Prop firms investeren massaal in kunstmatige intelligentie voor risicobeheer. **FTMO**, een van onze [top-rated partners](/prop-firms/ftmo), implementeert geavanceerde AI-systemen die real-time trading patronen analyseren. Dit betekent:

- Snellere detectie van risicovol gedrag
- Gepersonaliseerde feedback voor traders
- Automatische aanpassingen van trading parameters
- Verbeterde winstgevendheid voor zowel firm als trader

**Voordeel:** Betere begeleiding en minder kans op account verlies  
**Nadeel:** Strengere monitoring kan ervaren traders beperken

### Blockchain en Transparantie
Steeds meer firms experimenteren met blockchain-technologie voor transparante payout-systemen. Dit zorgt voor:

- Onmiddellijke verificatie van trading resultaten
- Automatische profit-sharing via smart contracts
- Verhoogd vertrouwen tussen trader en firm

## Veranderende Evaluatieprocessen

### Kortere Challenge Periodes
**Apex Trader Funding** loopt voorop met gestroomlijnde evaluaties. De trend naar kortere assessment-periodes biedt traders:

- Snellere toegang tot live kapitaal
- Lagere psychologische druk tijdens evaluatie
- Meer mogelijkheden voor herhaalde pogingen

Bekijk onze [uitgebreide vergelijking](/vergelijk) om te zien welke firms de beste evaluatiestructuur bieden voor jouw trading stijl.

### Flexibelere Trading Rules
Firms passen hun regels aan moderne trading realiteiten aan:

- Weekendholding wordt meer geaccepteerd
- News trading beperkingen worden soepeler
- Scalping-vriendelijke condities
- Aangepaste drawdown regels voor verschillende strategieën

## Regelgeving en Compliance

### Europese Wetgeving
De EU werkt aan nieuwe regelgeving voor prop trading firms. Verwachte veranderingen:

- Strengere kapitaalvereisten voor firms
- Verbeterde trader bescherming
- Gestandaardiseerde risico-disclosures
- Mogelijke impact op fee-structuren

**Voor traders betekent dit:**
- Meer zekerheid over firm-stabiliteit
- Duidelijkere contractvoorwaarden
- Mogelijk hogere entry-kosten

## Marktexpansie en Nieuwe Instrumenten

### Crypto Integration
Steeds meer prop firms bieden cryptocurrency trading aan:

- 24/7 trading mogelijkheden
- Hogere volatiliteit = meer profit potential
- Nieuwe risk management uitdagingen
- Verhoogde technische vereisten

Onze [tools sectie](/tools) biedt uitgebreide resources voor crypto-prop trading voorbereiding.

### ESG en Sustainable Trading
Duurzaamheid wordt een factor in prop trading:

- ESG-conforme trading strategieën
- Groene energie voor trading infrastructuur
- Sociale verantwoordelijkheid initiatieven

## Praktische Tips Voor 2026

### Bereid Je Voor Op Verandering
1. **Blijf flexibel** - Pas je strategie aan nieuwe regels aan
2. **Investeer in educatie** - Leer nieuwe technologieën en instrumenten
3. **Diversifieer je skills** - Meerdere trading stijlen beheersen
4. **Netwerk actief** - Sluit je aan bij trading communities

### Kies de Juiste Partner
Bij het selecteren van een prop firm voor 2026, let op:

- Technologische innovatie
- Regelgeving compliance
- Flexibiliteit in trading rules
- Track record van uitbetalingen

Bezoek ons [prop firms overzicht](/prop-firms) voor de meest actuele vergelijking van alle beschikbare opties.

## Conclusie: Kansen Te Over

Prop trading in 2026 biedt ongekende mogelijkheden voor goed voorbereide traders. Technologische vooruitgang, flexibelere regels en nieuwe markten creëren een dynamische omgeving vol potentieel.

De sleutel tot succes ligt in het kiezen van de juiste partner. Firms zoals FTMO en Apex Trader Funding investeren zwaar in innovatie en trader-ondersteuning, waardoor ze uitstekende keuzes zijn voor ambitieuze traders.

Wil je meer weten over welke prop firm het beste bij jouw doelen past? Gebruik onze [vergelijkingstool](/vergelijk) om de perfecte match te vinden voor jouw trading carrière in 2026.`,
    author: {
      name: "Redactie"
    },
    category: "analyse",
    tags: ["prop trading 2026","FTMO","Apex Trader Funding","trading trends","AI trading","prop firm vergelijking"],
    publishedAt: "2026-01-05T22:15:44.069Z",
    readingTime: 3,
    featured: false
  },
  {
    id: "1",
    slug: "prop-trading-beginnen-complete-gids",
    title: "Prop Trading Beginnen: De Complete Gids voor Nederlandse Traders",
    excerpt: "Alles wat je moet weten om te starten met prop trading. Van het kiezen van de juiste firm tot het behalen van je eerste funded account.",
    content: `
## Wat is Prop Trading?

Proprietary trading, of kortweg prop trading, is een manier om te handelen met het kapitaal van een trading firm in plaats van je eigen geld. Dit opent deuren voor traders die wel de skills hebben, maar niet het kapitaal om grote posities te nemen.

## Waarom Kiezen voor Prop Trading?

### Voordelen
- **Geen eigen kapitaal nodig** - Trade met €10.000 tot €200.000+ zonder eigen risico
- **Hoge profit splits** - Houd 80-90% van je winst
- **Professionele omgeving** - Toegang tot goede platforms en tools
- **Schaalbaarheid** - Groei je account naarmate je beter wordt

### Nadelen
- **Challenge kosten** - Je betaalt voor de evaluatie
- **Strikte regels** - Drawdown limieten en trading regels
- **Druk** - Je moet consistent presteren

## Hoe Kies je de Juiste Prop Firm?

Bij het kiezen van een prop firm moet je letten op:

1. **Betrouwbaarheid** - Hoe lang bestaat de firm? Betalen ze uit?
2. **Voorwaarden** - Wat zijn de drawdown limieten en regels?
3. **Kosten** - Wat kost de challenge en is er een refund?
4. **Profit Split** - Hoeveel van je winst houd je?
5. **Payout frequentie** - Hoe vaak kun je uitbetalen?

## Top Prop Firms voor Beginners

### FTMO
FTMO is de industriestandaard en perfect voor beginners door:
- Duidelijke regels en transparantie
- Uitstekende support
- Bewezen track record
- 80-90% profit split

### Apex Trader Funding
Apex is ideaal voor futures traders:
- 100% van eerste $25.000 winst
- Geen tijdslimiet op evaluatie
- Bi-weekly payouts

## Je Eerste Stappen

1. **Kies een firm** - Vergelijk op onze website
2. **Start met een demo** - Oefen eerst gratis
3. **Doe de challenge** - Start klein (€10.000-€25.000)
4. **Volg je plan** - Discipline is key
5. **Schaal op** - Na succes kun je groeien

## Veelgemaakte Fouten

- Te groot beginnen met account size
- Geen duidelijk trading plan
- Overtraden om targets te halen
- Risicomanagement negeren
- Opgeven na eerste faal

## Conclusie

Prop trading is een geweldige manier om je trading carrière te starten zonder groot eigen kapitaal. Kies een betrouwbare firm, volg de regels, en focus op consistentie boven snelle winsten.

Klaar om te beginnen? [Vergelijk alle prop firms](/prop-firms) en vind de beste match voor jouw trading stijl.
`,
    author: defaultAuthor,
    category: "gids",
    tags: ["beginners", "prop trading", "gids", "funded account"],
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    readingTime: 8,
    featured: true,
    seoTitle: `Prop Trading Beginnen: Complete Gids voor Beginners [${currentYear}]`,
    seoDescription: "Leer alles over prop trading starten. Van firm kiezen tot funded worden. Inclusief tips, valkuilen en de beste prop firms voor beginners.",
  },
  {
    id: "2",
    slug: "ftmo-vs-apex-vergelijking",
    title: "FTMO vs Apex Trader Funding: Welke Prop Firm Past Bij Jou?",
    excerpt: "Een eerlijke vergelijking tussen twee van de grootste prop firms. Ontdek de verschillen in regels, kosten en payouts.",
    content: `
## FTMO vs Apex: De Ultieme Vergelijking

Twee van de meest populaire prop trading firms gaan head-to-head. Welke is beter voor jouw situatie?

## Overzicht

| Aspect | FTMO | Apex |
|--------|------|------|
| **Type** | Forex/Indices | Futures |
| **Min. Account** | €10.000 | $25.000 |
| **Profit Split** | 80-90% | 100%* |
| **Payout** | 14 dagen | Bi-weekly |

*100% op eerste $25.000 winst

## Challenge Vergelijking

### FTMO Challenge
- 2 fasen (Challenge + Verification)
- 10% profit target fase 1
- 5% profit target fase 2
- Max 5% daily drawdown
- Max 10% total drawdown
- Geen tijdslimiet (wel min. 4 dagen)

### Apex Evaluatie
- 1 fase evaluatie
- Variabel profit target
- Trailing drawdown (EOD)
- Geen tijdslimiet
- Geen minimum dagen

## Kosten Vergelijking

### FTMO Prijzen
| Account | Prijs |
|---------|-------|
| €10.000 | €89 |
| €20.000 | €250 |
| €40.000 | €345 |
| €80.000 | €540 |
| €160.000 | €1.080 |

### Apex Prijzen
| Account | Prijs |
|---------|-------|
| $25.000 | $167 |
| $50.000 | $207 |
| $150.000 | $357 |

## Wanneer Kiezen voor FTMO?

- Je trade forex of indices
- Je wilt een bewezen, stabiele firm
- Je waardeert goede support
- Je wilt meerdere accounts combineren

## Wanneer Kiezen voor Apex?

- Je trade futures
- Je wilt 100% van je eerste winsten
- Je houdt van flexibele regels
- Je wilt snel uitbetaald worden

## Onze Conclusie

**FTMO** is de betere keuze voor forex traders die stabiliteit en een bewezen track record zoeken.

**Apex** wint voor futures traders die maximale winst willen behouden en flexibiliteit waarderen.

Beide firms zijn betrouwbaar en betalen consistent uit. Je keuze hangt af van wat je trade en wat je prioriteiten zijn.
`,
    author: defaultAuthor,
    category: "vergelijking",
    tags: ["ftmo", "apex", "vergelijking", "prop firms"],
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    readingTime: 6,
    featured: true,
    seoTitle: `FTMO vs Apex Trader Funding Vergelijking [${currentYear}]`,
    seoDescription: "Eerlijke vergelijking tussen FTMO en Apex Trader Funding. Ontdek welke prop firm beter past bij jouw trading stijl.",
  },
  {
    id: "3",
    slug: "5-tips-prop-trading-challenge-halen",
    title: "5 Bewezen Tips om Je Prop Trading Challenge te Halen",
    excerpt: "De meeste traders falen hun eerste challenge. Met deze 5 tips verhoog je je slagingskans aanzienlijk.",
    content: `
## Waarom Falen de Meeste Traders?

Statistieken tonen dat 80-90% van de traders hun eerste prop trading challenge niet haalt. Maar waarom? En belangrijker: hoe kun jij bij die succesvolle 10-20% horen?

## Tip 1: Start Kleiner Dan Je Denkt

**De fout:** Veel traders kiezen direct voor een €100.000 account omdat het "meer waard" lijkt.

**De oplossing:** Begin met €10.000 of €25.000. De challenge kosten zijn lager, de druk is minder, en je leert het proces kennen.

> "Je eerste challenge is een leerervaring. Behandel het als een investering in je educatie." - Succesvolle funded trader

## Tip 2: Ken Je Maximale Risico Per Trade

**De wiskunde:**
- Max daily drawdown: 5%
- Als je 3 trades per dag doet
- Max risico per trade: ~1.5%

**In de praktijk:** Gebruik 0.5-1% risico per trade. Dit geeft je ruimte voor fouten zonder direct te falen.

## Tip 3: Focus op Consistentie, Niet op Targets

**De valkuil:** Het profit target proberen te halen in de eerste week.

**De mindset shift:**
- Je hebt geen tijdslimiet (bij de meeste firms)
- 0.5% per dag = 10% in 20 handelsdagen
- Consistente kleine winsten > sporadische grote winsten

## Tip 4: Behandel Het Als Echt Geld

**Het probleem:** "Het is toch maar een challenge" mentaliteit.

**De realiteit:**
- Je betaalt echte challenge fees
- De skills die je ontwikkelt zijn echt
- Na de challenge trade je met echt kapitaal

Trade alsof elke euro je eigen geld is. Dit bouwt de juiste gewoontes.

## Tip 5: Heb een Duidelijk Plan

Voordat je begint, weet:
- Welke pairs/instruments je trade
- Op welke tijden je trade
- Wat je entry en exit criteria zijn
- Wanneer je NIET trade

**Schrijf het op.** Volg het. Geen uitzonderingen.

## Bonus: De Eerste Dagen

- Dag 1-3: Trade klein, leer het platform
- Dag 4-7: Normale posities, volg je plan
- Week 2+: Consistente executie

## Conclusie

Het halen van een prop trading challenge draait niet om geluk of spectaculaire trades. Het gaat om:

1. Risicomanagement
2. Consistentie
3. Discipline
4. Geduld

Volg deze tips en je vergroot je kans op succes aanzienlijk.

**Klaar om te beginnen?** [Bekijk onze prop firm vergelijking](/prop-firms) en kies de beste firm voor jou.
`,
    author: defaultAuthor,
    category: "tips",
    tags: ["tips", "challenge", "risicomanagement", "strategie"],
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    readingTime: 5,
    featured: false,
    seoTitle: "5 Tips om Je Prop Trading Challenge te Halen [Bewezen]",
    seoDescription: "Verhoog je slagingskans met deze 5 bewezen tips voor prop trading challenges. Van risicomanagement tot de juiste mindset.",
  },
  {
    id: "4",
    slug: "prop-trading-nieuws-januari-2025",
    title: "Prop Trading Nieuws: Updates van FTMO, Apex en Meer",
    excerpt: "De laatste ontwikkelingen in de prop trading industrie. Nieuwe features, prijswijzigingen en belangrijke updates.",
    content: `
## Prop Trading Industry Update

Blijf op de hoogte van de laatste ontwikkelingen in de prop trading wereld.

## FTMO Updates

### Nieuwe Features
FTMO heeft recent verschillende verbeteringen doorgevoerd:
- Verbeterde dashboard interface
- Snellere payout processing
- Nieuwe educational content

### Prijzen Stabiel
De challenge prijzen blijven ongewijzigd, wat positief is gezien de inflatie in de industrie.

## Apex Trader Funding

### Promoties
Apex staat bekend om regelmatige kortingsacties. Houd hun website in de gaten voor:
- Black Friday deals
- Maandelijkse promoties
- Reset kortingen

## Industrie Trends

### Wat We Zien
1. **Meer concurrentie** - Nieuwe firms blijven toetreden
2. **Betere voorwaarden** - Profit splits stijgen
3. **Meer regulering** - Firms worden professioneler
4. **Educatie focus** - Meer nadruk op trader ontwikkeling

### Waar Op Te Letten
- Firms die te goed klinken om waar te zijn
- Onduidelijke payout voorwaarden
- Gebrek aan transparantie

## Onze Aanbevelingen

Blijf bij bewezen firms met een track record:
- FTMO (sinds 2015)
- Apex Trader Funding
- Andere gevestigde namen

**Tip:** Nieuwe firms kunnen goede deals bieden, maar wacht tot ze bewezen hebben betrouwbaar uit te betalen.

## Volgende Maand

We verwachten:
- Mogelijke prijsaanpassingen
- Nieuwe challenge types
- Platform updates

Blijf ons blog volgen voor het laatste nieuws!
`,
    author: defaultAuthor,
    category: "nieuws",
    tags: ["nieuws", "ftmo", "apex", "industrie", "updates"],
    publishedAt: new Date().toISOString(), // Today
    readingTime: 4,
    featured: false,
    seoTitle: "Prop Trading Nieuws: Laatste Updates & Ontwikkelingen",
    seoDescription: "Het laatste nieuws over prop trading firms. Updates van FTMO, Apex en industrie trends.",
  },
]

// Helper functions for n8n integration
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter((post) => post.category === category)
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured)
}

export function getRecentPosts(limit: number = 5): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  blogPosts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)))
  return Array.from(tags).sort()
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag))
}

// For n8n: Add a new post (this would be called via API)
export function addPost(post: Omit<BlogPost, "id">): BlogPost {
  const newPost: BlogPost = {
    ...post,
    id: String(blogPosts.length + 1),
  }
  blogPosts.push(newPost)
  return newPost
}

// Generate reading time from content
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
