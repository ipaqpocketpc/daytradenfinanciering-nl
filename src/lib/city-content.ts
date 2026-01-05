/**
 * City Content Generator
 * Generates rich, SEO-friendly content for city pages
 * Target: 500-800 words per page
 */

import type { City } from "@/config/cities"
import { generateCityStats } from "@/config/cities"
import { seededRandom, hashString } from "@/lib/utils"

export interface CityTip {
  title: string
  description: string
}

export interface CityStat {
  label: string
  value: string
  description: string
}

// Province-specific economic context
const provinceEconomicContext: Record<string, string> = {
  "Noord-Holland": "Noord-Holland is het financieel centrum van Nederland, met de Amsterdam Exchange (AEX) en talloze fintech bedrijven. Dit maakt de provincie ideaal voor traders die dicht bij de markt willen zijn.",
  "Zuid-Holland": "Zuid-Holland combineert de internationale handelsgeest van Rotterdam met de politieke stabiliteit van Den Haag. De regio kent een sterke ondernemersmentaliteit die past bij prop trading.",
  "Utrecht": "Utrecht ligt centraal in Nederland en is een groeiende tech-hub. De stad trekt veel jonge professionals aan, waaronder een actieve trading community.",
  "Noord-Brabant": "Noord-Brabant is bekend om zijn innovatieve bedrijfscultuur. De High Tech Campus in Eindhoven en het ondernemersklimaat maken het een aantrekkelijke regio voor traders.",
  "Gelderland": "Gelderland biedt een rustige werkomgeving met lagere kosten dan de Randstad. Veel traders kiezen bewust voor deze provincie vanwege de betere werk-prive balans.",
  "Overijssel": "Overijssel combineert een sterke werkethiek met een hoge kwaliteit van leven. De lagere levenskosten betekenen dat traders meer van hun winst overhouden.",
  "Groningen": "Groningen heeft een jonge, dynamische bevolking door de universiteit. De stad kent een groeiende community van tech-savvy traders en investeerders.",
  "Limburg": "Limburg ligt strategisch op de grens met Duitsland en Belgie. Dit internationale karakter trekt traders aan die in meerdere markten actief zijn.",
  "Friesland": "Friesland biedt rust en ruimte om gefocust te traden. De nuchtere Friese mentaliteit past goed bij de discipline die prop trading vereist.",
  "Flevoland": "Flevoland is een jonge provincie met een moderne infrastructuur. De nabijheid van Amsterdam maakt het aantrekkelijk voor traders die willen profiteren van lagere huizenprijzen.",
  "Drenthe": "Drenthe biedt de ultieme rust voor traders die afleiding willen minimaliseren. De lage bevolkingsdichtheid betekent meer focus op je trading.",
  "Zeeland": "Zeeland is de rustigste provincie van Nederland. Traders hier waarderen de stilte en de lage kosten van levensonderhoud.",
}

// Generate intro based on city characteristics
function generateCityIntro(city: City): string {
  const stats = generateCityStats(city)
  const year = new Date().getFullYear()

  const priorityIntros: Record<1 | 2 | 3, string> = {
    1: `${city.name} is een van de belangrijkste prop trading centra van Nederland in ${year}. Met meer dan ${stats.tradersActive.toLocaleString("nl-NL")} actieve traders behoort de stad tot de top 10 van Nederlandse trading hubs.`,
    2: `${city.name} heeft zich ontwikkeld tot een groeiend centrum voor prop trading in ${year}. De stad telt inmiddels ${stats.tradersActive.toLocaleString("nl-NL")}+ actieve traders die dagelijks de markten analyseren.`,
    3: `${city.name} is een opkomende locatie voor prop traders in Nederland. Hoewel kleiner dan de grote steden, groeit de lokale trading community gestaag tot ${stats.tradersActive.toLocaleString("nl-NL")}+ actieve traders in ${year}.`,
  }

  return `
${priorityIntros[city.priority]}

De prop trading scene in ${city.name} kenmerkt zich door ${city.priority === 1 ? "een professionele en dynamische sfeer" : city.priority === 2 ? "een hechte community van serieuze traders" : "persoonlijke connecties en een groeiende interesse in trading"}. Traders uit ${city.name} kiezen vaak voor ${stats.popularFirm} als hun prop firm, mede vanwege de gunstige voorwaarden en betrouwbare uitbetalingen.

Of je nu een ervaren trader bent of net begint met prop trading, ${city.name} biedt een solide basis om je trading carriere te ontwikkelen. In deze gids ontdek je alles over prop trading in ${city.name}: van lokale tips tot de beste strategieen voor succes.
`.trim()
}

