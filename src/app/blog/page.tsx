import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { Calendar, Clock, ArrowRight, Tag, TrendingUp } from "lucide-react"
import { blogPosts, blogCategories, getFeaturedPosts, getRecentPosts, BlogPost, BlogCategory } from "@/config/blog"
import { brand } from "@/config/brand"
import { HeroSection } from "@/components/sections/HeroSection"

const currentYear = new Date().getFullYear()

export const metadata: Metadata = {
  title: `Funded Trading Blog | Nieuws, Tips & Analyses ${currentYear}`,
  description: "Het laatste nieuws over funded trading, praktische tips en analyses. Alles wat je moet weten over trading kapitaal krijgen.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Funded Trading Blog | Nieuws, Tips & Analyses ${currentYear}`,
    description: "Het laatste nieuws over funded trading, praktische tips en analyses.",
    url: `${brand.url}/blog`,
  },
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function FeaturedPost({ post }: { post: BlogPost }) {
  const categoryInfo = blogCategories[post.category]

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card-elevated to-card hover:border-primary/30 transition-all duration-300"
    >
      {/* Cover Image Placeholder */}
      <div className="aspect-[21/9] bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex items-center justify-center">
        <TrendingUp className="w-16 h-16 text-primary/40" />
      </div>

      <div className="p-6 lg:p-8">
        {/* Category & Reading Time */}
        <div className="flex items-center gap-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}>
            {categoryInfo.name}
          </span>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <Clock className="w-4 h-4" />
            {post.readingTime} min
          </div>
        </div>

        {/* Title & Excerpt */}
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
          {post.title}
        </h2>
        <p className="text-muted-foreground mb-4 line-clamp-2 lg:line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {formatDate(post.publishedAt)}
          </div>
          <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
            Lees meer
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function PostCard({ post }: { post: BlogPost }) {
  const categoryInfo = blogCategories[post.category]

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col h-full rounded-xl border border-border bg-card hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover Image Placeholder */}
      <div className="aspect-video bg-gradient-to-br from-muted to-card rounded-t-xl flex items-center justify-center">
        <TrendingUp className="w-10 h-10 text-muted-foreground/30" />
      </div>

      <div className="flex flex-col flex-1 p-5">
        {/* Category & Reading Time */}
        <div className="flex items-center gap-3 mb-3">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${categoryInfo.color}`}>
            {categoryInfo.name}
          </span>
          <span className="text-xs text-muted-foreground">{post.readingTime} min</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground">
            {formatDate(post.publishedAt)}
          </span>
          <span className="text-sm text-primary font-medium group-hover:underline">
            Lezen →
          </span>
        </div>
      </div>
    </Link>
  )
}

function CategoryFilter() {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium"
      >
        Alle
      </Link>
      {(Object.entries(blogCategories) as [BlogCategory, typeof blogCategories[BlogCategory]][]).map(
        ([key, category]) => (
          <Link
            key={key}
            href={`/blog/categorie/${key}`}
            className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium text-muted-foreground hover:border-primary/30 hover:text-white transition-all"
          >
            {category.name}
          </Link>
        )
      )}
    </div>
  )
}

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts()
  const recentPosts = getRecentPosts(10)

  // Get non-featured posts for the grid
  const gridPosts = recentPosts.filter((post) => !featuredPosts.includes(post))

  return (
    <>
      <HeroSection
        title="Funded Trading Blog"
        highlightedWord="Blog"
        subtitle={`Het laatste nieuws, tips en analyses over funded trading. Blijf op de hoogte van de industrie en verbeter je trading.`}
        badge={`${blogPosts.length} Artikelen`}
      />

      {/* Stats Bar */}
      <section className="border-b border-border bg-card/50">
        <div className="container-wide py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{blogPosts.length}</div>
              <div className="text-sm text-muted-foreground">Artikelen</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-1">
                {Object.keys(blogCategories).length}
              </div>
              <div className="text-sm text-muted-foreground">Categorieën</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">Wekelijks</div>
              <div className="text-sm text-muted-foreground">Updates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">Expert</div>
              <div className="text-sm text-muted-foreground">Analyses</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-wide">
          {/* Category Filter */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-4">Categorieën</h2>
            <CategoryFilter />
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Uitgelicht</h2>
                  <p className="text-sm text-muted-foreground">Onze beste artikelen</p>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {featuredPosts.slice(0, 2).map((post) => (
                  <FeaturedPost key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {/* All Posts Grid */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Tag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Recente Artikelen</h2>
                <p className="text-sm text-muted-foreground">Het laatste nieuws en tips</p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-card to-secondary/10 border border-border">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-3">
                Blijf op de hoogte
              </h3>
              <p className="text-muted-foreground mb-6">
                Ontvang het laatste nieuws over funded trading, nieuwe artikelen en exclusieve tips direct in je inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/go/kapitaal"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                  Begin Direct
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/hoe-werkt-het"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-card border border-border text-white font-medium hover:border-primary/30 transition-colors"
                >
                  Hoe Werkt Het?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD for Blog */}
      <Script
        id="schema-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Daytraden Financiering Blog",
            "description": "Het laatste nieuws over funded trading, tips en analyses.",
            "url": "https://daytradenfinanciering.nl/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Daytraden Financiering",
              "url": "https://daytradenfinanciering.nl",
            },
            "blogPost": recentPosts.slice(0, 10).map((post) => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "url": `https://daytradenfinanciering.nl/blog/${post.slug}`,
              "datePublished": post.publishedAt,
              "dateModified": post.updatedAt || post.publishedAt,
              "author": {
                "@type": "Person",
                "name": post.author.name,
              },
              "publisher": {
                "@type": "Organization",
                "name": "Daytraden Financiering",
              },
            })),
          }),
        }}
      />
    </>
  )
}
