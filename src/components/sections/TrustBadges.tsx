import { Shield, BarChart3, Award, Lock } from "lucide-react"

const badges = [
  {
    icon: Shield,
    title: "100% Onafhankelijk",
    description: "Objectieve, eerlijke reviews",
  },
  {
    icon: BarChart3,
    title: "Live Data",
    description: "Real-time prijzen & voorwaarden",
  },
  {
    icon: Award,
    title: "Expert Reviews",
    description: "Door ervaren traders",
  },
  {
    icon: Lock,
    title: "Veilig & Betrouwbaar",
    description: "Geverifieerde informatie",
  },
]

export function TrustBadges() {
  return (
    <section className="py-16 border-b border-border">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="group flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <badge.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">
                  {badge.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
