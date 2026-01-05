"use client"

import { useState, useMemo } from "react"
import { PiggyBank, TrendingUp, Calculator, AlertCircle, CheckCircle, Info, Calendar } from "lucide-react"

interface PropFirmChallenge {
  name: string
  fee: number
  accountSize: number
  profitTarget: number // percentage
  profitSplit: number // percentage
  phases: number
  feeRefund: boolean
  monthlyFee?: number
}

const propFirmChallenges: Record<string, PropFirmChallenge[]> = {
  ftmo: [
    { name: "FTMO €10.000", fee: 89, accountSize: 10000, profitTarget: 10, profitSplit: 80, phases: 2, feeRefund: true },
    { name: "FTMO €20.000", fee: 250, accountSize: 20000, profitTarget: 10, profitSplit: 80, phases: 2, feeRefund: true },
    { name: "FTMO €40.000", fee: 345, accountSize: 40000, profitTarget: 10, profitSplit: 80, phases: 2, feeRefund: true },
    { name: "FTMO €80.000", fee: 540, accountSize: 80000, profitTarget: 10, profitSplit: 80, phases: 2, feeRefund: true },
    { name: "FTMO €160.000", fee: 1080, accountSize: 160000, profitTarget: 10, profitSplit: 80, phases: 2, feeRefund: true },
  ],
  apex: [
    { name: "Apex $25.000", fee: 167, accountSize: 25000, profitTarget: 6, profitSplit: 100, phases: 1, feeRefund: false, monthlyFee: 167 },
    { name: "Apex $50.000", fee: 207, accountSize: 50000, profitTarget: 6, profitSplit: 100, phases: 1, feeRefund: false, monthlyFee: 207 },
    { name: "Apex $150.000", fee: 357, accountSize: 150000, profitTarget: 6, profitSplit: 100, phases: 1, feeRefund: false, monthlyFee: 357 },
  ],
  the5ers: [
    { name: "The5%ers $5.000", fee: 260, accountSize: 5000, profitTarget: 8, profitSplit: 80, phases: 2, feeRefund: false },
    { name: "The5%ers $10.000", fee: 450, accountSize: 10000, profitTarget: 8, profitSplit: 80, phases: 2, feeRefund: false },
    { name: "The5%ers $20.000", fee: 850, accountSize: 20000, profitTarget: 8, profitSplit: 80, phases: 2, feeRefund: false },
    { name: "The5%ers $100.000", fee: 545, accountSize: 100000, profitTarget: 8, profitSplit: 80, phases: 2, feeRefund: false },
  ],
  fundednext: [
    { name: "FundedNext $6.000", fee: 60, accountSize: 6000, profitTarget: 8, profitSplit: 80, phases: 2, feeRefund: true },
    { name: "FundedNext $15.000", fee: 120, accountSize: 15000, profitTarget: 8, profitSplit: 80, phases: 2, feeRefund: true },
    { name: "FundedNext $25.000", fee: 200, accountSize: 25000, profitTarget: 8, profitSplit: 80, phases: 2, feeRefund: true },
    { name: "FundedNext $50.000", fee: 300, accountSize: 50000, profitTarget: 8, profitSplit: 80, phases: 2, feeRefund: true },
    { name: "FundedNext $100.000", fee: 550, accountSize: 100000, profitTarget: 8, profitSplit: 80, phases: 2, feeRefund: true },
  ],
}

