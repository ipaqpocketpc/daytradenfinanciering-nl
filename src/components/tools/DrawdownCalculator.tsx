"use client"

import { useState, useMemo } from "react"
import {
  AlertTriangle,
  RefreshCw,
  Info,
  BarChart3,
} from "lucide-react"

// Prop firm drawdown presets
const propFirmPresets = [
  { name: "FTMO", dailyLimit: 5, maxDrawdown: 10, type: "static" as const },
  { name: "Apex Trader Funding", dailyLimit: 0, maxDrawdown: 6, type: "trailing" as const },
  { name: "The5ers", dailyLimit: 3, maxDrawdown: 6, type: "static" as const },
  { name: "FundedNext", dailyLimit: 5, maxDrawdown: 10, type: "static" as const },
  { name: "Topstep", dailyLimit: 0, maxDrawdown: 4, type: "trailing" as const },
  { name: "Custom", dailyLimit: 5, maxDrawdown: 10, type: "static" as const },
]

// Account size presets
const accountPresets = [
  { label: "€25.000", value: 25000 },
  { label: "€50.000", value: 50000 },
  { label: "€100.000", value: 100000 },
  { label: "€200.000", value: 200000 },
]

export function DrawdownCalculator() {
  // State
  const [startingBalance, setStartingBalance] = useState<number>(100000)
  const [customBalance, setCustomBalance] = useState<string>("")
  const [useCustomBalance, setUseCustomBalance] = useState(false)
  const [riskPerTrade, setRiskPerTrade] = useState<number>(1)
  const [consecutiveLosses, setConsecutiveLosses] = useState<number>(5)
  const [selectedPreset, setSelectedPreset] = useState<string>("FTMO")
  const [customDailyLimit, setCustomDailyLimit] = useState<number>(5)
  const [customMaxDrawdown, setCustomMaxDrawdown] = useState<number>(10)
  const [drawdownType, setDrawdownType] = useState<"static" | "trailing">("static")

  // Get effective values
  const effectiveBalance = useCustomBalance
    ? parseFloat(customBalance) || 0
    : startingBalance

  const preset = propFirmPresets.find(p => p.name === selectedPreset)
  const dailyLimit = selectedPreset === "Custom" ? customDailyLimit : (preset?.dailyLimit || 5)
  const maxDrawdown = selectedPreset === "Custom" ? customMaxDrawdown : (preset?.maxDrawdown || 10)
  const ddType = selectedPreset === "Custom" ? drawdownType : (preset?.type || "static")

  // Calculate drawdown simulation
  const simulation = useMemo(() => {
    if (effectiveBalance <= 0 || riskPerTrade <= 0) return null

    const results: Array<{
      trade: number
      balanceBefore: number
      loss: number
      balanceAfter: number
      drawdownPercent: number
      dailyDrawdownPercent: number
      brokeDaily: boolean
      brokeMax: boolean
      highWaterMark: number
    }> = []

    let balance = effectiveBalance
    let highWaterMark = effectiveBalance
    const dailyStartBalance = effectiveBalance

    for (let i = 1; i <= consecutiveLosses; i++) {
      const balanceBefore = balance
      const loss = balance * (riskPerTrade / 100)
      const balanceAfter = balance - loss

      // Update high water mark for trailing
      if (ddType === "trailing" && balanceBefore > highWaterMark) {
        highWaterMark = balanceBefore
      }

      // Calculate drawdowns
      const drawdownFromStart = ((effectiveBalance - balanceAfter) / effectiveBalance) * 100
      const drawdownFromHWM = ((highWaterMark - balanceAfter) / highWaterMark) * 100

      const effectiveDrawdown = ddType === "trailing" ? drawdownFromHWM : drawdownFromStart
      const dailyDrawdown = ((dailyStartBalance - balanceAfter) / dailyStartBalance) * 100

      results.push({
        trade: i,
        balanceBefore: Math.round(balanceBefore * 100) / 100,
        loss: Math.round(loss * 100) / 100,
        balanceAfter: Math.round(balanceAfter * 100) / 100,
        drawdownPercent: Math.round(effectiveDrawdown * 100) / 100,
        dailyDrawdownPercent: Math.round(dailyDrawdown * 100) / 100,
        brokeDaily: dailyLimit > 0 && dailyDrawdown >= dailyLimit,
        brokeMax: effectiveDrawdown >= maxDrawdown,
        highWaterMark,
      })

      balance = balanceAfter
    }

    // Calculate recovery needed
    const finalBalance = results[results.length - 1]?.balanceAfter || effectiveBalance
    const totalLoss = effectiveBalance - finalBalance
    const totalLossPercent = (totalLoss / effectiveBalance) * 100
    const recoveryNeeded = (totalLoss / finalBalance) * 100

    // Find break points
    const dailyBreakTrade = results.find(r => r.brokeDaily)?.trade || null
    const maxBreakTrade = results.find(r => r.brokeMax)?.trade || null

    return {
      results,
      finalBalance: Math.round(finalBalance * 100) / 100,
      totalLoss: Math.round(totalLoss * 100) / 100,
      totalLossPercent: Math.round(totalLossPercent * 100) / 100,
      recoveryNeeded: Math.round(recoveryNeeded * 100) / 100,
      dailyBreakTrade,
      maxBreakTrade,
      isAccountBlown: (dailyLimit > 0 && (results.some(r => r.brokeDaily))) || results.some(r => r.brokeMax),
    }
  }, [effectiveBalance, riskPerTrade, consecutiveLosses, dailyLimit, maxDrawdown, ddType])

  return (
    <div className="space-y-6">
      {/* Starting Balance */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Startbalans
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {accountPresets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => {
                setStartingBalance(preset.value)
                setUseCustomBalance(false)
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !useCustomBalance && startingBalance === preset.value
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:text-white hover:bg-muted/80"
              }`}
            >
              {preset.label}
            </button>
          ))}
          <button
            onClick={() => setUseCustomBalance(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              useCustomBalance
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:text-white hover:bg-muted/80"
            }`}
          >
            Anders
          </button>
        </div>

        {useCustomBalance && (
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
            <input
              type="number"
              value={customBalance}
              onChange={(e) => setCustomBalance(e.target.value)}
              placeholder="Vul bedrag in"
              className="w-full pl-8 pr-4 py-3 rounded-lg bg-muted border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}
      </div>

      {/* Prop Firm Preset */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Prop Firm Regels
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {propFirmPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setSelectedPreset(preset.name)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                selectedPreset === preset.name
                  ? "bg-secondary text-white"
                  : "bg-muted text-muted-foreground hover:text-white hover:bg-muted/80"
              }`}
            >
              <span className="block">{preset.name}</span>
              {preset.name !== "Custom" && (
                <span className="block text-xs opacity-70">
                  {preset.dailyLimit > 0 ? `${preset.dailyLimit}%/${preset.maxDrawdown}%` : `${preset.maxDrawdown}% ${preset.type}`}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Custom Settings */}
        {selectedPreset === "Custom" && (
          <div className="mt-4 p-4 rounded-lg bg-muted/50 space-y-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDrawdownType("static")}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  drawdownType === "static"
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                Static Drawdown
              </button>
              <button
                onClick={() => setDrawdownType("trailing")}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  drawdownType === "trailing"
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                Trailing Drawdown
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Daily Loss Limit (%)</label>
                <input
                  type="number"
                  value={customDailyLimit}
                  onChange={(e) => setCustomDailyLimit(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-white text-sm"
                  placeholder="0 = geen limiet"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Max Drawdown (%)</label>
                <input
                  type="number"
                  value={customMaxDrawdown}
                  onChange={(e) => setCustomMaxDrawdown(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-white text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Risk per Trade */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Risico per Trade: {riskPerTrade}%
        </label>
        <input
          type="range"
          min="0.25"
          max="5"
          step="0.25"
          value={riskPerTrade}
          onChange={(e) => setRiskPerTrade(parseFloat(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0.25%</span>
          <span>5%</span>
        </div>
      </div>

      {/* Consecutive Losses */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Aantal opeenvolgende verliezen: {consecutiveLosses}
        </label>
        <input
          type="range"
          min="1"
          max="20"
          step="1"
          value={consecutiveLosses}
          onChange={(e) => setConsecutiveLosses(parseInt(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>1</span>
          <span>20</span>
        </div>
      </div>

      {/* Results */}
      {simulation && (
        <div className="space-y-6">
          {/* Warning if account blown */}
          {simulation.isAccountBlown && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-400">Account Gefaald!</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {simulation.dailyBreakTrade && simulation.dailyBreakTrade <= (simulation.maxBreakTrade || Infinity)
                      ? `Daily loss limit bereikt bij trade ${simulation.dailyBreakTrade}`
                      : `Max drawdown bereikt bij trade ${simulation.maxBreakTrade}`
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-card border border-border text-center">
              <p className="text-sm text-muted-foreground mb-1">Eindbalans</p>
              <p className="text-xl font-bold text-white">€{simulation.finalBalance.toLocaleString("nl-NL")}</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border text-center">
              <p className="text-sm text-muted-foreground mb-1">Totaal Verlies</p>
              <p className="text-xl font-bold text-red-400">€{simulation.totalLoss.toLocaleString("nl-NL")}</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border text-center">
              <p className="text-sm text-muted-foreground mb-1">Drawdown</p>
              <p className={`text-xl font-bold ${simulation.totalLossPercent >= maxDrawdown ? "text-red-400" : "text-accent"}`}>
                {simulation.totalLossPercent}%
              </p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border text-center">
              <p className="text-sm text-muted-foreground mb-1">Recovery Nodig</p>
              <p className="text-xl font-bold text-secondary">{simulation.recoveryNeeded}%</p>
            </div>
          </div>

          {/* Trade Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Trade</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Voor</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Verlies</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Na</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">DD %</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {simulation.results.map((row) => (
                  <tr
                    key={row.trade}
                    className={`border-b border-border/50 ${
                      row.brokeDaily || row.brokeMax ? "bg-red-500/10" : ""
                    }`}
                  >
                    <td className="py-3 px-4 text-white font-medium">#{row.trade}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">
                      €{row.balanceBefore.toLocaleString("nl-NL")}
                    </td>
                    <td className="py-3 px-4 text-right text-red-400">
                      -€{row.loss.toLocaleString("nl-NL")}
                    </td>
                    <td className="py-3 px-4 text-right text-white">
                      €{row.balanceAfter.toLocaleString("nl-NL")}
                    </td>
                    <td className={`py-3 px-4 text-right ${
                      row.drawdownPercent >= maxDrawdown ? "text-red-400 font-bold" : "text-accent"
                    }`}>
                      {row.drawdownPercent}%
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.brokeMax ? (
                        <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-400">Max DD</span>
                      ) : row.brokeDaily ? (
                        <span className="px-2 py-1 rounded-full text-xs bg-accent/20 text-accent">Daily</span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs bg-secondary/20 text-secondary">OK</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recovery Info */}
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white mb-1">Recovery Perspectief</p>
                <p className="text-sm text-muted-foreground">
                  Na {simulation.totalLossPercent}% verlies heb je {simulation.recoveryNeeded}% winst nodig om terug te komen op je startbalans.
                  {simulation.recoveryNeeded > 50 && " Dit wordt significant moeilijker naarmate het verlies groter wordt."}
                </p>
              </div>
            </div>
          </div>

          {/* Drawdown Type Info */}
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white mb-1">
                  {ddType === "trailing" ? "Trailing Drawdown" : "Static Drawdown"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {ddType === "trailing"
                    ? "Bij trailing drawdown beweegt de limiet mee omhoog met winst, maar nooit omlaag. Dit is strenger omdat je 'buffer' niet terugkomt na winst."
                    : "Bij static drawdown blijft de limiet altijd berekend vanaf je startbalans. Dit is milder omdat winst je buffer vergroot."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No result state */}
      {!simulation && (
        <div className="p-8 rounded-xl bg-muted/30 border border-border text-center">
          <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Vul alle velden in om de drawdown simulatie te starten
          </p>
        </div>
      )}
    </div>
  )
}
