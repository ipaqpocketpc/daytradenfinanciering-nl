"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Check,
  Plus,
  X,
  Star,
  Crown,
  ChevronDown,
  ArrowUpRight,
  Gift,
  Trophy,
} from "lucide-react"
import { PropFirm, getActiveFirms } from "@/config/firms"
import { formatCurrency, cn } from "@/lib/utils"

interface ComparisonCategory {
  id: string
  label: string
  getValue: (firm: PropFirm) => string | number
  getWinner: (firms: PropFirm[]) => PropFirm | null
  description?: string
}

const comparisonCategories: ComparisonCategory[] = [
  {
    id: "rating",
    label: "Rating",
    getValue: (firm) => `${firm.rating} (${firm.reviewCount.toLocaleString("nl-NL")} reviews)`,
    getWinner: (firms) => {
      const sorted = [...firms].sort((a, b) => b.rating - a.rating)
      return sorted[0].rating > sorted[1].rating ? sorted[0] : null
    },
  },
  {
    id: "profitSplit",
    label: "Profit Split",
    getValue: (firm) => firm.profitSplit,
    getWinner: (firms) => {
      const sorted = [...firms].sort((a, b) => b.profitSplitMax - a.profitSplitMax)
      return sorted[0].profitSplitMax > sorted[1].profitSplitMax ? sorted[0] : null
    },
  },
  {
    id: "lowestPrice",
    label: "Prijs vanaf",
    getValue: (firm) => formatCurrency(Math.min(...Object.values(firm.challengePrices)), firm.currency),
    getWinner: (firms) => {
      const getLowestInEur = (f: PropFirm) => {
        const lowest = Math.min(...Object.values(f.challengePrices))
        return f.currency === "USD" ? lowest * 0.92 : lowest
      }
      const sorted = [...firms].sort((a, b) => getLowestInEur(a) - getLowestInEur(b))
      return getLowestInEur(sorted[0]) < getLowestInEur(sorted[1]) ? sorted[0] : null
    },
  },
  {
    id: "phases",
    label: "Challenge Fases",
    getValue: (firm) => `${firm.challengePhases} fase${firm.challengePhases > 1 ? "s" : ""}`,
    getWinner: (firms) => {
      const sorted = [...firms].sort((a, b) => a.challengePhases - b.challengePhases)
      return sorted[0].challengePhases < sorted[1].challengePhases ? sorted[0] : null
    },
    description: "Minder fases = sneller funded",
  },
  {
    id: "profitTarget",
    label: "Profit Target",
    getValue: (firm) => `${firm.profitTarget.join("% / ")}%`,
    getWinner: (firms) => {
      const getTotalTarget = (f: PropFirm) => f.profitTarget.reduce((a, b) => a + b, 0)
      const sorted = [...firms].sort((a, b) => getTotalTarget(a) - getTotalTarget(b))
      return getTotalTarget(sorted[0]) < getTotalTarget(sorted[1]) ? sorted[0] : null
    },
    description: "Lager target = makkelijker",
  },
  {
    id: "maxDrawdown",
    label: "Max Drawdown",
    getValue: (firm) => `${firm.maxTotalDrawdown}%`,
    getWinner: (firms) => {
      const sorted = [...firms].sort((a, b) => b.maxTotalDrawdown - a.maxTotalDrawdown)
      return sorted[0].maxTotalDrawdown > sorted[1].maxTotalDrawdown ? sorted[0] : null
    },
    description: "Hoger = meer ruimte",
  },
  {
    id: "payout",
    label: "Payout Frequentie",
    getValue: (firm) => firm.payoutFrequency,
    getWinner: (firms) => {
      const payoutRank: Record<string, number> = {
        "Dagelijks": 1,
        "24 uur": 2,
        "16 uur": 2,
        "Weekly": 3,
        "Bi-weekly": 4,
        "8 dagen": 5,
        "5 dagen": 4,
        "14 dagen": 6,
        "On demand": 2,
      }
      const sorted = [...firms].sort((a, b) =>
        (payoutRank[a.payoutFrequency] || 10) - (payoutRank[b.payoutFrequency] || 10)
      )
      const rankA = payoutRank[sorted[0].payoutFrequency] || 10
      const rankB = payoutRank[sorted[1].payoutFrequency] || 10
      return rankA < rankB ? sorted[0] : null
    },
    description: "Sneller = beter",
  },
  {
    id: "maxAccount",
    label: "Max Account",
    getValue: (firm) => formatCurrency(Math.max(...firm.accountSizes), firm.currency),
    getWinner: (firms) => {
      const getMaxInEur = (f: PropFirm) => {
        const max = Math.max(...f.accountSizes)
        return f.currency === "USD" ? max * 0.92 : max
      }
      const sorted = [...firms].sort((a, b) => getMaxInEur(b) - getMaxInEur(a))
      return getMaxInEur(sorted[0]) > getMaxInEur(sorted[1]) ? sorted[0] : null
    },
  },
  {
    id: "scaling",
    label: "Max Scaling",
    getValue: (firm) => firm.maxScaling ? formatCurrency(firm.maxScaling, firm.currency) : "N.v.t.",
    getWinner: (firms) => {
      const getScalingInEur = (f: PropFirm) => {
        if (!f.maxScaling) return 0
        return f.currency === "USD" ? f.maxScaling * 0.92 : f.maxScaling
      }
      const sorted = [...firms].sort((a, b) => getScalingInEur(b) - getScalingInEur(a))
      const scalingA = getScalingInEur(sorted[0])
      const scalingB = getScalingInEur(sorted[1])
      return scalingA > scalingB ? sorted[0] : null
    },
  },
  {
    id: "minDays",
    label: "Min. Handelsdagen",
    getValue: (firm) => firm.minTradingDays === 0 ? "Geen" : `${firm.minTradingDays} dagen`,
    getWinner: (firms) => {
      const sorted = [...firms].sort((a, b) => a.minTradingDays - b.minTradingDays)
      return sorted[0].minTradingDays < sorted[1].minTradingDays ? sorted[0] : null
    },
    description: "Minder = sneller klaar",
  },
  {
    id: "platforms",
    label: "Platforms",
    getValue: (firm) => firm.platforms.slice(0, 3).join(", ") + (firm.platforms.length > 3 ? ` +${firm.platforms.length - 3}` : ""),
    getWinner: (firms) => {
      const sorted = [...firms].sort((a, b) => b.platforms.length - a.platforms.length)
      return sorted[0].platforms.length > sorted[1].platforms.length ? sorted[0] : null
    },
  },
  {
    id: "instruments",
    label: "Instrumenten",
    getValue: (firm) => firm.instruments.slice(0, 3).join(", ") + (firm.instruments.length > 3 ? ` +${firm.instruments.length - 3}` : ""),
    getWinner: (firms) => {
      const sorted = [...firms].sort((a, b) => b.instruments.length - a.instruments.length)
      return sorted[0].instruments.length > sorted[1].instruments.length ? sorted[0] : null
    },
  },
  {
    id: "founded",
    label: "Opgericht",
    getValue: (firm) => firm.foundedYear.toString(),
    getWinner: (firms) => {
      const sorted = [...firms].sort((a, b) => a.foundedYear - b.foundedYear)
      return sorted[0].foundedYear < sorted[1].foundedYear ? sorted[0] : null
    },
    description: "Langer actief = meer ervaring",
  },
]

