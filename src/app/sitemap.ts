import { MetadataRoute } from "next"
import { seo, firms, cities, niches, tools } from "@/config"
import { blogPosts } from "@/config/blog"
import { getComparisonPairs } from "@/lib/comparison-content"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = seo.siteUrl

  // Static pages
  const staticPages = [
    "",
    "/prop-firms",
    "/vergelijk",
    "/ervaringen",
    "/ervaringen/schrijven",
    "/over-ons",
    "/contact",
    "/privacy",
    "/disclaimer",
    "/blog",
    "/begrippen",
    "/quiz",
    "/steden",
    "/categorie",
    "/tools",
    "/zoeken",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Prop firm pages
  const firmPages = firms.map((firm) => ({
    url: `${baseUrl}/prop-firms/${firm.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: firm.isPartner ? 0.9 : 0.7,
  }))

  // City pages
  const cityPages = cities.map((city) => ({
    url: `${baseUrl}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: city.priority === 1 ? 0.7 : 0.5,
  }))

  // Niche/category pages
  const nichePages = niches.map((niche) => ({
    url: `${baseUrl}/categorie/${niche.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Tool pages
  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Blog pages
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "weekly" as const,
    priority: post.featured ? 0.7 : 0.5,
  }))

  // Comparison pages
  const comparisonPages = getComparisonPairs().map((pair) => ({
    url: `${baseUrl}/vergelijk/${pair.firm1}-vs-${pair.firm2}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...firmPages, ...cityPages, ...nichePages, ...toolPages, ...blogPages, ...comparisonPages]
}
