# FundedTrading.nl

Affiliate vergelijkingswebsite voor prop trading firms in Nederland.

## Status

**Production Ready** - 314 pagina's gebouwd en klaar voor deployment.

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
├── app/                    # Next.js App Router (314 pagina's)
│   ├── [stad]/             # 50 stadspagina's
│   ├── categorie/[niche]/  # 166 niche pagina's
│   ├── prop-firms/[slug]/  # 16 prop firm pagina's
│   ├── tools/[slug]/       # Trading tools
│   ├── vergelijk/          # Vergelijkingspagina's
│   └── blog/               # Blog systeem
├── components/             # React componenten
├── config/                 # Data & configuratie
└── lib/                    # Utilities & helpers
```

## Features

- 16 prop firms met geverifieerde data
- 50 Nederlandse steden met lokale content
- 166 niche categorieën
- Vergelijkingstool voor prop firms
- Trading calculators (ROI, position size, etc.)
- SEO-geoptimaliseerd met Schema.org
- Responsive design met Tailwind CSS

## Tech Stack

| Technologie | Versie |
|-------------|--------|
| Next.js | 15+ |
| TypeScript | 5+ |
| Tailwind CSS | 4 |
| shadcn/ui | Latest |
| Deployment | Vercel |

## Affiliate Partners

- **FTMO** - Primaire partner
- **Apex Trader Funding** - Primaire partner

## Development

Zie `CLAUDE.md` voor uitgebreide documentatie over:
- Brand guidelines
- Content strategie
- SEO templates
- Data structuren

## Environment Variables

Kopieer `.env.example` naar `.env.local`:

```bash
cp .env.example .env.local
```

## License

Private - All rights reserved.
