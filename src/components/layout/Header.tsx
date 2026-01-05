"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronRight, TrendingUp, Menu, X, Search, Command, ArrowRight, Flame, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui"
import { SearchDialog } from "@/components/search"
import { navigation } from "@/config"
import { cn } from "@/lib/utils"
import { getFirmBySlug } from "@/config/firms"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalSeconds: number
  percentageLeft: number
}

function getTimeUntilSunday(): TimeLeft {
  const now = new Date()
  const daysUntilSunday = (7 - now.getDay()) % 7 || 7
  const nextSunday = new Date(now)
  nextSunday.setDate(now.getDate() + daysUntilSunday)
  nextSunday.setHours(0, 0, 0, 0)

  const diff = nextSunday.getTime() - now.getTime()
  const totalSecondsInWeek = 7 * 24 * 60 * 60

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0, percentageLeft: 0 }
  }

  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  const percentageLeft = (totalSeconds / totalSecondsInWeek) * 100

  return { days, hours, minutes, seconds, totalSeconds, percentageLeft }
}

// Spectacular countdown digit with animation
function CountdownDigit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative bg-linear-to-b from-slate-800 to-slate-900 border-2 border-accent/40 rounded-lg px-2.5 py-1.5 min-w-11 shadow-lg overflow-hidden"
        style={{ animation: "countdown-pulse 1s ease-in-out infinite" }}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full"
             style={{ animation: "slide-shine 3s ease-in-out infinite" }} />
        {/* Digit */}
        <span className="relative text-2xl md:text-3xl font-black font-mono text-transparent bg-clip-text bg-linear-to-b from-accent via-accent-light to-accent drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] text-accent/80 uppercase tracking-wider mt-1 font-semibold">{label}</span>
    </div>
  )
}

