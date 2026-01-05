// Search utility functions and types
import { firms } from '@/config/firms'
import { cities } from '@/config/cities'
import { niches } from '@/config/niches'
import { tools } from '@/config/tools'
import { blogPosts } from '@/config/blog'
import { glossaryTerms } from '@/config/glossary'

export type SearchResultType = 'firm' | 'city' | 'niche' | 'tool' | 'blog' | 'glossary' | 'page'

export interface SearchResult {
  id: string
  type: SearchResultType
  title: string
  description: string
  url: string
  icon?: string
  priority: number
}

// Static pages for search
const staticPages = [
  { title: 'Home', url: '/', description: 'Vergelijk prop trading firms' },
  { title: 'Vergelijk', url: '/vergelijk', description: 'Vergelijk alle prop firms naast elkaar' },
  { title: 'Quiz', url: '/quiz', description: 'Vind jouw ideale prop firm' },
  { title: 'Begrippen', url: '/begrippen', description: 'Trading begrippen en definities' },
  { title: 'Blog', url: '/blog', description: 'Nieuws en tips over prop trading' },
  { title: 'Ervaringen', url: '/ervaringen', description: 'Reviews en ervaringen van traders' },
  { title: 'Review Schrijven', url: '/ervaringen/schrijven', description: 'Deel jouw ervaring' },
  { title: 'Steden', url: '/steden', description: 'Prop trading per stad' },
  { title: 'Categorieën', url: '/categorie', description: 'Browse per categorie' },
  { title: 'Tools', url: '/tools', description: 'Gratis trading calculators' },
  { title: 'Over Ons', url: '/over-ons', description: 'Over Funded Trading Nederland' },
  { title: 'Contact', url: '/contact', description: 'Neem contact op' },
]

// Normalize string for search (lowercase, remove accents)
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

// Calculate match score
function calculateScore(query: string, text: string): number {
  const normalizedQuery = normalizeString(query)
  const normalizedText = normalizeString(text)

  // Exact match
  if (normalizedText === normalizedQuery) return 100

  // Starts with query
  if (normalizedText.startsWith(normalizedQuery)) return 90

  // Contains query as word
  if (normalizedText.includes(` ${normalizedQuery}`) || normalizedText.includes(`${normalizedQuery} `)) return 80

  // Contains query
  if (normalizedText.includes(normalizedQuery)) return 70

  // Fuzzy match - check if all query chars appear in order
  let queryIdx = 0
  for (const char of normalizedText) {
    if (char === normalizedQuery[queryIdx]) {
      queryIdx++
      if (queryIdx === normalizedQuery.length) return 50
    }
  }

  return 0
}

// Search all content
export function search(query: string, limit = 10): SearchResult[] {
  if (!query || query.length < 2) return []

  const results: SearchResult[] = []

  // Search firms
  firms.forEach(firm => {
    const titleScore = calculateScore(query, firm.name)
    const descScore = calculateScore(query, firm.description || '')
    const score = Math.max(titleScore, descScore * 0.8)

    if (score > 0) {
      results.push({
        id: `firm-${firm.id}`,
        type: 'firm',
        title: firm.name,
        description: `${firm.profitSplit} profit split • Vanaf ${firm.currency === 'EUR' ? '€' : '$'}${Math.min(...Object.values(firm.challengePrices))}`,
        url: `/prop-firms/${firm.slug}`,
        priority: score + (firm.isPartner ? 10 : 0),
      })
    }
  })

  // Search cities
  cities.forEach(city => {
    const score = calculateScore(query, city.name)

    if (score > 0) {
      results.push({
        id: `city-${city.slug}`,
        type: 'city',
        title: `Prop Trading ${city.name}`,
        description: `${city.province} • Priority ${city.priority}`,
        url: `/${city.slug}`,
        priority: score - 5,
      })
    }
  })

  // Search niches
  niches.forEach(niche => {
    const titleScore = calculateScore(query, niche.name)
    const keywordScore = niche.seoKeywords?.some(k => calculateScore(query, k) > 50) ? 60 : 0
    const score = Math.max(titleScore, keywordScore)

    if (score > 0) {
      results.push({
        id: `niche-${niche.slug}`,
        type: 'niche',
        title: niche.name,
        description: niche.shortDescription || niche.description.slice(0, 100),
        url: `/categorie/${niche.slug}`,
        priority: score - 10,
      })
    }
  })

  // Search tools
  tools.forEach(tool => {
    const titleScore = calculateScore(query, tool.name)
    const descScore = calculateScore(query, tool.description)
    const score = Math.max(titleScore, descScore * 0.8)

    if (score > 0) {
      results.push({
        id: `tool-${tool.slug}`,
        type: 'tool',
        title: tool.name,
        description: tool.shortDescription || tool.description.slice(0, 100),
        url: `/tools/${tool.slug}`,
        priority: score,
      })
    }
  })

  // Search blog posts
  blogPosts.forEach(post => {
    const titleScore = calculateScore(query, post.title)
    const excerptScore = calculateScore(query, post.excerpt)
    const tagScore = post.tags.some(t => calculateScore(query, t) > 50) ? 60 : 0
    const score = Math.max(titleScore, excerptScore * 0.7, tagScore)

    if (score > 0) {
      results.push({
        id: `blog-${post.slug}`,
        type: 'blog',
        title: post.title,
        description: post.excerpt,
        url: `/blog/${post.slug}`,
        priority: score - 5,
      })
    }
  })

  // Search glossary
  glossaryTerms.forEach(term => {
    const termScore = calculateScore(query, term.term)
    const defScore = calculateScore(query, term.shortDefinition)
    const score = Math.max(termScore, defScore * 0.6)

    if (score > 0) {
      results.push({
        id: `glossary-${term.slug}`,
        type: 'glossary',
        title: term.term,
        description: term.shortDefinition,
        url: `/begrippen#${term.slug}`,
        priority: score - 15,
      })
    }
  })

  // Search static pages
  staticPages.forEach(page => {
    const titleScore = calculateScore(query, page.title)
    const descScore = calculateScore(query, page.description)
    const score = Math.max(titleScore, descScore * 0.6)

    if (score > 0) {
      results.push({
        id: `page-${page.url}`,
        type: 'page',
        title: page.title,
        description: page.description,
        url: page.url,
        priority: score - 20,
      })
    }
  })

  // Sort by priority and limit
  return results
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit)
}

// Get popular searches
export function getPopularSearches(): string[] {
  return [
    'FTMO',
    'Apex',
    'Scalping',
    'Position size calculator',
    'Amsterdam',
    'Beginners',
  ]
}

// Get type label
export function getTypeLabel(type: SearchResultType): string {
  switch (type) {
    case 'firm': return 'Prop Firm'
    case 'city': return 'Stad'
    case 'niche': return 'Categorie'
    case 'tool': return 'Tool'
    case 'blog': return 'Blog'
    case 'glossary': return 'Begrip'
    case 'page': return 'Pagina'
    default: return ''
  }
}

// Get type color
export function getTypeColor(type: SearchResultType): string {
  switch (type) {
    case 'firm': return 'bg-blue-100 text-blue-700'
    case 'city': return 'bg-green-100 text-green-700'
    case 'niche': return 'bg-purple-100 text-purple-700'
    case 'tool': return 'bg-amber-100 text-amber-700'
    case 'blog': return 'bg-pink-100 text-pink-700'
    case 'glossary': return 'bg-slate-100 text-slate-700'
    case 'page': return 'bg-gray-100 text-gray-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}
