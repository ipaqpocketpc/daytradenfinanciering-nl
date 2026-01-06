import { Metadata } from "next"
import { GeheimContent } from "./GeheimContent"
import { brand } from "@/config/brand"

export const metadata: Metadata = {
  title: "10 Geheimen van Succesvolle Traders | Gratis Gids",
  description:
    "Ontdek de 10 bewezen geheimen die funded traders succesvol maken. Data-gedreven inzichten van 12.547+ traders. Direct toepasbaar.",
  alternates: {
    canonical: "/geheim",
  },
  robots: {
    index: false, // Don't index this lead magnet page
    follow: true,
  },
  openGraph: {
    title: "10 Geheimen van Succesvolle Traders",
    description:
      "Ontdek de 10 bewezen geheimen die funded traders succesvol maken. Gebaseerd op data van 12.547+ traders.",
    url: `${brand.url}/geheim`,
  },
}

export default function GeheimPage() {
  return <GeheimContent />
}