export function ChallengeROICalculator() {
  // Mode
  const [mode, setMode] = useState<"preset" | "custom">("preset")

  // Preset mode
  const [selectedFirm, setSelectedFirm] = useState<string>("ftmo")
  const [selectedChallengeIndex, setSelectedChallengeIndex] = useState<number>(2) // Default €50k

  // Custom mode
  const [customFee, setCustomFee] = useState<string>("345")
  const [customAccountSize, setCustomAccountSize] = useState<string>("50000")
  const [customProfitSplit, setCustomProfitSplit] = useState<string>("80")
  const [customFeeRefund, setCustomFeeRefund] = useState<boolean>(true)
  const [customMonthlyFee, setCustomMonthlyFee] = useState<string>("")

  // Scenario inputs
  const [expectedMonthlyProfit, setExpectedMonthlyProfit] = useState<string>("5")
  const [numberOfAttempts, setNumberOfAttempts] = useState<string>("1")
  const [monthsToAnalyze, setMonthsToAnalyze] = useState<string>("6")

  // Discount code
  const [discountPercentage, setDiscountPercentage] = useState<string>("0")

  // Get current challenge data
  const challengeData = useMemo(() => {
    if (mode === "preset") {
      return propFirmChallenges[selectedFirm][selectedChallengeIndex]
    }
    return {
      name: "Aangepast",
      fee: parseFloat(customFee) || 0,
      accountSize: parseFloat(customAccountSize) || 0,
      profitSplit: parseFloat(customProfitSplit) || 80,
      profitTarget: 10,
      phases: 2,
      feeRefund: customFeeRefund,
      monthlyFee: customMonthlyFee ? parseFloat(customMonthlyFee) : undefined,
    }
  }, [mode, selectedFirm, selectedChallengeIndex, customFee, customAccountSize, customProfitSplit, customFeeRefund, customMonthlyFee])

  // Calculations
  const calculations = useMemo(() => {
    const fee = challengeData.fee
    const discount = parseFloat(discountPercentage) || 0
    const discountedFee = fee * (1 - discount / 100)
    const accountSize = challengeData.accountSize
    const profitSplit = challengeData.profitSplit / 100
    const monthlyProfit = (parseFloat(expectedMonthlyProfit) || 0) / 100
    const attempts = parseInt(numberOfAttempts) || 1
    const months = parseInt(monthsToAnalyze) || 6
    const monthlyFee = challengeData.monthlyFee || 0

    // Total investment
    const totalChallengeInvestment = discountedFee * attempts

    // Break-even calculation (how much gross profit needed to cover fee)
    const breakEvenGrossProfit = challengeData.feeRefund
      ? 0  // If fee is refunded, no break-even needed
      : discountedFee / profitSplit

    const breakEvenPercentage = (breakEvenGrossProfit / accountSize) * 100

    // Monthly profit calculation
    const grossMonthlyProfit = accountSize * monthlyProfit
    const netMonthlyProfit = grossMonthlyProfit * profitSplit
    const netMonthlyProfitAfterFee = netMonthlyProfit - monthlyFee

    // First month analysis (includes fee)
    const firstMonthNet = challengeData.feeRefund
      ? netMonthlyProfit + discountedFee - monthlyFee  // Fee refunded in first payout
      : netMonthlyProfit - monthlyFee

    // Total profit over period
    const totalGrossProfit = grossMonthlyProfit * months
    const totalNetProfit = (netMonthlyProfit * months) - (monthlyFee * months)
    const totalNetProfitAfterInvestment = totalNetProfit - totalChallengeInvestment + (challengeData.feeRefund ? discountedFee : 0)

    // ROI calculations
    const roi = (totalNetProfitAfterInvestment / totalChallengeInvestment) * 100
    const monthlyROI = roi / months

    // Effective profit split (accounting for fee)
    const effectiveProfitSplit = (totalNetProfitAfterInvestment / totalGrossProfit) * 100

    // Payback period (months to recover investment)
    const paybackPeriod = totalChallengeInvestment / netMonthlyProfitAfterFee

    // Trading days to break even (assuming 20 trading days/month)
    const tradingDaysToBreakEven = Math.ceil(paybackPeriod * 20)

    return {
      fee,
      discountedFee,
      accountSize,
      profitSplit: profitSplit * 100,
      totalChallengeInvestment,
      breakEvenGrossProfit,
      breakEvenPercentage,
      grossMonthlyProfit,
      netMonthlyProfit,
      netMonthlyProfitAfterFee,
      firstMonthNet,
      totalGrossProfit,
      totalNetProfit,
      totalNetProfitAfterInvestment,
      roi,
      monthlyROI,
      effectiveProfitSplit,
      paybackPeriod,
      tradingDaysToBreakEven,
      months,
      attempts,
      monthlyFee,
      feeRefund: challengeData.feeRefund,
    }
  }, [challengeData, discountPercentage, expectedMonthlyProfit, numberOfAttempts, monthsToAnalyze])

  // ROI quality indicator
  const getROIQuality = (roi: number) => {
    if (roi >= 500) return { label: "Uitstekend", color: "text-green-400", bg: "bg-green-500/10" }
    if (roi >= 200) return { label: "Goed", color: "text-green-400", bg: "bg-green-500/10" }
    if (roi >= 100) return { label: "Acceptabel", color: "text-yellow-400", bg: "bg-yellow-500/10" }
    if (roi >= 0) return { label: "Matig", color: "text-orange-400", bg: "bg-orange-500/10" }
    return { label: "Verlies", color: "text-red-400", bg: "bg-red-500/10" }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
          <PiggyBank className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Challenge ROI Calculator</h2>
          <p className="text-muted-foreground">
            Bereken je return on investment en wanneer je je challenge fee hebt terugverdiend
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <label className="block text-sm font-medium text-white mb-3">Selecteer Prop Firm</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMode("preset")}
                className={`p-3 rounded-lg border-2 transition-all ${
                  mode === "preset"
                    ? "border-primary bg-primary/10 text-white"
                    : "border-border bg-background/50 text-muted-foreground hover:border-primary/50"
                }`}
              >
                <span className="font-medium">Kies Prop Firm</span>
                <p className="text-xs opacity-70 mt-1">FTMO, Apex, etc.</p>
              </button>
              <button
                onClick={() => setMode("custom")}
                className={`p-3 rounded-lg border-2 transition-all ${
                  mode === "custom"
                    ? "border-primary bg-primary/10 text-white"
                    : "border-border bg-background/50 text-muted-foreground hover:border-primary/50"
                }`}
              >
                <span className="font-medium">Handmatig</span>
                <p className="text-xs opacity-70 mt-1">Eigen waarden</p>
              </button>
            </div>
          </div>

          {/* Preset Mode */}
          {mode === "preset" && (
            <div className="p-4 rounded-xl bg-card border border-border space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Prop Firm</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.keys(propFirmChallenges).map((firm) => (
                    <button
                      key={firm}
                      onClick={() => {
                        setSelectedFirm(firm)
                        setSelectedChallengeIndex(Math.min(selectedChallengeIndex, propFirmChallenges[firm].length - 1))
                      }}
                      className={`p-2 rounded-lg border text-sm font-medium transition-all ${
                        selectedFirm === firm
                          ? "border-primary bg-primary/10 text-white"
                          : "border-border bg-background/50 text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {firm === "ftmo" ? "FTMO" :
                       firm === "apex" ? "Apex" :
                       firm === "the5ers" ? "The5%ers" :
                       firm === "fundednext" ? "FundedNext" : firm}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Account Grootte</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {propFirmChallenges[selectedFirm].map((challenge, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedChallengeIndex(index)}
                      className={`p-3 rounded-lg border text-sm transition-all ${
                        selectedChallengeIndex === index
                          ? "border-primary bg-primary/10"
                          : "border-border bg-background/50 hover:border-primary/50"
                      }`}
                    >
                      <span className={`font-semibold ${selectedChallengeIndex === index ? "text-white" : "text-muted-foreground"}`}>
                        {selectedFirm === "apex" || selectedFirm === "the5ers" || selectedFirm === "fundednext" ? "$" : "€"}
                        {challenge.accountSize.toLocaleString()}
                      </span>
                      <p className={`text-xs mt-1 ${selectedChallengeIndex === index ? "text-muted-foreground" : "text-muted-foreground/70"}`}>
                        Fee: {selectedFirm === "apex" || selectedFirm === "the5ers" || selectedFirm === "fundednext" ? "$" : "€"}{challenge.fee}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Challenge Info */}
              <div className="p-3 rounded-lg bg-background/50 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Profit Split:</span>
                  <span className="text-white ml-2">{challengeData.profitSplit}%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Fee Refund:</span>
                  <span className={`ml-2 ${challengeData.feeRefund ? "text-green-400" : "text-red-400"}`}>
                    {challengeData.feeRefund ? "Ja" : "Nee"}
                  </span>
                </div>
                {challengeData.monthlyFee && (
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Maandelijkse Fee:</span>
                    <span className="text-white ml-2">${challengeData.monthlyFee}/maand</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Custom Mode */}
          {mode === "custom" && (
            <div className="p-4 rounded-xl bg-card border border-border space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Challenge Fee (€)</label>
                  <input
                    type="number"
                    value={customFee}
                    onChange={(e) => setCustomFee(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white"
                    placeholder="345"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Account Grootte (€)</label>
                  <input
                    type="number"
                    value={customAccountSize}
                    onChange={(e) => setCustomAccountSize(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white"
                    placeholder="50000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Profit Split (%)</label>
                  <input
                    type="number"
                    value={customProfitSplit}
                    onChange={(e) => setCustomProfitSplit(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white"
                    placeholder="80"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Maandelijkse Fee (€)</label>
                  <input
                    type="number"
                    value={customMonthlyFee}
                    onChange={(e) => setCustomMonthlyFee(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white"
                    placeholder="0"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customFeeRefund}
                  onChange={(e) => setCustomFeeRefund(e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-background text-primary"
                />
                <span className="text-sm text-muted-foreground">Fee wordt terugbetaald bij eerste payout</span>
              </label>
            </div>
          )}

          {/* Discount Code */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <label className="block text-sm font-medium text-white mb-3">Kortingscode</label>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Korting (%)</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                  className="flex-1 h-2 bg-background rounded-lg appearance-none cursor-pointer accent-secondary"
                />
                <div className="w-16 px-3 py-2 rounded-lg bg-background border border-border text-white text-center">
                  {discountPercentage}%
                </div>
              </div>
              {parseFloat(discountPercentage) > 0 && (
                <p className="text-sm text-green-400 mt-2">
                  Je bespaart: €{((challengeData.fee * parseFloat(discountPercentage)) / 100).toFixed(2)}
                </p>
              )}
            </div>
          </div>

          {/* Scenario Inputs */}
          <div className="p-4 rounded-xl bg-card border border-border space-y-4">
            <h3 className="font-medium text-white">Trading Scenario</h3>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Verwachte Maandelijkse Winst (%)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.5"
                  value={expectedMonthlyProfit}
                  onChange={(e) => setExpectedMonthlyProfit(e.target.value)}
                  className="flex-1 h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="w-16 px-3 py-2 rounded-lg bg-background border border-border text-white text-center">
                  {expectedMonthlyProfit}%
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                = €{calculations.grossMonthlyProfit.toFixed(0)} bruto per maand
              </p>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Aantal Challenge Pogingen
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => setNumberOfAttempts(n.toString())}
                    className={`p-2 rounded-lg border text-sm font-medium transition-all ${
                      parseInt(numberOfAttempts) === n
                        ? "border-primary bg-primary/10 text-white"
                        : "border-border bg-background/50 text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {n}x
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Totale investering: €{calculations.totalChallengeInvestment.toFixed(0)}
              </p>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Analyse Periode (maanden)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[3, 6, 12, 24].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMonthsToAnalyze(m.toString())}
                    className={`p-2 rounded-lg border text-sm font-medium transition-all ${
                      parseInt(monthsToAnalyze) === m
                        ? "border-primary bg-primary/10 text-white"
                        : "border-border bg-background/50 text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {m} mnd
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Main ROI Card */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-2">Return on Investment ({calculations.months} maanden)</p>
              <div className="flex items-center justify-center gap-3">
                <span className={`text-5xl font-bold ${calculations.roi >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {calculations.roi >= 0 ? "+" : ""}{calculations.roi.toFixed(0)}%
                </span>
              </div>
              <div className={`inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full text-sm font-medium ${getROIQuality(calculations.roi).bg} ${getROIQuality(calculations.roi).color}`}>
                {getROIQuality(calculations.roi).label}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-background">
                <p className="text-xs text-muted-foreground mb-1">Totale Investering</p>
                <p className="text-lg font-bold text-white">€{calculations.totalChallengeInvestment.toFixed(0)}</p>
                {parseFloat(discountPercentage) > 0 && (
                  <p className="text-xs text-green-400">-{discountPercentage}% korting</p>
                )}
              </div>
              <div className="p-3 rounded-lg bg-background">
                <p className="text-xs text-muted-foreground mb-1">Netto Winst ({calculations.months} mnd)</p>
                <p className={`text-lg font-bold ${calculations.totalNetProfitAfterInvestment >= 0 ? "text-green-400" : "text-red-400"}`}>
                  €{calculations.totalNetProfitAfterInvestment.toFixed(0)}
                </p>
              </div>
            </div>
          </div>

          {/* Break-Even Analysis */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Break-Even Analyse
            </h3>

            <div className="space-y-4">
              {calculations.feeRefund ? (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-400">Fee Wordt Terugbetaald</p>
                    <p className="text-sm text-muted-foreground">
                      Je challenge fee (€{calculations.discountedFee.toFixed(0)}) wordt terugbetaald bij je eerste payout
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-background space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Om fee terug te verdienen:</span>
                    <span className="text-white font-semibold">
                      €{calculations.breakEvenGrossProfit.toFixed(0)} bruto
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Als % van account:</span>
                    <span className="text-white font-semibold">
                      {calculations.breakEvenPercentage.toFixed(2)}%
                    </span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-background">
                  <p className="text-xs text-muted-foreground mb-1">Terugverdientijd</p>
                  <p className="text-lg font-bold text-white">
                    {calculations.paybackPeriod.toFixed(1)} maanden
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-background">
                  <p className="text-xs text-muted-foreground mb-1">In Trading Dagen</p>
                  <p className="text-lg font-bold text-white">
                    ~{calculations.tradingDaysToBreakEven} dagen
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Breakdown */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-secondary" />
              Maandelijkse Breakdown
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between p-3 rounded-lg bg-background">
                <span className="text-muted-foreground">Bruto Winst:</span>
                <span className="text-white font-semibold">€{calculations.grossMonthlyProfit.toFixed(0)}</span>
              </div>

              <div className="flex justify-between p-3 rounded-lg bg-background">
                <span className="text-muted-foreground">
                  Na Profit Split ({calculations.profitSplit}%):
                </span>
                <span className="text-white font-semibold">€{calculations.netMonthlyProfit.toFixed(0)}</span>
              </div>

              {calculations.monthlyFee > 0 && (
                <div className="flex justify-between p-3 rounded-lg bg-red-500/10">
                  <span className="text-red-400">Maandelijkse Fee:</span>
                  <span className="text-red-400 font-semibold">-€{calculations.monthlyFee}</span>
                </div>
              )}

              <div className="flex justify-between p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                <span className="text-secondary">Netto Maandelijks:</span>
                <span className="text-secondary font-bold">€{calculations.netMonthlyProfitAfterFee.toFixed(0)}</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-background/50 text-sm">
              <p className="text-muted-foreground">
                <strong className="text-white">Effectieve Profit Split:</strong>{" "}
                {calculations.effectiveProfitSplit.toFixed(1)}%
                <span className="text-xs ml-2">(na aftrek van fee over {calculations.months} maanden)</span>
              </p>
            </div>
          </div>

          {/* Period Summary */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              {calculations.months} Maanden Projectie
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 text-muted-foreground">Bruto Trading Winst</td>
                    <td className="py-2 text-right text-white">€{calculations.totalGrossProfit.toFixed(0)}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 text-muted-foreground">Netto na Profit Split</td>
                    <td className="py-2 text-right text-white">€{(calculations.netMonthlyProfit * calculations.months).toFixed(0)}</td>
                  </tr>
                  {calculations.monthlyFee > 0 && (
                    <tr className="border-b border-border/50">
                      <td className="py-2 text-red-400">Maandelijkse Fees ({calculations.months}x)</td>
                      <td className="py-2 text-right text-red-400">-€{(calculations.monthlyFee * calculations.months).toFixed(0)}</td>
                    </tr>
                  )}
                  <tr className="border-b border-border/50">
                    <td className="py-2 text-muted-foreground">Challenge Investering ({calculations.attempts}x)</td>
                    <td className="py-2 text-right text-white">-€{calculations.totalChallengeInvestment.toFixed(0)}</td>
                  </tr>
                  {calculations.feeRefund && (
                    <tr className="border-b border-border/50">
                      <td className="py-2 text-green-400">Fee Refund</td>
                      <td className="py-2 text-right text-green-400">+€{calculations.discountedFee.toFixed(0)}</td>
                    </tr>
                  )}
                  <tr className="bg-secondary/10">
                    <td className="py-3 font-semibold text-white">Netto Resultaat</td>
                    <td className={`py-3 text-right font-bold text-lg ${calculations.totalNetProfitAfterInvestment >= 0 ? "text-green-400" : "text-red-400"}`}>
                      €{calculations.totalNetProfitAfterInvestment.toFixed(0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Warnings/Tips */}
          {calculations.attempts > 1 && (
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-400">Meerdere Pogingen Ingecalculeerd</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Met {calculations.attempts} pogingen investeer je €{calculations.totalChallengeInvestment.toFixed(0)} totaal.
                  De meeste traders halen de challenge niet in één keer - deze berekening is realistischer.
                </p>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p>
                  Deze berekeningen zijn gebaseerd op consistente maandelijkse winsten.
                  In werkelijkheid varieert je performance per maand.
                  Gebruik deze calculator als indicatie, niet als garantie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
