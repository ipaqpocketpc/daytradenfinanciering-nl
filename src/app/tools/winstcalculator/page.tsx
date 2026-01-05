"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Percent,
  ArrowUpRight,
  Info,
  ChevronRight,
} from "lucide-react"
import { firms } from "@/config/firms"
import { Button } from "@/components/ui"

const accountSizes = [10000, 25000, 50000, 100000, 200000]
const profitPercentages = [1, 2, 3, 5, 10, 15, 20]

export default function WinstcalculatorPage() {
  const [accountSize, setAccountSize] = useState(50000)
  const [monthlyProfit, setMonthlyProfit] = useState(5)
  const [profitSplit, setProfitSplit] = useState(80)

  const monthlyGrossProfit = (accountSize * monthlyProfit) / 100
  const monthlyNetProfit = (monthlyGrossProfit * profitSplit) / 100
  const yearlyNetProfit = monthlyNetProfit * 12

  const partnerFirms = firms.filter((f) => f.isPartner)

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 md:pt-52 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-background to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="container-wide relative">
          <div className="flex items-center gap-2 mb-6">
            <div className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
              Tool
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Prop Trading{" "}
            <span className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
              Winstcalculator
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Bereken hoeveel je kunt verdienen als funded trader. Pas de variabelen aan en
            zie direct je potentiële winst.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="space-y-8">
              {/* Account Size */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Account Grootte</h3>
                    <p className="text-sm text-muted-foreground">Kies je funded account grootte</p>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {accountSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setAccountSize(size)}
                      className={`
                        py-3 rounded-lg text-sm font-medium transition-all
                        ${accountSize === size
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground hover:text-white hover:bg-muted/80"
                        }
                      `}
                    >
                      €{(size / 1000)}K
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <input
                    type="range"
                    min="5000"
                    max="500000"
                    step="5000"
                    value={accountSize}
                    onChange={(e) => setAccountSize(parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>€5.000</span>
                    <span className="text-white font-medium">€{accountSize.toLocaleString("nl-NL")}</span>
                    <span>€500.000</span>
                  </div>
                </div>
              </div>

              {/* Monthly Profit % */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Maandelijks Rendement</h3>
                    <p className="text-sm text-muted-foreground">Jouw verwachte maandelijkse winst %</p>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {profitPercentages.map((pct) => (
                    <button
                      key={pct}
                      onClick={() => setMonthlyProfit(pct)}
                      className={`
                        py-3 rounded-lg text-sm font-medium transition-all
                        ${monthlyProfit === pct
                          ? "bg-secondary text-white"
                          : "bg-muted text-muted-foreground hover:text-white hover:bg-muted/80"
                        }
                      `}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={monthlyProfit}
                    onChange={(e) => setMonthlyProfit(parseInt(e.target.value))}
                    className="w-full accent-secondary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1%</span>
                    <span className="text-white font-medium">{monthlyProfit}%</span>
                    <span>30%</span>
                  </div>
                </div>
              </div>

              {/* Profit Split */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Percent className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Profit Split</h3>
                    <p className="text-sm text-muted-foreground">Percentage dat jij houdt</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[70, 80, 90, 100].map((split) => (
                    <button
                      key={split}
                      onClick={() => setProfitSplit(split)}
                      className={`
                        py-3 rounded-lg text-sm font-medium transition-all
                        ${profitSplit === split
                          ? "bg-accent text-white"
                          : "bg-muted text-muted-foreground hover:text-white hover:bg-muted/80"
                        }
                      `}
                    >
                      {split}%
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="5"
                    value={profitSplit}
                    onChange={(e) => setProfitSplit(parseInt(e.target.value))}
                    className="w-full accent-accent"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>50%</span>
                    <span className="text-white font-medium">{profitSplit}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-gradient-to-b from-card-elevated to-card border border-secondary/30 shadow-glow-green">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Jouw Potentiële Winst</h3>
                    <p className="text-sm text-muted-foreground">Gebaseerd op jouw instellingen</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-muted/30">
                    <div className="text-sm text-muted-foreground mb-1">Bruto Maandwinst</div>
                    <div className="text-2xl font-bold text-white">
                      €{monthlyGrossProfit.toLocaleString("nl-NL", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {monthlyProfit}% van €{accountSize.toLocaleString("nl-NL")}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/30">
                    <div className="text-sm text-secondary mb-1">Netto Maandwinst (jouw deel)</div>
                    <div className="text-3xl font-bold text-secondary">
                      €{monthlyNetProfit.toLocaleString("nl-NL", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {profitSplit}% van €{monthlyGrossProfit.toLocaleString("nl-NL", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-accent/10 border border-accent/30">
                    <div className="text-sm text-accent mb-1">Potentiële Jaarwinst</div>
                    <div className="text-3xl font-bold text-accent">
                      €{yearlyNetProfit.toLocaleString("nl-NL", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      12 maanden × €{monthlyNetProfit.toLocaleString("nl-NL", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 mt-6 p-4 rounded-lg bg-muted/30">
                  <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Dit is een berekening op basis van hypothetische resultaten. Werkelijke resultaten
                    kunnen variëren. Trading brengt risico met zich mee.
                  </p>
                </div>
              </div>

              {/* Quick Comparison */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <h4 className="font-semibold text-white mb-4">Vergelijk met prop firms</h4>
                <div className="space-y-3">
                  {partnerFirms.map((firm) => {
                    const firmProfit = (monthlyGrossProfit * firm.profitSplitMax) / 100
                    return (
                      <Link
                        key={firm.id}
                        href={`/prop-firms/${firm.slug}`}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                            <span className="text-xs font-bold text-muted-foreground">
                              {firm.name.substring(0, 2)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-white text-sm">{firm.name}</div>
                            <div className="text-xs text-muted-foreground">{firm.profitSplit} split</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-secondary text-sm">
                            €{firmProfit.toLocaleString("nl-NL", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors inline" />
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
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
            Vergelijk prop firms en kies de beste match voor jouw trading stijl.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-glow-green px-8 py-6 text-lg"
            >
              <Link href="/vergelijk" className="flex items-center gap-2">
                Vergelijk Prop Firms
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-border hover:border-primary/50 px-8 py-6 text-lg"
            >
              <Link href="/prop-firms" className="flex items-center gap-2">
                Bekijk Reviews
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
