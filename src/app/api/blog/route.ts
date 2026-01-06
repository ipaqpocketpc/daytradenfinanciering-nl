import { NextRequest, NextResponse } from "next/server"
import type { BlogPost, BlogCategory } from "@/config/blog"

// API endpoint for n8n auto-blog integration
// POST: Add a new blog post

interface BlogPostInput {
  slug: string
  title: string
  excerpt: string
  content: string
  category: BlogCategory
  tags: string[]
  publishedAt?: string
  readingTime?: number
  featured?: boolean
  seoTitle?: string
  seoDescription?: string
  coverImage?: string
  author?: {
    name: string
    avatar?: string
  }
}

export async function POST(request: NextRequest) {
  // Validate API key
  const apiKey = request.headers.get("x-api-key")
  const expectedKey = process.env.BLOG_API_KEY

  if (!expectedKey) {
    console.error("[Blog API] BLOG_API_KEY not configured in environment")
    return NextResponse.json(
      { error: "Server configuration error", code: "CONFIG_ERROR" },
      { status: 500 }
    )
  }

  if (apiKey !== expectedKey) {
    return NextResponse.json(
      { error: "Unauthorized", code: "UNAUTHORIZED" },
      { status: 401 }
    )
  }

  try {
    const data: BlogPostInput = await request.json()

    // Validate required fields
    const requiredFields = ["slug", "title", "excerpt", "content", "category", "tags"]
    const missingFields = requiredFields.filter((field) => !data[field as keyof BlogPostInput])

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          code: "VALIDATION_ERROR",
          fields: missingFields,
        },
        { status: 400 }
      )
    }

    // Validate category
    const validCategories: BlogCategory[] = ["financiering", "beginners", "strategie", "psychologie", "gids", "nieuws"]
    if (!validCategories.includes(data.category)) {
      return NextResponse.json(
        {
          error: "Invalid category",
          code: "VALIDATION_ERROR",
          validCategories,
        },
        { status: 400 }
      )
    }

    // Calculate reading time if not provided
    const wordsPerMinute = 200
    const words = data.content.trim().split(/\s+/).length
    const readingTime = data.readingTime || Math.ceil(words / wordsPerMinute)

    // Build the blog post object
    const newPost: Omit<BlogPost, "id"> = {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category,
      tags: data.tags,
      publishedAt: data.publishedAt || new Date().toISOString(),
      readingTime,
      featured: data.featured || false,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      coverImage: data.coverImage,
      author: data.author || { name: "Redactie" },
    }

    // Log the post for debugging
    console.log("[Blog API] New post received:", {
      slug: newPost.slug,
      title: newPost.title,
      category: newPost.category,
      readingTime: newPost.readingTime,
    })

    // TODO: In production, implement one of these storage options:
    // Option 1: GitHub API - Create a PR with the new post file
    // Option 2: Database - Store in Supabase/MongoDB/etc.
    // Option 3: CMS - Push to Contentful/Sanity/etc.
    //
    // For now, this endpoint validates the data and can trigger a rebuild.
    // The n8n workflow should also commit the post to Git directly.

    // Trigger Vercel rebuild if deploy hook is configured
    const deployHook = process.env.VERCEL_DEPLOY_HOOK
    if (deployHook) {
      try {
        await fetch(deployHook, { method: "POST" })
        console.log("[Blog API] Vercel rebuild triggered")
      } catch (error) {
        console.error("[Blog API] Failed to trigger Vercel rebuild:", error)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Blog post received",
      post: {
        slug: newPost.slug,
        title: newPost.title,
        publishedAt: newPost.publishedAt,
        readingTime: newPost.readingTime,
      },
    })
  } catch (error) {
    console.error("[Blog API] Error processing request:", error)
    return NextResponse.json(
      { error: "Invalid request body", code: "PARSE_ERROR" },
      { status: 400 }
    )
  }
}

// GET: Return API status and documentation
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "/api/blog",
    methods: {
      POST: {
        description: "Add a new blog post",
        headers: {
          "x-api-key": "Required - API key for authentication",
          "Content-Type": "application/json",
        },
        body: {
          slug: "string (required) - URL slug for the post",
          title: "string (required) - Post title",
          excerpt: "string (required) - Short summary",
          content: "string (required) - Markdown content",
          category: "string (required) - One of: financiering, beginners, strategie, psychologie, gids, nieuws",
          tags: "string[] (required) - Array of tags",
          publishedAt: "string (optional) - ISO date string, defaults to now",
          readingTime: "number (optional) - Minutes, auto-calculated if not provided",
          featured: "boolean (optional) - Defaults to false",
          seoTitle: "string (optional) - Custom SEO title",
          seoDescription: "string (optional) - Custom meta description",
          coverImage: "string (optional) - Cover image path",
          author: "object (optional) - { name: string, avatar?: string }",
        },
      },
    },
  })
}
