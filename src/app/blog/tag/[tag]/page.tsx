import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Script from "next/script"
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, TrendingUp } from "lucide-react"
import { blogPosts, blogCategories, getPostsByTag, getAllTags, BlogPost } from "@/config/blog"
import { brand } from "@/config/brand"

type Props = {
  params: Promise<{ tag: string }>
}

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

// Generate metadata for each tag page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)

  if (posts.length === 0) {
    return {
      title: "Tag niet gevonden",
    }
  }

  return {
    title: `Artikelen over ${decodedTag} | Funded Trading Blog`,
    description: `Alle blog artikelen over ${decodedTag}. Tips, nieuws en analyses over funded trading.`,
    alternates: {
      canonical: `/blog/tag/${tag}`,
    },
    openGraph: {
      title: `Artikelen over ${decodedTag} | Funded Trading Blog`,
      description: `Alle blog artikelen over ${decodedTag}. Tips, nieuws en analyses over funded trading.`,
      url: `${brand.url}/blog/tag/${tag}`,
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

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)

  if (posts.length === 0) {
    notFound()
  }

  // Sort posts by date
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <>
      {/* Header */}
      <section className="border-b border-border bg-gradient-to-b from-card to-background pt-32 md:pt-52">
        <div className="container-wide py-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar Blog
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <Tag className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tag</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white capitalize">
                {decodedTag}
              </h1>
            </div>
          </div>

          <p className="text-muted-foreground max-w-2xl">
            {sortedPosts.length} artikel{sortedPosts.length !== 1 ? "en" : ""} gevonden met de tag &quot;{decodedTag}&quot;.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12">
        <div className="container-wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-card to-secondary/10 border border-border">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-3">
                Meer ontdekken?
              </h3>
              <p className="text-muted-foreground mb-6">
                Bekijk al onze artikelen of start direct met funded trading.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-card border border-border text-white font-medium hover:border-primary/30 transition-colors"
                >
                  Alle Artikelen
                </Link>
                <Link
                  href="/go/kapitaal"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                  Start met Trading
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD */}
      <Script
        id="schema-tag"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `Artikelen over ${decodedTag}`,
            "description": `Alle blog artikelen over ${decodedTag}`,
            "url": `${brand.url}/blog/tag/${encodeURIComponent(decodedTag)}`,
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": sortedPosts.map((post, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "BlogPosting",
                  "headline": post.title,
                  "url": `${brand.url}/blog/${post.slug}`,
                },
              })),
            },
          }),
        }}
      />
    </>
  )
}
