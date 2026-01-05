"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, Users, TrendingUp, Gift, Lock, Flame, ArrowRight, Star, Shield, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export default function GeheimPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    acceptTerms: true,
  })

  // Stats for social proof
  const stats = {
    tradersAnalyzed: "12.547",
    successRate: "73%",
    avgProfit: "€4.850",
    topFirms: 3,
  }

  const benefits = [
    {
      icon: TrendingUp,
      title: "Winnende Strategieën",
      description: "De exacte trading strategieën die succesvolle traders gebruiken om consistent winstgevend te zijn.",
    },
    {
      icon: Star,
      title: "Top 3 Prop Firms",
      description: "Ontdek welke prop firms de beste voorwaarden bieden en wekelijks uitbetalen.",
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Downloadbare Excel templates en PDF checklists voor professioneel risicobeheer.",
    },
    {
      icon: Zap,
      title: "30-Dagen Plan",
      description: "Stap-voor-stap checklist om binnen 30 dagen funded te worden bij een prop firm.",
    },
  ]

  const checklist = [
    "De exacte strategieën van succesvolle traders",
    "Top 3 prop firms met wekelijkse uitbetalingen",
    "Risicomanagement templates (Excel + PDF)",
    "Checklist: Funded worden in 30 dagen",
    "Exclusieve kortingscodes voor prop firms",
    "Veelgemaakte fouten en hoe ze te vermijden",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.acceptTerms) return

    setIsSubmitting(true)

    try {
      // Send to n8n webhook
      const response = await fetch("https://n8n.srv1170372.hstgr.cloud/webhook/fundedtrading-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          source: "fundedtrading-geheim",
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Webhook failed")
      }

      // Store submission
      localStorage.setItem("geheim-submitted", "true")
      localStorage.setItem("subscriber-email", formData.email)
      localStorage.setItem("subscriber-name", formData.name)

      // Redirect to thank you page
      router.push("/geheim/bedankt")
    } catch (error) {
      console.error("Error submitting form:", error)
      // Still redirect even if webhook fails - we don't want to block the user
      localStorage.setItem("geheim-submitted", "true")
      localStorage.setItem("subscriber-email", formData.email)
      localStorage.setItem("subscriber-name", formData.name)
      router.push("/geheim/bedankt")
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-52 pb-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08)_0%,transparent_50%)]" />

        <div className="container-wide relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6"
            >
              <Flame className="w-4 h-4 text-accent" style={{ animation: "fire-flicker 0.5s ease-in-out infinite" }} />
              <span className="text-sm font-bold text-accent uppercase tracking-wide">Gratis Onderzoek</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Ontdek de{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-accent via-yellow-400 to-accent">
                10 Geheimen
              </span>
              <br />
              van Succesvolle Traders
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Wij hebben <span className="text-white font-bold">{stats.tradersAnalyzed}</span> traders geanalyseerd.
              Ontdek hun winnende strategieën en favoriete prop firms voor wekelijkse uitbetalingen.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-accent">{stats.tradersAnalyzed}</div>
                <div className="text-sm text-muted-foreground">Traders Geanalyseerd</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-secondary">{stats.successRate}</div>
                <div className="text-sm text-muted-foreground">Slaagpercentage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-accent">{stats.avgProfit}</div>
                <div className="text-sm text-muted-foreground">Gem. Winst/Maand</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left: Benefits */}
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Dit ontvang je gratis:
              </h2>

              {/* Checklist */}
              <div className="space-y-4">
                {checklist.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border"
                  >
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-linear-to-br from-accent/30 to-accent/10 border-2 border-background flex items-center justify-center text-xs font-bold text-accent"
                    >
                      {["JB", "MK", "SV", "TD"][i]}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <span className="text-white font-semibold">+2.847 traders</span> ontvingen dit al
                </span>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:sticky lg:top-40 h-fit">
              <div
                className="p-8 rounded-2xl border-2 border-accent/30"
                style={{
                  background: "linear-gradient(135deg, #0a0a0f 0%, #1a1510 50%, #0a0a0f 100%)",
                }}
              >
                {/* Glow effect */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative">
                  <h3 className="text-xl font-bold text-white mb-2 text-center">
                    Ontvang Direct Toegang
                  </h3>
                  <p className="text-sm text-muted-foreground text-center mb-6">
                    Vul je gegevens in en ontvang de geheimen direct in je inbox.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                        Voornaam
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jouw voornaam"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                        E-mailadres
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jouw@email.nl"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="acceptTerms"
                        required
                        checked={formData.acceptTerms}
                        onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-accent focus:ring-accent/50"
                      />
                      <label htmlFor="acceptTerms" className="text-xs text-muted-foreground">
                        Ik ga akkoord met de{" "}
                        <Link href="/voorwaarden" className="text-accent hover:underline" target="_blank">
                          voorwaarden
                        </Link>{" "}
                        en ontvang graag handige tips, aanbiedingen en updates over prop trading.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.acceptTerms}
                      className={cn(
                        "w-full py-4 rounded-xl font-bold text-base text-slate-900 transition-all duration-300",
                        formData.acceptTerms
                          ? "hover:scale-[1.02] cursor-pointer"
                          : "opacity-50 cursor-not-allowed"
                      )}
                      style={{
                        background: formData.acceptTerms
                          ? "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)"
                          : "linear-gradient(135deg, #4b5563 0%, #6b7280 50%, #4b5563 100%)",
                        boxShadow: formData.acceptTerms
                          ? "0 0 20px rgba(245, 158, 11, 0.4), 0 0 40px rgba(245, 158, 11, 0.2)"
                          : "none",
                      }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Even geduld...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Ja, Stuur Mij de Geheimen!
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      )}
                    </button>
                  </form>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Je gegevens zijn veilig. Geen spam, alleen waarde.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-card/50">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
              Wat je gaat leren
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Klaar om te beginnen?
            </h2>
            <p className="text-muted-foreground mb-8">
              Sluit je aan bij duizenden traders die al profiteren van deze inzichten.
            </p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-slate-900 transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)",
                boxShadow: "0 0 20px rgba(245, 158, 11, 0.4), 0 0 40px rgba(245, 158, 11, 0.2)",
              }}
            >
              Ontdek de 10 Geheimen
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
