"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import ActionSearchBar from "./action-search-bar"
import Logo from "../../public/assets/logo2.png"
import Image from "next/image"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Produto", href: "/produtos" },
  { name: "Sobre nós", href: "/sobre-nos" },
  { name: "Notícias", href: "/noticias" },
  { name: "Contacto", href: "/contacto" },
]

export function Navbar() {
  const pathname = usePathname()
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
            <Image
              width={100}
              height={100}
              alt="Logo do Milones"
              src={Logo}
            />
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
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-xs mx-4">
            <ActionSearchBar />
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-3">
            <Link
              href="/carrinho"
              className="relative p-2.5 text-muted-foreground hover:text-foreground transition-colors hover:bg-muted rounded-lg"
              aria-label="Carrinho"
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
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
