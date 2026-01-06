"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Wallet, Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui"
import { brand, navigation } from "@/config"
import { cn } from "@/lib/utils"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main Header */}
      <div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "glass border-b border-border/50"
            : "bg-transparent"
        )}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-glow group-hover:shadow-glow transition-all duration-300">
                <Wallet className="w-7 h-7 text-white" strokeWidth={2.25} />
                <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white">
                  Daytraden<span className="text-primary">Financiering</span>
                </span>
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                  Tot €200.000 Kapitaal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-4/5 transition-all duration-300 rounded-full" />
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white shadow-glow btn-glow"
              >
                <Link href="/go/kapitaal" className="flex items-center gap-2">
                  Krijg Kapitaal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                className="relative p-2.5 rounded-xl border border-border hover:border-primary/50 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Sluit menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={cn(
              "lg:hidden overflow-hidden transition-all duration-300 ease-out",
              mobileMenuOpen ? "max-h-96 pb-6" : "max-h-0"
            )}
          >
            <div className="border-t border-border pt-4">
              <nav className="flex flex-col gap-1">
                {navigation.main.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-3 text-muted-foreground font-medium hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-4 pt-4">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-primary to-primary-dark text-white"
                  >
                    <Link href="/go/kapitaal" className="flex items-center justify-center gap-2">
                      Krijg Kapitaal
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
