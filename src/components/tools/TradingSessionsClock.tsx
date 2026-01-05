"use client"

import { useState, useEffect, useMemo } from "react"
import { Clock, TrendingUp, AlertCircle, Globe, MapPin } from "lucide-react"

interface TradingSession {
  id: string
  name: string
  city: string
  flag: string
  // Times in UTC
  startUTC: number
  endUTC: number
  color: string
  description: string
  bestPairs: string[]
}

// All times in UTC (24h format)
const tradingSessions: TradingSession[] = [
  {
    id: "sydney",
    name: "Sydney",
    city: "Sydney",
    flag: "🇦🇺",
    startUTC: 22, // 22:00 UTC
    endUTC: 7,    // 07:00 UTC
    color: "bg-blue-500",
    description: "Aziatische sessie start, relatief rustig",
    bestPairs: ["AUD/USD", "NZD/USD", "AUD/JPY"],
  },
  {
    id: "tokyo",
    name: "Tokyo",
    city: "Tokyo",
    flag: "🇯🇵",
    startUTC: 0,  // 00:00 UTC
    endUTC: 9,    // 09:00 UTC
    color: "bg-red-500",
    description: "JPY pairs actief, vaak trending moves",
    bestPairs: ["USD/JPY", "EUR/JPY", "GBP/JPY"],
  },
  {
    id: "london",
    name: "London",
    city: "Londen",
    flag: "🇬🇧",
    startUTC: 8,  // 08:00 UTC
    endUTC: 17,   // 17:00 UTC
    color: "bg-green-500",
    description: "Hoogste volume, beste liquiditeit",
    bestPairs: ["EUR/USD", "GBP/USD", "EUR/GBP"],
  },
  {
    id: "newyork",
    name: "New York",
    city: "New York",
    flag: "🇺🇸",
    startUTC: 13, // 13:00 UTC
    endUTC: 22,   // 22:00 UTC
    color: "bg-yellow-500",
    description: "Amerikaanse volatiliteit, USD pairs",
    bestPairs: ["EUR/USD", "USD/CAD", "USD/CHF"],
  },
]

const sessionOverlaps = [
  {
    id: "london-newyork",
    name: "London/NY Overlap",
    startUTC: 13,
    endUTC: 17,
    description: "Beste tijd om te traden - hoogste volume en volatiliteit",
    color: "bg-green-400",
  },
  {
    id: "tokyo-london",
    name: "Tokyo/London Overlap",
    startUTC: 8,
    endUTC: 9,
    description: "Korte overlap, kan volatiele moves geven",
    color: "bg-orange-400",
  },
]

