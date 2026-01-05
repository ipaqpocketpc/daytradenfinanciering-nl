"use client"

import { useState, useMemo } from "react"
import { Scale, AlertTriangle, Info, Target, Clock, Calculator } from "lucide-react"

export function BreakEvenCalculator() {
  // Current situation
  const [currentDrawdown, setCurrentDrawdown] = useState<string>("10")
  const [accountBalance, setAccountBalance] = useState<string>("90000")
  const [originalBalance, setOriginalBalance] = useState<string>("100000")

  // Trading stats
  const [averageWin, setAverageWin] = useState<string>("150")
  const [averageLoss, setAverageLoss] = useState<string>("100")
  const [winRate, setWinRate] = useState<string>("50")
  const [tradesPerDay, setTradesPerDay] = useState<string>("3")

  // Commissions
  const [commissionPerTrade, setCommissionPerTrade] = useState<string>("5")

  // Calculate from drawdown or from balance difference
  const [inputMode, setInputMode] = useState<"drawdown" | "balance">("drawdown")

  // Calculations
  const calculations = useMemo(() => {
    let drawdownPercent: number
    let currentBal: number
    let originalBal: number

    if (inputMode === "drawdown") {
      drawdownPercent = parseFloat(currentDrawdown) || 0
      originalBal = parseFloat(originalBalance) || 100000
      currentBal = originalBal * (1 - drawdownPercent / 100)
    } else {
      currentBal = parseFloat(accountBalance) || 0
      originalBal = parseFloat(originalBalance) || 0
      if (originalBal > 0) {
        drawdownPercent = ((originalBal - currentBal) / originalBal) * 100
      } else {
        drawdownPercent = 0
      }
    }

    // Amount to recover
    const amountToRecover = originalBal - currentBal

    // Recovery percentage needed
    const recoveryPercentNeeded = currentBal > 0
      ? ((originalBal - currentBal) / currentBal) * 100
      : 0

    // Trading stats
    const avgWin = parseFloat(averageWin) || 0
    const avgLoss = parseFloat(averageLoss) || 0
    const winRateDecimal = (parseFloat(winRate) || 0) / 100
    const commission = parseFloat(commissionPerTrade) || 0
    const tradesDay = parseFloat(tradesPerDay) || 1

    // Net win/loss after commission
    const netWin = avgWin - commission
    const netLoss = avgLoss + commission

    // Expectancy per trade
    const expectancy = (winRateDecimal * netWin) - ((1 - winRateDecimal) * netLoss)

    // R:R ratio
    const riskRewardRatio = avgLoss > 0 ? avgWin / avgLoss : 0

    // Required win rate for break-even (without recovery, just to not lose more)
    const requiredWinRateBreakEven = netLoss / (netWin + netLoss)

    // Trades needed to recover
    let tradesNeeded = 0
    let daysNeeded = 0
    let weeksNeeded = 0

    if (expectancy > 0 && amountToRecover > 0) {
      tradesNeeded = Math.ceil(amountToRecover / expectancy)
      daysNeeded = Math.ceil(tradesNeeded / tradesDay)
      weeksNeeded = Math.ceil(daysNeeded / 5) // 5 trading days per week
    } else if (expectancy <= 0) {
      tradesNeeded = -1 // Indicates impossible with current stats
    }

    // Winning trades needed (simplified)
    // If you only count winning trades at avg win
    const winningTradesNeeded = netWin > 0 ? Math.ceil(amountToRecover / netWin) : 0

    // Recovery scenarios
    const scenarios = [
      { winRate: 40, label: "40%" },
      { winRate: 50, label: "50%" },
      { winRate: 60, label: "60%" },
      { winRate: 70, label: "70%" },
    ].map(s => {
      const wr = s.winRate / 100
      const exp = (wr * netWin) - ((1 - wr) * netLoss)
      const trades = exp > 0 ? Math.ceil(amountToRecover / exp) : -1
      const days = trades > 0 ? Math.ceil(trades / tradesDay) : -1

      return {
        ...s,
        expectancy: exp,
        tradesNeeded: trades,
        daysNeeded: days,
        isProfitable: exp > 0
      }
    })

    // Compound recovery simulation
    const compoundRecovery = []
    let simBalance = currentBal
    let simTrades = 0
    const maxSimTrades = 1000

    while (simBalance < originalBal && simTrades < maxSimTrades && expectancy > 0) {
      simBalance += expectancy
      simTrades++

      // Record milestones
      const progress = ((simBalance - currentBal) / amountToRecover) * 100
      if (progress >= 25 && compoundRecovery.length === 0) {
        compoundRecovery.push({ milestone: "25%", trades: simTrades, balance: simBalance })
      } else if (progress >= 50 && compoundRecovery.length === 1) {
        compoundRecovery.push({ milestone: "50%", trades: simTrades, balance: simBalance })
      } else if (progress >= 75 && compoundRecovery.length === 2) {
        compoundRecovery.push({ milestone: "75%", trades: simTrades, balance: simBalance })
      } else if (progress >= 100 && compoundRecovery.length === 3) {
        compoundRecovery.push({ milestone: "100%", trades: simTrades, balance: simBalance })
      }
    }

    return {
      drawdownPercent,
      currentBalance: currentBal,
      originalBalance: originalBal,
      amountToRecover,
      recoveryPercentNeeded,
      expectancy,
      riskRewardRatio,
      requiredWinRateBreakEven: requiredWinRateBreakEven * 100,
      tradesNeeded,
      daysNeeded,
      weeksNeeded,
      winningTradesNeeded,
      scenarios,
      compoundRecovery,
      netWin,
      netLoss,
    }
  }, [
    inputMode, currentDrawdown, accountBalance, originalBalance,
    averageWin, averageLoss, winRate, tradesPerDay, commissionPerTrade
  ])

  // Drawdown severity
  const getDrawdownSeverity = (dd: number) => {
    if (dd >= 50) return { label: "Kritiek", color: "text-red-400", bg: "bg-red-500/10" }
    if (dd >= 30) return { label: "Ernstig", color: "text-orange-400", bg: "bg-orange-500/10" }
    if (dd >= 15) return { label: "Significant", color: "text-yellow-400", bg: "bg-yellow-500/10" }
    if (dd >= 5) return { label: "Mild", color: "text-green-400", bg: "bg-green-500/10" }
    return { label: "Minimaal", color: "text-green-400", bg: "bg-green-500/10" }
  }

  // Common drawdown presets
  const drawdownPresets = [
    { label: "5%", value: 5, description: "Kleine dip" },
    { label: "10%", value: 10, description: "Max drawdown limiet" },
    { label: "20%", value: 20, description: "Significante drawdown" },
    { label: "30%", value: 30, description: "Ernstige drawdown" },
    { label: "50%", value: 50, description: "Account gehalveerd" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Scale className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Break-Even Calculator</h2>
          <p className="text-muted-foreground">
            Bereken hoeveel trades je nodig hebt om te herstellen van drawdown
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Input Mode */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <label className="block text-sm font-medium text-white mb-3">Input Methode</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setInputMode("drawdown")}
                className={`p-3 rounded-lg border-2 transition-all ${
                  inputMode === "drawdown"
                    ? "border-primary bg-primary/10 text-white"
                    : "border-border bg-background/50 text-muted-foreground hover:border-primary/50"
                }`}
              >
                <span className="font-medium">Drawdown %</span>
                <p className="text-xs opacity-70 mt-1">Voer percentage in</p>
              </button>
              <button
                onClick={() => setInputMode("balance")}
                className={`p-3 rounded-lg border-2 transition-all ${
                  inputMode === "balance"
                    ? "border-primary bg-primary/10 text-white"
                    : "border-border bg-background/50 text-muted-foreground hover:border-primary/50"
                }`}
              >
                <span className="font-medium">Balans</span>
                <p className="text-xs opacity-70 mt-1">Voer bedragen in</p>
              </button>
            </div>
          </div>

          {/* Drawdown Input */}
          {inputMode === "drawdown" ? (
            <div className="p-4 rounded-xl bg-card border border-border space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Originele Balans (€)</label>
                <input
                  type="number"
                  value={originalBalance}
                  onChange={(e) => setOriginalBalance(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white"
                  placeholder="100000"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Huidige Drawdown (%)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="70"
                    value={currentDrawdown}
                    onChange={(e) => setCurrentDrawdown(e.target.value)}
                    className="flex-1 h-2 bg-background rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                  <div className="w-16 px-3 py-2 rounded-lg bg-background border border-border text-white text-center">
                    {currentDrawdown}%
                  </div>
                </div>
              </div>

              {/* Presets */}
              <div className="grid grid-cols-5 gap-2">
                {drawdownPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setCurrentDrawdown(preset.value.toString())}
                    className={`p-2 rounded-lg border text-xs transition-all ${
                      parseInt(currentDrawdown) === preset.value
                        ? "border-red-500 bg-red-500/10 text-red-400"
                        : "border-border bg-background/50 text-muted-foreground hover:border-red-500/50"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-card border border-border space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Originele Balans (€)</label>
                <input
                  type="number"
                  value={originalBalance}
                  onChange={(e) => setOriginalBalance(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white"
                  placeholder="100000"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Huidige Balans (€)</label>
                <input
                  type="number"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white"
                  placeholder="90000"
                />
              </div>
            </div>
          )}

          {/* Trading Statistics */}
          <div className="p-4 rounded-xl bg-card border border-border space-y-4">
            <h3 className="font-medium text-white">Jouw Trading Statistieken</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Gem. Winst (€)</label>
                <input
                  type="number"
                  value={averageWin}
                  onChange={(e) => setAverageWin(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-green-500/30 text-white"
                  placeholder="150"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Gem. Verlies (€)</label>
                <input
                  type="number"
                  value={averageLoss}
                  onChange={(e) => setAverageLoss(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-red-500/30 text-white"
                  placeholder="100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">Win Rate (%)</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={winRate}
                  onChange={(e) => setWinRate(e.target.value)}
                  className="flex-1 h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="w-16 px-3 py-2 rounded-lg bg-background border border-border text-white text-center">
                  {winRate}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Trades per Dag</label>
                <input
                  type="number"
                  value={tradesPerDay}
                  onChange={(e) => setTradesPerDay(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white"
                  placeholder="3"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Commissie (€)</label>
                <input
                  type="number"
                  value={commissionPerTrade}
                  onChange={(e) => setCommissionPerTrade(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white"
                  placeholder="5"
                />
              </div>
            </div>
          </div>

          {/* Reference Table */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <h3 className="font-medium text-white mb-3">Drawdown Recovery Referentie</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground font-medium">Verlies</th>
                    <th className="text-right py-2 text-muted-foreground font-medium">Nodig voor Recovery</th>
                  </tr>
                </thead>
                <tbody>
                  {[5, 10, 15, 20, 30, 40, 50].map((loss) => {
                    const recoveryNeeded = (loss / (100 - loss)) * 100
                    return (
                      <tr key={loss} className="border-b border-border/50">
                        <td className="py-2 text-white">{loss}%</td>
                        <td className={`py-2 text-right font-medium ${
                          recoveryNeeded > 100 ? "text-red-400" :
                          recoveryNeeded > 50 ? "text-orange-400" :
                          recoveryNeeded > 20 ? "text-yellow-400" : "text-green-400"
                        }`}>
                          {recoveryNeeded.toFixed(1)}%
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Main Result Card */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-2">Recovery Nodig</p>
              <div className="flex items-center justify-center gap-3">
                <span className={`text-5xl font-bold ${
                  calculations.recoveryPercentNeeded > 50 ? "text-red-400" :
                  calculations.recoveryPercentNeeded > 20 ? "text-orange-400" :
                  "text-yellow-400"
                }`}>
                  {calculations.recoveryPercentNeeded.toFixed(1)}%
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                €{calculations.amountToRecover.toFixed(0)} terug te verdienen
              </p>

              <div className={`inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full text-sm font-medium ${
                getDrawdownSeverity(calculations.drawdownPercent).bg
              } ${getDrawdownSeverity(calculations.drawdownPercent).color}`}>
                {getDrawdownSeverity(calculations.drawdownPercent).label} Drawdown ({calculations.drawdownPercent.toFixed(1)}%)
              </div>
            </div>

            {/* Balance visualization */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">€{calculations.currentBalance.toFixed(0)}</span>
                <span className="text-white">€{calculations.originalBalance.toFixed(0)}</span>
              </div>
              <div className="h-4 rounded-full bg-background overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-red-500 to-green-500 transition-all"
                  style={{ width: `${(calculations.currentBalance / calculations.originalBalance) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-center">
                {((calculations.currentBalance / calculations.originalBalance) * 100).toFixed(1)}% van originele balans
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-background">
                <p className="text-xs text-muted-foreground mb-1">Huidige Balans</p>
                <p className="text-lg font-bold text-white">€{calculations.currentBalance.toFixed(0)}</p>
              </div>
              <div className="p-3 rounded-lg bg-background">
                <p className="text-xs text-muted-foreground mb-1">Te Herstellen</p>
                <p className="text-lg font-bold text-red-400">€{calculations.amountToRecover.toFixed(0)}</p>
              </div>
            </div>
          </div>

          {/* Expectancy Analysis */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Trading Analyse
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-background">
                  <p className="text-xs text-muted-foreground mb-1">Expectancy per Trade</p>
                  <p className={`text-lg font-bold ${calculations.expectancy >= 0 ? "text-green-400" : "text-red-400"}`}>
                    €{calculations.expectancy.toFixed(2)}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-background">
                  <p className="text-xs text-muted-foreground mb-1">R:R Ratio</p>
                  <p className="text-lg font-bold text-white">
                    1:{calculations.riskRewardRatio.toFixed(2)}
                  </p>
                </div>
              </div>

              {calculations.expectancy > 0 ? (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="font-medium text-green-400 mb-2">✓ Winstgevende Setup</p>
                  <p className="text-sm text-muted-foreground">
                    Met je huidige statistieken maak je gemiddeld €{calculations.expectancy.toFixed(2)} per trade.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="font-medium text-red-400 mb-2">✗ Niet Winstgevend</p>
                  <p className="text-sm text-muted-foreground">
                    Met je huidige statistieken verlies je €{Math.abs(calculations.expectancy).toFixed(2)} per trade.
                    Je kunt niet recoveren zonder je strategie te verbeteren.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Recovery Timeline */}
          {calculations.expectancy > 0 && (
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-secondary" />
                Recovery Tijdlijn
              </h3>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20 text-center">
                  <p className="text-3xl font-bold text-secondary">{calculations.tradesNeeded}</p>
                  <p className="text-xs text-muted-foreground mt-1">Trades</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20 text-center">
                  <p className="text-3xl font-bold text-secondary">{calculations.daysNeeded}</p>
                  <p className="text-xs text-muted-foreground mt-1">Trading Dagen</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20 text-center">
                  <p className="text-3xl font-bold text-secondary">{calculations.weeksNeeded}</p>
                  <p className="text-xs text-muted-foreground mt-1">Weken</p>
                </div>
              </div>

              {/* Recovery milestones */}
              {calculations.compoundRecovery.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-3">Recovery Milestones</p>
                  {calculations.compoundRecovery.map((milestone, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-background">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          index < calculations.compoundRecovery.length - 1 ? "bg-primary" : "bg-green-500"
                        }`} />
                        <span className="text-sm text-white">{milestone.milestone} recovered</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ~{milestone.trades} trades
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Win Rate Scenarios */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              Win Rate Scenarios
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground font-medium">Win Rate</th>
                    <th className="text-right py-2 text-muted-foreground font-medium">€/Trade</th>
                    <th className="text-right py-2 text-muted-foreground font-medium">Trades</th>
                    <th className="text-right py-2 text-muted-foreground font-medium">Dagen</th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.scenarios.map((scenario) => (
                    <tr
                      key={scenario.winRate}
                      className={`border-b border-border/50 ${
                        parseInt(winRate) === scenario.winRate ? "bg-primary/10" : ""
                      }`}
                    >
                      <td className="py-2 text-white">{scenario.label}</td>
                      <td className={`py-2 text-right ${scenario.isProfitable ? "text-green-400" : "text-red-400"}`}>
                        €{scenario.expectancy.toFixed(2)}
                      </td>
                      <td className="py-2 text-right text-white">
                        {scenario.tradesNeeded > 0 ? scenario.tradesNeeded : "∞"}
                      </td>
                      <td className="py-2 text-right text-muted-foreground">
                        {scenario.daysNeeded > 0 ? scenario.daysNeeded : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Gebaseerd op €{averageWin} gem. winst, €{averageLoss} gem. verlies, {tradesPerDay} trades/dag
            </p>
          </div>

          {/* Warnings */}
          {calculations.drawdownPercent >= 10 && (
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-400">Recovery Advies</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {calculations.drawdownPercent >= 30
                    ? "Bij 30%+ drawdown, overweeg je position size te halveren om verdere schade te voorkomen."
                    : calculations.drawdownPercent >= 20
                    ? "Significante drawdown. Focus op risico beperking en kleine, consistente winsten."
                    : "Blijf gedisciplineerd. Verhoog je risico NIET om sneller te herstellen."
                  }
                </p>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">
                  <strong className="text-white">Belangrijk:</strong> Deze berekeningen zijn gebaseerd op gemiddelden.
                  In werkelijkheid varieert elke trade.
                </p>
                <p>
                  De belangrijkste les: hoe groter je drawdown, hoe moeilijker recovery wordt.
                  Voorkom is beter dan genezen!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
