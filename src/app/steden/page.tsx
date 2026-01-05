import { Metadata } from "next"
import Link from "next/link"
import {
  MapPin,
  Users,
  TrendingUp,
  ArrowUpRight,
  Building2,
  ChevronRight,
} from "lucide-react"
import { cities, generateCityStats, getCitiesByPriority } from "@/config/cities"
import { brand } from "@/config"
import { HeroSection } from "@/components/sections/HeroSection"
import { Button } from "@/components/ui"

export const metadata: Metadata = {
  title: `Prop Trading per Stad | Alle 50 Steden`,
  description: `Vind prop traders in jouw stad. Bekijk statistieken en lokale informatie voor alle 50 Nederlandse steden.`,
}

function CityCard({ city }: { city: typeof cities[0] }) {
  const stats = generateCityStats(city)

  return (
    <Link
      href={`/${city.slug}`}
      className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
              {city.name}
            </h3>
            <p className="text-xs text-muted-foreground">{city.province}</p>
          </div>
        </div>
        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-1 mb-1">
            <Users className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Traders</span>
          </div>
          <div className="font-semibold text-white">
            {stats.tradersActive.toLocaleString("nl-NL")}+
          </div>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Funded</span>
          </div>
          <div className="font-semibold text-secondary">
            {stats.accountsOpened.toLocaleString("nl-NL")}+
          </div>
        </div>
      </div>

      {city.wijken.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {city.wijken.length} wijken beschikbaar
          </p>
        </div>
      )}
    </Link>
  )
}

export default function StedenPage() {
  const priority1 = getCitiesByPriority(1)
  const priority2 = getCitiesByPriority(2)
  const priority3 = getCitiesByPriority(3)

  const totalTraders = cities.reduce((sum, city) => {
    const stats = generateCityStats(city)
    return sum + stats.tradersActive
  }, 0)

  const totalFunded = cities.reduce((sum, city) => {
    const stats = generateCityStats(city)
    return sum + stats.accountsOpened
  }, 0)

  return (
    <>
      <HeroSection
        title="Prop Trading per Stad"
        highlightedWord="Stad"
        subtitle={`Ontdek de prop trading community in jouw stad. ${totalTraders.toLocaleString("nl-NL")}+ traders verspreid over 50 Nederlandse steden.`}
        badge="50 Steden"
      />

      {/* Stats */}
      <section className="border-b border-border bg-card/50">
        <div className="container-wide py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">50</div>
              <div className="text-sm text-muted-foreground">Nederlandse Steden</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {totalTraders.toLocaleString("nl-NL")}+
              </div>
              <div className="text-sm text-muted-foreground">Actieve Traders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-1">
                {totalFunded.toLocaleString("nl-NL")}+
              </div>
              <div className="text-sm text-muted-foreground">Funded Accounts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">375+</div>
              <div className="text-sm text-muted-foreground">Wijken</div>
            </div>
          </div>
        </div>
      </section>

      {/* Priority 1 - Top 10 Cities */}
      <section className="py-16">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Top 10 Steden</h2>
              <p className="text-sm text-muted-foreground">
                De grootste prop trading hubs van Nederland
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {priority1.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </div>
      </section>

      {/* Priority 2 - Cities 11-25 */}
      <section className="py-16 border-t border-border bg-card/30">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Middelgrote Steden</h2>
              <p className="text-sm text-muted-foreground">
                Groeiende trading communities
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {priority2.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </div>
      </section>

      {/* Priority 3 - Cities 26-50 */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Overige Steden</h2>
              <p className="text-sm text-muted-foreground">
                Lokale trading informatie
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {priority3.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border bg-gradient-to-b from-card/50 to-background">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start met prop trading in jouw stad
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Vergelijk de beste prop firms en word een funded trader, waar je ook woont in Nederland.
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
