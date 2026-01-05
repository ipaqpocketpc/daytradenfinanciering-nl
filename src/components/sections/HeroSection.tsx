import Link from "next/link"
import { Button } from "@/components/ui"
import { ArrowRight, Shield, Award, Users, TrendingUp } from "lucide-react"

interface HeroSectionProps {
  title: string
  highlightedWord?: string
  subtitle: string
  primaryCta?: {
    label: string
    href: string
  }
  secondaryCta?: {
    label: string
    href: string
  }
  badge?: string
}

export function HeroSection({
  title,
  highlightedWord = "Funded",
  subtitle,
  primaryCta,
  secondaryCta,
  badge,
}: HeroSectionProps) {
  // Split title to highlight specific word
  // Only split if the highlightedWord is actually in the title
  const wordInTitle = title.includes(highlightedWord)
  const titleParts = wordInTitle ? title.split(highlightedWord) : [title, ""]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-52">
      {/* Background layers */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute inset-0 bg-grid-small opacity-30" />

      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[100px] animate-pulse-glow delay-500" />
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px] animate-pulse-glow delay-300" />

      {/* Content */}
      <div className="relative container-wide py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8 animate-fade-down">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">{badge}</span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-8 animate-fade-up">
            {titleParts[0]}
            {wordInTitle && (
              <span className="gradient-text-accent">{highlightedWord}</span>
            )}
            {titleParts[1]}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-up delay-100">
            {subtitle}
          </p>

          {/* CTAs */}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-up delay-200">
              {primaryCta && (
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary text-white shadow-glow-green btn-glow text-base px-8 h-14"
                >
                  <Link href={primaryCta.href} className="flex items-center gap-2">
                    {primaryCta.label}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              )}
              {secondaryCta && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-border hover:border-primary/50 hover:bg-white/5 text-white text-base px-8 h-14"
                >
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              )}
            </div>
          )}

          {/* Trust indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-up delay-300">
            {[
              { icon: Shield, value: "100%", label: "Onafhankelijk" },
              { icon: Award, value: "20+", label: "Prop Firms" },
              { icon: Users, value: "12.500+", label: "NL Traders" },
              { icon: TrendingUp, value: "€50M+", label: "Funded Capital" },
            ].map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:bg-card/50 transition-all duration-300"
              >
                <stat.icon className="w-5 h-5 text-primary mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-white stat-value">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Decorative lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