// Generate why this city section
function generateWhyThisCity(city: City): string {
  const stats = generateCityStats(city)
  const provinceContext = provinceEconomicContext[city.province] || "Deze regio biedt uitstekende mogelijkheden voor prop traders."

  const advantages = [
    city.priority === 1
      ? `${city.name} is een van de grootste steden van Nederland met uitstekende voorzieningen en netwerkmogelijkheden.`
      : city.priority === 2
        ? `${city.name} biedt een goede balans tussen stedelijke voorzieningen en leefbaarheid.`
        : `${city.name} biedt lagere kosten en meer rust, ideaal om gefocust te traden.`,
    `De provincie ${city.province} heeft een sterke economische basis.`,
    `${stats.tradersActive.toLocaleString("nl-NL")}+ traders bewijzen dat prop trading hier floreert.`,
  ]

  return `
## Waarom Prop Trading in ${city.name}?

${provinceContext}

**Voordelen van traden vanuit ${city.name}:**

${advantages.map(a => `- ${a}`).join("\n")}

Daarnaast profiteer je in ${city.name} van de Nederlandse digitale infrastructuur. Snelle internetverbindingen zijn essentieel voor prop trading, en Nederland behoort tot de wereldtop qua connectiviteit. Of je nu vanuit huis tradet of een workspace huurt, je hebt toegang tot betrouwbare verbindingen.

De gemiddelde trader in ${city.name} behaalt een success rate van ${stats.successRate}% bij prop firm challenges. Dit ligt ${stats.successRate > 15 ? "boven" : "rond"} het landelijk gemiddelde, wat aantoont dat de lokale community goed presteert.
`.trim()
}

// Generate networking section
function generateNetworkingSection(city: City): string {
  const hasLargeCommunity = city.priority === 1
  const hasMediumCommunity = city.priority <= 2

  if (hasLargeCommunity) {
    return `
## Netwerken en Community in ${city.name}

${city.name} heeft een actieve prop trading community met regelmatige mogelijkheden om gelijkgestemde traders te ontmoeten:

**Online Communities:**
- Lokale Discord en Telegram groepen voor ${city.name}se traders
- Facebook groepen gericht op trading in de ${city.province} regio
- LinkedIn netwerken voor professionele traders

**Offline Mogelijkheden:**
- Trading meetups in lokale horeca of coworking spaces
- Financiele events en seminars in de stad
- Informele koffie-afspraken met medetraders

Het netwerken met andere traders kan je trading enorm verbeteren. Je leert van elkaars fouten, deelt strategieen, en krijgt mentale support tijdens moeilijke periodes. In een stad als ${city.name} zijn er volop mogelijkheden om deze connecties te maken.

**Tip:** Zoek op social media naar "${city.name} traders" of "prop trading ${city.province}" om lokale groepen te vinden.
`.trim()
  }

  if (hasMediumCommunity) {
    return `
## Netwerken met Traders in ${city.name}

Hoewel ${city.name} geen grote trading hub is zoals Amsterdam of Rotterdam, zijn er zeker mogelijkheden om contact te maken met medetraders:

**Waar je andere traders vindt:**
- Nederlandse trading Discord servers (veel traders uit ${city.province})
- Regionale Facebook groepen voor investeerders en traders
- LinkedIn connecties met traders in jouw omgeving

**Alternatieve netwerkmogelijkheden:**
- Online trading communities bieden 24/7 interactie
- Webinars en online events zijn toegankelijk vanuit elke locatie
- De prop firm community zelf (forums, Discord servers van firms)

Het voordeel van een kleinere stad is dat de community hechter is. Wanneer je eenmaal contact hebt met andere ${city.name}se traders, ontstaan vaak langdurige professionele relaties.
`.trim()
  }

  return `
## Contact met Andere Traders

Als trader in ${city.name} ben je niet alleen. Hoewel de lokale community kleiner is dan in de Randstad, kun je online eenvoudig contact maken met duizenden Nederlandse traders:

**Online mogelijkheden:**
- Nederlandse prop trading Discord servers
- Reddit communities zoals r/dutchfire en trading subreddits
- Twitter/X trading community (@NLTraders etc.)

**Voordelen van een kleinere stad:**
- Minder afleiding, meer focus op je trading
- Lagere kosten betekenen minder druk om snel te verdienen
- Betere werk-prive balans ondersteunt consistent traden

Veel succesvolle prop traders werken vanuit kleinere steden. De rust en focus die dit biedt weegt vaak op tegen het kleinere lokale netwerk.
`.trim()
}

