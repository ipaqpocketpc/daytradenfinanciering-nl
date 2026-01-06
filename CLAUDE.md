# CLAUDE.md - Daytradenfinanciering.nl

## Project Overzicht

| Item | Details |
|------|---------|
| **Domein** | daytradenfinanciering.nl |
| **Type** | Affiliate landing site voor prop firm financiering |
| **Positionering** | DE specialist in trading kapitaal & financiering |
| **Doel** | Bezoekers via SEO → Prop firm aanmeldingen → Affiliate revenue |
| **Partner** | FTMO (exclusief) |
| **Tech Stack** | Next.js 15, TypeScript, Tailwind CSS 4, Vercel |
| **Status** | 🟢 **LIVE READY** - Volledig geaudit, klaar voor deploy |
| **Laatste Audit** | 2026-01-06 |
| **Build** | ✅ 62 pagina's succesvol |

---

## Unieke Positionering

**Focus:** "Hoe krijg je kapitaal om te traden?"

Dit is NIET een vergelijkingssite (dat is fundedtrading.nl). Dit is een **financieringsspecialist** die één vraag beantwoordt:

> "Ik wil traden maar heb geen kapitaal. Hoe los ik dit op?"

### Kernboodschap
- "Trading kapitaal zonder eigen geld"
- "Word gefinancierd als trader"
- "Van €0 naar €200.000 trading kapitaal"

### Doelgroep
- Beginners die willen starten maar geen kapitaal hebben
- Traders die hun account willen opschalen
- Mensen die "daytraden financiering" of "trading kapitaal" zoeken

---

## BELANGRIJK: Bestaand Domein

**daytradenfinanciering.nl bestaat al jaren** maar krijgt weinig verkeer.

### Redirect Strategie

1. **Crawl bestaande site** voor alle URLs
2. **Map oude URLs** naar nieuwe structuur
3. **301 redirects** in next.config.ts
4. **Behoud eventuele backlinks**

```typescript
// next.config.ts
redirects: async () => [
  { source: '/oude-pagina', destination: '/nieuwe-pagina', permanent: true },
  // ... meer redirects
]
```

---

## Affiliate Strategie

### FTMO Exclusief

We pushen ALLEEN FTMO:
- Simpele boodschap: "Dit is DE oplossing"
- Geen keuzestress voor bezoekers
- Hogere conversie door focus

### Affiliate Link

| Site | /go/ URL | Doel |
|------|----------|------|
| daytradenfinanciering.nl | `/go/kapitaal` | Financiering focus |
| fundedtrading.nl | `/go/ftmo` | Vergelijking focus |
| debeurzen.nl | `/go/broker` | Broker focus |
| cursustraden.nl | `/go/leren` | Educatie focus |

**Implementatie:**
```typescript
// src/app/go/kapitaal/route.ts
import { redirect } from 'next/navigation'

export async function GET() {
  // FTMO affiliate link met tracking
  redirect('https://ftmo.com/nl/?affiliates=xxx&campaign=daytradenfinanciering')
}
```

---

## Brand Identity

### Naam & Schrijfwijze

| Context | Gebruik |
|---------|---------|
| **In tekst** | "Daytraden Financiering" |
| **Logo** | "DaytradenFinanciering.nl" |
| **SEO keyword** | "daytraden financiering", "trading kapitaal" |

### Kleuren (Groen = Geld/Groei)

```css
--primary: #059669;      /* Emerald 600 - groei, geld */
--secondary: #10B981;    /* Emerald 500 - succes */
--accent: #F59E0B;       /* Amber - premium, goud */
--dark: #064E3B;         /* Emerald 900 - diepte */
```

### Tagline Options
- "Van ambitie naar kapitaal"
- "Trading financiering, simpel uitgelegd"
- "Krijg tot €200.000 trading kapitaal"

### Voice & Tone
- Direct en to-the-point
- Oplossingsgerichte taal
- Begrijpelijk voor beginners
- GEEN financieel advies
- Focus op mogelijkheden, niet risico's overhypen

---

## Pagina Structuur

### Site Structuur (56 pagina's)

```
/                           → Homepage: "Krijg Trading Kapitaal"
/hoe-werkt-het              → Stap-voor-stap proces
/voordelen                  → Waarom financiering kiezen
/kosten                     → Wat kost het (challenge prijs)
/veelgestelde-vragen        → Uitgebreide FAQ
/beginnen                   → Start hier (CTA pagina)
/go/kapitaal                → Affiliate redirect naar FTMO
/begrippen                  → Glossary (trading termen)
/blog                       → Blog
/blog/[slug]                → Blog artikelen (6 posts)
/blog/categorie/[category]  → Blog categorieën
/blog/tag/[tag]             → Blog tags
/contact                    → Contact pagina
/over-ons                   → Over ons
/privacy                    → Privacy policy
/disclaimer                 → Disclaimer
```

### GEEN Stad Pagina's

Per besluit: daytradenfinanciering.nl heeft GEEN lokale pagina's.
Reden: "Financiering" is niet locatie-gebonden.

---

## Content Strategie

### Primaire Keywords

