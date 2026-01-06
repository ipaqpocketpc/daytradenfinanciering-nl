import { MetadataRoute } from "next"
import { brand, design } from "@/config"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: "Daytraden",
    description: brand.description,
    start_url: "/",
    display: "standalone",
    background_color: design.backgroundColor,
    theme_color: design.themeColor,
    orientation: "portrait-primary",
    categories: ["finance", "business"],
    icons: [
      {
        src: "/icon-192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