// Generate local trading tips
function generateCityTips(city: City): CityTip[] {
  const baseTips: CityTip[] = [
    {
      title: "Creeer een dedicated workspace",
      description: `In ${city.name} kun je vaak voor een redelijke prijs een rustige werkplek inrichten. Een vaste tradingplek verbetert je focus en discipline.`,
    },
    {
      title: "Sluit je aan bij lokale groepen",
      description: `Zoek naar trading communities in ${city.province}. Andere traders uit je regio begrijpen je situatie en kunnen waardevolle tips delen.`,
    },
    {
      title: "Benut de Nederlandse tijdzone",
      description: "De CET/CEST tijdzone is ideaal voor het traden van de London en New York sessie overlap - de meest actieve trading periode.",
    },
    {
      title: "Houd rekening met belastingen",
      description: "Als prop trader in Nederland val je onder Box 1 belasting. Houd vanaf het begin een goede administratie bij van al je payouts en kosten.",
    },
    {
      title: "Start met een kleinere account",
      description: "Begin met een $25K-$50K challenge om ervaring op te doen. Opschalen kan altijd nog na bewezen consistentie.",
    },
  ]

  // Add city-specific tips based on characteristics
  if (city.priority === 1) {
    baseTips.push({
      title: "Bezoek lokale trading events",
      description: `${city.name} organiseert regelmatig financiele events. Houd de agenda in de gaten voor netwerkmogelijkheden.`,
    })
  }

  if (city.province === "Noord-Holland" || city.province === "Zuid-Holland") {
    baseTips.push({
      title: "Overweeg een coworking space",
      description: `In de Randstad zijn veel coworking spaces beschikbaar. Dit kan helpen om trading en prive gescheiden te houden.`,
    })
  }

  return baseTips.slice(0, 5)
}

// Generate city-specific FAQs
function generateCityFaqs(city: City): { question: string; answer: string }[] {
  const stats = generateCityStats(city)
  const year = new Date().getFullYear()

  return [
    {
      question: `Hoeveel prop traders zijn er in ${city.name}?`,
      answer: `In ${year} zijn er naar schatting ${stats.tradersActive.toLocaleString("nl-NL")}+ actieve prop traders in ${city.name}. Dit aantal groeit jaarlijks naarmate meer mensen de mogelijkheden van prop trading ontdekken.`,
    },
    {
      question: `Welke prop firm is het populairst in ${city.name}?`,
      answer: `${stats.popularFirm} is momenteel de meest gekozen prop firm onder ${city.name}se traders. Dit komt door de betrouwbare reputatie, eerlijke regels, en consistente uitbetalingen.`,
    },
    {
      question: `Kan ik prop trading doen vanuit ${city.name}?`,
      answer: `Ja, prop trading is volledig locatie-onafhankelijk. Alles wat je nodig hebt is een computer, stabiele internetverbinding, en een prop firm account. ${city.name} biedt uitstekende infrastructuur hiervoor.`,
    },
    {
      question: `Zijn er trading meetups in ${city.name}?`,
      answer: city.priority === 1
        ? `Ja, in ${city.name} worden regelmatig trading meetups en financiele events georganiseerd. Zoek op social media naar lokale trading groepen om op de hoogte te blijven.`
        : `Formele trading meetups zijn in ${city.name} minder frequent, maar via online communities kun je contact leggen met traders uit de regio voor informele bijeenkomsten.`,
    },
    {
      question: `Wat zijn de voordelen van prop trading in ${city.name}?`,
      answer: `${city.name} biedt ${city.priority === 1 ? "een dynamische omgeving met veel netwerkmogelijkheden" : city.priority === 2 ? "een goede balans tussen stedelijke voorzieningen en rust" : "een rustige omgeving met lagere kosten"}. Daarnaast profiteer je van de uitstekende Nederlandse digitale infrastructuur.`,
    },
  ]
}

