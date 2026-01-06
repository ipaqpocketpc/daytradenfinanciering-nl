import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Script from "next/script"
import { Calendar, Clock, ArrowLeft, Tag, Share2, ChevronRight } from "lucide-react"
import { blogPosts, blogCategories, getPostBySlug, getRecentPosts, BlogPost } from "@/config/blog"
import { brand } from "@/config/brand"

type Props = {
  params: Promise<{ slug: string }>
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "Artikel niet gevonden",
    }
  }

  return {
    title: post.seoTitle || `${post.title} | ${brand.name}`,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
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

// Improved markdown to HTML converter with table support
function renderMarkdown(content: string): string {
  const lines = content.split('\n')
  const result: string[] = []
  let inList = false
  let listType: 'ul' | 'ol' | null = null
  let inParagraph = false
  let inTable = false
  let tableHeaders: string[] = []

  const closeList = () => {
    if (inList && listType) {
      result.push(`</${listType}>`)
      inList = false
      listType = null
    }
  }

  const closeParagraph = () => {
    if (inParagraph) {
      result.push('</p>')
      inParagraph = false
    }
  }

  const closeTable = () => {
    if (inTable) {
      result.push('</tbody></table></div>')
      inTable = false
      tableHeaders = []
    }
  }

  const processInline = (text: string): string => {
    return text
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
      // Italic (single *)
      .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
  }

  // Check if a line is a table row
  const isTableRow = (line: string): boolean => {
    return line.trim().startsWith('|') && line.trim().endsWith('|')
  }

  // Check if a line is a table separator (|---|---|)
  const isTableSeparator = (line: string): boolean => {
    return /^\|[\s\-:|]+\|$/.test(line.trim())
  }

  // Parse table cells from a row
  const parseTableCells = (line: string): string[] => {
    return line.trim().slice(1, -1).split('|').map(cell => cell.trim())
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()

    // Empty line
    if (trimmedLine === '') {
      closeList()
      closeParagraph()
      closeTable()
      continue
    }

    // Table handling
    if (isTableRow(trimmedLine)) {
      closeList()
      closeParagraph()

      // Check if next line is separator (this is header row)
      const nextLine = i + 1 < lines.length ? lines[i + 1].trim() : ''

      if (!inTable && isTableSeparator(nextLine)) {
        // Start table with header
        tableHeaders = parseTableCells(trimmedLine)
        result.push('<div class="overflow-x-auto my-6">')
        result.push('<table class="w-full border-collapse">')
        result.push('<thead><tr class="border-b border-border bg-card/50">')
        tableHeaders.forEach(header => {
          result.push(`<th class="px-4 py-3 text-left text-sm font-semibold text-white">${processInline(header)}</th>`)
        })
        result.push('</tr></thead><tbody>')
        inTable = true
        i++ // Skip the separator line
        continue
      } else if (inTable) {
        // Regular table row
        const cells = parseTableCells(trimmedLine)
        result.push('<tr class="border-b border-border/50 hover:bg-card/30 transition-colors">')
        cells.forEach((cell, index) => {
          result.push(`<td class="px-4 py-3 text-sm text-muted-foreground">${processInline(cell)}</td>`)
        })
        result.push('</tr>')
        continue
      }
    }

    // Close table if we're not on a table row anymore
    closeTable()

    // Headers
    if (trimmedLine.startsWith('### ')) {
      closeList()
      closeParagraph()
      result.push(`<h3 class="text-xl font-bold text-white mt-8 mb-4">${processInline(trimmedLine.slice(4))}</h3>`)
      continue
    }
    if (trimmedLine.startsWith('## ')) {
      closeList()
      closeParagraph()
      result.push(`<h2 class="text-2xl font-bold text-white mt-10 mb-4">${processInline(trimmedLine.slice(3))}</h2>`)
      continue
    }
    if (trimmedLine.startsWith('# ')) {
      closeList()
      closeParagraph()
      result.push(`<h1 class="text-3xl font-bold text-white mt-12 mb-6">${processInline(trimmedLine.slice(2))}</h1>`)
      continue
    }

    // Blockquote
    if (trimmedLine.startsWith('> ')) {
      closeList()
      closeParagraph()
      result.push(`<blockquote class="border-l-4 border-primary pl-4 my-6 text-muted-foreground italic">${processInline(trimmedLine.slice(2))}</blockquote>`)
      continue
    }

    // Unordered list
    if (trimmedLine.startsWith('- ')) {
      closeParagraph()
      if (!inList || listType !== 'ul') {
        closeList()
        result.push('<ul class="list-disc list-outside ml-6 mb-6 space-y-2 text-muted-foreground">')
        inList = true
        listType = 'ul'
      }
      result.push(`<li>${processInline(trimmedLine.slice(2))}</li>`)
      continue
    }

    // Ordered list
    const orderedMatch = trimmedLine.match(/^(\d+)\.\s+(.*)$/)
    if (orderedMatch) {
      closeParagraph()
      if (!inList || listType !== 'ol') {
        closeList()
        result.push('<ol class="list-decimal list-outside ml-6 mb-6 space-y-2 text-muted-foreground">')
        inList = true
        listType = 'ol'
      }
      result.push(`<li>${processInline(orderedMatch[2])}</li>`)
      continue
    }

    // Regular paragraph text
    closeList()
    if (!inParagraph) {
      result.push('<p class="mb-4 text-muted-foreground leading-relaxed">')
      inParagraph = true
    } else {
      result.push(' ')
    }
    result.push(processInline(trimmedLine))
  }

  // Close any open tags
  closeList()
  closeParagraph()
  closeTable()

  return result.join('\n')
}

function RelatedPost({ post }: { post: BlogPost }) {
  const categoryInfo = blogCategories[post.category]

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-all"
    >
      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium mb-2 ${categoryInfo.color}`}>
        {categoryInfo.name}
      </span>
      <h4 className="font-semibold text-white group-hover:text-primary transition-colors line-clamp-2">
        {post.title}
      </h4>
      <p className="text-xs text-muted-foreground mt-2">{formatDate(post.publishedAt)}</p>
    </Link>
  )
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const categoryInfo = blogCategories[post.category]
  const relatedPosts = getRecentPosts(4).filter((p) => p.slug !== post.slug).slice(0, 3)
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
            <Link
              href={`/blog/categorie/${post.category}`}
              className="hover:text-white transition-colors"
            >
              {categoryInfo.name}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Terug naar Blog
            </Link>

            {/* Header */}
            <header className="mb-10">
              {/* Category */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}>
                  {categoryInfo.name}
                </span>
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} min leestijd
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-muted-foreground mb-6">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {post.author.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-white">{post.author.name}</div>
                    <div className="text-sm text-muted-foreground">Auteur</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </div>
              </div>
            </header>

            {/* Content */}
            <div
              className="prose prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-border">
              <Tag className="w-4 h-4 text-muted-foreground" />
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground hover:text-white hover:bg-muted/80 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center justify-between py-8 border-b border-border">
              <div className="text-muted-foreground">
                Vond je dit artikel nuttig? Deel het met anderen!
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-white transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="my-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-card to-secondary/10 border border-border">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Klaar om te starten met daytraden?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Ontdek hoe je als funded trader aan de slag kunt met professioneel trading kapitaal.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/go/kapitaal"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-secondary to-secondary-dark text-white font-medium hover:opacity-90 transition-colors"
                  >
                    Start met Trading Kapitaal
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

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="max-w-4xl mx-auto mt-12">
              <h2 className="text-xl font-bold text-white mb-6">Gerelateerde Artikelen</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <RelatedPost key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Schema.org JSON-LD for Article */}
      <Script
        id="schema-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.coverImage || `${brand.url}/og-image.png`,
            "datePublished": post.publishedAt,
            "dateModified": post.updatedAt || post.publishedAt,
            "author": {
              "@type": "Person",
              "name": post.author.name,
            },
            "publisher": {
              "@type": "Organization",
              "name": brand.name,
              "url": brand.url,
              "logo": {
                "@type": "ImageObject",
                "url": `${brand.url}/logo.png`,
              },
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${brand.url}/blog/${post.slug}`,
            },
            "keywords": post.tags.join(", "),
            "articleSection": categoryInfo.name,
            "wordCount": post.content.split(/\s+/).length,
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
                "item": brand.url,
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": `${brand.url}/blog`,
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": categoryInfo.name,
                "item": `${brand.url}/blog/categorie/${post.category}`,
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": post.title,
                "item": `${brand.url}/blog/${post.slug}`,
              },
            ],
          }),
        }}
      />
    </>
  )
}
