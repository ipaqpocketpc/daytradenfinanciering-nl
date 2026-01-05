"use client"

import { useState, useMemo } from "react"
import { BarChart2, AlertTriangle, CheckCircle, Plus, Trash2, Info, TrendingUp, Target, Calendar } from "lucide-react"

interface DailyResult {
  id: string
  day: number
  profit: number
}

interface ConsistencyRule {
  name: string
  percentage: number
  description: string
}

const consistencyRules: ConsistencyRule[] = [
  { name: "Apex Trader Funding", percentage: 30, description: "Geen dag mag meer dan 30% van totale winst zijn" },
  { name: "FundedNext", percentage: 40, description: "Geen dag mag meer dan 40% van totale winst zijn" },
  { name: "Topstep", percentage: 40, description: "Geen dag mag meer dan 40% van totale winst zijn" },
  { name: "FTMO", percentage: 100, description: "Geen consistency rule" },
  { name: "The5%ers", percentage: 100, description: "Geen consistency rule" },
  { name: "Custom", percentage: 30, description: "Aangepaste regel" },
]

export function ConsistencyCalculator() {
  // Prop firm selection
  const [selectedRule, setSelectedRule] = useState<ConsistencyRule>(consistencyRules[0])
  const [customPercentage, setCustomPercentage] = useState<string>("30")

  // Daily results
  const [dailyResults, setDailyResults] = useState<DailyResult[]>([
    { id: "1", day: 1, profit: 250 },
    { id: "2", day: 2, profit: 150 },
    { id: "3", day: 3, profit: -100 },
    { id: "4", day: 4, profit: 300 },
    { id: "5", day: 5, profit: 200 },
  ])

  // Quick add mode
  const [quickAddValue, setQuickAddValue] = useState<string>("")

  // Get effective percentage
  const effectivePercentage = selectedRule.name === "Custom"
    ? parseFloat(customPercentage) || 30
    : selectedRule.percentage

  // Calculations
  const calculations = useMemo(() => {
    const profitDays = dailyResults.filter(d => d.profit > 0)
    const lossDays = dailyResults.filter(d => d.profit < 0)

    const totalProfit = profitDays.reduce((sum, d) => sum + d.profit, 0)
    const totalLoss = Math.abs(lossDays.reduce((sum, d) => sum + d.profit, 0))
    const netProfit = totalProfit - totalLoss

    // Best and worst days
    const bestDay = dailyResults.length > 0
      ? dailyResults.reduce((best, d) => d.profit > best.profit ? d : best, dailyResults[0])
      : null
    const worstDay = dailyResults.length > 0
      ? dailyResults.reduce((worst, d) => d.profit < worst.profit ? d : worst, dailyResults[0])
      : null

    // Consistency score (best day as % of total profit)
    const consistencyScore = totalProfit > 0 && bestDay
      ? (bestDay.profit / totalProfit) * 100
      : 0

    // Is passing
    const isPassing = effectivePercentage >= 100 || consistencyScore <= effectivePercentage

    // How much more profit needed to pass
    let profitNeededToPass = 0
    if (!isPassing && bestDay && effectivePercentage < 100) {
      // Target: bestDay.profit / X = effectivePercentage/100
      // X = bestDay.profit / (effectivePercentage/100)
      const targetTotalProfit = bestDay.profit / (effectivePercentage / 100)
      profitNeededToPass = targetTotalProfit - totalProfit
    }

    // Daily breakdown with percentages
    const dailyBreakdown = dailyResults.map(d => ({
      ...d,
      percentageOfTotal: totalProfit > 0 && d.profit > 0 ? (d.profit / totalProfit) * 100 : 0,
      isViolating: d.profit > 0 && effectivePercentage < 100 && (d.profit / totalProfit) * 100 > effectivePercentage
    }))

    // Average profit per day
    const averageDailyProfit = profitDays.length > 0
      ? totalProfit / profitDays.length
      : 0

    // Trading days stats
    const tradingDays = dailyResults.length
    const winningDays = profitDays.length
    const losingDays = lossDays.length
    const breakEvenDays = dailyResults.filter(d => d.profit === 0).length
    const winRate = tradingDays > 0 ? (winningDays / tradingDays) * 100 : 0

    return {
      totalProfit,
      totalLoss,
      netProfit,
      bestDay,
      worstDay,
      consistencyScore,
      isPassing,
      profitNeededToPass,
      dailyBreakdown,
      averageDailyProfit,
      tradingDays,
      winningDays,
      losingDays,
      breakEvenDays,
      winRate,
    }
  }, [dailyResults, effectivePercentage])

  // Add a new day
  const addDay = () => {
    const newId = Date.now().toString()
    const newDay = dailyResults.length + 1
    setDailyResults([...dailyResults, { id: newId, day: newDay, profit: 0 }])
  }

  // Quick add day
  const quickAddDay = () => {
    const profit = parseFloat(quickAddValue)
    if (!isNaN(profit)) {
      const newId = Date.now().toString()
      const newDay = dailyResults.length + 1
      setDailyResults([...dailyResults, { id: newId, day: newDay, profit }])
      setQuickAddValue("")
    }
  }

  // Remove a day
  const removeDay = (id: string) => {
    setDailyResults(dailyResults.filter(d => d.id !== id))
  }

  // Update a day's profit
  const updateDayProfit = (id: string, profit: number) => {
    setDailyResults(dailyResults.map(d =>
      d.id === id ? { ...d, profit } : d
    ))
  }

  // Clear all days
  const clearAll = () => {
    setDailyResults([])
  }

  // Preset scenarios
  const loadPreset = (type: "good" | "bad" | "borderline") => {
    if (type === "good") {
      setDailyResults([
        { id: "1", day: 1, profit: 200 },
        { id: "2", day: 2, profit: 180 },
        { id: "3", day: 3, profit: 220 },
        { id: "4", day: 4, profit: 150 },
        { id: "5", day: 5, profit: 190 },
        { id: "6", day: 6, profit: -50 },
        { id: "7", day: 7, profit: 210 },
      ])
    } else if (type === "bad") {
      setDailyResults([
        { id: "1", day: 1, profit: 1000 },
        { id: "2", day: 2, profit: 100 },
        { id: "3", day: 3, profit: 50 },
        { id: "4", day: 4, profit: -200 },
        { id: "5", day: 5, profit: 75 },
      ])
    } else {
      setDailyResults([
        { id: "1", day: 1, profit: 350 },
        { id: "2", day: 2, profit: 300 },
        { id: "3", day: 3, profit: 280 },
        { id: "4", day: 4, profit: -100 },
        { id: "5", day: 5, profit: 250 },
      ])
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
          <BarChart2 className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Consistency Rule Calculator</h2>
          <p className="text-muted-foreground">
            Check of je trading voldoet aan de consistency eisen voor payout
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Prop Firm Selection */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <label className="block text-sm font-medium text-white mb-3">Consistency Rule</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {consistencyRules.map((rule) => (
                <button
                  key={rule.name}
                  onClick={() => setSelectedRule(rule)}
                  className={`p-3 rounded-lg border text-sm transition-all ${
                    selectedRule.name === rule.name
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background/50 hover:border-primary/50"
                  }`}
                >
                  <span className={`font-medium ${selectedRule.name === rule.name ? "text-white" : "text-muted-foreground"}`}>
                    {rule.name}
                  </span>
                  <p className={`text-xs mt-1 ${selectedRule.name === rule.name ? "text-primary" : "text-muted-foreground/70"}`}>
                    {rule.percentage < 100 ? `Max ${rule.percentage}%` : "Geen limiet"}
                  </p>
                </button>
              ))}
            </div>

            {selectedRule.name === "Custom" && (
              <div className="mt-4">
                <label className="block text-sm text-muted-foreground mb-2">Custom Percentage (%)</label>
                <input
                  type="number"
                  value={customPercentage}
                  onChange={(e) => setCustomPercentage(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white"
                  placeholder="30"
                />
              </div>
            )}

            <p className="mt-3 text-sm text-muted-foreground">
              {selectedRule.description}
            </p>
          </div>

          {/* Quick Add */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <h3 className="font-medium text-white mb-3">Snel Toevoegen</h3>
            <div className="flex gap-3">
              <input
                type="number"
                value={quickAddValue}
                onChange={(e) => setQuickAddValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && quickAddDay()}
                className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-white"
                placeholder="Voer dag resultaat in (€)"
              />
              <button
                onClick={quickAddDay}
                disabled={!quickAddValue}
                className="px-4 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Preset buttons */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => loadPreset("good")}
                className="text-xs px-3 py-1.5 rounded bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
              >
                Laad Goed Scenario
              </button>
              <button
                onClick={() => loadPreset("bad")}
                className="text-xs px-3 py-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
              >
                Laad Slecht Scenario
              </button>
              <button
                onClick={() => loadPreset("borderline")}
                className="text-xs px-3 py-1.5 rounded bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-colors"
              >
                Borderline
              </button>
            </div>
          </div>

          {/* Daily Results Input */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-white">Dagelijkse Resultaten</h3>
              <div className="flex gap-2">
                <button
                  onClick={addDay}
                  className="text-xs px-3 py-1.5 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Dag Toevoegen
                </button>
                {dailyResults.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs px-3 py-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    Wissen
                  </button>
                )}
              </div>
            </div>

            {dailyResults.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>Nog geen resultaten toegevoegd</p>
                <p className="text-sm">Voeg je dagelijkse winsten/verliezen toe</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {dailyResults.map((result, index) => {
                  const breakdown = calculations.dailyBreakdown[index]
                  return (
                    <div
                      key={result.id}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        breakdown?.isViolating
                          ? "bg-red-500/10 border border-red-500/30"
                          : "bg-background"
                      }`}
                    >
                      <span className="text-sm text-muted-foreground w-16">Dag {result.day}</span>
                      <div className="flex-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                        <input
                          type="number"
                          value={result.profit}
                          onChange={(e) => updateDayProfit(result.id, parseFloat(e.target.value) || 0)}
                          className={`w-full pl-8 pr-4 py-2 rounded-lg border text-sm ${
                            result.profit > 0
                              ? "bg-green-500/5 border-green-500/30 text-green-400"
                              : result.profit < 0
                              ? "bg-red-500/5 border-red-500/30 text-red-400"
                              : "bg-background border-border text-white"
                          }`}
                        />
                      </div>
                      {breakdown && result.profit > 0 && (
                        <span className={`text-xs w-16 text-right ${
                          breakdown.isViolating ? "text-red-400 font-semibold" : "text-muted-foreground"
                        }`}>
                          {breakdown.percentageOfTotal.toFixed(1)}%
                        </span>
                      )}
                      <button
                        onClick={() => removeDay(result.id)}
                        className="p-1.5 rounded hover:bg-red-500/20 text-muted-foreground hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Main Result Card */}
          <div className={`p-6 rounded-xl border ${
            effectivePercentage >= 100
              ? "bg-card border-border"
              : calculations.isPassing
              ? "bg-green-500/5 border-green-500/30"
              : "bg-red-500/5 border-red-500/30"
          }`}>
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-2">Consistency Score</p>
              <div className="flex items-center justify-center gap-3">
                <span className={`text-5xl font-bold ${
                  effectivePercentage >= 100
                    ? "text-white"
                    : calculations.isPassing
                    ? "text-green-400"
                    : "text-red-400"
                }`}>
                  {calculations.consistencyScore.toFixed(1)}%
                </span>
              </div>

              {effectivePercentage < 100 && (
                <p className="text-sm text-muted-foreground mt-2">
                  Limiet: {effectivePercentage}%
                </p>
              )}

              <div className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-sm font-medium ${
                effectivePercentage >= 100
                  ? "bg-primary/10 text-primary"
                  : calculations.isPassing
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}>
                {effectivePercentage >= 100 ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Geen Consistency Rule
                  </>
                ) : calculations.isPassing ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Payout Klaar!
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4" />
                    Nog Niet Klaar
                  </>
                )}
              </div>
            </div>

            {/* Visual Progress Bar */}
            {effectivePercentage < 100 && (
              <div className="mb-6">
                <div className="h-4 rounded-full bg-background overflow-hidden relative">
                  <div
                    className={`h-full transition-all ${
                      calculations.isPassing ? "bg-green-500" : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min(calculations.consistencyScore, 100)}%` }}
                  />
                  {/* Limit marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white"
                    style={{ left: `${effectivePercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0%</span>
                  <span className="text-white">Limiet: {effectivePercentage}%</span>
                  <span>100%</span>
                </div>
              </div>
            )}

            {/* Action Required */}
            {!calculations.isPassing && calculations.profitNeededToPass > 0 && (
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <h4 className="font-medium text-yellow-400 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Actie Vereist
                </h4>
                <p className="text-sm text-muted-foreground">
                  Je moet nog <strong className="text-white">€{calculations.profitNeededToPass.toFixed(0)}</strong> extra
                  winst maken (op andere dagen) om aan de {effectivePercentage}% consistency regel te voldoen.
                </p>
              </div>
            )}
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-xs text-muted-foreground mb-1">Totale Winst</p>
              <p className="text-2xl font-bold text-green-400">€{calculations.totalProfit.toFixed(0)}</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-xs text-muted-foreground mb-1">Netto Resultaat</p>
              <p className={`text-2xl font-bold ${calculations.netProfit >= 0 ? "text-green-400" : "text-red-400"}`}>
                €{calculations.netProfit.toFixed(0)}
              </p>
            </div>
          </div>

          {/* Best/Worst Day */}
          {calculations.bestDay && (
            <div className="p-4 rounded-xl bg-card border border-border">
              <h3 className="font-medium text-white mb-4">Beste & Slechtste Dag</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-sm font-medium text-green-400">Beste Dag</p>
                      <p className="text-xs text-muted-foreground">Dag {calculations.bestDay.day}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-400">€{calculations.bestDay.profit.toFixed(0)}</p>
                    <p className="text-xs text-muted-foreground">
                      {calculations.totalProfit > 0
                        ? `${((calculations.bestDay.profit / calculations.totalProfit) * 100).toFixed(1)}% van totaal`
                        : "-"
                      }
                    </p>
                  </div>
                </div>

                {calculations.worstDay && calculations.worstDay.profit < 0 && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-red-400 rotate-180" />
                      <div>
                        <p className="text-sm font-medium text-red-400">Slechtste Dag</p>
                        <p className="text-xs text-muted-foreground">Dag {calculations.worstDay.day}</p>
                      </div>
                    </div>
                    <p className="font-bold text-red-400">€{calculations.worstDay.profit.toFixed(0)}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Trading Statistics */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <h3 className="font-medium text-white mb-4">Trading Statistieken</h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-background">
                <p className="text-xs text-muted-foreground">Trading Dagen</p>
                <p className="text-lg font-bold text-white">{calculations.tradingDays}</p>
              </div>
              <div className="p-3 rounded-lg bg-background">
                <p className="text-xs text-muted-foreground">Win Rate</p>
                <p className="text-lg font-bold text-white">{calculations.winRate.toFixed(0)}%</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <p className="text-xs text-green-400">Winnende Dagen</p>
                <p className="text-lg font-bold text-green-400">{calculations.winningDays}</p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10">
                <p className="text-xs text-red-400">Verliezende Dagen</p>
                <p className="text-lg font-bold text-red-400">{calculations.losingDays}</p>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-background">
              <p className="text-xs text-muted-foreground">Gemiddelde Winst per Dag</p>
              <p className="text-lg font-bold text-white">€{calculations.averageDailyProfit.toFixed(0)}</p>
            </div>
          </div>

          {/* Daily Breakdown Visual */}
          {calculations.dailyBreakdown.length > 0 && calculations.totalProfit > 0 && effectivePercentage < 100 && (
            <div className="p-4 rounded-xl bg-card border border-border">
              <h3 className="font-medium text-white mb-4">Dag-voor-Dag Verdeling</h3>

              <div className="space-y-2">
                {calculations.dailyBreakdown
                  .filter(d => d.profit > 0)
                  .sort((a, b) => b.profit - a.profit)
                  .map((day) => (
                    <div key={day.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className={day.isViolating ? "text-red-400" : "text-muted-foreground"}>
                          Dag {day.day}
                          {day.isViolating && " ⚠️"}
                        </span>
                        <span className={day.isViolating ? "text-red-400 font-semibold" : "text-white"}>
                          {day.percentageOfTotal.toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-background overflow-hidden relative">
                        <div
                          className={`h-full ${day.isViolating ? "bg-red-500" : "bg-primary"}`}
                          style={{ width: `${Math.min(day.percentageOfTotal, 100)}%` }}
                        />
                        {/* Limit marker */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-yellow-400"
                          style={{ left: `${effectivePercentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary" />
                  <span>Binnen limiet</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-red-500" />
                  <span>Boven limiet</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-yellow-400" />
                  <span>{effectivePercentage}% limiet</span>
                </div>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong className="text-white">Tip:</strong> Probeer je winsten te spreiden over meerdere dagen.</p>
                <p>Beter 10 dagen van €200 dan 2 dagen van €1000. Consistente kleine winsten zijn het doel.</p>
                <p>Check altijd je consistency score <strong className="text-white">voordat</strong> je een payout aanvraagt!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