// Generate statistics section content
function generateStatsSection(city: City): CityStat[] {
  const stats = generateCityStats(city)
  const year = new Date().getFullYear()

  return [
    {
      label: "Actieve Traders",
      value: `${stats.tradersActive.toLocaleString("nl-NL")}+`,
      description: `Geschat aantal prop traders in ${city.name} (${year})`,
    },
    {
      label: "Funded Accounts",
      value: `${stats.accountsOpened.toLocaleString("nl-NL")}+`,
      description: "Traders die succesvol een challenge hebben gehaald",
    },
    {
      label: "Success Rate",
      value: `${stats.successRate}%`,
      description: "Gemiddeld slagingspercentage voor challenges",
    },
    {
      label: "Populairste Firm",
      value: stats.popularFirm,
      description: `Meest gekozen prop firm in ${city.name}`,
    },
    {
      label: "Gem. Account Grootte",
      value: `€${(stats.avgAccountSize).toLocaleString("nl-NL")}`,
      description: "Gemiddelde funded account grootte",
    },
    {
      label: "Gem. Maandwinst",
      value: `€${stats.avgMonthlyProfit.toLocaleString("nl-NL")}`,
      description: "Van succesvolle funded traders",
    },
  ]
}

// Generate getting started section
function generateGettingStarted(city: City): string {
  const stats = generateCityStats(city)

  return `
## Starten met Prop Trading in ${city.name}

Wil je beginnen met prop trading vanuit ${city.name}? Volg deze stappen:

### 1. Educatie Eerst
Voordat je een challenge koopt, investeer in je trading educatie. Leer de basis van technische analyse, risicomanagement, en trading psychologie. De meeste mislukte challenges komen door gebrek aan voorbereiding.

### 2. Demo Trading
Oefen minimaal 3 maanden op een demo account. Dit kost je niets en geeft je de kans om een winstgevende strategie te ontwikkelen zonder financieel risico.

### 3. Kies de Juiste Prop Firm
${stats.popularFirm} is populair onder ${city.name}se traders, maar vergelijk altijd meerdere opties. Let op:
- Challenge kosten en regels
- Profit split percentage
- Uitbetalingssnelheid
- Reputatie en betrouwbaarheid

### 4. Start Klein
Begin met een kleinere account ($25K-$50K) om ervaring op te doen. De druk is lager en je leert het proces kennen zonder groot financieel risico.

### 5. Bouw Consistentie
Focus niet op snelle winsten, maar op consistente resultaten. Prop firms waarderen stabiele traders die dag na dag binnen de regels blijven.

Met de juiste voorbereiding en instelling kun je vanuit ${city.name} een succesvolle prop trading carriere opbouwen. De ${stats.tradersActive.toLocaleString("nl-NL")}+ traders in de stad bewijzen dat het mogelijk is.
`.trim()
}

// Generate tools callout
function generateToolsCallout(city: City): string {
  return `
### Handige Tools

Gebruik onze gratis tools om je trading te verbeteren:

- [Position Size Calculator](/tools/position-size-calculator) - Bereken de juiste positiegrootte
- [Risk-Reward Calculator](/tools/risk-reward-calculator) - Analyseer je trade setups
- [Drawdown Calculator](/tools/drawdown-calculator) - Monitor je risico
- [Challenge ROI Calculator](/tools/challenge-roi-calculator) - Bereken de ROI van je challenge

Vergelijk alle prop firms op onze [vergelijkingspagina](/vergelijk) om de beste keuze te maken.
`.trim()
}

// Main function to generate all content for a city
export function generateCityContent(city: City): {
  intro: string
  whyThisCity: string
  networking: string
  gettingStarted: string
  toolsCallout: string
  tips: CityTip[]
  statistics: CityStat[]
  faqs: { question: string; answer: string }[]
} {
  return {
    intro: generateCityIntro(city),
    whyThisCity: generateWhyThisCity(city),
    networking: generateNetworkingSection(city),
    gettingStarted: generateGettingStarted(city),
    toolsCallout: generateToolsCallout(city),
    tips: generateCityTips(city),
    statistics: generateStatsSection(city),
    faqs: generateCityFaqs(city),
  }
}

// Export individual generators for flexibility
export {
  generateCityIntro,
  generateWhyThisCity,
  generateNetworkingSection,
  generateCityTips,
  generateCityFaqs,
  generateStatsSection,
  generateGettingStarted,
  generateToolsCallout,
}
