import Link from "next/link"
import { Home, Search } from "lucide-react"
import { Button } from "@/components/ui"

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container-wide relative text-center">
        {/* 404 Number */}
        <div className="text-[150px] md:text-[200px] font-bold leading-none bg-gradient-to-b from-white/20 to-white/5 bg-clip-text text-transparent select-none">
          404
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 -mt-8">
          Pagina niet gevonden
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          De pagina die je zoekt bestaat niet of is verplaatst.
          Geen zorgen, we helpen je graag verder.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            className="bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm px-6 py-5"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Naar Homepage
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-border hover:border-primary/50 px-6 py-5"
          >
            <Link href="/prop-firms" className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Bekijk Prop Firms
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-border/50 max-w-lg mx-auto">
          <p className="text-sm text-muted-foreground mb-4">Populaire pagina&apos;s:</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/vergelijk"
              className="px-4 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground hover:text-white hover:border-primary/30 transition-all"
            >
              Vergelijk
            </Link>
            <Link
              href="/prop-firms/ftmo"
              className="px-4 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground hover:text-white hover:border-primary/30 transition-all"
            >
              FTMO Review
            </Link>
            <Link
              href="/prop-firms/apex-trader-funding"
              className="px-4 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground hover:text-white hover:border-primary/30 transition-all"
            >
              Apex Review
            </Link>
            <Link
              href="/tools/winstcalculator"
              className="px-4 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground hover:text-white hover:border-primary/30 transition-all"
            >
              Calculator
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
