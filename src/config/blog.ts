// Blog Configuration - daytradenfinanciering.nl
// Focus: Hoe krijg je trading kapitaal? (niet vergelijken)

const currentYear = new Date().getFullYear()

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar?: string
  }
  category: BlogCategory
  tags: string[]
  publishedAt: string
  updatedAt?: string
  readingTime: number
  featured: boolean
  seoTitle?: string
  seoDescription?: string
  coverImage?: string
}

export type BlogCategory =
  | "financiering"
  | "beginners"
  | "strategie"
  | "psychologie"
  | "gids"
  | "nieuws"

export const blogCategories: Record<BlogCategory, { name: string; description: string; color: string }> = {
  financiering: {
    name: "Financiering",
    description: "Alles over trading kapitaal verkrijgen",
    color: "bg-emerald-500/20 text-emerald-400",
  },
  beginners: {
    name: "Beginners",
    description: "Eerste stappen naar funded trading",
    color: "bg-blue-500/20 text-blue-400",
  },
  strategie: {
    name: "Strategie",
    description: "Trading strategieën voor funded accounts",
    color: "bg-purple-500/20 text-purple-400",
  },
  psychologie: {
    name: "Psychologie",
    description: "Mentale aspecten van trading",
    color: "bg-orange-500/20 text-orange-400",
  },
  gids: {
    name: "Gids",
    description: "Stap-voor-stap handleidingen",
    color: "bg-cyan-500/20 text-cyan-400",
  },
  nieuws: {
    name: "Nieuws",
    description: "Updates uit de funded trading wereld",
    color: "bg-pink-500/20 text-pink-400",
  },
}