// Separator with pulse effect
function TimeSeparator() {
  return (
    <div className="flex flex-col justify-center gap-1.5 px-1 pb-4">
      <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(245,158,11,0.8)]" style={{ animation: "glow-pulse 1s ease-in-out infinite" }} />
      <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(245,158,11,0.8)]" style={{ animation: "glow-pulse 1s ease-in-out infinite 0.5s" }} />
    </div>
  )
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [bannerMinimized, setBannerMinimized] = useState(false)
  const [userMinimized, setUserMinimized] = useState(false) // User manually clicked minimize
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0, percentageLeft: 0 })
  const [mounted, setMounted] = useState(false)

  const ftmo = getFirmBySlug("ftmo")

  useEffect(() => {
    setMounted(true)
    setTimeLeft(getTimeUntilSunday())

    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilSunday())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const minimized = sessionStorage.getItem("promo-banner-minimized")
    if (minimized) {
      setUserMinimized(true)
      setBannerMinimized(true)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)

      // Auto-minimize when scrolled, auto-expand when at top (unless user manually minimized)
      if (isScrolled) {
        setBannerMinimized(true)
      } else if (!userMinimized) {
        setBannerMinimized(false)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [userMinimized])

  const handleMinimizeBanner = () => {
    setBannerMinimized(true)
    setUserMinimized(true)
    sessionStorage.setItem("promo-banner-minimized", "true")
  }

  const handleExpandBanner = () => {
    setBannerMinimized(false)
    setUserMinimized(false)
    sessionStorage.removeItem("promo-banner-minimized")
  }

  const hasBanner = ftmo?.discountCode && ftmo?.affiliateUrl

  // Determine urgency level based on time left
  const isUrgent = timeLeft.days <= 1
  const isVeryUrgent = timeLeft.days === 0 && timeLeft.hours <= 6

  // CMD+K / Ctrl+K shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* 🔥 FOMO BANNER - Full & Minimized versions 🔥 */}
      {hasBanner && ftmo && (
        <>
          {/* FULL BANNER - Desktop only */}
          <div
            className={cn(
              "relative overflow-hidden border-b-2 border-accent/30 transition-all duration-500 ease-out hidden md:block",
              bannerMinimized ? "md:max-h-0 md:opacity-0 md:pointer-events-none" : "md:max-h-40 md:opacity-100"
            )}
            style={{
              background: "linear-gradient(90deg, #0a0a0f 0%, #1a1510 25%, #2a1a0a 50%, #1a1510 75%, #0a0a0f 100%)",
              backgroundSize: "200% 100%",
              animation: "banner-gradient 8s ease infinite"
            }}
          >
            {/* Animated glow orbs */}
            <div className="absolute top-0 left-1/4 w-64 h-32 bg-accent/20 rounded-full blur-3xl" style={{ animation: "glow-pulse 2s ease-in-out infinite" }} />
            <div className="absolute top-0 right-1/4 w-64 h-32 bg-accent/15 rounded-full blur-3xl" style={{ animation: "glow-pulse 2s ease-in-out infinite 1s" }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.1)_0%,transparent_70%)]" />

            {/* Sparkle particles effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-2 left-[10%] w-1 h-1 bg-accent rounded-full" style={{ animation: "glow-pulse 1.5s ease-in-out infinite" }} />
              <div className="absolute top-4 left-[30%] w-0.5 h-0.5 bg-accent-light rounded-full" style={{ animation: "glow-pulse 2s ease-in-out infinite 0.3s" }} />
              <div className="absolute top-1 right-[20%] w-1 h-1 bg-accent rounded-full" style={{ animation: "glow-pulse 1.8s ease-in-out infinite 0.6s" }} />
              <div className="absolute top-3 right-[40%] w-0.5 h-0.5 bg-accent-light rounded-full" style={{ animation: "glow-pulse 1.6s ease-in-out infinite 0.9s" }} />
            </div>

            <div className="container-wide relative">
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 py-3 md:py-4 px-4 pr-12 md:px-8 md:pr-8">

                {/* Left side: Urgency badge + Offer */}
                <div className="flex items-center gap-3">
                  {/* Fire/Urgency Badge */}
                  <div
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wide",
                      isVeryUrgent
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-accent/20 text-accent border border-accent/30"
                    )}
                    style={{ animation: "urgent-bounce 1s ease-in-out infinite" }}
                  >
                    <Flame className="w-3.5 h-3.5" style={{ animation: "fire-flicker 0.5s ease-in-out infinite" }} />
                    <span>{isVeryUrgent ? "Bijna Voorbij!" : isUrgent ? "Laatste Dag!" : "Limited Time"}</span>
                  </div>

                  {/* Main offer */}
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-base md:text-lg">FTMO</span>
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-linear-to-r from-accent/30 to-accent/10 border border-accent/40">
                      <span className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-linear-to-r from-accent via-yellow-400 to-accent drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                        KORTING
                      </span>
                    </div>
                  </div>
                </div>

                {/* Center: Countdown Timer */}
                <div className="flex items-center">
                  {mounted ? (
                    <div className="flex items-center">
                      <CountdownDigit value={timeLeft.days} label="Dagen" />
                      <TimeSeparator />
                      <CountdownDigit value={timeLeft.hours} label="Uren" />
                      <TimeSeparator />
                      <CountdownDigit value={timeLeft.minutes} label="Min" />
                      <div className="hidden sm:flex items-center">
                        <TimeSeparator />
                        <CountdownDigit value={timeLeft.seconds} label="Sec" />
                      </div>
                    </div>
                  ) : (
                    <div className="h-14 w-48 bg-accent/10 rounded-lg animate-pulse" />
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  href="/go/ftmo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold text-sm md:text-base text-slate-900 transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)",
                    boxShadow: "0 0 20px rgba(245, 158, 11, 0.4), 0 0 40px rgba(245, 158, 11, 0.2), inset 0 1px 0 rgba(255,255,255,0.3)",
                    animation: "pulse-urgent 2s ease-in-out infinite"
                  }}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center gap-2">
                    <span>Claim Je Korting</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                {/* Minimize button */}
                <button
                  onClick={handleMinimizeBanner}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 transition-all hover:scale-110"
                  aria-label="Minimaliseer banner"
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-white" />
                </button>
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/50">
                <div
                  className="h-full bg-linear-to-r from-accent via-yellow-400 to-accent transition-all duration-1000"
                  style={{
                    width: `${100 - timeLeft.percentageLeft}%`,
                    boxShadow: "0 0 10px rgba(245, 158, 11, 0.5)"
                  }}
                />
              </div>
            </div>
          </div>

          {/* MINIMIZED BANNER - Always on mobile, conditional on desktop */}
          <div
            className={cn(
              "relative overflow-hidden transition-all duration-500 ease-out",
              // Mobile: always visible
              "max-h-12 opacity-100",
              // Desktop: conditional based on bannerMinimized state
              bannerMinimized ? "md:max-h-12 md:opacity-100 md:cursor-pointer" : "md:max-h-0 md:opacity-0 md:pointer-events-none"
            )}
            onClick={handleExpandBanner}
            style={{
              background: "linear-gradient(90deg, #0a0a0f 0%, #1a1510 50%, #0a0a0f 100%)",
            }}
          >
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)]" />

            <div className="container-wide relative">
              <div className="flex items-center justify-center gap-4 py-2.5 px-4">
                {/* Flame icon */}
                <Flame className="w-4 h-4 text-accent" style={{ animation: "fire-flicker 0.5s ease-in-out infinite" }} />

                {/* Compact offer */}
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-sm">FTMO Korting</span>
                  <span className="text-muted-foreground text-sm">•</span>
                  <Link
                    href="/go/ftmo"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-accent font-bold text-sm hover:text-accent-light transition-colors"
                  >
                    Claim Je Korting
                  </Link>
                </div>

                {/* Compact timer */}
                {mounted && (
                  <div className="hidden sm:flex items-center gap-1 text-sm font-mono">
                    <span className="text-accent font-bold">{timeLeft.days}d</span>
                    <span className="text-muted-foreground">:</span>
                    <span className="text-accent font-bold">{timeLeft.hours}h</span>
                    <span className="text-muted-foreground">:</span>
                    <span className="text-accent font-bold">{timeLeft.minutes}m</span>
                  </div>
                )}

                {/* Expand indicator */}
                <button
                  className="flex items-center gap-1 text-muted-foreground hover:text-white text-xs transition-colors"
                  aria-label="Uitklappen"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>

              {/* Thin progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-800/50">
                <div
                  className="h-full bg-accent/60 transition-all duration-1000"
                  style={{ width: `${100 - timeLeft.percentageLeft}%` }}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Header */}
      <div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "glass border-b border-border/50"
            : "bg-transparent"
        )}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-linear-to-br from-secondary to-secondary-dark shadow-glow-green group-hover:shadow-glow-green transition-all duration-300">
              <TrendingUp className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white">
                Funded<span className="text-secondary">Trading</span>
              </span>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Nederland
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-primary to-secondary group-hover:w-4/5 transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Search + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-white border border-border hover:border-primary/50 rounded-xl transition-all group"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline">Zoeken...</span>
              <div className="hidden xl:flex items-center gap-0.5 text-xs bg-white/5 px-1.5 py-0.5 rounded-md">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </button>
            <Button
              asChild
              className="bg-linear-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary text-white shadow-glow-green btn-glow"
            >
              <Link href="/vergelijk" className="flex items-center gap-2">
                Start Vergelijken
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Search + Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="relative p-2.5 rounded-xl border border-border hover:border-primary/50 transition-colors"
              aria-label="Zoeken"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
            <button
              className="relative p-2.5 rounded-xl border border-border hover:border-primary/50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Sluit menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-out",
            mobileMenuOpen ? "max-h-100 pb-6" : "max-h-0"
          )}
        >
          <div className="border-t border-border pt-4">
            <nav className="flex flex-col gap-1">
              {navigation.main.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-muted-foreground font-medium hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 pt-4">
                <Button
                  asChild
                  className="w-full bg-linear-to-r from-secondary to-secondary-dark text-white"
                >
                  <Link href="/vergelijk" className="flex items-center justify-center gap-2">
                    Start Vergelijken
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>

      {/* Search Dialog */}
      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
