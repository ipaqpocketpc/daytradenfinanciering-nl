"use client"

import { useState, useMemo } from "react"
import { Scale, TrendingUp, TrendingDown, Target, AlertTriangle, Info, ArrowUp, ArrowDown } from "lucide-react"

type TradeDirection = "long" | "short"
type InputMethod = "price" | "pips"

export function RiskRewardCalculator() {
  // Trade direction
  const [direction, setDirection] = useState<TradeDirection>("long")
  const [inputMethod, setInputMethod] = useState<InputMethod>("price")

  // Price inputs (for price method)
  const [entryPrice, setEntryPrice] = useState<string>("1.0850")
  const [stopLossPrice, setStopLossPrice] = useState<string>("1.0800")
  const [takeProfitPrice, setTakeProfitPrice] = useState<string>("1.0950")

  // Pip inputs (for pip method)
  const [stopLossPips, setStopLossPips] = useState<string>("50")
  const [takeProfitPips, setTakeProfitPips] = useState<string>("100")

  // Optional: For expectancy calculation
  const [estimatedWinRate, setEstimatedWinRate] = useState<string>("50")
  const [riskAmount, setRiskAmount] = useState<string>("100")

  // Multiple targets
  const [useMultipleTargets, setUseMultipleTargets] = useState(false)
  const [target2Pips, setTarget2Pips] = useState<string>("150")
  const [target2Percentage, setTarget2Percentage] = useState<string>("50")
  const [target3Pips, setTarget3Pips] = useState<string>("200")
  const [target3Percentage, setTarget3Percentage] = useState<string>("25")

  // Calculations
  const calculations = useMemo(() => {
    let stopLossDistance: number
    let takeProfitDistance: number

    if (inputMethod === "price") {
      const entry = parseFloat(entryPrice)
      const sl = parseFloat(stopLossPrice)
      const tp = parseFloat(takeProfitPrice)

      if (isNaN(entry) || isNaN(sl) || isNaN(tp)) {
        return null
      }

      if (direction === "long") {
        stopLossDistance = entry - sl
        takeProfitDistance = tp - entry
      } else {
        stopLossDistance = sl - entry
        takeProfitDistance = entry - tp
      }
    } else {
      stopLossDistance = parseFloat(stopLossPips)
      takeProfitDistance = parseFloat(takeProfitPips)

      if (isNaN(stopLossDistance) || isNaN(takeProfitDistance)) {
        return null
      }
    }

    // Validate directions
    if (stopLossDistance <= 0 || takeProfitDistance <= 0) {
      return null
    }

    // Basic R:R
    const riskRewardRatio = takeProfitDistance / stopLossDistance

    // Required win rate for break-even
    const requiredWinRate = (1 / (1 + riskRewardRatio)) * 100

    // Expectancy calculation
    const winRate = parseFloat(estimatedWinRate) / 100
    const risk = parseFloat(riskAmount)

    if (isNaN(winRate) || isNaN(risk)) {
      return {
        stopLossDistance,
        takeProfitDistance,
        riskRewardRatio,
        requiredWinRate,
        expectancy: null,
        expectedProfitPer100Trades: null,
        rewardAmount: null,
        isProfitable: null,
      }
    }

    const rewardAmount = risk * riskRewardRatio

    // Expectancy = (Win% × Avg Win) - (Loss% × Avg Loss)
    const expectancy = (winRate * rewardAmount) - ((1 - winRate) * risk)

    // Per 100 trades
    const expectedProfitPer100Trades = expectancy * 100

    const isProfitable = winRate > (requiredWinRate / 100)

    // Multiple targets calculation
    let effectiveRR = riskRewardRatio
    if (useMultipleTargets && inputMethod === "pips") {
      const t1Pips = takeProfitDistance
      const t2Pips = parseFloat(target2Pips) || 0
      const t3Pips = parseFloat(target3Pips) || 0

      const t1Pct = (100 - parseFloat(target2Percentage || "0") - parseFloat(target3Percentage || "0")) / 100
      const t2Pct = parseFloat(target2Percentage || "0") / 100
      const t3Pct = parseFloat(target3Percentage || "0") / 100

      const weightedTP = (t1Pips * t1Pct) + (t2Pips * t2Pct) + (t3Pips * t3Pct)
      effectiveRR = weightedTP / stopLossDistance
    }

    return {
      stopLossDistance,
      takeProfitDistance,
      riskRewardRatio,
      requiredWinRate,
      expectancy,
      expectedProfitPer100Trades,
      rewardAmount,
      isProfitable,
      effectiveRR,
    }
  }, [
    direction, inputMethod, entryPrice, stopLossPrice, takeProfitPrice,
    stopLossPips, takeProfitPips, estimatedWinRate, riskAmount,
    useMultipleTargets, target2Pips, target2Percentage, target3Pips, target3Percentage
  ])

  // Quality assessment
  const getQualityAssessment = (rr: number) => {
    if (rr >= 3) return { label: "Uitstekend", color: "text-green-400", bg: "bg-green-500/10" }
    if (rr >= 2) return { label: "Goed", color: "text-green-400", bg: "bg-green-500/10" }
    if (rr >= 1.5) return { label: "Acceptabel", color: "text-yellow-400", bg: "bg-yellow-500/10" }
    if (rr >= 1) return { label: "Matig", color: "text-orange-400", bg: "bg-orange-500/10" }
    return { label: "Slecht", color: "text-red-400", bg: "bg-red-500/10" }
  }

  // Win rate scenarios
  const winRateScenarios = useMemo(() => {
    if (!calculations) return []

    const risk = parseFloat(riskAmount) || 100
    const scenarios = [30, 40, 50, 60, 70]

    return scenarios.map(wr => {
      const winRate = wr / 100
      const rewardAmount = risk * calculations.riskRewardRatio
      const expectancy = (winRate * rewardAmount) - ((1 - winRate) * risk)
      const per100 = expectancy * 100

      return {
        winRate: wr,
        expectancy,
        per100,
        isProfitable: expectancy > 0
      }
    })
  }, [calculations, riskAmount])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
          <Scale className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Risk/Reward Calculator</h2>
          <p className="text-muted-foreground">
            Bereken je R:R ratio en ontdek welke win rate je nodig hebt om winstgevend te zijn
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Trade Direction */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <label className="block text-sm font-medium text-white mb-3">Trade Richting</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDirection("long")}
                className={`p-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                  direction === "long"
                    ? "border-green-500 bg-green-500/10 text-green-400"
                    : "border-border bg-background/50 text-muted-foreground hover:border-green-500/50"
                }`}
              >
                <ArrowUp className="w-5 h-5" />
                <span className="font-semibold">Long (Kopen)</span>
              </button>
              <button
                onClick={() => setDirection("short")}
                className={`p-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                  direction === "short"
                    ? "border-red-500 bg-red-500/10 text-red-400"
                    : "border-border bg-background/50 text-muted-foreground hover:border-red-500/50"
                }`}
              >
                <ArrowDown className="w-5 h-5" />
                <span className="font-semibold">Short (Verkopen)</span>
              </button>
            </div>
          </div>

          {/* Input Method */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <label className="block text-sm font-medium text-white mb-3">Input Methode</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setInputMethod("price")}
                className={`p-3 rounded-lg border-2 transition-all ${
                  inputMethod === "price"
                    ? "border-primary bg-primary/10 text-white"
                    : "border-border bg-background/50 text-muted-foreground hover:border-primary/50"
                }`}
              >
                <span className="font-medium">Prijzen</span>
                <p className="text-xs opacity-70 mt-1">Entry, SL, TP prijzen</p>
              </button>
              <button
                onClick={() => setInputMethod("pips")}
                className={`p-3 rounded-lg border-2 transition-all ${
                  inputMethod === "pips"
                    ? "border-primary bg-primary/10 text-white"
                    : "border-border bg-background/50 text-muted-foreground hover:border-primary/50"
                }`}
              >
                <span className="font-medium">Pips/Punten</span>
                <p className="text-xs opacity-70 mt-1">SL en TP afstand</p>
              </button>
            </div>
          </div>

          {/* Price Inputs */}
          {inputMethod === "price" && (
            <div className="p-4 rounded-xl bg-card border border-border space-y-4">
              <h3 className="font-medium text-white">Prijzen Invoeren</h3>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Entry Prijs</label>
                <input
                  type="number"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(e.target.value)}
                  step="0.0001"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="1.0850"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Stop-Loss Prijs
                  <span className="text-red-400 ml-2">
                    ({direction === "long" ? "onder entry" : "boven entry"})
                  </span>
                </label>
                <input
                  type="number"
                  value={stopLossPrice}
                  onChange={(e) => setStopLossPrice(e.target.value)}
                  step="0.0001"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                  placeholder="1.0800"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Take-Profit Prijs
                  <span className="text-green-400 ml-2">
                    ({direction === "long" ? "boven entry" : "onder entry"})
                  </span>
                </label>
                <input
                  type="number"
                  value={takeProfitPrice}
                  onChange={(e) => setTakeProfitPrice(e.target.value)}
                  step="0.0001"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                  placeholder="1.0950"
                />
              </div>
            </div>
          )}

          {/* Pip Inputs */}
          {inputMethod === "pips" && (
            <div className="p-4 rounded-xl bg-card border border-border space-y-4">
              <h3 className="font-medium text-white">Afstanden in Pips/Punten</h3>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Stop-Loss Afstand (pips)
                </label>
                <input
                  type="number"
                  value={stopLossPips}
                  onChange={(e) => setStopLossPips(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                  placeholder="50"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Take-Profit Afstand (pips)
                </label>
                <input
                  type="number"
                  value={takeProfitPips}
                  onChange={(e) => setTakeProfitPips(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                  placeholder="100"
                />
              </div>

              {/* Multiple Targets */}
              <div className="pt-4 border-t border-border">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useMultipleTargets}
                    onChange={(e) => setUseMultipleTargets(e.target.checked)}
                    className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">Gebruik meerdere targets (partials)</span>
                </label>
              </div>

              {useMultipleTargets && (
                <div className="space-y-3 pt-2">
                  <div className="p-3 rounded-lg bg-background/50 text-xs text-muted-foreground">
                    <Info className="w-4 h-4 inline mr-2" />
                    Vul in hoeveel % van je positie je sluit bij elk target
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Target 2 (pips)</label>
                      <input
                        type="number"
                        value={target2Pips}
                        onChange={(e) => setTarget2Pips(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-background border border-border text-white text-sm"
                        placeholder="150"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">% Positie</label>
                      <input
                        type="number"
                        value={target2Percentage}
                        onChange={(e) => setTarget2Percentage(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-background border border-border text-white text-sm"
                        placeholder="50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Target 3 (pips)</label>
                      <input
                        type="number"
                        value={target3Pips}
                        onChange={(e) => setTarget3Pips(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-background border border-border text-white text-sm"
                        placeholder="200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">% Positie</label>
                      <input
                        type="number"
                        value={target3Percentage}
                        onChange={(e) => setTarget3Percentage(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-background border border-border text-white text-sm"
                        placeholder="25"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Expectancy Inputs */}
          <div className="p-4 rounded-xl bg-card border border-border space-y-4">
            <h3 className="font-medium text-white flex items-center gap-2">
              Expectancy Berekening
              <span className="text-xs text-muted-foreground font-normal">(optioneel)</span>
            </h3>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Je Geschatte Win Rate (%)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={estimatedWinRate}
                  onChange={(e) => setEstimatedWinRate(e.target.value)}
                  className="flex-1 h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="w-16 px-3 py-2 rounded-lg bg-background border border-border text-white text-center">
                  {estimatedWinRate}%
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Risico per Trade (€)
              </label>
              <input
                type="number"
                value={riskAmount}
                onChange={(e) => setRiskAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white"
                placeholder="100"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {calculations ? (
            <>
              {/* Main R:R Result */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Risk/Reward Ratio</p>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-5xl font-bold text-white">
                      1:{calculations.riskRewardRatio.toFixed(2)}
                    </span>
                  </div>
                  <div className={`inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full text-sm font-medium ${getQualityAssessment(calculations.riskRewardRatio).bg} ${getQualityAssessment(calculations.riskRewardRatio).color}`}>
                    {getQualityAssessment(calculations.riskRewardRatio).label}
                  </div>
                </div>

                {/* Visual Bar */}
                <div className="relative h-12 rounded-lg overflow-hidden bg-background mb-4">
                  <div
                    className="absolute left-0 top-0 h-full bg-red-500/30 border-r-2 border-red-500 flex items-center justify-center"
                    style={{ width: `${(1 / (1 + calculations.riskRewardRatio)) * 100}%` }}
                  >
                    <span className="text-xs font-medium text-red-400">Risk</span>
                  </div>
                  <div
                    className="absolute right-0 top-0 h-full bg-green-500/30 border-l-2 border-green-500 flex items-center justify-center"
                    style={{ width: `${(calculations.riskRewardRatio / (1 + calculations.riskRewardRatio)) * 100}%` }}
                  >
                    <span className="text-xs font-medium text-green-400">Reward</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-xs text-red-400 mb-1">Stop-Loss</p>
                    <p className="text-lg font-bold text-white">
                      {inputMethod === "pips"
                        ? `${calculations.stopLossDistance} pips`
                        : calculations.stopLossDistance.toFixed(4)
                      }
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-xs text-green-400 mb-1">Take-Profit</p>
                    <p className="text-lg font-bold text-white">
                      {inputMethod === "pips"
                        ? `${calculations.takeProfitDistance} pips`
                        : calculations.takeProfitDistance.toFixed(4)
                      }
                    </p>
                  </div>
                </div>

                {/* Multiple targets result */}
                {useMultipleTargets && calculations.effectiveRR && (
                  <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-xs text-primary mb-1">Effectieve R:R (met partials)</p>
                    <p className="text-lg font-bold text-white">
                      1:{calculations.effectiveRR.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>

              {/* Required Win Rate */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Benodigde Win Rate
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Om break-even te draaien:</span>
                  <span className="text-2xl font-bold text-white">
                    {calculations.requiredWinRate.toFixed(1)}%
                  </span>
                </div>

                {/* Visual comparison */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Benodigde win rate</span>
                      <span className="text-white">{calculations.requiredWinRate.toFixed(1)}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-background overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${Math.min(calculations.requiredWinRate, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Jouw geschatte win rate</span>
                      <span className={calculations.isProfitable ? "text-green-400" : "text-red-400"}>
                        {estimatedWinRate}%
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-background overflow-hidden">
                      <div
                        className={`h-full rounded-full ${calculations.isProfitable ? "bg-green-500" : "bg-red-500"}`}
                        style={{ width: `${Math.min(parseFloat(estimatedWinRate), 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className={`mt-4 p-3 rounded-lg flex items-start gap-3 ${
                  calculations.isProfitable ? "bg-green-500/10" : "bg-red-500/10"
                }`}>
                  {calculations.isProfitable ? (
                    <>
                      <TrendingUp className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-400">Winstgevende Setup</p>
                        <p className="text-sm text-muted-foreground">
                          Met {estimatedWinRate}% win rate en 1:{calculations.riskRewardRatio.toFixed(2)} R:R ben je winstgevend
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-400">Niet Winstgevend</p>
                        <p className="text-sm text-muted-foreground">
                          Je hebt {calculations.requiredWinRate.toFixed(1)}% win rate nodig, maar je schat {estimatedWinRate}%
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Expectancy */}
              {calculations.expectancy !== null && (
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-secondary" />
                    Expectancy (Verwachte Winst)
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 rounded-lg bg-background">
                      <p className="text-sm text-muted-foreground mb-1">Per Trade</p>
                      <p className={`text-2xl font-bold ${calculations.expectancy >= 0 ? "text-green-400" : "text-red-400"}`}>
                        €{calculations.expectancy.toFixed(2)}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-background">
                      <p className="text-sm text-muted-foreground mb-1">Per 100 Trades</p>
                      <p className={`text-2xl font-bold ${calculations.expectedProfitPer100Trades! >= 0 ? "text-green-400" : "text-red-400"}`}>
                        €{calculations.expectedProfitPer100Trades!.toFixed(0)}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-background/50 text-sm text-muted-foreground">
                    <p>
                      <strong className="text-white">Formule:</strong> ({estimatedWinRate}% × €{calculations.rewardAmount?.toFixed(2)}) - ({100 - parseInt(estimatedWinRate)}% × €{riskAmount}) = €{calculations.expectancy.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}

              {/* Win Rate Scenarios Table */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-white mb-4">Win Rate Scenarios</h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 text-muted-foreground font-medium">Win Rate</th>
                        <th className="text-right py-2 text-muted-foreground font-medium">Per Trade</th>
                        <th className="text-right py-2 text-muted-foreground font-medium">Per 100 Trades</th>
                        <th className="text-right py-2 text-muted-foreground font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {winRateScenarios.map((scenario) => (
                        <tr
                          key={scenario.winRate}
                          className={`border-b border-border/50 ${
                            scenario.winRate === parseInt(estimatedWinRate) ? "bg-primary/10" : ""
                          }`}
                        >
                          <td className="py-2 text-white">{scenario.winRate}%</td>
                          <td className={`py-2 text-right ${scenario.isProfitable ? "text-green-400" : "text-red-400"}`}>
                            €{scenario.expectancy.toFixed(2)}
                          </td>
                          <td className={`py-2 text-right ${scenario.isProfitable ? "text-green-400" : "text-red-400"}`}>
                            €{scenario.per100.toFixed(0)}
                          </td>
                          <td className="py-2 text-right">
                            {scenario.isProfitable ? (
                              <span className="text-green-400">✓ Winst</span>
                            ) : (
                              <span className="text-red-400">✗ Verlies</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  Gebaseerd op €{riskAmount} risico per trade met 1:{calculations.riskRewardRatio.toFixed(2)} R:R
                </p>
              </div>

              {/* Warnings */}
              {calculations.riskRewardRatio < 1.5 && (
                <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-400">Lage R:R Ratio</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Een R:R van minder dan 1.5 vereist een hoge win rate. Overweeg een grotere take-profit of kleinere stop-loss.
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-8 rounded-xl bg-card border border-border text-center">
              <Scale className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">
                Vul geldige waarden in om je R:R ratio te berekenen
              </p>
              <p className="text-sm text-muted-foreground/70 mt-2">
                {inputMethod === "price"
                  ? `Voor een ${direction} trade moet de stop-loss ${direction === "long" ? "onder" : "boven"} de entry zijn`
                  : "Stop-loss en take-profit moeten positieve getallen zijn"
                }
              </p>
            </div>
          )}

          {/* Quick Reference */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <h4 className="font-medium text-white mb-3 text-sm">Quick Reference</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-background">
                <span className="text-muted-foreground">1:1 R:R =</span>
                <span className="text-white ml-2">50% win rate nodig</span>
              </div>
              <div className="p-2 rounded bg-background">
                <span className="text-muted-foreground">1:1.5 R:R =</span>
                <span className="text-white ml-2">40% win rate nodig</span>
              </div>
              <div className="p-2 rounded bg-background">
                <span className="text-muted-foreground">1:2 R:R =</span>
                <span className="text-white ml-2">33% win rate nodig</span>
              </div>
              <div className="p-2 rounded bg-background">
                <span className="text-muted-foreground">1:3 R:R =</span>
                <span className="text-white ml-2">25% win rate nodig</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
