import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import {
  Star,
  Check,
  X,
  ArrowRight,
  Trophy,
  Crown,
  Scale,
  Target,
  TrendingUp,
  Shield,
  Clock,
  Percent,
  ChevronRight,
  ArrowUpRight,
  Minus,
} from 'lucide-react'
import { getFirmBySlug } from '@/config/firms'
import { formatCurrency } from '@/lib/utils'
import {
  generateComparisonContent,
  getComparisonPairs,
  isValidComparison,
  getCanonicalOrder,
  getComparisonSlug,
} from '@/lib/comparison-content'
import { Button } from '@/components/ui'

interface Props {
  params: Promise<{ comparison: string }>
}

// Parse comparison slug to extract firm slugs
function parseComparisonSlug(slug: string): { firm1: string; firm2: string } | null {
  const match = slug.match(/^(.+)-vs-(.+)$/)
  if (!match) return null
  return { firm1: match[1], firm2: match[2] }
}

// Generate static params for all valid comparisons
export async function generateStaticParams() {
  const pairs = getComparisonPairs()
  return pairs.map(pair => ({
    comparison: `${pair.firm1}-vs-${pair.firm2}`,
  }))
}

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { comparison } = await params
  const parsed = parseComparisonSlug(comparison)

  if (!parsed) return { title: 'Niet gevonden' }

  const firm1 = getFirmBySlug(parsed.firm1)
  const firm2 = getFirmBySlug(parsed.firm2)

  if (!firm1 || !firm2) return { title: 'Niet gevonden' }

  const currentYear = new Date().getFullYear()

  return {
    title: `${firm1.name} vs ${firm2.name} ${currentYear} | Welke Prop Firm is Beter?`,
    description: `Uitgebreide vergelijking: ${firm1.name} vs ${firm2.name}. Vergelijk profit split, prijzen, challenge regels en meer. Ontdek welke prop firm het beste bij jou past.`,
    alternates: {
      canonical: `/vergelijk/${getComparisonSlug(parsed.firm1, parsed.firm2)}`,
    },
  }
}

// Winner badge component
function WinnerBadge({ winner, firm1, firm2 }: { winner: 'firm1' | 'firm2' | 'tie'; firm1: string; firm2: string }) {
  if (winner === 'tie') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
        <Minus className="w-3 h-3" />
        Gelijk
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium">
      <Trophy className="w-3 h-3" />
      {winner === 'firm1' ? firm1 : firm2}
    </span>
  )
}

// Comparison table row
function CompareRow({
  label,
  value1,
  value2,
  winner,
  icon: Icon,
}: {
  label: string
  value1: string
  value2: string
  winner?: 'firm1' | 'firm2' | 'tie'
  icon?: typeof Star
}) {
  return (
    <tr className="border-b border-border">
      <td className="py-4 px-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" />}
          {label}
        </div>
      </td>
      <td className={`py-4 px-4 text-center text-sm ${winner === 'firm1' ? 'text-secondary font-semibold' : 'text-white'}`}>
        {value1}
        {winner === 'firm1' && <Check className="inline w-4 h-4 ml-1 text-secondary" />}
      </td>
      <td className={`py-4 px-4 text-center text-sm ${winner === 'firm2' ? 'text-secondary font-semibold' : 'text-white'}`}>
        {value2}
        {winner === 'firm2' && <Check className="inline w-4 h-4 ml-1 text-secondary" />}
      </td>
    </tr>
  )
}

