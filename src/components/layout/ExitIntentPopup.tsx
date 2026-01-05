"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, CheckCircle2, Users, TrendingUp, ArrowRight, Gift, ChevronUp } from "lucide-react"

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check if already subscribed - don't show anything
    const hasSubscribed = localStorage.getItem("geheim-submitted")
    if (hasSubscribed) {
      return
    }

    // Check if popup was minimized in THIS session - show minimized bar
    // We use sessionStorage for this to only persist within the session
    const wasMinimizedThisSession = sessionStorage.getItem("exit-intent-minimized-session")
    if (wasMinimizedThisSession) {
      setIsVisible(true)
      setIsMinimized(true)
      return
    }

    // Don't show minimized bar on page load from previous sessions
    // Only show after exit intent is triggered

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves through top of page
      if (e.clientY <= 0) {
        setIsVisible(true)
        localStorage.setItem("exit-intent-seen", "true")
        // Remove listener after showing once
        document.removeEventListener("mouseleave", handleMouseLeave)
      }
    }

    // Mobile: Show after 30 seconds of engagement
    const mobileTimer = setTimeout(() => {
      if (window.innerWidth < 768 && !localStorage.getItem("exit-intent-seen")) {
        setIsVisible(true)
        localStorage.setItem("exit-intent-seen", "true")
      }
    }, 30000)

    // Desktop: Exit intent
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      clearTimeout(mobileTimer)
    }
  }, [])

  const handleMinimize = () => {
    setIsMinimized(true)
    // Use sessionStorage so minimized bar only persists within this session
    sessionStorage.setItem("exit-intent-minimized-session", "true")
  }

  const handleExpand = () => {
    setIsMinimized(false)
    sessionStorage.removeItem("exit-intent-minimized-session")
  }

  if (!mounted || !isVisible) return null

  // Stats for social proof
  const stats = {
    tradersAnalyzed: "12.547",
    successRate: "73%",
  }

  const benefits = [
    "Winnende strategieën van top traders",
    "Top 3 prop firms met wekelijkse payouts",
    "Gratis risk management templates",
    "30-dagen funded checklist",
  ]

  // Minimized bar at bottom
  if (isMinimized) {
    return (
      <div
        className="fixed bottom-0 left-0 right-0 z-50 cursor-pointer"
        style={{
          animation: "slideUp 0.4s ease-out",
        }}
      >
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.15)_0%,transparent_70%)]" />

        <div
          className="relative border-t-2 border-accent/30"
          style={{
            background: "linear-gradient(90deg, #0a0a0f 0%, #1a1510 50%, #0a0a0f 100%)",
          }}
        >
          <div className="container-wide">
            <div className="flex items-center justify-between py-3 px-4">
              {/* Left: Icon + Text */}
              <div
                className="flex items-center gap-3 flex-1"
                onClick={handleExpand}
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/20 border border-accent/30"
                  style={{ animation: "glow-pulse 2s ease-in-out infinite" }}
                >
                  <Gift className="w-4 h-4 text-accent" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="text-white font-bold text-sm">
                    10 Geheimen van Succesvolle Traders
                  </span>
                  <span className="text-muted-foreground text-xs sm:text-sm hidden sm:inline">
                    • Ontdek ze nu gratis
                  </span>
                </div>
              </div>

              {/* Right: CTA + Expand */}
              <div className="flex items-center gap-2">
                <Link
                  href="/geheim"
                  className="group flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-sm text-slate-900 transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)",
                    boxShadow: "0 0 15px rgba(245, 158, 11, 0.3)",
                  }}
                >
                  <span className="hidden sm:inline">Ontdek het Geheim</span>
                  <span className="sm:hidden">Ontdek</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <button
                  onClick={handleExpand}
                  className="p-2 rounded-full hover:bg-slate-800/50 transition-colors"
                  aria-label="Uitklappen"
                >
                  <ChevronUp className="w-4 h-4 text-muted-foreground hover:text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(100%);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    )
  }

  // Full popup
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleMinimize}
        style={{ animation: "fadeIn 0.3s ease-out" }}
      />

      {/* Popup */}
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-accent/30 shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a1510 50%, #0a0a0f 100%)",
          animation: "popupSlideIn 0.4s ease-out",
        }}
      >
        {/* Animated background effects */}
        <div className="absolute top-0 left-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl" style={{ animation: "glow-pulse 3s ease-in-out infinite" }} />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl" style={{ animation: "glow-pulse 3s ease-in-out infinite 1.5s" }} />

        {/* Close button */}
        <button
          onClick={handleMinimize}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all hover:scale-110"
          aria-label="Sluiten"
        >
          <X className="w-5 h-5 text-muted-foreground hover:text-white" />
        </button>

        <div className="relative p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Wacht! Ontdek de{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-accent via-yellow-400 to-accent">
                10 Geheimen
              </span>
            </h2>

            <p className="text-muted-foreground">
              van <span className="text-white font-bold">{stats.tradersAnalyzed}</span> succesvolle traders
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="w-4 h-4 text-accent" />
                <span className="text-xl font-black text-white">{stats.tradersAnalyzed}</span>
              </div>
              <span className="text-xs text-muted-foreground">Traders</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-4 h-4 text-secondary" />
                <span className="text-xl font-black text-secondary">{stats.successRate}</span>
              </div>
              <span className="text-xs text-muted-foreground">Slaagpercentage</span>
            </div>
          </div>

          {/* Benefits checklist */}
          <div className="space-y-2 mb-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/30"
              >
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/geheim"
            className="group relative block w-full py-4 rounded-xl font-bold text-base text-slate-900 text-center transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)",
              boxShadow: "0 0 20px rgba(245, 158, 11, 0.4), 0 0 40px rgba(245, 158, 11, 0.2)",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl" />
            <span className="relative flex items-center justify-center gap-2">
              Ja, Toon Mij de Geheimen!
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          {/* Subtle dismiss */}
          <button
            onClick={handleMinimize}
            className="w-full mt-3 text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Nee bedankt, ik weet alles al
          </button>

          {/* Social proof footer */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-linear-to-br from-accent/30 to-accent/10 border-2 border-background flex items-center justify-center text-[10px] font-bold text-accent"
                  >
                    {["JB", "MK", "SV"][i]}
                  </div>
                ))}
              </div>
              <span>+2.847 traders gingen je voor</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes popupSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