| Keyword | Volume | KD | Prioriteit |
|---------|--------|-----|------------|
| daytraden financiering | 320 | 5 | Hoog |
| trading kapitaal | 210 | 8 | Hoog |
| prop firm financiering | 140 | 3 | Hoog |
| funded trader worden | 260 | 12 | Medium |
| trading account financieren | 90 | 2 | Medium |

### Content Aanpak

**ALLE content is 100% uniek geschreven.**

Niet kopiëren van fundedtrading.nl. De focus is anders:
- Fundedtrading: "Welke prop firm past bij mij?"
- Daytradenfinanciering: "Hoe krijg ik kapitaal?"

### Homepage Structuur

1. **Hero:** "Krijg tot €200.000 Trading Kapitaal"
   - Subkop: "Zonder eigen geld. Start vandaag."
   - CTA: "Ontdek hoe →"

2. **Problem/Solution:**
   - Probleem: "Je wilt traden maar hebt geen €50.000"
   - Oplossing: "Prop firms financieren je"

3. **How It Works:** 3 simpele stappen
   - Stap 1: Kies je account size
   - Stap 2: Haal de challenge
   - Stap 3: Trade met hun geld

4. **Benefits:** Waarom dit werkt
   - Geen eigen kapitaal nodig
   - Tot 90% van de winst is voor jou
   - Schaal op naar €200.000+

5. **CTA:** "Begin Nu met FTMO"

---

## Tech Implementatie

### Van fundedtrading.nl overnemen (backend):
- ✅ Next.js 15 setup
- ✅ Tailwind CSS 4 config
- ✅ shadcn/ui components
- ✅ SEO helpers
- ✅ Schema.org patterns
- ✅ Analytics setup

### Nieuw schrijven (frontend/content):
- ❌ Alle teksten
- ❌ Brand config
- ❌ Page content
- ❌ FAQs
- ❌ Blog posts

### Config Files te Wijzigen

```
src/config/
├── brand.ts        → Compleet nieuw
├── seo.ts          → Templates aanpassen
├── navigation.ts   → Nieuwe menu structuur
└── content.ts      → Nieuwe pagina content
```

---

## Schema.org

### Homepage
```json
{
  "@type": "Organization",
  "name": "Daytraden Financiering",
  "url": "https://daytradenfinanciering.nl",
  "description": "Specialist in trading kapitaal en prop firm financiering"
}
```

### FAQ Pagina's
```json
{
  "@type": "FAQPage",
  "mainEntity": [...]
}
```

---

## Disclaimer (Verplicht)

> **Disclaimer:** DaytradenFinanciering.nl biedt informatieve content over prop trading financiering. Wij geven geen financieel advies. Trading met hefboom brengt risico's met zich mee. Je kunt meer verliezen dan je inleg.
>
> *Affiliate: Wij ontvangen commissie via links naar FTMO. Dit beïnvloedt onze content niet.*

---

## n8n Auto-Blog (Later)

Zelfde setup als fundedtrading.nl maar met andere focus:
- Topics: financiering, kapitaal, funded worden
- Frequentie: 1x per week
- Geen overlap met fundedtrading blog topics

---

## Development Roadmap

### Fase 1: Setup ✅
- [x] Clone fundedtrading template
- [x] Strip alle content (tools verwijderd)
- [x] Nieuwe brand.ts configureren
- [x] Basis pages aanmaken

### Fase 2: Content ✅
- [x] Homepage schrijven
- [x] Kernpagina's schrijven
- [x] FAQ's schrijven
- [x] Glossary vullen
- [x] Blog posts

### Fase 3: Polish ✅
- [x] SEO optimalisatie
- [x] Schema.org implementeren
- [x] 301 redirects (WordPress URLs)
- [x] GA4 tracking ingesteld (G-VVZ1P75HHS)
- [x] Build verificatie (62 pagina's)
- [x] Security headers
- [x] Dynamic OG images
- [x] Full site audit

### Fase 4: Launch 🚀
- [ ] **GitHub → Vercel koppelen**
- [ ] Domain koppelen (daytradenfinanciering.nl)
- [ ] DNS verificeren
- [ ] SSL automatisch via Vercel
- [ ] Google Search Console verifiëren
- [ ] Sitemap indienen

---

## Quick Commands

```bash
# Development
npm run dev

# Build
npm run build

# Lint
npm run lint
```

---

## TODO: Na Launch

- [ ] **MXRoute:** Emailaccounts aanmaken (info@, noreply@)
- [ ] **Vercel:** SMTP env vars toevoegen voor contactformulier
- [ ] **Google Search Console:** Site verifiëren en sitemap indienen
- [ ] **Clarity:** Project ID toevoegen (optioneel)
- [ ] **n8n:** Auto-blog workflow opzetten
- [ ] **Monitoring:** Uptime check instellen

---

## Gerelateerde Projecten

| Project | Relatie |
|---------|---------|
| fundedtrading.nl | Template bron (code) |
| debeurzen.nl | Zustersite (geen linking) |
| cursustraden.nl | Zustersite (geen linking) |

**BELANGRIJK:** Geen cross-linking tussen sites. Volledig standalone.

---

*Laatst bijgewerkt: 2026-01-06*