export default async function ComparisonPage({ params }: Props) {
  const { comparison } = await params
  const parsed = parseComparisonSlug(comparison)

  if (!parsed) {
    notFound()
  }

  // Get canonical order and redirect if needed
  const canonical = getCanonicalOrder(parsed.firm1, parsed.firm2)
  const canonicalSlug = getComparisonSlug(parsed.firm1, parsed.firm2)

  if (comparison !== canonicalSlug) {
    redirect(`/vergelijk/${canonicalSlug}`)
  }

  // Check if this is a valid comparison
  if (!isValidComparison(parsed.firm1, parsed.firm2)) {
    notFound()
  }

  const firm1 = getFirmBySlug(canonical.firm1)
  const firm2 = getFirmBySlug(canonical.firm2)

  if (!firm1 || !firm2) {
    notFound()
  }

  const content = generateComparisonContent(firm1, firm2)
  const currentYear = new Date().getFullYear()

  const minPrice1 = Math.min(...Object.values(firm1.challengePrices))
  const minPrice2 = Math.min(...Object.values(firm2.challengePrices))
  const maxAccount1 = Math.max(...firm1.accountSizes)
  const maxAccount2 = Math.max(...firm2.accountSizes)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-card pt-32 md:pt-52 pb-16">
        <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
        <div className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Scale className="w-4 h-4" />
              Vergelijking {currentYear}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {firm1.name} vs {firm2.name}
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Welke prop firm past beter bij jouw trading stijl? Bekijk onze uitgebreide vergelijking.
            </p>

            {/* Quick verdict */}
            <div className="inline-flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              {content.quickVerdict.winner !== 'tie' ? (
                <>
                  <Trophy className="w-6 h-6 text-secondary" />
                  <span className="text-white">
                    <span className="font-semibold text-secondary">
                      {content.quickVerdict.winner === 'firm1' ? firm1.name : firm2.name}
                    </span>{' '}
                    wint voor de meeste traders
                  </span>
                </>
              ) : (
                <>
                  <Scale className="w-6 h-6 text-primary" />
                  <span className="text-white">Beide firms zijn uitstekende keuzes</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Compare Cards */}
      <section className="py-12 border-b border-border bg-card/30">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Firm 1 Card */}
            <div className={`p-6 rounded-xl border ${firm1.isPartner ? 'bg-gradient-to-b from-secondary/10 to-card border-secondary/30' : 'bg-card border-border'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center">
                    <span className="font-bold text-sm text-muted-foreground">
                      {firm1.name.split(' ')[0].substring(0, 3)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{firm1.name}</span>
                      {firm1.isPartner && <Crown className="w-4 h-4 text-secondary" />}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-accent fill-accent" />
                      <span className="text-sm text-muted-foreground">{firm1.rating} ({firm1.reviewCount.toLocaleString()} reviews)</span>
                    </div>
                  </div>
                </div>
                {content.quickVerdict.winner === 'firm1' && (
                  <Trophy className="w-6 h-6 text-secondary" />
                )}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Profit Split</span>
                  <span className="font-medium text-secondary">{firm1.profitSplit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Vanaf</span>
                  <span className="font-medium text-white">{formatCurrency(minPrice1, firm1.currency)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Challenge</span>
                  <span className="font-medium text-white">{firm1.challengePhases}-fase</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-4">
                Best voor: {content.quickVerdict.bestFor.firm1}
              </p>

              <Button asChild className="w-full bg-primary hover:bg-primary-dark text-white">
                <Link href={`/prop-firms/${firm1.slug}`}>
                  Bekijk {firm1.name}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Firm 2 Card */}
            <div className={`p-6 rounded-xl border ${firm2.isPartner ? 'bg-gradient-to-b from-secondary/10 to-card border-secondary/30' : 'bg-card border-border'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center">
                    <span className="font-bold text-sm text-muted-foreground">
                      {firm2.name.split(' ')[0].substring(0, 3)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{firm2.name}</span>
                      {firm2.isPartner && <Crown className="w-4 h-4 text-secondary" />}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-accent fill-accent" />
                      <span className="text-sm text-muted-foreground">{firm2.rating} ({firm2.reviewCount.toLocaleString()} reviews)</span>
                    </div>
                  </div>
                </div>
                {content.quickVerdict.winner === 'firm2' && (
                  <Trophy className="w-6 h-6 text-secondary" />
                )}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Profit Split</span>
                  <span className="font-medium text-secondary">{firm2.profitSplit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Vanaf</span>
                  <span className="font-medium text-white">{formatCurrency(minPrice2, firm2.currency)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Challenge</span>
                  <span className="font-medium text-white">{firm2.challengePhases}-fase</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-4">
                Best voor: {content.quickVerdict.bestFor.firm2}
              </p>

              <Button asChild className="w-full bg-primary hover:bg-primary-dark text-white">
                <Link href={`/prop-firms/${firm2.slug}`}>
                  Bekijk {firm2.name}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="container-wide">
          <div className="prose prose-invert max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {content.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-card/30">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Vergelijkingstabel</h2>

          <div className="max-w-4xl mx-auto overflow-x-auto rounded-xl border border-border">
            <table className="w-full">
              <thead>
                <tr className="bg-card border-b border-border">
                  <th className="py-4 px-4 text-left text-sm font-semibold text-muted-foreground">Kenmerk</th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-white">{firm1.name}</th>
                  <th className="py-4 px-4 text-center text-sm font-semibold text-white">{firm2.name}</th>
                </tr>
              </thead>
              <tbody className="bg-card/50">
                <CompareRow
                  label="Rating"
                  icon={Star}
                  value1={`${firm1.rating}/5 (${firm1.reviewCount.toLocaleString()})`}
                  value2={`${firm2.rating}/5 (${firm2.reviewCount.toLocaleString()})`}
                  winner={firm1.rating > firm2.rating ? 'firm1' : (firm2.rating > firm1.rating ? 'firm2' : 'tie')}
                />
                <CompareRow
                  label="Profit Split"
                  icon={Percent}
                  value1={firm1.profitSplit}
                  value2={firm2.profitSplit}
                  winner={firm1.profitSplitMax > firm2.profitSplitMax ? 'firm1' : (firm2.profitSplitMax > firm1.profitSplitMax ? 'firm2' : 'tie')}
                />
                <CompareRow
                  label="Laagste prijs"
                  icon={Target}
                  value1={formatCurrency(minPrice1, firm1.currency)}
                  value2={formatCurrency(minPrice2, firm2.currency)}
                  winner={minPrice1 < minPrice2 ? 'firm1' : (minPrice2 < minPrice1 ? 'firm2' : 'tie')}
                />
                <CompareRow
                  label="Max account"
                  icon={TrendingUp}
                  value1={formatCurrency(maxAccount1, firm1.currency)}
                  value2={formatCurrency(maxAccount2, firm2.currency)}
                  winner={maxAccount1 > maxAccount2 ? 'firm1' : (maxAccount2 > maxAccount1 ? 'firm2' : 'tie')}
                />
                <CompareRow
                  label="Challenge fases"
                  icon={Target}
                  value1={`${firm1.challengePhases}-fase`}
                  value2={`${firm2.challengePhases}-fase`}
                  winner={firm1.challengePhases < firm2.challengePhases ? 'firm1' : (firm2.challengePhases < firm1.challengePhases ? 'firm2' : 'tie')}
                />
                <CompareRow
                  label="Profit target"
                  value1={`${firm1.profitTarget.join('% / ')}%`}
                  value2={`${firm2.profitTarget.join('% / ')}%`}
                />
                <CompareRow
                  label="Daily drawdown"
                  value1={firm1.maxDailyLoss ? `${firm1.maxDailyLoss}%` : 'Geen'}
                  value2={firm2.maxDailyLoss ? `${firm2.maxDailyLoss}%` : 'Geen'}
                />
                <CompareRow
                  label="Total drawdown"
                  value1={`${firm1.maxTotalDrawdown}%`}
                  value2={`${firm2.maxTotalDrawdown}%`}
                  winner={firm1.maxTotalDrawdown > firm2.maxTotalDrawdown ? 'firm1' : (firm2.maxTotalDrawdown > firm1.maxTotalDrawdown ? 'firm2' : 'tie')}
                />
                <CompareRow
                  label="Tijdslimiet"
                  icon={Clock}
                  value1={firm1.timeLimit || 'Geen'}
                  value2={firm2.timeLimit || 'Geen'}
                />
                <CompareRow
                  label="Payout"
                  icon={Clock}
                  value1={firm1.payoutFrequency}
                  value2={firm2.payoutFrequency}
                />
                <CompareRow
                  label="Scaling"
                  icon={TrendingUp}
                  value1={firm1.maxScaling ? formatCurrency(firm1.maxScaling, firm1.currency) : 'N/A'}
                  value2={firm2.maxScaling ? formatCurrency(firm2.maxScaling, firm2.currency) : 'N/A'}
                />
                <CompareRow
                  label="Platforms"
                  value1={firm1.platforms.join(', ')}
                  value2={firm2.platforms.join(', ')}
                />
                <CompareRow
                  label="Instrumenten"
                  value1={firm1.instruments.slice(0, 3).join(', ')}
                  value2={firm2.instruments.slice(0, 3).join(', ')}
                />
                <CompareRow
                  label="Opgericht"
                  icon={Shield}
                  value1={`${firm1.foundedYear}`}
                  value2={`${firm2.foundedYear}`}
                />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Category Winners */}
      <section className="py-12">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Winnaar per Categorie</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {content.categoryWinners.map((cat, index) => (
              <div key={index} className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">{cat.category}</h3>
                  <WinnerBadge winner={cat.winner} firm1={firm1.name} firm2={firm2.name} />
                </div>
                <p className="text-sm text-muted-foreground">{cat.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Analysis */}
      <section className="py-12 bg-card/30">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Gedetailleerde Analyse</h2>

          <div className="max-w-3xl mx-auto space-y-8">
            {content.detailedAnalysis.map((section, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
                <div className="prose prose-invert prose-sm max-w-none">
                  <p className="text-muted-foreground whitespace-pre-line">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="py-12">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Voor- en Nadelen</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Firm 1 Pros/Cons */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                {firm1.name}
                {firm1.isPartner && <Crown className="w-4 h-4 text-secondary" />}
              </h3>

              <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/30">
                <h4 className="text-sm font-medium text-secondary mb-3">Voordelen</h4>
                <ul className="space-y-2">
                  {firm1.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                <h4 className="text-sm font-medium text-red-400 mb-3">Nadelen</h4>
                <ul className="space-y-2">
                  {firm1.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Firm 2 Pros/Cons */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                {firm2.name}
                {firm2.isPartner && <Crown className="w-4 h-4 text-secondary" />}
              </h3>

              <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/30">
                <h4 className="text-sm font-medium text-secondary mb-3">Voordelen</h4>
                <ul className="space-y-2">
                  {firm2.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                <h4 className="text-sm font-medium text-red-400 mb-3">Nadelen</h4>
                <ul className="space-y-2">
                  {firm2.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 bg-card/30">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Veelgestelde Vragen
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {content.faqs.map((faq, index) => (
              <div key={index} className="p-5 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-12">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Conclusie</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground whitespace-pre-line">{content.conclusion}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border bg-card/30">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Klaar om te starten?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Bekijk de volledige reviews of vergelijk met andere prop firms.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm px-6"
            >
              <Link href={`/prop-firms/${firm1.slug}`} className="flex items-center gap-2">
                Bekijk {firm1.name}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-glow-green px-6"
            >
              <Link href={`/prop-firms/${firm2.slug}`} className="flex items-center gap-2">
                Bekijk {firm2.name}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-border hover:border-primary/50"
            >
              <Link href="/vergelijk" className="flex items-center gap-2">
                Alle Vergelijkingen
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Comparisons */}
      <section className="py-12 border-t border-border">
        <div className="container-wide">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Gerelateerde Vergelijkingen</h2>

          <div className="flex flex-wrap justify-center gap-3">
            {getComparisonPairs()
              .filter(pair =>
                (pair.firm1 === firm1.slug || pair.firm2 === firm1.slug ||
                 pair.firm1 === firm2.slug || pair.firm2 === firm2.slug) &&
                !(pair.firm1 === firm1.slug && pair.firm2 === firm2.slug) &&
                !(pair.firm1 === firm2.slug && pair.firm2 === firm1.slug)
              )
              .slice(0, 6)
              .map(pair => {
                const f1 = getFirmBySlug(pair.firm1)
                const f2 = getFirmBySlug(pair.firm2)
                if (!f1 || !f2) return null

                return (
                  <Link
                    key={`${pair.firm1}-vs-${pair.firm2}`}
                    href={`/vergelijk/${pair.firm1}-vs-${pair.firm2}`}
                    className="px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/50 text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    {f1.name} vs {f2.name}
                  </Link>
                )
              })}
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD */}
      <Script
        id="schema-comparison"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `${firm1.name} vs ${firm2.name}: Welke Prop Firm is Beter in ${currentYear}?`,
            description: `Uitgebreide vergelijking tussen ${firm1.name} en ${firm2.name}. Ontdek welke prop firm het beste past bij jouw trading stijl.`,
            author: {
              '@type': 'Organization',
              name: 'Funded Trading Nederland',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Funded Trading Nederland',
              url: 'https://fundedtrading.nl',
            },
            datePublished: new Date().toISOString().split('T')[0],
            dateModified: new Date().toISOString().split('T')[0],
          }),
        }}
      />
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: content.faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </>
  )
}
