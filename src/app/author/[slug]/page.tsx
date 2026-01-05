import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Script from "next/script"
import { ChevronRight, Calendar, Clock, FileText, Award, TrendingUp } from "lucide-react"
import { authors, getAuthorBySlug, Author } from "@/config/authors"
import { blogPosts, blogCategories, BlogPost } from "@/config/blog"

type Props = {
  params: Promise<{ slug: string }>
}

// Generate static params for all authors
export async function generateStaticParams() {
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

// Generate metadata for each author
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const author = getAuthorBySlug(slug)

  if (!author) {
    return {
      title: "Auteur niet gevonden",
    }
  }

  return {
    title: `${author.name} - Auteur | Funded Trading Nederland`,
    description: `Artikelen geschreven door ${author.name}. ${author.bio.slice(0, 150)}...`,
    openGraph: {
      title: `${author.name} - Auteur`,
      description: author.bio,
      type: "profile",
    },
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

// Get posts by author name
function getPostsByAuthor(authorName: string): BlogPost[] {
  return blogPosts.filter(
    (post) => post.author.name.toLowerCase() === authorName.toLowerCase()
  )
}

function ArticleCard({ post }: { post: BlogPost }) {
  const categoryInfo = blogCategories[post.category]

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}>
          {categoryInfo.name}
        </span>
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <Clock className="w-4 h-4" />
          {post.readingTime} min
        </div>
      </div>
      <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors mb-2">
        {post.title}
      </h3>
      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
        {post.excerpt}
      </p>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="w-4 h-4" />
        {formatDate(post.publishedAt)}
      </div>
    </Link>
  )
}

function StatCard({ icon: Icon, value, label }: { icon: typeof FileText; value: string | number; label: string }) {
  return (
    <div className="p-4 rounded-xl bg-card border border-border text-center">
      <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params
  const author = getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const authorPosts = getPostsByAuthor(author.name)
  const currentYear = new Date().getFullYear()

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card/50 pt-32 md:pt-52">
        <div className="container-wide py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Auteur</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{author.name}</span>
          </nav>
        </div>
      </div>

      {/* Author Profile Section */}
      <section className="py-12 border-b border-border">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
                <span className="text-5xl font-bold text-white">
                  {author.name.charAt(0)}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {author.name}
                  </h1>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                    {author.role}
                  </span>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  {author.bio}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {author.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                {author.socialLinks && (
                  <div className="flex gap-3">
                    {author.socialLinks.twitter && (
                      <a
                        href={author.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-white hover:border-primary/30 transition-colors text-sm"
                      >
                        Twitter/X
                      </a>
                    )}
                    {author.socialLinks.linkedin && (
                      <a
                        href={author.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-white hover:border-primary/30 transition-colors text-sm"
                      >
                        LinkedIn
                      </a>
                    )}
                    {author.socialLinks.website && (
                      <a
                        href={author.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-white hover:border-primary/30 transition-colors text-sm"
                      >
                        Website
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <StatCard
                icon={FileText}
                value={author.stats.articlesWritten}
                label="Artikelen"
              />
              <StatCard
                icon={Award}
                value={`${author.stats.yearsExperience}+`}
                label="Jaar Ervaring"
              />
              <StatCard
                icon={TrendingUp}
                value={author.stats.tradingSpecialty}
                label="Specialisatie"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-12">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">
              Artikelen van {author.name}
            </h2>

            {authorPosts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {authorPosts.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 rounded-xl bg-card border border-border">
                <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Nog geen artikelen gepubliceerd.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 border-t border-border">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-card to-secondary/10 border border-border text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Meer leren over prop trading?
              </h3>
              <p className="text-muted-foreground mb-6">
                Bekijk onze uitgebreide artikelen en vergelijk de beste prop trading firms.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                  Alle Artikelen
                </Link>
                <Link
                  href="/prop-firms"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-card border border-border text-white font-medium hover:border-primary/30 transition-colors"
                >
                  Prop Firms Vergelijken
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD for Person */}
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": author.name,
            "jobTitle": author.role,
            "description": author.bio,
            "url": `https://fundedtrading.nl/author/${author.slug}`,
            "worksFor": {
              "@type": "Organization",
              "name": "Funded Trading Nederland",
              "url": "https://fundedtrading.nl",
            },
            "knowsAbout": author.expertise,
            ...(author.socialLinks?.twitter && {
              "sameAs": [
                author.socialLinks.twitter,
                author.socialLinks.linkedin,
                author.socialLinks.website,
              ].filter(Boolean),
            }),
          }),
        }}
      />

      {/* BreadcrumbList Schema */}
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
                "name": "Blog",
                "item": "https://fundedtrading.nl/blog",
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Auteur",
                "item": "https://fundedtrading.nl/author",
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": author.name,
                "item": `https://fundedtrading.nl/author/${author.slug}`,
              },
            ],
          }),
        }}
      />
    </>
  )
}
