"use client"

import { useState, useMemo } from "react"
import {
  Calculator,
  Target,
  AlertCircle,
  TrendingUp,
  Info,
  CheckCircle2,
} from "lucide-react"

// Forex pairs with their pip values (per standard lot in USD)
const forexPairs = {
  "EUR/USD": { pipValue: 10, pipDecimal: 0.0001, category: "major" },
  "GBP/USD": { pipValue: 10, pipDecimal: 0.0001, category: "major" },
  "USD/JPY": { pipValue: 6.67, pipDecimal: 0.01, category: "major" },
  "USD/CHF": { pipValue: 11.24, pipDecimal: 0.0001, category: "major" },
  "AUD/USD": { pipValue: 10, pipDecimal: 0.0001, category: "major" },
  "USD/CAD": { pipValue: 7.46, pipDecimal: 0.0001, category: "major" },
  "NZD/USD": { pipValue: 10, pipDecimal: 0.0001, category: "major" },
  "EUR/GBP": { pipValue: 12.64, pipDecimal: 0.0001, category: "cross" },
  "EUR/JPY": { pipValue: 6.67, pipDecimal: 0.01, category: "cross" },
  "GBP/JPY": { pipValue: 6.67, pipDecimal: 0.01, category: "cross" },
  "EUR/CHF": { pipValue: 11.24, pipDecimal: 0.0001, category: "cross" },
  "AUD/JPY": { pipValue: 6.67, pipDecimal: 0.01, category: "cross" },
  "CAD/JPY": { pipValue: 6.67, pipDecimal: 0.01, category: "cross" },
  "CHF/JPY": { pipValue: 6.67, pipDecimal: 0.01, category: "cross" },
  "EUR/AUD": { pipValue: 6.45, pipDecimal: 0.0001, category: "cross" },
  "GBP/AUD": { pipValue: 6.45, pipDecimal: 0.0001, category: "cross" },
  "XAU/USD": { pipValue: 1, pipDecimal: 0.01, category: "commodity" },
} as const

type ForexPair = keyof typeof forexPairs

// Prop firm account presets
const accountPresets = [
  { label: "€10.000", value: 10000 },
  { label: "€25.000", value: 25000 },
  { label: "€50.000", value: 50000 },
  { label: "€100.000", value: 100000 },
  { label: "€200.000", value: 200000 },
]

// Risk presets
const riskPresets = [
  { label: "0.25%", value: 0.25, description: "Ultra conservatief" },
  { label: "0.5%", value: 0.5, description: "Conservatief (aanbevolen voor challenges)" },
  { label: "1%", value: 1, description: "Standaard" },
  { label: "1.5%", value: 1.5, description: "Agressief" },
  { label: "2%", value: 2, description: "Zeer agressief" },
]

