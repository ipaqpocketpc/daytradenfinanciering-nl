import { MetadataRoute } from "next"
import { brand } from "@/config/brand"
import { blogPosts } from "@/config/blog"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = brand.url

  // Static pages - financing focused
  const staticPages = [
    { route: "", priority: 1 },
    { route: "/hoe-werkt-het", priority: 0.9 },
    { route: "/voordelen", priority: 0.9 },
    { route: "/kosten", priority: 0.9 },
    { route: "/beginnen", priority: 0.9 },
    { route: "/veelgestelde-vragen", priority: 0.8 },
    { route: "/begrippen", priority: 0.7 },
    { route: "/blog", priority: 0.7 },
    { route: "/over-ons", priority: 0.5 },
    { route: "/contact", priority: 0.5 },
    { route: "/privacy", priority: 0.3 },
    { route: "/disclaimer", priority: 0.3 },
  ].map(({ route, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority,
  }))

  // Blog pages
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "weekly" as const,
    priority: post.featured ? 0.7 : 0.5,
  }))

  return [...staticPages, ...blogPages]
}
