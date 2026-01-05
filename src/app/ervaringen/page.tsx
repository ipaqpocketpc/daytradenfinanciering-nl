import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import {
  Star,
  Quote,
  CheckCircle2,
  Users,
  TrendingUp,
  PenLine,
  ArrowRight,
  BadgeCheck,
  ThumbsUp,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui"
import {
  siteReviewStats,
  featuredReviews,
  getRatingPercentage,
  getTopReviews,
} from "@/config/reviews"

export const metadata: Metadata = {
  title: `Ervaringen & Reviews | ${siteReviewStats.totalReviews.toLocaleString("nl-NL")} Beoordelingen | Funded Trading Nederland`,
  description: `Lees ${siteReviewStats.totalReviews.toLocaleString("nl-NL")} ervaringen van traders over Funded Trading Nederland. Gemiddelde score: ${siteReviewStats.averageRating}/5 sterren. Eerlijke reviews over prop firms.`,
}

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < rating ? "text-accent fill-accent" : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  )
}

function RatingBar({ rating, percentage }: { rating: number; percentage: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground w-12">{rating} ster</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-muted-foreground w-12 text-right">{percentage}%</span>
    </div>
  )
}

function ReviewCard({ review }: { review: typeof featuredReviews[0] }) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-semibold">
              {review.author.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{review.author}</span>
              {review.verified && (
                <BadgeCheck className="w-4 h-4 text-secondary" />
              )}
            </div>
            {review.authorLocation && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {review.authorLocation}
              </div>
            )}
          </div>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>

      <h3 className="font-semibold text-white mb-2">{review.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {review.content}
      </p>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {new Date(review.publishedAt).toLocaleDateString("nl-NL", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <div className="flex items-center gap-1 text-muted-foreground">
          <ThumbsUp className="w-4 h-4" />
          <span>{review.helpful} vonden dit nuttig</span>
        </div>
      </div>
    </div>
  )
}

export default function ErvaringenPage() {
  const topReviews = getTopReviews(12)

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 md:pt-52 pb-20 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container-wide relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 mb-6">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-sm font-medium text-accent">
                {siteReviewStats.averageRating} Gemiddelde Score
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-primary">{siteReviewStats.totalReviews.toLocaleString("nl-NL")}</span> Ervaringen
              <br />van Nederlandse Traders
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Lees wat andere traders zeggen over Funded Trading Nederland.
              Eerlijke reviews en ervaringen van onze community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/ervaringen/schrijven">
                  <PenLine className="w-5 h-5 mr-2" />
                  Schrijf een Review
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/prop-firms">Bekijk Prop Firms</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Rating Overview */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                <span className="text-6xl font-bold text-white">{siteReviewStats.averageRating}</span>
                <div>
                  <StarRating rating={5} size="lg" />
                  <p className="text-muted-foreground mt-1">
                    {siteReviewStats.totalReviews.toLocaleString("nl-NL")} reviews
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Gebaseerd op ervaringen van traders uit heel Nederland
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <RatingBar
                  key={rating}
                  rating={rating}
                  percentage={getRatingPercentage(rating)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-b border-border">
        <div className="container-wide">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="font-semibold text-white">Geverifieerde Reviews</p>
                <p className="text-sm text-muted-foreground">Van echte traders</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-white">2.300+ Traders</p>
                <p className="text-sm text-muted-foreground">In onze community</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-white">Objectieve Info</p>
                <p className="text-sm text-muted-foreground">Eerlijk & transparant</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="py-16">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Wat Traders Zeggen
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Lees ervaringen van traders die Funded Trading Nederland hebben gebruikt
              om de beste prop firm te vinden.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-border">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Quote className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Deel Jouw Ervaring
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Heb je ervaring met prop trading of onze website? Help andere traders
              door je ervaring te delen. Jouw review kan anderen helpen bij hun keuze.
            </p>
            <Button asChild size="lg">
              <Link href="/ervaringen/schrijven">
                Schrijf een Review
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <Script
        id="schema-organization-reviews"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Funded Trading Nederland",
            "alternateName": "FundedTrading.nl",
            "url": "https://fundedtrading.nl",
            "logo": "https://fundedtrading.nl/logo.png",
            "description": "De #1 vergelijkingssite voor prop trading firms in Nederland",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": siteReviewStats.averageRating,
              "reviewCount": siteReviewStats.totalReviews,
              "bestRating": 5,
              "worstRating": 1,
            },
            "review": topReviews.slice(0, 10).map((review) => ({
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": review.author,
              },
              "datePublished": review.publishedAt,
              "reviewBody": review.content,
              "name": review.title,
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating,
                "bestRating": 5,
                "worstRating": 1,
              },
            })),
          }),
        }}
      />

      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://fundedtrading.nl",
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Ervaringen",
                "item": "https://fundedtrading.nl/ervaringen",
              },
            ],
          }),
        }}
      />
    </>
  )
}
