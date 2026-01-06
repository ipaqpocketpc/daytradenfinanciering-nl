import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Script from "next/script"
import {
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Target,
  TrendingUp,
  Wallet,
  BookOpen,
  Clock,
  Shield,
  Zap,
  XCircle,
  BarChart3,
  Calendar,
  DollarSign,
  Award,
  Brain,
  LineChart,
  AlertCircle,
  RefreshCw,
  Percent,
  Users,
  Timer,
  FileText,
} from "lucide-react"
import { Button, Badge } from "@/components/ui"
import { brand, getCategoryBySlug, getAllCategorySlugs } from "@/config"
import { getCurrentMonthDutch, getCurrentYear, getCurrentDateISO } from "@/lib/utils"

// Content imports
import { ChallengeTipsContent } from "./content/challenge-tips"
import { KapitaalOpschalenContent } from "./content/kapitaal-opschalen"
import { UitbetalingenContent } from "./content/uitbetalingen"
import { VeelgemaakteFoutenContent } from "./content/veelgemaakte-fouten"
import { FTMORegelsContent } from "./content/ftmo-regels"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    return { title: "Niet gevonden" }
  }

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: {
      canonical: `/categorie/${slug}`,
    },
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url: `${brand.url}/categorie/${slug}`,
      type: "article",
    },
  }
}

const iconMap: Record<string, React.ElementType> = {
  Target,
  TrendingUp,
  Wallet,
  AlertTriangle,
  BookOpen,
}

const contentMap: Record<string, React.ComponentType> = {
  "challenge-tips": ChallengeTipsContent,
  "kapitaal-opschalen": KapitaalOpschalenContent,
  uitbetalingen: UitbetalingenContent,
  "veelgemaakte-fouten": VeelgemaakteFoutenContent,
  "ftmo-regels": FTMORegelsContent,
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const Icon = iconMap[category.icon] || Target
  const ContentComponent = contentMap[slug]

  if (!ContentComponent) {
    notFound()
  }

  const colorClasses = {
    primary: {
      badge: "bg-primary/10 text-primary border-primary/20",
      icon: "bg-primary/10 text-primary",
      gradient: "from-primary to-primary-dark",
    },
    secondary: {
      badge: "bg-secondary/10 text-secondary border-secondary/20",
      icon: "bg-secondary/10 text-secondary",
      gradient: "from-secondary to-secondary-dark",
    },
    accent: {
      badge: "bg-accent/10 text-accent border-accent/20",
      icon: "bg-accent/10 text-accent",
      gradient: "from-accent to-amber-600",
    },
  }

  const colors = colorClasses[category.color]

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[150px]" />

        <div className="relative container-wide">
          <div className="max-w-3xl">
            <Badge className={`mb-6 px-4 py-1.5 ${colors.badge}`}>
              Pillar Guide
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {category.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {category.description}
            </p>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>12 min leestijd</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Bijgewerkt: {getCurrentMonthDutch()} {getCurrentYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <ContentComponent />

      {/* CTA */}
      <section className="relative py-24 overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />

        <div className="relative container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Klaar om te Beginnen?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Je hebt nu alle kennis. De volgende stap is actie nemen. Start
            vandaag nog met je challenge en krijg toegang tot trading kapitaal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-glow-green btn-glow text-base px-8 h-14"
            >
              <Link href="/go/kapitaal" className="flex items-center gap-2">
                Start Je Challenge
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border hover:border-primary/50 text-white text-base px-8 h-14"
            >
              <Link href="/hoe-werkt-het">Meer Informatie</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <Script
        id="schema-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: category.metaTitle,
            description: category.metaDescription,
            author: {
              "@type": "Organization",
              name: brand.name,
            },
            publisher: {
              "@type": "Organization",
              name: brand.name,
              url: brand.url,
            },
            datePublished: `${getCurrentYear()}-01-01`,
            dateModified: getCurrentDateISO(),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${brand.url}/categorie/${slug}`,
            },
          }),
        }}
      />
    </>
  )
}