export const defaultAuthor = {
  name: "Redactie",
  avatar: "/images/authors/redactie.png",
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "trading-kapitaal-zonder-eigen-geld",
    title: "Trading Kapitaal Krijgen Zonder Eigen Geld: Zo Werkt Het",
    excerpt: "Wil je traden maar heb je geen startkapitaal? Ontdek hoe je tot €200.000 trading kapitaal kunt krijgen zonder eigen geld te riskeren.",
    content: `# Trading Kapitaal Krijgen Zonder Eigen Geld

Je wilt traden. Je hebt de kennis, de motivatie, en misschien zelfs al een winstgevende strategie op demo. Maar er is één probleem: je hebt geen €10.000 of €50.000 om mee te beginnen.

Goed nieuws: je hebt dat geld ook niet nodig.

## Het Probleem van Traditioneel Traden

Bij traditioneel traden heb je eigen kapitaal nodig. En dat brengt problemen:

- **Hoog risico** - Je kunt je eigen spaargeld verliezen
- **Emotionele druk** - Traden met geld dat je niet kunt missen
- **Beperkte groei** - Je kunt alleen traden met wat je hebt
- **Lange opbouw** - Jaren sparen voordat je serieus kunt beginnen

## De Oplossing: Funded Trading

Funded trading draait het traditionele model om. In plaats van je eigen geld te riskeren, bewijs je eerst je skills. Daarna krijg je toegang tot professioneel trading kapitaal.

### Hoe Het Werkt

1. **Je doet een evaluatie** - Een test om je trading skills te bewijzen
2. **Je toont consistentie** - Laat zien dat je winstgevend kunt traden
3. **Je krijgt kapitaal** - Toegang tot €10.000 tot €200.000+
4. **Je deelt de winst** - Houd 80-90% van wat je verdient

## Wat Heb Je Nodig?

### Geen Geld, Wel Skills

Je hebt geen groot bedrag nodig om te starten. Wat je wél nodig hebt:

- **Een trading strategie** - Weet hoe je winstgevend kunt traden
- **Risicomanagement** - Begrijp hoe je verliezen beperkt
- **Discipline** - Volg je eigen regels consequent
- **Geduld** - Haast je niet naar de winst

### De Evaluatie

De evaluatie kost een kleine vergoeding (vaak €100-€500 afhankelijk van de account grootte). Dit is je investering. Vergelijk het met:

- Veel minder dan een trading cursus
- Een fractie van het kapitaal dat je krijgt
- Terugbetaald bij succes (bij veel aanbieders)

## Hoeveel Kapitaal Kun Je Krijgen?

De meeste funded trading programma's bieden:

| Account Size | Typische Evaluatiekosten |
|--------------|-------------------------|
| €10.000 | €89-€150 |
| €25.000 | €200-€300 |
| €50.000 | €300-€400 |
| €100.000 | €500-€600 |
| €200.000 | €900-€1.100 |

Met €200 investering kun je dus toegang krijgen tot €25.000+ trading kapitaal. Dat is een verhouding van 1:125.

## Is Dit Echt?

Ja. Funded trading is een bewezen model dat al jaren bestaat. Professionele trading firms gebruiken dit systeem om:

- Talent te ontdekken zonder grote HR-kosten
- Risico te spreiden over meerdere traders
- Te profiteren van schaal

Voor jou als trader betekent dit: bewijs je skills, krijg kapitaal, houd het grootste deel van je winst.

## Eerste Stappen

Wil je beginnen met funded trading? Dit is wat je moet doen:

1. **Oefen je strategie** - Zorg dat je consistent winstgevend bent op demo
2. **Begrijp de regels** - Leer de evaluatievereisten kennen
3. **Start klein** - Begin met een kleinere account size
4. **Bouw op** - Na succes kun je opschalen

[Bekijk hoe je kunt beginnen](/beginnen) of ontdek [hoe funded trading precies werkt](/hoe-werkt-het).

## Conclusie

Je hebt geen €50.000 nodig om te traden. Met funded trading kun je met een kleine investering toegang krijgen tot serieus kapitaal. Het enige wat je nodig hebt is de skill om consistent te traden.

De vraag is niet of je het geld hebt. De vraag is: kun je traden?`,
    author: defaultAuthor,
    category: "financiering",
    tags: ["trading kapitaal", "funded trading", "beginnen", "geen eigen geld"],
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 6,
    featured: true,
    seoTitle: `Trading Kapitaal Zonder Eigen Geld [${currentYear}]`,
    seoDescription: "Ontdek hoe je tot €200.000 trading kapitaal krijgt zonder eigen geld te riskeren. Complete uitleg over funded trading.",
  },
  {
    id: "2",
    slug: "van-demo-naar-funded-trader",
    title: "Van Demo Account naar Funded Trader: Het Complete Pad",
    excerpt: "Je bent winstgevend op demo. Nu wil je echt kapitaal. Dit is het exacte pad van demo trading naar een funded account.",
    content: `# Van Demo Account naar Funded Trader

Je hebt maanden geoefend op een demo account. Je strategie werkt. Je bent consistent. Nu is het tijd voor de volgende stap: echt kapitaal.

Maar hoe maak je die overgang? Dit artikel legt het complete pad uit.

## Fase 1: Demo Perfectie

Voordat je aan een funded account denkt, moet je zeker weten dat je strategie werkt.

### Checklist Demo Fase

- [ ] Minimaal 3 maanden consistent winstgevend
- [ ] Duidelijke trading regels opgeschreven
- [ ] Maximum drawdown van 5% of minder
- [ ] Gemiddeld 2-5% winst per maand
- [ ] Trading dagboek bijgehouden

### Waarom Dit Belangrijk Is

Bij funded trading heb je strikte regels. Als je op demo al moeite hebt om binnen de limieten te blijven, wordt het met echt kapitaal niet makkelijker.

## Fase 2: Mentale Voorbereiding

De overgang van demo naar echt kapitaal is vooral mentaal.

### Het Verschil

Op demo voel je geen druk. Bij funded trading:

- Elke trade telt
- Er zijn consequenties bij fouten
- De emoties zijn intenser

### Hoe Je Voorbereidt

1. **Trade alsof het echt is** - Behandel je demo als een funded account
2. **Houd je aan je regels** - Geen "het is toch maar demo" excuses
3. **Volg je risicomanagement** - Altijd, zonder uitzondering

## Fase 3: De Evaluatie

Nu ben je klaar voor de echte test.

### Wat Te Verwachten

De meeste evaluaties vragen:

- **Profit target**: Meestal 8-10% winst maken
- **Maximum verlies**: Dagelijks (vaak 5%) en totaal (vaak 10%)
- **Consistentie**: Geen extreme schommelingen
- **Tijdsperiode**: Variabel, vaak geen harde deadline

### Tips Voor Succes

**Start klein**: Kies een account size waar je comfortabel mee bent.

**Neem je tijd**: Je hebt vaak geen deadline. Haast is je vijand.

**Focus op regels**: Profit komt vanzelf als je je aan de regels houdt.

**Geen revenge trading**: Na een verlies, stop. Morgen is er weer een dag.

## Fase 4: Je Eerste Funded Trades

Je hebt de evaluatie gehaald. Nu heb je echt kapitaal. Dit is het moment waar het om draait.

### De Eerste Week

- **Trade kleiner** - Begin met 50% van je normale positiegrootte
- **Volg je plan** - Exact hetzelfde als tijdens de evaluatie
- **Geen experimenten** - Dit is niet het moment voor nieuwe strategieën

### Veelgemaakte Fouten

❌ Direct groot beginnen omdat je "nu echt kapitaal hebt"

❌ Je strategie aanpassen omdat je nu "serieuzer" wilt traden

❌ Overtraden om snel winst te maken

✅ Doe precies wat je deed tijdens de evaluatie

## Fase 5: Opschalen

Na je eerste succesvolle maanden kun je opschalen.

### Wanneer Opschalen?

- Minimaal 2-3 maanden consistent op je funded account
- Je huidige account size voelt te klein
- Je bent mentaal klaar voor grotere bedragen

### Hoe Opschalen

De meeste funded trading programma's bieden:

- Automatische account groei bij consistente winst
- Mogelijkheid om een grotere account aan te vragen
- Meerdere accounts tegelijk te beheren

## Het Tijdpad

| Fase | Typische Duur |
|------|---------------|
| Demo perfectie | 3-6 maanden |
| Mentale voorbereiding | 2-4 weken |
| Evaluatie | 2-8 weken |
| Eerste funded maanden | 3 maanden |
| Klaar om te schalen | 6+ maanden totaal |

## Conclusie

Van demo naar funded trader is een reis, geen sprint. Neem de tijd, volg het proces, en bouw stap voor stap naar je doel.

Het belangrijkste? **Je strategie verandert niet**. Of je nu op demo tradet of met €200.000 - de basis blijft hetzelfde.

Klaar om te beginnen? [Ontdek hoe je je eerste kapitaal krijgt](/beginnen).`,
    author: defaultAuthor,
    category: "gids",
    tags: ["demo account", "funded trader", "transitie", "beginners"],
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 7,
    featured: true,
    seoTitle: `Van Demo naar Funded Trader: Complete Gids [${currentYear}]`,
    seoDescription: "Het exacte pad van demo trading naar een funded account. Leer hoe je de overgang maakt en je eerste kapitaal krijgt.",
  },
  {
    id: "3",
    slug: "5-fouten-bij-funded-trading-evaluatie",
    title: "5 Fouten Die Je Evaluatie Verpesten (En Hoe Je Ze Vermijdt)",
    excerpt: "De meeste traders falen hun eerste evaluatie. Niet door gebrek aan skill, maar door vermijdbare fouten. Dit zijn de 5 grootste.",
    content: `# 5 Fouten Die Je Evaluatie Verpesten

80% van de traders faalt hun eerste funded trading evaluatie. Het gekke? De meesten falen niet door slechte trading skills. Ze falen door vermijdbare fouten.

Dit zijn de 5 grootste fouten - en hoe je ze vermijdt.

## Fout 1: Te Snel Het Target Willen Halen

### Het Probleem

Je moet 8% winst maken. Je denkt: "Als ik 2% per dag maak, ben ik in 4 dagen klaar!"

Dus je neemt grotere posities. Je tradet vaker. En dan...

Je raakt je dagelijkse verlies limiet in één slechte trade.

### De Oplossing

**Denk in weken, niet dagen.**

- Je hebt vaak geen tijdslimiet
- 0.5% per dag = 10% in 20 dagen
- Consistente kleine winsten zijn beter dan snelle grote winsten

De evaluatie test je discipline, niet je snelheid.

## Fout 2: Risico Per Trade Te Hoog

### Het Probleem

Bij een €50.000 account denk je: "5% dagelijkse drawdown = €2.500 marge."

Dus je riskeert €500 per trade. Na 5 verliezers op rij ben je klaar.

### De Oplossing

**Riskeer maximaal 1% per trade.**

| Account | Max Risico Per Trade |
|---------|---------------------|
| €10.000 | €100 |
| €25.000 | €250 |
| €50.000 | €500 |
| €100.000 | €1.000 |

Met 1% risico kun je 5 verliezers op rij hebben en nog steeds binnen de dagelijkse limiet blijven.

## Fout 3: Regels Niet Kennen

### Het Probleem

Je hebt de evaluatie gekocht. Direct beginnen met traden!

Drie dagen later ontdek je dat je niet tijdens nieuws mocht traden. Of dat er een minimum aantal tradingdagen was. Account gefaald.

### De Oplossing

**Lees ALLES voordat je begint.**

Specifiek:
- Maximum dagelijks verlies
- Maximum totaal verlies
- Profit target
- Toegestane instrumenten
- Trading uren
- Nieuwsrestricties
- Minimum tradingdagen

Print de regels uit. Hang ze naast je scherm.

## Fout 4: Emotioneel Traden Na Verlies

### Het Probleem

Je verliest 2% op maandag. Nu moet je dat "terugverdienen."

Je tradet groter. Je neemt trades die je normaal zou skippen. Je maakt nog 2% verlies.

Nu ben je 4% down en in paniek.

### De Oplossing

**Stop na een verliesdag.**

Serieus. Sluit je platform. Ga iets anders doen.

Morgen is er weer een dag. Je evaluatie heeft geen deadline. Die ene slechte dag hoef je niet vandaag nog goed te maken.

## Fout 5: Je Strategie Aanpassen Tijdens De Evaluatie

### Het Probleem

Je normale strategie geeft 3 signalen per dag. Maar je wilt sneller klaar zijn.

Dus je voegt een nieuwe strategie toe. Of je verlaagt je criteria. Meer trades = sneller target bereiken, toch?

Fout. Meer trades = meer kans op fouten.

### De Oplossing

**Trade exact zoals op demo.**

Je strategie heeft je naar de evaluatie gebracht. Vertrouw erop.

Als je strategie gemiddeld 0.5% per dag oplevert op demo, verwacht dan hetzelfde tijdens de evaluatie. Niet meer.

## Bonus: De Juiste Mindset

De evaluatie is geen examen waar je snel doorheen moet.

Het is een demonstratie van je normale trading. Laat zien wat je kunt. Consistent. Gedisciplineerd. Zonder haast.

## Checklist Voor Je Evaluatie

- [ ] Regels gelezen en begrepen
- [ ] Risico per trade bepaald (max 1%)
- [ ] Geen tijdsdruk - je hebt geen haast
- [ ] Plan voor verliesdays (stoppen)
- [ ] Zelfde strategie als op demo

## Conclusie

De meeste evaluatie-fouten zijn niet trading fouten. Het zijn discipline fouten. Ken de regels. Beheer je risico. Neem je tijd.

Je strategie is goed genoeg. Nu moet je alleen nog de discipline hebben om hem te volgen.

[Klaar om te beginnen?](/beginnen) Start met de juiste mindset.`,
    author: defaultAuthor,
    category: "strategie",
    tags: ["evaluatie", "fouten vermijden", "tips", "risicomanagement"],
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 6,
    featured: false,
    seoTitle: "5 Fouten Die Je Funded Trading Evaluatie Verpesten",
    seoDescription: "De 5 grootste fouten die traders maken tijdens hun evaluatie. Plus concrete tips om ze te vermijden.",
  },
  {
    id: "4",
    slug: "hoeveel-kun-je-verdienen-als-funded-trader",
    title: "Hoeveel Kun Je Verdienen Als Funded Trader? (Realistische Cijfers)",
    excerpt: "Geen hype, geen onrealistische beloftes. Dit is wat je realistisch kunt verdienen met funded trading.",
    content: `# Hoeveel Kun Je Verdienen Als Funded Trader?

Je ziet de advertenties: "€10.000 per maand verdienen met trading!" Maar wat is realistisch?

In dit artikel delen we echte cijfers. Geen hype. Geen beloftes. Gewoon wiskunde.

## De Basisformule

Je verdiensten als funded trader hangen af van drie factoren:

1. **Account grootte** - Hoeveel kapitaal je beheert
2. **Maandelijks rendement** - Je gemiddelde winst percentage
3. **Profit split** - Hoeveel je houdt van de winst

### De Formule

**Verdiensten = Account × Rendement × Profit Split**

## Realistische Rendementen

Laten we eerlijk zijn over wat "goed" is:

| Niveau | Maandelijks Rendement |
|--------|----------------------|
| Beginner | 2-4% |
| Gemiddeld | 4-6% |
| Gevorderd | 6-10% |
| Expert | 10%+ |

**Belangrijk**: Consistentie is belangrijker dan hoogte. 3% elke maand is beter dan 10% gevolgd door -8%.

## Voorbeeldberekeningen

### Scenario 1: Beginnende Funded Trader

- Account: €25.000
- Rendement: 3% per maand
- Profit split: 80%

**Verdiensten: €25.000 × 3% × 80% = €600/maand**

### Scenario 2: Ervaren Funded Trader

- Account: €100.000
- Rendement: 5% per maand
- Profit split: 85%

**Verdiensten: €100.000 × 5% × 85% = €4.250/maand**

### Scenario 3: Professionele Funded Trader

- Account: €200.000
- Rendement: 6% per maand
- Profit split: 90%

**Verdiensten: €200.000 × 6% × 90% = €10.800/maand**

## De Realiteit Check

### Wat Ze Je Niet Vertellen

1. **Niet elke maand is winstgevend** - Zelfs de beste traders hebben verliesmaanden
2. **Drawdowns gebeuren** - Je account kan tijdelijk krimpen
3. **Het kost tijd** - Van €25.000 naar €200.000 account groei duurt
4. **Consistentie is moeilijk** - 3% elke maand klinkt makkelijk, maar dat is het niet

### Eerlijke Verwachtingen

| Jaar | Realistische Situatie |
|------|----------------------|
| Jaar 1 | €25-50k account, €500-1500/maand gemiddeld |
| Jaar 2 | €50-100k account, €1500-3000/maand gemiddeld |
| Jaar 3+ | €100k+ account, €3000+/maand gemiddeld |

## Hoe Je Verdiensten Verhoogt

### 1. Vergroot Je Account

De snelste weg naar meer verdiensten is een groter account. Na bewezen succes kun je:

- Opschalen naar grotere accounts
- Meerdere accounts beheren
- Hogere profit splits onderhandelen

### 2. Verbeter Je Strategie

Een verbetering van 3% naar 5% maandelijks rendement:

- €50.000 account: van €1.200 naar €2.000/maand
- Dat is €800 extra per maand
- €9.600 extra per jaar

### 3. Wees Consistent

Liever 12 maanden van 3% dan 6 maanden van 6% en 6 maanden van -2%.

Consistentie bouwt je track record. Een goed track record opent deuren naar grotere accounts.

## De Onzichtbare Voordelen

Naast directe verdiensten heeft funded trading voordelen die je niet in euro's meet:

- **Geen eigen risico** - Je verliest nooit je eigen spaargeld
- **Leerervaring** - Je ontwikkelt professionele trading skills
- **Schaalbaarheid** - Je kunt groeien zonder meer eigen geld
- **Flexibiliteit** - Trade waar en wanneer je wilt

## Is Het De Moeite Waard?

Laten we rekenen:

**Investering**: €200-400 voor een evaluatie

**Potentieel**: €500-1500/maand bij succes

**Terugverdientijd**: 1-2 maanden bij een geslaagde evaluatie

Vergeleken met andere investeringen in jezelf (opleidingen, cursussen) is de risk/reward ratio van funded trading uitstekend.

## Conclusie

Funded trading is geen get-rich-quick scheme. Het is een serieuze manier om met trading te verdienen zonder groot eigen kapitaal.

Realistische verwachtingen:
- **Jaar 1**: €500-1500/maand
- **Jaar 2**: €1500-3000/maand
- **Jaar 3+**: €3000+/maand

Het belangrijkste? Je kunt dit bereiken zonder €50.000 eigen geld te riskeren.

[Ontdek hoe je kunt beginnen](/beginnen)`,
    author: defaultAuthor,
    category: "financiering",
    tags: ["verdienen", "funded trader", "realistische verwachtingen", "inkomen"],
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 7,
    featured: false,
    seoTitle: `Hoeveel Verdien Je Als Funded Trader? [${currentYear}]`,
    seoDescription: "Realistische cijfers over wat je kunt verdienen als funded trader. Geen hype, alleen feiten en berekeningen.",
  },
  {
    id: "5",
    slug: "trading-psychologie-angst-voor-verlies",
    title: "Trading Psychologie: Omgaan Met Angst Voor Verlies",
    excerpt: "Angst voor verlies is de grootste vijand van traders. Leer hoe je deze emotie beheerst en beter gaat traden.",
    content: `# Trading Psychologie: Omgaan Met Angst Voor Verlies

Je ziet een perfecte setup. Je weet dat je moet instappen. Maar je vinger zweeft boven de knop... en je doet niets.

Of erger: je bent in een winnende trade, de prijs beweegt je kant op, maar je sluit te vroeg uit angst dat het omdraait.

Herkenbaar? Je bent niet alleen.

## Waarom Angst Voor Verlies Zo Sterk Is

Wetenschappelijk onderzoek toont: het verlies van €100 voelt twee keer zo slecht als de vreugde van €100 winnen.

Dit heet "loss aversion" en het is biologisch. Je brein is geprogrammeerd om verlies te vermijden.

### Het Probleem Voor Traders

Bij trading is verlies onvermijdelijk. Zelfs de beste traders verliezen 40-50% van hun trades. Als elke verliezende trade je verlamd...

- Je neemt geen trades meer
- Je sluit winnaars te vroeg
- Je laat verliezers te lang lopen
- Je stopt uiteindelijk met traden

## De 5 Vormen Van Verliesangst

### 1. Angst Om In Te Stappen

Je ziet setups maar neemt ze niet. "Wat als het verkeerd gaat?"

### 2. Angst Om Winst Te Verliezen

Je bent €200 in de plus. Je sluit, ook al zegt je plan: "Laat lopen tot target."

### 3. Angst Om Verlies Te Nemen

Je trade is €100 in het rood. Je verplaatst je stop loss. "Het komt wel terug."

### 4. Angst Na Een Verliesserie

Je hebt 3 trades op rij verloren. Nu durf je niets meer.

### 5. Angst Om Je Account Te Verliezen

Elke trade voelt alsof je hele account op het spel staat.

## Praktische Oplossingen

### Oplossing 1: Verklein Je Positie

Als je angstig bent, trade je waarschijnlijk te groot.

**De test**: Als een trade je wakker houdt 's nachts, is hij te groot.

**De oplossing**: Halveer je positiegrootte tot je comfortabel bent.

### Oplossing 2: Accepteer Verlies Als Bedrijfskosten

Een winkelier verwacht dat 10% van zijn voorraad niet verkoopt. Dat zijn bedrijfskosten.

Voor traders zijn verliezende trades bedrijfskosten. Ze horen erbij.

**Mindset shift**: "Ik heb niet gefaald, ik heb betaald voor informatie."

### Oplossing 3: Focus Op Het Proces, Niet Het Resultaat

Een goede trade is een trade waar je je plan volgde. Of hij wint of verliest is secundair.

**Vraag jezelf af**:
- Volgde ik mijn regels? → Goede trade
- Week ik af van mijn plan? → Slechte trade

Het resultaat bepaalt niet de kwaliteit van je beslissing.

### Oplossing 4: Bereken Je Verwachte Verlies

Als je 1% riskeert per trade en je strategie wint 60% van de tijd:

- Bij 100 trades verlies je 40 trades
- 40 × 1% = 40% "verlies" is normaal

Dit is wiskunde, geen falen.

### Oplossing 5: Neem Pauzes

Na een verlies is stoppen geen zwakte. Het is discipline.

**Regel**: Na 2% dagelijks verlies, stop ik voor vandaag.

Morgen kun je met een frisse blik verder.

## Een Oefening

De volgende keer dat je angst voelt:

1. **Benoem het**: "Ik voel angst"
2. **Lokaliseer het**: Waar voel je het? Borst? Maag?
3. **Accepteer het**: "Het is oké om dit te voelen"
4. **Kies bewust**: "Wat zegt mijn plan?"

De emotie hoef je niet weg te krijgen. Je moet alleen leren om ondanks de emotie je plan te volgen.

## De Lange Termijn

Omgaan met verliesangst is een proces, geen gebeurtenis. Het wordt makkelijker door:

- **Ervaring**: Hoe meer trades, hoe normaler verlies voelt
- **Succes**: Bewijs dat je strategie werkt over tijd
- **Routine**: Dezelfde acties herhalen bouwt vertrouwen

## Conclusie

Angst voor verlies is normaal. Het maakt je geen slechte trader. Maar je moet leren om ondanks de angst te handelen.

De beste traders voelen ook angst. Het verschil? Ze laten het niet hun beslissingen bepalen.

Begin klein. Volg je plan. Accepteer verlies als onderdeel van het spel.

[Leer meer over het opbouwen van een trading routine](/hoe-werkt-het)`,
    author: defaultAuthor,
    category: "psychologie",
    tags: ["psychologie", "angst", "verlies", "emoties", "mindset"],
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 7,
    featured: false,
    seoTitle: "Trading Psychologie: Omgaan Met Verliesangst",
    seoDescription: "Leer omgaan met angst voor verlies bij trading. Praktische tips voor een betere trading mindset.",
  },
  {
    id: "6",
    slug: "eerste-funded-account-checklist",
    title: "Je Eerste Funded Account: De Complete Checklist",
    excerpt: "Alles wat je moet regelen voordat je begint aan je eerste funded trading evaluatie. Print deze checklist uit.",
    content: `# Je Eerste Funded Account: De Complete Checklist

Je hebt besloten: je gaat voor funded trading. Maar voordat je begint, moet je goed voorbereid zijn.

Gebruik deze checklist om ervoor te zorgen dat je klaar bent.

## Deel 1: Trading Voorbereiding

### Strategie
- [ ] Ik heb een duidelijke, geteste trading strategie
- [ ] Mijn strategie is minimaal 3 maanden winstgevend op demo
- [ ] Ik heb mijn strategie opgeschreven met exacte regels
- [ ] Ik weet welke marktcondities het beste werken voor mijn strategie

### Risicomanagement
- [ ] Ik weet hoeveel ik per trade riskeer (max 1-2%)
- [ ] Ik gebruik altijd een stop loss
- [ ] Ik heb een maximum dagelijks verlies (stop trading voor de dag)
- [ ] Ik begrijp positiegrootte berekening

### Track Record
- [ ] Ik heb een trading dagboek van minimaal 50 trades
- [ ] Mijn winratio is minimaal 45-50%
- [ ] Mijn risk/reward ratio is minimaal 1:1.5
- [ ] Ik ken mijn gemiddelde winst en verlies per trade

## Deel 2: Kennis Van De Evaluatie

### Regels
- [ ] Ik ken het profit target percentage
- [ ] Ik ken de maximum dagelijkse drawdown
- [ ] Ik ken de maximum totale drawdown
- [ ] Ik weet of er minimum tradingdagen zijn
- [ ] Ik weet welke instrumenten ik mag traden
- [ ] Ik ken eventuele nieuwshandelrestricties
- [ ] Ik weet wanneer de markten open zijn

### Praktisch
- [ ] Ik heb het handelsplatform getest (demo)
- [ ] Ik weet hoe ik orders plaats
- [ ] Ik weet hoe ik mijn statistieken bekijk
- [ ] Ik heb contact informatie voor support

## Deel 3: Mentale Voorbereiding

### Mindset
- [ ] Ik begrijp dat niet elke trade wint
- [ ] Ik heb een plan voor verliesdays (stoppen)
- [ ] Ik trade niet wanneer ik emotioneel ben
- [ ] Ik heb realistische verwachtingen

### Routine
- [ ] Ik heb vaste trading uren gepland
- [ ] Ik heb een pre-trading routine (analyse)
- [ ] Ik heb een post-trading routine (review)
- [ ] Ik weet wanneer ik NIET trade

## Deel 4: Praktische Zaken

### Setup
- [ ] Mijn computer/laptop werkt goed
- [ ] Mijn internetverbinding is stabiel
- [ ] Ik heb een backup plan bij technische problemen
- [ ] Mijn werkplek is vrij van afleiding

### Tijd
- [ ] Ik heb voldoende tijd voor trading
- [ ] Mijn trading uren passen bij de markten die ik trade
- [ ] Ik heb geen grote afleidingen gepland tijdens de evaluatie

### Financieel
- [ ] Ik heb de evaluatiekosten beschikbaar
- [ ] Dit is geld dat ik kan missen
- [ ] Ik heb budget voor eventuele reset/retry

## Deel 5: De Eerste Week

### Dag 1-2
- [ ] Platform verkennen (ook als je demo deed)
- [ ] Kleine trades om gevoel te krijgen
- [ ] Focus op regels volgen, niet op winst

### Dag 3-5
- [ ] Normale trading volgens plan
- [ ] Dagboek bijhouden van elke trade
- [ ] End-of-day review

### Einde Week 1
- [ ] Evalueer je eerste week
- [ ] Pas aan waar nodig (positiegrootte, timing)
- [ ] Blijf geduldig - je hebt geen haast

## De Belangrijkste Regel

Als je twijfelt of je ergens klaar voor bent: wacht.

Een extra maand oefenen kost je niets. Een gefaalde evaluatie kost je geld en vertrouwen.

## Print Deze Checklist

Serieus. Print hem uit. Loop elk punt door voordat je begint.

Je eerste funded evaluatie is spannend. Met de juiste voorbereiding vergroot je je kans op succes enorm.

[Klaar om te beginnen? Lees hoe het werkt](/hoe-werkt-het)`,
    author: defaultAuthor,
    category: "gids",
    tags: ["checklist", "voorbereiding", "beginners", "funded account"],
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 5,
    featured: false,
    seoTitle: "Funded Account Checklist: Alles Wat Je Moet Weten",
    seoDescription: "Complete checklist voor je eerste funded trading evaluatie. Van strategie tot mentale voorbereiding.",
  },
]

// Helper functions
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

export function addPost(post: Omit<BlogPost, "id">): BlogPost {
  const newPost: BlogPost = {
    ...post,
    id: String(blogPosts.length + 1),
  }
  blogPosts.push(newPost)
  return newPost
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