export function TradingSessionsClock() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedTimezone, setSelectedTimezone] = useState("Europe/Amsterdam")
  const is24Hour = true // 24-hour format

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Get current hour in UTC
  const currentHourUTC = currentTime.getUTCHours()
  const currentMinuteUTC = currentTime.getUTCMinutes()

  // Format time for display
  const formatTime = (date: Date, timezone: string) => {
    return date.toLocaleTimeString("nl-NL", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: !is24Hour,
    })
  }

  const formatDate = (date: Date, timezone: string) => {
    return date.toLocaleDateString("nl-NL", {
      timeZone: timezone,
      weekday: "long",
      day: "numeric",
      month: "long",
    })
  }

  // Check if a session is active
  const isSessionActive = (session: TradingSession) => {
    const start = session.startUTC
    const end = session.endUTC
    const current = currentHourUTC + currentMinuteUTC / 60

    if (start < end) {
      // Normal case (e.g., 8-17)
      return current >= start && current < end
    } else {
      // Crosses midnight (e.g., 22-7)
      return current >= start || current < end
    }
  }

  // Check if an overlap is active
  const isOverlapActive = (overlap: typeof sessionOverlaps[0]) => {
    const current = currentHourUTC + currentMinuteUTC / 60
    return current >= overlap.startUTC && current < overlap.endUTC
  }

  // Get active sessions
  const activeSessions = tradingSessions.filter(isSessionActive)
  const activeOverlaps = sessionOverlaps.filter(isOverlapActive)

  // Check if it's weekend (forex closed)
  const isWeekend = useMemo(() => {
    const day = currentTime.getUTCDay()
    const hour = currentHourUTC

    // Forex closes Friday 22:00 UTC and opens Sunday 22:00 UTC
    if (day === 6) return true // Saturday
    if (day === 0 && hour < 22) return true // Sunday before 22:00
    if (day === 5 && hour >= 22) return true // Friday after 22:00

    return false
  }, [currentTime, currentHourUTC])

  // Get market status message
  const getMarketStatus = () => {
    if (isWeekend) {
      return {
        status: "Gesloten",
        message: "Forex markt is gesloten in het weekend",
        color: "text-red-400",
        bg: "bg-red-500/10",
      }
    }

    if (activeOverlaps.length > 0) {
      return {
        status: "Prime Time",
        message: activeOverlaps[0].description,
        color: "text-green-400",
        bg: "bg-green-500/10",
      }
    }

    if (activeSessions.length >= 2) {
      return {
        status: "Actief",
        message: "Meerdere sessies actief - goede liquiditeit",
        color: "text-green-400",
        bg: "bg-green-500/10",
      }
    }

    if (activeSessions.length === 1) {
      return {
        status: "Beperkt",
        message: `Alleen ${activeSessions[0].name} sessie actief`,
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
      }
    }

    return {
      status: "Rustig",
      message: "Weinig activiteit, hogere spreads mogelijk",
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    }
  }

  const marketStatus = getMarketStatus()

  // Convert UTC hour to local time string
  const utcToLocal = (utcHour: number, timezone: string) => {
    const date = new Date()
    date.setUTCHours(utcHour, 0, 0, 0)
    return date.toLocaleTimeString("nl-NL", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  // Calculate session progress (0-100%)
  const getSessionProgress = (session: TradingSession) => {
    const start = session.startUTC
    const end = session.endUTC
    const current = currentHourUTC + currentMinuteUTC / 60

    let duration: number
    let elapsed: number

    if (start < end) {
      duration = end - start
      elapsed = current - start
    } else {
      duration = (24 - start) + end
      if (current >= start) {
        elapsed = current - start
      } else {
        elapsed = (24 - start) + current
      }
    }

    return Math.min(100, Math.max(0, (elapsed / duration) * 100))
  }

  // Time zones for display
  const timeZones = [
    { id: "Europe/Amsterdam", label: "Amsterdam (CET)", flag: "🇳🇱" },
    { id: "Europe/London", label: "Londen (GMT)", flag: "🇬🇧" },
    { id: "America/New_York", label: "New York (EST)", flag: "🇺🇸" },
    { id: "Asia/Tokyo", label: "Tokyo (JST)", flag: "🇯🇵" },
    { id: "UTC", label: "UTC", flag: "🌐" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Clock className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Trading Sessies Klok</h2>
          <p className="text-muted-foreground">
            Realtime overzicht van forex en futures trading sessies
          </p>
        </div>
      </div>

      {/* Main Clock Display */}
      <div className="p-6 rounded-xl bg-card border border-border text-center">
        <div className="mb-2">
          <select
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
            className="bg-background border border-border rounded-lg px-3 py-1 text-sm text-muted-foreground"
          >
            {timeZones.map((tz) => (
              <option key={tz.id} value={tz.id}>
                {tz.flag} {tz.label}
              </option>
            ))}
          </select>
        </div>

        <div className="text-6xl font-mono font-bold text-white mb-2">
          {formatTime(currentTime, selectedTimezone)}
        </div>

        <p className="text-muted-foreground capitalize">
          {formatDate(currentTime, selectedTimezone)}
        </p>

        {/* Market Status */}
        <div className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full ${marketStatus.bg}`}>
          <div className={`w-2 h-2 rounded-full ${marketStatus.color.replace("text-", "bg-")} animate-pulse`} />
          <span className={`font-semibold ${marketStatus.color}`}>{marketStatus.status}</span>
          <span className="text-muted-foreground text-sm">• {marketStatus.message}</span>
        </div>
      </div>

      {/* Weekend Warning */}
      {isWeekend && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-400">Forex Markt Gesloten</p>
            <p className="text-sm text-muted-foreground mt-1">
              De forex markt is gesloten van vrijdag 23:00 CET tot zondag 23:00 CET.
              Futures hebben ook beperkte uren in het weekend.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sessions Overview */}
        <div className="space-y-6">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Trading Sessies
          </h3>

          <div className="space-y-4">
            {tradingSessions.map((session) => {
              const isActive = isSessionActive(session)
              const progress = getSessionProgress(session)

              return (
                <div
                  key={session.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isActive
                      ? "bg-card border-border shadow-lg"
                      : "bg-background/50 border-border/50 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{session.flag}</span>
                      <div>
                        <h4 className="font-semibold text-white flex items-center gap-2">
                          {session.name}
                          {isActive && (
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          )}
                        </h4>
                        <p className="text-xs text-muted-foreground">{session.city}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">
                        {utcToLocal(session.startUTC, selectedTimezone)} - {utcToLocal(session.endUTC, selectedTimezone)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selectedTimezone.split("/")[1] || selectedTimezone}
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  {isActive && (
                    <div className="mb-3">
                      <div className="h-1.5 rounded-full bg-background overflow-hidden">
                        <div
                          className={`h-full ${session.color} transition-all duration-1000`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {progress.toFixed(0)}% van sessie voltooid
                      </p>
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground mb-2">{session.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {session.bestPairs.map((pair) => (
                      <span
                        key={pair}
                        className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary"
                      >
                        {pair}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Session Overlaps */}
          <div>
            <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-secondary" />
              Session Overlaps
            </h3>

            <div className="space-y-3">
              {sessionOverlaps.map((overlap) => {
                const isActive = isOverlapActive(overlap)

                return (
                  <div
                    key={overlap.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isActive
                        ? "bg-secondary/10 border-secondary/30"
                        : "bg-background/50 border-border/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white flex items-center gap-2">
                        {overlap.name}
                        {isActive && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/20 text-secondary">
                            NU ACTIEF
                          </span>
                        )}
                      </h4>
                      <span className="text-sm text-muted-foreground">
                        {utcToLocal(overlap.startUTC, selectedTimezone)} - {utcToLocal(overlap.endUTC, selectedTimezone)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{overlap.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 24 Hour Timeline */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-white mb-4">24 Uur Overzicht</h3>

            <div className="relative">
              {/* Hour markers */}
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                {[0, 6, 12, 18, 24].map((hour) => (
                  <span key={hour}>{hour.toString().padStart(2, "0")}:00</span>
                ))}
              </div>

              {/* Sessions bars */}
              <div className="space-y-2">
                {tradingSessions.map((session) => {
                  const start = (session.startUTC / 24) * 100
                  const end = (session.endUTC / 24) * 100

                  // Handle crossing midnight
                  if (session.startUTC > session.endUTC) {
                    return (
                      <div key={session.id} className="relative h-6">
                        <div className="absolute left-0 top-0 h-full flex items-center gap-1">
                          <span className="text-xs text-muted-foreground w-16 truncate">{session.name}</span>
                        </div>
                        <div className="absolute left-16 right-0 h-full rounded bg-background overflow-hidden">
                          {/* First part: from start to midnight */}
                          <div
                            className={`absolute h-full ${session.color} opacity-60`}
                            style={{ left: `${start - (16/100*24)}%`, right: "0" }}
                          />
                          {/* Second part: from midnight to end */}
                          <div
                            className={`absolute h-full ${session.color} opacity-60`}
                            style={{ left: "0", width: `${end}%` }}
                          />
                        </div>
                      </div>
                    )
                  }

                  return (
                    <div key={session.id} className="relative h-6">
                      <div className="absolute left-0 top-0 h-full flex items-center gap-1">
                        <span className="text-xs text-muted-foreground w-16 truncate">{session.name}</span>
                      </div>
                      <div className="absolute left-16 right-0 h-full rounded bg-background overflow-hidden">
                        <div
                          className={`absolute h-full ${session.color} opacity-60`}
                          style={{ left: `${start}%`, width: `${end - start}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Current time indicator */}
              {!isWeekend && (
                <div
                  className="absolute top-8 bottom-0 w-0.5 bg-white z-10"
                  style={{ left: `calc(64px + ${(currentHourUTC / 24) * 100}% - 64px * ${currentHourUTC / 24})` }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white" />
                </div>
              )}
            </div>

            <p className="text-xs text-muted-foreground mt-4 text-center">
              Tijden in UTC. Pas aan voor zomer/wintertijd.
            </p>
          </div>

          {/* World Clocks */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              Wereldklokken
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {timeZones.slice(0, 4).map((tz) => (
                <div key={tz.id} className="p-3 rounded-lg bg-background">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{tz.flag}</span>
                    <span className="text-xs text-muted-foreground">
                      {tz.label.split(" ")[0]}
                    </span>
                  </div>
                  <p className="text-lg font-mono font-semibold text-white">
                    {formatTime(currentTime, tz.id).slice(0, 5)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Trading Tips */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <h4 className="font-medium text-white mb-3">💡 Trading Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• <strong className="text-white">London/NY overlap</strong> (14:00-18:00 CET) heeft het hoogste volume</li>
              <li>• Vermijd de eerste 15 min na sessie open - vaak chaotisch</li>
              <li>• JPY pairs zijn het meest actief tijdens Tokyo sessie</li>
              <li>• Let op economische nieuws rond 14:30 CET (US data)</li>
              <li>• Dead zone (21:00-23:00 CET) heeft lage liquiditeit</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
