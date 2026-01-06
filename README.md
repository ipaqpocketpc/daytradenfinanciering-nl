# DaytradenFinanciering.nl

Affiliate landing site voor trading kapitaal en financiering via FTMO.

## Status

🟢 **LIVE READY** - Site is volledig geaudit en klaar voor Vercel deployment.

| Check | Status |
|-------|--------|
| Build | ✅ 62 pagina's succesvol |
| SEO | ✅ Sitemap, robots, OG images |
| Security | ✅ Headers geconfigureerd |
| Analytics | ✅ GA4 actief |
| Legal | ✅ Privacy, disclaimer |
| Branding | ✅ Emerald theme consistent |

## Positionering

> "Hoe krijg je kapitaal om te traden?"

Dit is een **financieringsspecialist** site, GEEN vergelijkingssite. Focus op één vraag beantwoorden:
- Trading kapitaal zonder eigen geld
- Word gefinancierd als trader
- Van €0 naar €200.000 trading kapitaal

## Quick Start

```bash
# Installeer dependencies
npm install

# Start development server
npm run dev

# Build voor productie
npm run build
```

## Project Structuur

```
src/
├── app/                    # Next.js App Router
│   ├── hoe-werkt-het/      # Hoe trading kapitaal werkt
│   ├── voordelen/          # Voordelen van financiering
│   ├── kosten/             # Challenge kosten uitgelegd
│   ├── beginnen/           # Start hier (CTA pagina)
│   ├── veelgestelde-vragen/ # FAQ
│   ├── begrippen/          # Glossary
│   ├── blog/               # Blog systeem
│   └── go/[firm]/          # Affiliate redirects
├── components/             # React componenten
├── config/                 # Data & configuratie
└── lib/                    # Utilities & helpers
```

## Features

- Focus op trading kapitaal/financiering
- Eén affiliate partner: FTMO
- SEO-geoptimaliseerd voor "daytraden financiering" keywords
- Blog systeem (auto-blog later via n8n)
- Schema.org implementatie
- Responsive design met Tailwind CSS

## Tech Stack

| Technologie | Versie |
|-------------|--------|
| Next.js | 15+ |
| TypeScript | 5+ |
| Tailwind CSS | 4 |
| shadcn/ui | Latest |
| Deployment | Vercel |

## Affiliate Partner

- **FTMO** - Exclusieve partner via `/go/kapitaal`

## Development

Zie `CLAUDE.md` voor uitgebreide documentatie over:
- Brand guidelines (groen thema)
- Content strategie
- SEO templates
- Affiliate configuratie

## Environment Variables

Kopieer `.env.example` naar `.env.local`:

```bash
cp .env.example .env.local
```

## Gerelateerde Projecten

| Project | Relatie |
|---------|---------|
| fundedtrading.nl | Template bron (code) |
| debeurzen.nl | Zustersite (geen linking) |
| cursustraden.nl | Zustersite (geen linking) |

**BELANGRIJK:** Geen cross-linking tussen sites. Volledig standalone.

## License

Private - All rights reserved.
