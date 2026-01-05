"use client"

import { useState, useMemo } from "react"
import { Receipt, AlertTriangle, Info, Calculator, PiggyBank, TrendingUp, HelpCircle, Building, User } from "lucide-react"

// Dutch tax brackets 2024 (Box 1)
const taxBrackets2024 = [
  { min: 0, max: 75518, rate: 0.3697 },
  { min: 75518, max: Infinity, rate: 0.495 },
]

// Self-employed deductions (approximate, for illustration)
const selfEmployedDeductions = {
  zelfstandigenaftrek: 3750, // 2024 value, decreasing yearly
  startersaftrek: 2123,
  mkbWinstvrijstelling: 0.1279, // 12.79% of profit
}

type TaxSituation = "particulier" | "zzp" | "bv"

export function BelastingCalculator() {
  // Income inputs
  const [tradingIncome, setTradingIncome] = useState<string>("50000")
  const [otherIncome, setOtherIncome] = useState<string>("0")
  const [challengeFees, setChallengeFees] = useState<string>("1000")

  // Situation
  const [taxSituation, setTaxSituation] = useState<TaxSituation>("zzp")
  const [isStarter, setIsStarter] = useState(false)

  // Reservation percentage
  const [reservePercentage, setReservePercentage] = useState<string>("40")

  // Calculate taxes
  const calculations = useMemo(() => {
    const tradingInc = parseFloat(tradingIncome) || 0
    const otherInc = parseFloat(otherIncome) || 0
    const fees = parseFloat(challengeFees) || 0
    const reservePct = parseFloat(reservePercentage) || 40

    // Gross trading income (before deductions)
    const grossTradingIncome = tradingInc

    // Deductible costs (for ZZP/BV)
    const deductibleCosts = taxSituation !== "particulier" ? fees : 0

    // Net trading profit
    const netTradingProfit = grossTradingIncome - deductibleCosts

    // Total taxable income
    let taxableIncome = 0
    let totalDeductions = 0
    let mkbVrijstelling = 0

    if (taxSituation === "zzp") {
      // ZZP deductions
      const zelfstandigenaftrek = selfEmployedDeductions.zelfstandigenaftrek
      const startersaftrek = isStarter ? selfEmployedDeductions.startersaftrek : 0
      totalDeductions = zelfstandigenaftrek + startersaftrek

      const incomeAfterDeductions = Math.max(0, netTradingProfit + otherInc - totalDeductions)
      mkbVrijstelling = incomeAfterDeductions * selfEmployedDeductions.mkbWinstvrijstelling

      taxableIncome = Math.max(0, incomeAfterDeductions - mkbVrijstelling)
    } else if (taxSituation === "bv") {
      // BV - simplified calculation
      // VPB (corporate tax) rates 2024
      // 19% up to €200.000, 25.8% above
      const profit = netTradingProfit
      const corporateTax = profit <= 200000
        ? profit * 0.19
        : 200000 * 0.19 + (profit - 200000) * 0.258

      // If you want to pay yourself a salary + dividend
      // This is a simplified model
      return {
        grossTradingIncome,
        netTradingProfit,
        deductibleCosts,
        totalDeductions: 0,
        mkbVrijstelling: 0,
        taxableIncome: profit,
        incomeTax: corporateTax,
        effectiveTaxRate: profit > 0 ? (corporateTax / profit) * 100 : 0,
        netAfterTax: profit - corporateTax,
        monthlyNet: (profit - corporateTax) / 12,
        monthlyReserve: (profit * (reservePct / 100)) / 12,
        isBV: true,
        brackets: [],
      }
    } else {
      // Particulier - no deductions for challenge fees
      taxableIncome = tradingInc + otherInc
    }

    // Calculate Box 1 tax
    let incomeTax = 0
    const brackets: { bracket: string; income: number; tax: number }[] = []

    let remainingIncome = taxableIncome

    for (const bracket of taxBrackets2024) {
      if (remainingIncome <= 0) break

      const incomeInBracket = Math.min(
        remainingIncome,
        bracket.max - bracket.min
      )

      const taxInBracket = incomeInBracket * bracket.rate

      brackets.push({
        bracket: `€${bracket.min.toLocaleString()} - €${bracket.max === Infinity ? '∞' : bracket.max.toLocaleString()}`,
        income: incomeInBracket,
        tax: taxInBracket,
      })

      incomeTax += taxInBracket
      remainingIncome -= incomeInBracket
    }

    // Effective tax rate
    const effectiveTaxRate = grossTradingIncome > 0
      ? (incomeTax / grossTradingIncome) * 100
      : 0

    // Net after tax
    const netAfterTax = grossTradingIncome - incomeTax - deductibleCosts

    // Monthly breakdown
    const monthlyNet = netAfterTax / 12
    const monthlyReserve = (grossTradingIncome * (reservePct / 100)) / 12

    return {
      grossTradingIncome,
      netTradingProfit,
      deductibleCosts,
      totalDeductions,
      mkbVrijstelling,
      taxableIncome,
      incomeTax,
      effectiveTaxRate,
      netAfterTax,
      monthlyNet,
      monthlyReserve,
      brackets,
      isBV: false,
    }
  }, [tradingIncome, otherIncome, challengeFees, taxSituation, isStarter, reservePercentage])

  // Get situation description
  const getSituationInfo = (situation: TaxSituation) => {
    switch (situation) {
      case "particulier":
        return {
          title: "Particulier",
          description: "Trading als hobby of bijverdienste",
          pros: ["Geen administratie vereist", "Simpel"],
          cons: ["Geen kosten aftrekbaar", "Geen ondernemersvoordelen"],
        }
      case "zzp":
        return {
          title: "ZZP / Eenmanszaak",
          description: "Trading als beroep of structureel inkomen",
          pros: ["Kosten aftrekbaar", "Zelfstandigenaftrek", "MKB-winstvrijstelling"],
          cons: ["Administratie nodig", "KvK registratie", "BTW als omzet > €25k"],
        }
      case "bv":
        return {
          title: "BV",
          description: "Voor grotere inkomens of risico beperking",
          pros: ["Beperkte aansprakelijkheid", "Lager tarief bij hoge winst", "Fiscale planning"],
          cons: ["Oprichtingskosten", "Meer administratie", "Jaarrekening verplicht"],
        }
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
          <Receipt className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Trading Belasting Calculator NL</h2>
          <p className="text-muted-foreground">
            Bereken hoeveel belasting je betaalt over je prop trading inkomsten in Nederland
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-yellow-400">Disclaimer</p>
          <p className="text-muted-foreground mt-1">
            Deze calculator geeft een indicatie. Belastingwetgeving is complex en jouw situatie is uniek.
            Raadpleeg altijd een belastingadviseur voor definitief advies.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Tax Situation */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <label className="block text-sm font-medium text-white mb-3">Jouw Situatie</label>
            <div className="grid grid-cols-3 gap-3">
              {(["particulier", "zzp", "bv"] as TaxSituation[]).map((situation) => {
                const info = getSituationInfo(situation)
                return (
                  <button
                    key={situation}
                    onClick={() => setTaxSituation(situation)}
                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                      taxSituation === situation
                        ? "border-primary bg-primary/10"
                        : "border-border bg-background/50 hover:border-primary/50"
                    }`}
                  >
                    {situation === "particulier" && <User className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />}
                    {situation === "zzp" && <TrendingUp className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />}
                    {situation === "bv" && <Building className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />}
                    <span className={`text-sm font-semibold ${taxSituation === situation ? "text-white" : "text-muted-foreground"}`}>
                      {info.title}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Situation info */}
            <div className="mt-4 p-3 rounded-lg bg-background/50">
              <p className="text-sm text-white font-medium">{getSituationInfo(taxSituation).description}</p>
              <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                <div>
                  <p className="text-green-400 font-medium mb-1">Voordelen:</p>
                  <ul className="text-muted-foreground space-y-0.5">
                    {getSituationInfo(taxSituation).pros.map((pro, i) => (
                      <li key={i}>✓ {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-red-400 font-medium mb-1">Nadelen:</p>
                  <ul className="text-muted-foreground space-y-0.5">
                    {getSituationInfo(taxSituation).cons.map((con, i) => (
                      <li key={i}>✗ {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ZZP options */}
            {taxSituation === "zzp" && (
              <div className="mt-4 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isStarter}
                    onChange={(e) => setIsStarter(e.target.checked)}
                    className="w-4 h-4 rounded border-border bg-background text-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    Ik ben starter (eerste 3 jaar ZZP)
                    <span className="text-green-400 ml-2">+€{selfEmployedDeductions.startersaftrek} aftrek</span>
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Income Inputs */}
          <div className="p-4 rounded-xl bg-card border border-border space-y-4">
            <h3 className="font-medium text-white">Inkomsten</h3>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Trading Inkomen (jaarlijks)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                <input
                  type="number"
                  value={tradingIncome}
                  onChange={(e) => setTradingIncome(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 rounded-lg bg-background border border-border text-white"
                  placeholder="50000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Overig Inkomen (werk, etc.)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                <input
                  type="number"
                  value={otherIncome}
                  onChange={(e) => setOtherIncome(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 rounded-lg bg-background border border-border text-white"
                  placeholder="0"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Dit beïnvloedt in welke belastingschijf je valt
              </p>
            </div>

            {taxSituation !== "particulier" && (
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Challenge Fees (aftrekbaar)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                  <input
                    type="number"
                    value={challengeFees}
                    onChange={(e) => setChallengeFees(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 rounded-lg bg-background border border-border text-white"
                    placeholder="1000"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Gefaalde challenges, software, cursussen, etc.
                </p>
              </div>
            )}
          </div>

          {/* Reserve Setting */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <h3 className="font-medium text-white mb-3">Belasting Reservering</h3>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Percentage om te reserveren
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="20"
                  max="50"
                  value={reservePercentage}
                  onChange={(e) => setReservePercentage(e.target.value)}
                  className="flex-1 h-2 bg-background rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="w-16 px-3 py-2 rounded-lg bg-background border border-border text-white text-center">
                  {reservePercentage}%
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Aanbevolen: 40% voor veiligheid
              </p>
            </div>
          </div>

          {/* Quick presets */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <h3 className="font-medium text-white mb-3">Snelle Scenario&apos;s</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "€25k", value: "25000" },
                { label: "€50k", value: "50000" },
                { label: "€75k", value: "75000" },
                { label: "€100k", value: "100000" },
                { label: "€150k", value: "150000" },
                { label: "€200k", value: "200000" },
              ].map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setTradingIncome(preset.value)}
                  className={`p-2 rounded-lg border text-sm transition-all ${
                    tradingIncome === preset.value
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border bg-background/50 text-muted-foreground hover:border-accent/50"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Main Result Card */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-2">Geschatte Belasting</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-5xl font-bold text-red-400">
                  €{calculations.incomeTax.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Effectief tarief: {calculations.effectiveTaxRate.toFixed(1)}%
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-background">
                <p className="text-xs text-muted-foreground mb-1">Bruto Trading</p>
                <p className="text-lg font-bold text-white">
                  €{calculations.grossTradingIncome.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <p className="text-xs text-green-400 mb-1">Netto Over</p>
                <p className="text-lg font-bold text-green-400">
                  €{calculations.netAfterTax.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </p>
              </div>
            </div>
          </div>

          {/* Deductions (ZZP) */}
          {taxSituation === "zzp" && !calculations.isBV && (
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-secondary" />
                Ondernemersvoordelen
              </h3>

              <div className="space-y-3">
                {calculations.deductibleCosts > 0 && (
                  <div className="flex justify-between p-3 rounded-lg bg-background">
                    <span className="text-muted-foreground">Aftrekbare kosten</span>
                    <span className="text-green-400 font-medium">-€{calculations.deductibleCosts.toFixed(0)}</span>
                  </div>
                )}

                <div className="flex justify-between p-3 rounded-lg bg-background">
                  <span className="text-muted-foreground">Zelfstandigenaftrek</span>
                  <span className="text-green-400 font-medium">-€{selfEmployedDeductions.zelfstandigenaftrek.toFixed(0)}</span>
                </div>

                {isStarter && (
                  <div className="flex justify-between p-3 rounded-lg bg-background">
                    <span className="text-muted-foreground">Startersaftrek</span>
                    <span className="text-green-400 font-medium">-€{selfEmployedDeductions.startersaftrek.toFixed(0)}</span>
                  </div>
                )}

                <div className="flex justify-between p-3 rounded-lg bg-background">
                  <span className="text-muted-foreground">MKB-winstvrijstelling (12.79%)</span>
                  <span className="text-green-400 font-medium">-€{calculations.mkbVrijstelling.toFixed(0)}</span>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                  <span className="text-white font-medium">Totaal bespaard</span>
                  <span className="text-secondary font-bold">
                    €{(calculations.totalDeductions + calculations.mkbVrijstelling + calculations.deductibleCosts).toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tax Brackets */}
          {!calculations.isBV && calculations.brackets.length > 0 && (
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-accent" />
                Belastingschijven {new Date().getFullYear()}
              </h3>

              <div className="space-y-3">
                {calculations.brackets.map((bracket, index) => (
                  <div key={index} className="p-3 rounded-lg bg-background">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{bracket.bracket}</span>
                      <span className="text-sm text-white">
                        {(taxBrackets2024[index].rate * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        €{bracket.income.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} belastbaar
                      </span>
                      <span className="text-red-400 font-medium">
                        €{bracket.tax.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Monthly Overview */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-primary" />
              Maandelijkse Breakdown
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-background text-center">
                <p className="text-xs text-muted-foreground mb-1">Netto per Maand</p>
                <p className="text-2xl font-bold text-green-400">
                  €{calculations.monthlyNet.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-accent/10 text-center">
                <p className="text-xs text-accent mb-1">Reserveer per Maand</p>
                <p className="text-2xl font-bold text-accent">
                  €{calculations.monthlyReserve.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-background/50">
              <p className="text-sm text-muted-foreground">
                💡 Zet <strong className="text-white">€{calculations.monthlyReserve.toFixed(0)}</strong> per maand apart
                voor belasting. Dit voorkomt verrassingen bij de aangifte.
              </p>
            </div>
          </div>

          {/* BV Comparison (if high income) */}
          {taxSituation !== "bv" && parseFloat(tradingIncome) > 80000 && (
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-3">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-primary">Overweeg een BV</p>
                <p className="text-muted-foreground mt-1">
                  Bij een inkomen van €{parseFloat(tradingIncome).toLocaleString()} kan een BV fiscaal voordeliger zijn.
                  VPB tarief is 19% tot €200k vs 49.5% IB in de hoogste schijf.
                </p>
              </div>
            </div>
          )}

          {/* Important Notes */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <h4 className="font-medium text-white mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              Belangrijke Informatie
            </h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Prop trading valt onder Box 1 (inkomen uit werk)</li>
              <li>• Betaling meestal voor 1 juli van volgend jaar</li>
              <li>• Houd administratie bij van alle trades en fees</li>
              <li>• Overweeg een voorlopige aanslag bij wisselend inkomen</li>
              <li>• ZZP vanaf €25k omzet? Mogelijk BTW-plichtig</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
