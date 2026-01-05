'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  X,
  ArrowRight,
  Clock,
  TrendingUp,
  Building2,
  MapPin,
  Tag,
  Calculator,
  FileText,
  BookOpen,
  Layout,
  Command,
} from 'lucide-react'
import {
  search,
  getPopularSearches,
  getTypeLabel,
  getTypeColor,
  SearchResult,
  SearchResultType,
} from '@/lib/search'

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
}

// Get icon for result type
function getTypeIcon(type: SearchResultType) {
  switch (type) {
    case 'firm': return Building2
    case 'city': return MapPin
    case 'niche': return Tag
    case 'tool': return Calculator
    case 'blog': return FileText
    case 'glossary': return BookOpen
    case 'page': return Layout
    default: return Search
  }
}

// Recent searches storage
const RECENT_SEARCHES_KEY = 'fundedtrading_recent_searches'
const MAX_RECENT_SEARCHES = 5

function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function addRecentSearch(query: string): void {
  if (typeof window === 'undefined' || !query.trim()) return
  try {
    const recent = getRecentSearches().filter(s => s !== query)
    recent.unshift(query)
    localStorage.setItem(
      RECENT_SEARCHES_KEY,
      JSON.stringify(recent.slice(0, MAX_RECENT_SEARCHES))
    )
  } catch {
    // Ignore storage errors
  }
}

function clearRecentSearches(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  } catch {
    // Ignore
  }
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Load recent searches
  useEffect(() => {
    if (isOpen) {
      setRecentSearches(getRecentSearches())
      // Focus input after dialog opens
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Search on query change
  useEffect(() => {
    if (query.length >= 2) {
      setIsLoading(true)
      // Debounce search
      const timer = setTimeout(() => {
        const searchResults = search(query, 8)
        setResults(searchResults)
        setSelectedIndex(-1)
        setIsLoading(false)
      }, 150)
      return () => clearTimeout(timer)
    } else {
      setResults([])
      setSelectedIndex(-1)
    }
  }, [query])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const itemCount = results.length

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev < itemCount - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : itemCount - 1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          navigateToResult(results[selectedIndex])
        } else if (query.trim()) {
          // Navigate to search page with query
          addRecentSearch(query.trim())
          router.push(`/zoeken?q=${encodeURIComponent(query.trim())}`)
          onClose()
        }
        break
      case 'Escape':
        e.preventDefault()
        onClose()
        break
    }
  }, [results, selectedIndex, query, router, onClose])

  // Navigate to result
  const navigateToResult = (result: SearchResult) => {
    addRecentSearch(query.trim() || result.title)
    router.push(result.url)
    onClose()
    setQuery('')
  }

  // Handle recent search click
  const handleRecentSearchClick = (term: string) => {
    setQuery(term)
  }

  // Handle popular search click
  const handlePopularSearchClick = (term: string) => {
    setQuery(term)
  }

  // Clear recent searches
  const handleClearRecent = () => {
    clearRecentSearches()
    setRecentSearches([])
  }

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  const popularSearches = getPopularSearches()
  const showSuggestions = query.length < 2 && (recentSearches.length > 0 || popularSearches.length > 0)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="mx-auto mt-[10vh] max-w-2xl px-4"
        >
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Search Input */}
            <div className="flex items-center gap-3 border-b px-4 py-3">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Zoek prop firms, tools, artikelen..."
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-gray-400"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              <div className="flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-xs text-gray-400">
                <span>ESC</span>
              </div>
            </div>

            {/* Content */}
            <div className="max-h-[60vh] overflow-y-auto">
              {/* Loading state */}
              {isLoading && (
                <div className="flex items-center justify-center py-8">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                </div>
              )}

              {/* Results */}
              {!isLoading && results.length > 0 && (
                <div className="py-2">
                  {results.map((result, index) => {
                    const Icon = getTypeIcon(result.type)
                    const isSelected = index === selectedIndex

                    return (
                      <button
                        key={result.id}
                        onClick={() => navigateToResult(result)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                          isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`rounded-lg p-2 ${getTypeColor(result.type)}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 truncate">
                              {result.title}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(result.type)}`}>
                              {getTypeLabel(result.type)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {result.description}
                          </p>
                        </div>
                        <ArrowRight className={`h-4 w-4 text-gray-400 transition-opacity ${
                          isSelected ? 'opacity-100' : 'opacity-0'
                        }`} />
                      </button>
                    )
                  })}
                </div>
              )}

              {/* No results */}
              {!isLoading && query.length >= 2 && results.length === 0 && (
                <div className="py-12 text-center">
                  <Search className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-4 text-gray-600">Geen resultaten voor &ldquo;{query}&rdquo;</p>
                  <p className="mt-1 text-sm text-gray-400">
                    Probeer een andere zoekterm
                  </p>
                </div>
              )}

              {/* Suggestions (Recent + Popular) */}
              {showSuggestions && (
                <div className="py-2">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="px-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>Recent</span>
                        </div>
                        <button
                          onClick={handleClearRecent}
                          className="text-xs text-gray-400 hover:text-gray-600"
                        >
                          Wissen
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term, index) => (
                          <button
                            key={index}
                            onClick={() => handleRecentSearchClick(term)}
                            className="rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Searches */}
                  <div className="px-4 py-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>Populair</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((term, index) => (
                        <button
                          key={index}
                          onClick={() => handlePopularSearchClick(term)}
                          className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t bg-gray-50 px-4 py-2 text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border bg-white px-1.5 py-0.5">↑</kbd>
                  <kbd className="rounded border bg-white px-1.5 py-0.5">↓</kbd>
                  <span>navigeren</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border bg-white px-1.5 py-0.5">Enter</kbd>
                  <span>openen</span>
                </span>
              </div>
              <span className="flex items-center gap-1">
                <Command className="h-3 w-3" />
                <span>+ K om te zoeken</span>
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
