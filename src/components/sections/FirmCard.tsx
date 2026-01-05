import Link from "next/link"
import { Star, ArrowRight, Crown, Percent, Clock, TrendingUp, ExternalLink } from "lucide-react"
import { Button, Badge } from "@/components/ui"
import { PropFirm } from "@/config"
import { formatCurrency } from "@/lib/utils"

interface FirmCardProps {
  firm: PropFirm
  featured?: boolean
}

export function FirmCard({ firm, featured = false }: FirmCardProps) {
  const lowestPrice = Math.min(...Object.values(firm.challengePrices))

  return (
    <div
      className={`
        group relative flex flex-col rounded-xl overflow-hidden
        transition-all duration-500 hover:-translate-y-2
        ${featured
          ? "bg-gradient-to-b from-card-elevated to-card border-2 border-secondary/30 shadow-glow-green"
          : "bg-card border border-border hover:border-primary/30"
        }
      `}
    >
      {/* Featured glow effect */}
      {featured && (
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent pointer-events-none" />
      )}

      {/* Top accent line */}
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary via-secondary-light to-secondary" />
      )}

      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-secondary/20 text-secondary border-secondary/30 gap-1.5">
            <Crown className="w-3 h-3" />
            Aanbevolen
          </Badge>
        </div>
      )}

      <div className="relative flex-1 flex flex-col p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          {/* Logo placeholder */}
          <div className="w-14 h-14 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0">
            <span className="font-bold text-xs text-muted-foreground text-center leading-tight">
              {firm.name.split(" ")[0]}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white truncate">{firm.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(firm.rating)
                        ? "text-accent fill-accent"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {firm.rating} ({firm.reviewCount.toLocaleString("nl-NL")}+)
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-muted/50 border border-border/50 group-hover:border-primary/20 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <Percent className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-muted-foreground">Profit Split</span>
            </div>
            <div className="text-lg font-bold text-white">{firm.profitSplit}</div>
          </div>

          <div className="p-3 rounded-lg bg-muted/50 border border-border/50 group-hover:border-secondary/20 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-secondary" />
              <span className="text-xs text-muted-foreground">Vanaf</span>
            </div>
            <div className="text-lg font-bold text-white">
              {formatCurrency(lowestPrice, firm.currency)}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-muted/50 border border-border/50 group-hover:border-accent/20 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs text-muted-foreground">Payout</span>
            </div>
            <div className="text-lg font-bold text-white">{firm.payoutFrequency}</div>
          </div>

          <div className="p-3 rounded-lg bg-muted/50 border border-border/50 group-hover:border-primary/20 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-muted-foreground">Max Scaling</span>
            </div>
            <div className="text-lg font-bold text-white">
              {firm.maxScaling
                ? formatCurrency(firm.maxScaling, firm.currency)
                : "N/A"}
            </div>
          </div>
        </div>


        {/* CTA Buttons */}
        <div className="flex gap-3 mt-auto">
          <Button
            asChild
            variant="outline"
            className="flex-1 border-border hover:border-primary/50 hover:bg-white/5 text-white group/btn"
          >
            <Link href={`/prop-firms/${firm.slug}`} className="flex items-center justify-center gap-2">
              Bekijk Review
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
          {firm.isPartner && firm.affiliateUrl && (
            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-glow-green"
            >
              <Link
                href={`/go/${firm.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Start Nu
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
