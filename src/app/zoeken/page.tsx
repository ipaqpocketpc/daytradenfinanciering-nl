'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Search,
  ArrowRight,
  Building2,
  MapPin,
  Tag,
  Calculator,
  FileText,
  BookOpen,
  Layout,
  Filter,
  X,
} from 'lucide-react'
import {
  search,
  getTypeLabel,
  getTypeColor,
  SearchResult,
  SearchResultType,
} from '@/lib/search'

const typeIcons: Record<SearchResultType, typeof Search> = {
  firm: Building2,
  city: MapPin,
  niche: Tag,
  tool: Calculator,
  blog: FileText,
  glossary: BookOpen,
  page: Layout,
}

const allTypes: SearchResultType[] = ['firm', 'city', 'niche', 'tool', 'blog', 'glossary', 'page']

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchResult[]>([])
  const [activeFilters, setActiveFilters] = useState<SearchResultType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Search when query changes
  useEffect(() => {
    if (query.length >= 2) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        const searchResults = search(query, 50)
        setResults(searchResults)
        setIsLoading(false)
      }, 200)
      return () => clearTimeout(timer)
    } else {
      setResults([])
    }
  }, [query])

  // Update URL when query changes
  useEffect(() => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    const newUrl = query ? `/zoeken?${params.toString()}` : '/zoeken'
    router.replace(newUrl, { scroll: false })
  }, [query, router])

  // Filter results by type
  const filteredResults = activeFilters.length > 0
    ? results.filter(r => activeFilters.includes(r.type))
    : results

  // Group results by type for display
  const groupedResults = filteredResults.reduce((acc, result) => {
    if (!acc[result.type]) acc[result.type] = []
    acc[result.type].push(result)
    return acc
  }, {} as Record<SearchResultType, SearchResult[]>)

  const toggleFilter = (type: SearchResultType) => {
    setActiveFilters(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 pt-32 md:pt-52 pb-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Zoeken</h1>
          <p className="text-gray-400">
            Doorzoek prop firms, tools, artikelen en meer
          </p>
        </div>

        {/* Search Input */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek prop firms, tools, artikelen..."
              className="w-full pl-12 pr-12 py-4 bg-white rounded-2xl text-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        {results.length > 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400 mr-2">Filter:</span>
              {allTypes.map(type => {
                const count = results.filter(r => r.type === type).length
                if (count === 0) return null
                const isActive = activeFilters.includes(type)
                return (
                  <button
                    key={type}
                    onClick={() => toggleFilter(type)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {getTypeLabel(type)} ({count})
                  </button>
                )
              })}
              {activeFilters.length > 0 && (
                <button
                  onClick={() => setActiveFilters([])}
                  className="px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Wis filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          </div>
        )}

        {/* Results */}
        {!isLoading && filteredResults.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-400 mb-6">
              {filteredResults.length} resultaten voor &ldquo;{query}&rdquo;
            </p>

            <div className="space-y-8">
              {Object.entries(groupedResults).map(([type, typeResults]) => {
                const Icon = typeIcons[type as SearchResultType]
                return (
                  <div key={type}>
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                      <Icon className="h-5 w-5 text-blue-400" />
                      {getTypeLabel(type as SearchResultType)}
                      <span className="text-gray-500 font-normal">({typeResults.length})</span>
                    </h2>
                    <div className="space-y-3">
                      {typeResults.map((result, index) => (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={result.url}
                            className="block bg-white rounded-xl p-4 hover:shadow-lg transition-all group"
                          >
                            <div className="flex items-start gap-4">
                              <div className={`rounded-lg p-2.5 ${getTypeColor(result.type)}`}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                                    {result.title}
                                  </h3>
                                </div>
                                <p className="text-gray-600 text-sm line-clamp-2">
                                  {result.description}
                                </p>
                                <p className="text-gray-400 text-xs mt-2 truncate">
                                  {result.url}
                                </p>
                              </div>
                              <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* No Results */}
        {!isLoading && query.length >= 2 && filteredResults.length === 0 && (
          <div className="max-w-2xl mx-auto text-center py-16">
            <Search className="h-16 w-16 text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Geen resultaten gevonden
            </h2>
            <p className="text-gray-400 mb-8">
              We konden niets vinden voor &ldquo;{query}&rdquo;. Probeer een andere zoekterm.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/prop-firms"
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Bekijk Prop Firms
              </Link>
              <Link
                href="/tools"
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Bekijk Tools
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Lees Blog
              </Link>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && query.length < 2 && (
          <div className="max-w-2xl mx-auto text-center py-16">
            <Search className="h-16 w-16 text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Waar ben je naar op zoek?
            </h2>
            <p className="text-gray-400 mb-8">
              Typ minimaal 2 karakters om te beginnen met zoeken
            </p>
            <div className="grid sm:grid-cols-3 gap-4 max-w-lg mx-auto">
              <Link
                href="/prop-firms"
                className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <Building2 className="h-8 w-8 text-blue-400" />
                <span className="text-white font-medium">Prop Firms</span>
              </Link>
              <Link
                href="/tools"
                className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <Calculator className="h-8 w-8 text-green-400" />
                <span className="text-white font-medium">Tools</span>
              </Link>
              <Link
                href="/blog"
                className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <FileText className="h-8 w-8 text-purple-400" />
                <span className="text-white font-medium">Blog</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ZoekenPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