function FirmSelector({
  selectedFirm,
  onSelect,
  onRemove,
  availableFirms,
  canRemove,
  index,
}: {
  selectedFirm: PropFirm | null
  onSelect: (firm: PropFirm) => void
  onRemove: () => void
  availableFirms: PropFirm[]
  canRemove: boolean
  index: number
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg border transition-all",
          selectedFirm
            ? "bg-card border-border hover:border-primary/50"
            : "bg-muted/30 border-dashed border-border hover:border-primary/50"
        )}
      >
        {selectedFirm ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0">
              <span className="font-bold text-xs text-muted-foreground">
                {selectedFirm.name.split(" ")[0].substring(0, 3)}
              </span>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white text-sm">
                  {selectedFirm.name}
                </span>
                {selectedFirm.isPartner && (
                  <Crown className="w-3 h-3 text-secondary" />
                )}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-accent fill-accent" />
                <span className="text-xs text-muted-foreground">{selectedFirm.rating}</span>
              </div>
            </div>
          </div>
        ) : (
          <span className="text-muted-foreground text-sm">Selecteer prop firm {index + 1}</span>
        )}
        <ChevronDown className={cn(
          "w-4 h-4 text-muted-foreground transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Remove button */}
      {canRemove && selectedFirm && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive/20 border border-destructive/30 flex items-center justify-center hover:bg-destructive/30 transition-colors"
        >
          <X className="w-3 h-3 text-destructive" />
        </button>
      )}

      {/* Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-card border border-border rounded-lg shadow-xl max-h-64 overflow-y-auto">
            {availableFirms.map((firm) => (
              <button
                key={firm.id}
                onClick={() => {
                  onSelect(firm)
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0">
                  <span className="font-bold text-xs text-muted-foreground">
                    {firm.name.split(" ")[0].substring(0, 3)}
                  </span>
                </div>
                <div className="text-left flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white text-sm">{firm.name}</span>
                    {firm.isPartner && <Crown className="w-3 h-3 text-secondary" />}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-accent fill-accent" />
                      {firm.rating}
                    </span>
                    <span>•</span>
                    <span>{firm.profitSplit}</span>
                  </div>
                </div>
                {selectedFirm?.id === firm.id && (
                  <Check className="w-4 h-4 text-secondary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function InteractiveComparator() {
  const activeFirms = getActiveFirms()

  // Default: FTMO vs first non-partner firm
  const defaultFirms = [
    activeFirms.find(f => f.slug === "ftmo")!,
    activeFirms.find(f => f.slug === "apex-trader-funding")!,
  ]

  const [selectedFirms, setSelectedFirms] = useState<(PropFirm | null)[]>(defaultFirms)

  const handleSelectFirm = (index: number, firm: PropFirm) => {
    const newSelection = [...selectedFirms]
    newSelection[index] = firm
    setSelectedFirms(newSelection)
  }

  const handleRemoveFirm = (index: number) => {
    if (selectedFirms.length > 2) {
      setSelectedFirms(selectedFirms.filter((_, i) => i !== index))
    }
  }

  const handleAddFirm = () => {
    if (selectedFirms.length < 4) {
      setSelectedFirms([...selectedFirms, null])
    }
  }

  const getAvailableFirms = (currentIndex: number) => {
    const selectedIds = selectedFirms
      .filter((f, i) => f && i !== currentIndex)
      .map(f => f!.id)
    return activeFirms.filter(f => !selectedIds.includes(f.id))
  }

  const validSelectedFirms = selectedFirms.filter((f): f is PropFirm => f !== null)

  // Calculate total wins per firm
  const winCounts = validSelectedFirms.reduce((acc, firm) => {
    acc[firm.id] = 0
    return acc
  }, {} as Record<string, number>)

  if (validSelectedFirms.length >= 2) {
    comparisonCategories.forEach(category => {
      const winner = category.getWinner(validSelectedFirms)
      if (winner) {
        winCounts[winner.id]++
      }
    })
  }

  const overallWinner = validSelectedFirms.length >= 2
    ? validSelectedFirms.reduce((a, b) => winCounts[a.id] > winCounts[b.id] ? a : b)
    : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Interactieve Vergelijker</h2>
        <p className="text-muted-foreground">
          Selecteer 2-4 prop firms om direct te vergelijken
        </p>
      </div>

      {/* Firm Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {selectedFirms.map((firm, index) => (
          <FirmSelector
            key={index}
            selectedFirm={firm}
            onSelect={(f) => handleSelectFirm(index, f)}
            onRemove={() => handleRemoveFirm(index)}
            availableFirms={getAvailableFirms(index)}
            canRemove={selectedFirms.length > 2}
            index={index}
          />
        ))}
        {selectedFirms.length < 4 && (
          <button
            onClick={handleAddFirm}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-dashed border-border hover:border-primary/50 hover:bg-muted/30 transition-all text-muted-foreground hover:text-white"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Voeg firm toe</span>
          </button>
        )}
      </div>

      {/* Overall Winner Banner */}
      {overallWinner && validSelectedFirms.length >= 2 && (
        <div className="p-4 rounded-xl bg-linear-to-r from-secondary/20 to-secondary/5 border border-secondary/30">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="text-sm text-secondary font-medium">Beste keuze</div>
                <div className="text-white font-semibold">{overallWinner.name}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Wint in</div>
                <div className="text-white font-semibold">{winCounts[overallWinner.id]} van {comparisonCategories.length} categorieën</div>
              </div>
              {overallWinner.affiliateUrl && (
                <Link
                  href={`/go/${overallWinner.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-white text-sm font-medium hover:bg-secondary-dark transition-all shadow-glow-green"
                >
                  Start Challenge
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Comparison Table - Desktop */}
      {validSelectedFirms.length >= 2 && (
        <div className="hidden md:block overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="bg-card border-b border-border">
                <th className="py-4 px-4 text-left text-sm font-semibold text-white w-48">
                  Eigenschap
                </th>
                {validSelectedFirms.map((firm) => (
                  <th key={firm.id} className="py-4 px-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm">{firm.name}</span>
                        {firm.isPartner && <Crown className="w-3 h-3 text-secondary" />}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {winCounts[firm.id]} {winCounts[firm.id] === 1 ? "win" : "wins"}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonCategories.map((category) => {
                const winner = category.getWinner(validSelectedFirms)
                return (
                  <tr key={category.id} className="border-b border-border hover:bg-card/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-medium text-white text-sm">{category.label}</div>
                      {category.description && (
                        <div className="text-xs text-muted-foreground mt-0.5">{category.description}</div>
                      )}
                    </td>
                    {validSelectedFirms.map((firm) => {
                      const isWinner = winner?.id === firm.id
                      return (
                        <td
                          key={firm.id}
                          className={cn(
                            "py-4 px-4 text-center transition-colors",
                            isWinner && "bg-secondary/10"
                          )}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <span className={cn(
                              "text-sm",
                              isWinner ? "text-secondary font-semibold" : "text-white"
                            )}>
                              {category.getValue(firm)}
                            </span>
                            {isWinner && (
                              <Check className="w-4 h-4 text-secondary" />
                            )}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Comparison Cards - Mobile */}
      {validSelectedFirms.length >= 2 && (
        <div className="md:hidden space-y-4">
          {comparisonCategories.map((category) => {
            const winner = category.getWinner(validSelectedFirms)
            return (
              <div key={category.id} className="p-4 rounded-xl bg-card border border-border">
                <div className="mb-3">
                  <div className="font-medium text-white text-sm">{category.label}</div>
                  {category.description && (
                    <div className="text-xs text-muted-foreground">{category.description}</div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {validSelectedFirms.map((firm) => {
                    const isWinner = winner?.id === firm.id
                    return (
                      <div
                        key={firm.id}
                        className={cn(
                          "p-3 rounded-lg transition-colors",
                          isWinner ? "bg-secondary/10 border border-secondary/30" : "bg-muted/30"
                        )}
                      >
                        <div className="text-xs text-muted-foreground mb-1 truncate">
                          {firm.name}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className={cn(
                            "text-sm font-medium",
                            isWinner ? "text-secondary" : "text-white"
                          )}>
                            {category.getValue(firm)}
                          </span>
                          {isWinner && (
                            <Check className="w-3 h-3 text-secondary shrink-0" />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Action Buttons */}
      {validSelectedFirms.length >= 2 && (
        <div className="flex flex-wrap items-center justify-center gap-4">
          {validSelectedFirms.map((firm) => (
            <div key={firm.id} className="flex items-center gap-2">
              <Link
                href={`/prop-firms/${firm.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary hover:text-white transition-all"
              >
                {firm.name} Review
                <ArrowUpRight className="w-3 h-3" />
              </Link>
              {firm.discountCode && firm.affiliateUrl && (
                <Link
                  href={`/go/${firm.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-linear-to-r from-secondary to-secondary-dark text-white text-sm font-medium hover:shadow-glow-green transition-all"
                >
                  <Gift className="w-3 h-3" />
                  {firm.discountPercentage}%
                </Link>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {validSelectedFirms.length < 2 && (
        <div className="text-center py-12 px-4 rounded-xl border border-dashed border-border bg-muted/10">
          <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Selecteer minstens 2 firms
          </h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Kies minimaal 2 prop firms hierboven om ze direct met elkaar te vergelijken.
          </p>
        </div>
      )}
    </div>
  )
}