export function PositionSizeCalculator() {
  // State
  const [accountSize, setAccountSize] = useState<number>(100000)
  const [customAccountSize, setCustomAccountSize] = useState<string>("")
  const [useCustomAccount, setUseCustomAccount] = useState(false)
  const [riskPercentage, setRiskPercentage] = useState<number>(1)
  const [customRisk, setCustomRisk] = useState<string>("")
  const [useCustomRisk, setUseCustomRisk] = useState(false)
  const [stopLossPips, setStopLossPips] = useState<string>("20")
  const [selectedPair, setSelectedPair] = useState<ForexPair>("EUR/USD")
  const [accountCurrency, setAccountCurrency] = useState<"EUR" | "USD">("EUR")

  // EUR/USD rate for conversion (approximate)
  const eurUsdRate = 1.08

  // Get effective values
  const effectiveAccountSize = useCustomAccount
    ? parseFloat(customAccountSize) || 0
    : accountSize

  const effectiveRisk = useCustomRisk
    ? parseFloat(customRisk) || 0
    : riskPercentage

  const effectiveStopLoss = parseFloat(stopLossPips) || 0

  // Calculate position size
  const calculation = useMemo(() => {
    if (effectiveAccountSize <= 0 || effectiveRisk <= 0 || effectiveStopLoss <= 0) {
      return null
    }

    const pair = forexPairs[selectedPair]

    // Account size in USD for calculation
    const accountInUsd = accountCurrency === "EUR"
      ? effectiveAccountSize * eurUsdRate
      : effectiveAccountSize

    // Risk amount in USD
    const riskAmount = accountInUsd * (effectiveRisk / 100)

    // Pip value per standard lot (already in USD)
    const pipValuePerLot = pair.pipValue

    // Position size in standard lots
    const positionSizeLots = riskAmount / (effectiveStopLoss * pipValuePerLot)

    // Convert back to account currency for display
    const riskInAccountCurrency = accountCurrency === "EUR"
      ? riskAmount / eurUsdRate
      : riskAmount

    // Calculate potential loss per trade
    const potentialLoss = riskInAccountCurrency

    // Calculate for different lot sizes
    const standardLots = positionSizeLots
    const miniLots = positionSizeLots * 10
    const microLots = positionSizeLots * 100

    // Pip value for this position
    const pipValueForPosition = pipValuePerLot * positionSizeLots
    const pipValueInAccountCurrency = accountCurrency === "EUR"
      ? pipValueForPosition / eurUsdRate
      : pipValueForPosition

    return {
      standardLots: Math.round(standardLots * 100) / 100,
      miniLots: Math.round(miniLots * 100) / 100,
      microLots: Math.round(microLots * 100) / 100,
      riskAmount: Math.round(riskInAccountCurrency * 100) / 100,
      pipValue: Math.round(pipValueInAccountCurrency * 100) / 100,
      potentialLoss,
      isValidSize: standardLots >= 0.01,
      currency: accountCurrency === "EUR" ? "€" : "$",
    }
  }, [effectiveAccountSize, effectiveRisk, effectiveStopLoss, selectedPair, accountCurrency])

  // Validation warnings
  const warnings = useMemo(() => {
    const list: string[] = []

    if (effectiveRisk > 2) {
      list.push("Risico boven 2% wordt niet aanbevolen voor prop firm accounts")
    }
    if (effectiveRisk > 1 && effectiveAccountSize >= 50000) {
      list.push("Overweeg lager risico voor grotere accounts")
    }
    if (effectiveStopLoss < 5) {
      list.push("Zeer kleine stop-loss kan leiden tot vroegtijdige uitstap door spread")
    }
    if (effectiveStopLoss > 100) {
      list.push("Grote stop-loss vereist langere holding time")
    }
    if (calculation && calculation.standardLots > 10) {
      list.push("Grote positie - controleer of je broker dit toestaat")
    }

    return list
  }, [effectiveRisk, effectiveStopLoss, effectiveAccountSize, calculation])

  return (
    <div className="space-y-6">
      {/* Account Size */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Account Grootte
        </label>

        {/* Currency Toggle */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setAccountCurrency("EUR")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              accountCurrency === "EUR"
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:text-white"
            }`}
          >
            EUR (€)
          </button>
          <button
            onClick={() => setAccountCurrency("USD")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              accountCurrency === "USD"
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:text-white"
            }`}
          >
            USD ($)
          </button>
        </div>

        {/* Preset Buttons */}
        <div className="flex flex-wrap gap-2 mb-3">
          {accountPresets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => {
                setAccountSize(preset.value)
                setUseCustomAccount(false)
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !useCustomAccount && accountSize === preset.value
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:text-white hover:bg-muted/80"
              }`}
            >
              {accountCurrency === "USD" ? preset.label.replace("€", "$") : preset.label}
            </button>
          ))}
          <button
            onClick={() => setUseCustomAccount(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              useCustomAccount
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:text-white hover:bg-muted/80"
            }`}
          >
            Anders
          </button>
        </div>

        {/* Custom Input */}
        {useCustomAccount && (
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {accountCurrency === "EUR" ? "€" : "$"}
            </span>
            <input
              type="number"
              value={customAccountSize}
              onChange={(e) => setCustomAccountSize(e.target.value)}
              placeholder="Vul bedrag in"
              className="w-full pl-8 pr-4 py-3 rounded-lg bg-muted border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}
      </div>

      {/* Risk Percentage */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Risico per Trade
        </label>

        {/* Preset Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-3">
          {riskPresets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => {
                setRiskPercentage(preset.value)
                setUseCustomRisk(false)
              }}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                !useCustomRisk && riskPercentage === preset.value
                  ? "bg-secondary text-white"
                  : "bg-muted text-muted-foreground hover:text-white hover:bg-muted/80"
              }`}
            >
              <span className="font-medium">{preset.label}</span>
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={useCustomRisk ? parseFloat(customRisk) || 1 : riskPercentage}
            onChange={(e) => {
              const value = parseFloat(e.target.value)
              if (useCustomRisk) {
                setCustomRisk(value.toString())
              } else {
                setRiskPercentage(value)
              }
            }}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-secondary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0.1%</span>
            <span className="font-medium text-white">
              {useCustomRisk ? customRisk : riskPercentage}%
            </span>
            <span>3%</span>
          </div>
        </div>

        {/* Risk description */}
        {!useCustomRisk && (
          <p className="text-xs text-muted-foreground mt-2">
            {riskPresets.find(p => p.value === riskPercentage)?.description}
          </p>
        )}
      </div>

      {/* Instrument Selection */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Instrument
        </label>
        <select
          value={selectedPair}
          onChange={(e) => setSelectedPair(e.target.value as ForexPair)}
          className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-white focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <optgroup label="Majors">
            {Object.entries(forexPairs)
              .filter((entry) => entry[1].category === "major")
              .map(([pair]) => (
                <option key={pair} value={pair}>{pair}</option>
              ))}
          </optgroup>
          <optgroup label="Crosses">
            {Object.entries(forexPairs)
              .filter((entry) => entry[1].category === "cross")
              .map(([pair]) => (
                <option key={pair} value={pair}>{pair}</option>
              ))}
          </optgroup>
          <optgroup label="Commodities">
            {Object.entries(forexPairs)
              .filter((entry) => entry[1].category === "commodity")
              .map(([pair]) => (
                <option key={pair} value={pair}>{pair}</option>
              ))}
          </optgroup>
        </select>
      </div>

      {/* Stop Loss */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Stop-Loss (in pips)
        </label>
        <div className="relative">
          <input
            type="number"
            value={stopLossPips}
            onChange={(e) => setStopLossPips(e.target.value)}
            placeholder="bijv. 20"
            min="1"
            max="500"
            className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            pips
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Tip: Meet je stop-loss in pips vanaf je entry tot je stop-loss niveau
        </p>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-accent mb-2">Let op</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {warnings.map((warning, i) => (
                  <li key={i}>• {warning}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {calculation && (
        <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Resultaat</h3>
              <p className="text-sm text-muted-foreground">Je optimale position size</p>
            </div>
          </div>

          {/* Main Result */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-card border border-border text-center">
              <p className="text-sm text-muted-foreground mb-1">Standard Lots</p>
              <p className="text-3xl font-bold text-primary">{calculation.standardLots}</p>
              <p className="text-xs text-muted-foreground">100.000 units</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border text-center">
              <p className="text-sm text-muted-foreground mb-1">Mini Lots</p>
              <p className="text-3xl font-bold text-secondary">{calculation.miniLots}</p>
              <p className="text-xs text-muted-foreground">10.000 units</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border text-center">
              <p className="text-sm text-muted-foreground mb-1">Micro Lots</p>
              <p className="text-3xl font-bold text-accent">{calculation.microLots}</p>
              <p className="text-xs text-muted-foreground">1.000 units</p>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Risico Bedrag</span>
              </div>
              <p className="text-xl font-bold text-white">
                {calculation.currency}{calculation.riskAmount.toLocaleString("nl-NL")}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Pip Waarde</span>
              </div>
              <p className="text-xl font-bold text-white">
                {calculation.currency}{calculation.pipValue.toLocaleString("nl-NL")}/pip
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 p-4 rounded-lg bg-secondary/10 border border-secondary/20">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-white">
                  Met <strong>{calculation.standardLots} lots</strong> op {selectedPair} en een stop-loss van {stopLossPips} pips,
                  riskeer je <strong>{calculation.currency}{calculation.riskAmount.toLocaleString("nl-NL")}</strong> ({effectiveRisk}% van je account).
                </p>
              </div>
            </div>
          </div>

          {/* Validation */}
          {!calculation.isValidSize && (
            <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  De berekende positie is kleiner dan het minimum (0.01 lots).
                  Overweeg een groter risicopercentage of kleinere stop-loss.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* No result state */}
      {!calculation && (
        <div className="p-8 rounded-xl bg-muted/30 border border-border text-center">
          <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Vul alle velden in om je position size te berekenen
          </p>
        </div>
      )}
    </div>
  )
}
