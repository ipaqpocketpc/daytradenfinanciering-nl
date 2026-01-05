import Link from "next/link"
import { TrendingUp, Mail, ArrowUpRight, Shield } from "lucide-react"
import { brand, navigation } from "@/config"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-background to-card pointer-events-none" />

      {/* Disclaimer */}
      <div className="relative border-b border-border">
        <div className="container-wide py-8">
          <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-white font-semibold">Disclaimer:</strong>{" "}
                {brand.disclaimer}
              </p>
              <p className="text-sm mt-3 text-muted-foreground/80 italic">
                {brand.affiliateDisclosure}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-linear-to-br from-secondary to-secondary-dark shadow-glow-green">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">
                  Funded<span className="text-secondary">Trading</span>
                </span>
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                  Nederland
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              {brand.description}
            </p>
            <a
              href={`mailto:${brand.email}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors group"
            >
              <Mail className="w-4 h-4" />
              {brand.email}
            </a>
          </div>

          {/* Prop Firms */}
          <div>
            <h4 className="text-white font-semibold mb-5">Prop Firms</h4>
            <ul className="space-y-3">
              {navigation.footer.propFirms.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-white transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-white font-semibold mb-5">Gratis Tools</h4>
            <ul className="space-y-3">
              {navigation.footer.tools.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-white transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vergelijk */}
          <div>
            <h4 className="text-white font-semibold mb-5">Ontdek</h4>
            <ul className="space-y-3">
              {navigation.footer.vergelijk.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-white transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Over Ons */}
          <div>
            <h4 className="text-white font-semibold mb-5">Over Ons</h4>
            <ul className="space-y-3">
              {navigation.footer.overOns.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-white transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative border-t border-border">
        <div className="container-wide py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} {brand.name}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-white transition-colors text-sm"
              >
                Privacy
              </Link>
              <Link
                href="/disclaimer"
                className="text-muted-foreground hover:text-white transition-colors text-sm"
              >
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
