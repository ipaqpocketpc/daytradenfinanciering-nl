"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, CheckCircle2, Users, TrendingUp, ArrowRight, Banknote, ChevronUp } from "lucide-react"

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
    const wasMinimizedThisSession = sessionStorage.getItem("exit-intent-minimized-session")
    if (wasMinimizedThisSession) {
      setIsVisible(true)
      setIsMinimized(true)
      return
    }

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves through top of page
      if (e.clientY <= 0) {
        setIsVisible(true)
        localStorage.setItem("exit-intent-seen", "true")
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
    sessionStorage.setItem("exit-intent-minimized-session", "true")
  }

  const handleExpand = () => {
    setIsMinimized(false)
    sessionStorage.removeItem("exit-intent-minimized-session")
  }

  if (!mounted || !isVisible) return null

  // Stats for social proof
  const stats = {
    tradersHelped: "8.500+",
    avgCapital: "€47.000",
  }

  const benefits = [
    "Hoe je kapitaal krijgt zonder eigen geld",
    "De 3 beste financiers voor beginners",
    "Risico-management dat echt werkt",
    "Van €0 naar €200.000 stappenplan",
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]" />

        <div
          className="relative border-t-2 border-primary/30"
          style={{
            background: "linear-gradient(90deg, #0a0f0a 0%, #0f1a14 50%, #0a0f0a 100%)",
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
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 border border-primary/30"
                  style={{ animation: "glow-pulse 2s ease-in-out infinite" }}
                >
                  <Banknote className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="text-white font-bold text-sm">
                    Gratis: Trading Kapitaal Gids
                  </span>
                  <span className="text-muted-foreground text-xs sm:text-sm hidden sm:inline">
                    • Van €0 naar €200K
                  </span>
                </div>
              </div>

              {/* Right: CTA + Expand */}
              <div className="flex items-center gap-2">
                <Link
                  href="/geheim"
                  className="group flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-sm text-white transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #059669 0%, #10B981 50%, #059669 100%)",
                    boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)",
                  }}
                >
                  <span className="hidden sm:inline">Bekijk de Gids</span>
                  <span className="sm:hidden">Bekijk</span>
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
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-primary/30 shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #0a0f0a 0%, #0f1a14 50%, #0a0f0a 100%)",
          animation: "popupSlideIn 0.4s ease-out",
        }}
      >
        {/* Animated background effects */}
        <div className="absolute top-0 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl" style={{ animation: "glow-pulse 3s ease-in-out infinite" }} />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" style={{ animation: "glow-pulse 3s ease-in-out infinite 1.5s" }} />

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
              Wacht! Ontdek hoe je{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
                Kapitaal Krijgt
              </span>
            </h2>

            <p className="text-muted-foreground">
              zonder eigen geld te investeren
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xl font-black text-white">{stats.tradersHelped}</span>
              </div>
              <span className="text-xs text-muted-foreground">Traders Geholpen</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-4 h-4 text-secondary" />
                <span className="text-xl font-black text-secondary">{stats.avgCapital}</span>
              </div>
              <span className="text-xs text-muted-foreground">Gem. Kapitaal</span>
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
            className="group relative block w-full py-4 rounded-xl font-bold text-base text-white text-center transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #059669 0%, #10B981 50%, #059669 100%)",
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(16, 185, 129, 0.2)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl" />
            <span className="relative flex items-center justify-center gap-2">
              Ja, Toon Mij de Gids!
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          {/* Subtle dismiss */}
          <button
            onClick={handleMinimize}
            className="w-full mt-3 text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Nee bedankt, ik heb al kapitaal
          </button>

          {/* Social proof footer */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-background flex items-center justify-center text-[10px] font-bold text-primary"
                  >
                    {["TB", "RK", "MV"][i]}
                  </div>
                ))}
              </div>
              <span>+2.150 traders kregen al kapitaal</span>
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
