"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"
import { ShoppingCart, Search, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"

const navigation = [
  { name: "nav.home", href: "/" },
  { name: "nav.products", href: "/produtos" },
  { name: "nav.contact", href: "/contacto" },
]

export function Navbar() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const { itemCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-primary flex-shrink-0"
          >
            {t("nav.brand")}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="flex items-baseline space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  {t(item.name)}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("nav.search")}
                className="pl-10 pr-4 py-2 text-sm rounded-lg border border-border bg-muted/50 focus:bg-muted focus:border-accent transition-all"
              />
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-3">
            <Link
              href="/carrinho"
              className="relative p-2.5 text-muted-foreground hover:text-foreground transition-colors hover:bg-muted rounded-lg"
              aria-label={t("nav.cart")}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {itemCount}
                </span>
              )}
            </Link>
            <ThemeToggle />
            <LanguageToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border pb-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  {t(item.name)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
