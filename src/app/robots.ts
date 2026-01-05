import { MetadataRoute } from "next"
import { seo } from "@/config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: `${seo.siteUrl}/sitemap.xml`,
  }
}
