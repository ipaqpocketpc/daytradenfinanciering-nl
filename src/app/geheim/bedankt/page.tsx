"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle2, ArrowRight, Mail, Star, Gift, Users } from "lucide-react"

export default function BedanktPage() {
  const router = useRouter()
  const [subscriberData, setSubscriberData] = useState({ name: "", email: "" })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Get subscriber data from localStorage
    const name = localStorage.getItem("subscriber-name") || ""
    const email = localStorage.getItem("subscriber-email") || ""
    const hasSubmitted = localStorage.getItem("geheim-submitted")

    // Redirect if not submitted
    if (!hasSubmitted) {
      router.push("/geheim")
      return
    }

    setSubscriberData({ name, email })
  }, [router])

  if (!mounted) {
    return (
      <div className="min-h-screen pt-32 md:pt-52 pb-20 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 md:pt-52 pb-20">
      {/* Background effects */}
      <div className="fixed top-20 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-wide relative">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div
              className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6"
              style={{ animation: "pulse-urgent 2s ease-in-out infinite" }}
            >
              <CheckCircle2 className="w-12 h-12 text-secondary" />
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
              {subscriberData.name ? `Bedankt, ${subscriberData.name}!` : "Bedankt!"}
            </h1>

            <p className="text-lg text-muted-foreground">
              De 10 geheimen zijn onderweg naar{" "}
              {subscriberData.email && (
                <span className="text-white font-medium">{subscriberData.email}</span>
              )}
            </p>
          </div>

          {/* Email Card */}
          <div className="p-6 rounded-2xl bg-card border border-border mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Check je inbox</h3>
                <p className="text-sm text-muted-foreground">Je ontvangt binnen 5 minuten een email</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-muted-foreground">
                <span className="text-accent font-medium">Tip:</span> Check ook je spam/ongewenste map als je de email niet ziet.
                Voeg <span className="text-white">info@fundedtrading.nl</span> toe aan je contacten.
              </p>
            </div>
          </div>

          {/* What's Next */}
          <div className="p-6 rounded-2xl bg-card border border-border mb-8">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" />
              Wat kun je nu doen?
            </h3>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-secondary">1</span>
                </div>
                <span className="text-muted-foreground">Open de email en bekijk de geheimen</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-secondary">2</span>
                </div>
                <span className="text-muted-foreground">Lees de 10 geheimen van succesvolle traders</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-secondary">3</span>
                </div>
                <span className="text-muted-foreground">Vergelijk prop firms en kies de beste voor jou</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <Link
              href="/vergelijk"
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-slate-900 transition-all hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)",
                boxShadow: "0 0 20px rgba(245, 158, 11, 0.3)",
              }}
            >
              Vergelijk Prop Firms
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/prop-firms"
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all"
            >
              Bekijk Alle Firms
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Social Proof */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent/10 border border-accent/20">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-linear-to-br from-accent/30 to-accent/10 border-2 border-background flex items-center justify-center text-[10px] font-bold text-accent"
                  >
                    {["JB", "MK", "SV", "TD"][i]}
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                <span className="text-white font-semibold">+2.847 traders</span> gingen je voor
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
