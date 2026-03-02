"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { ShoppingCart, Menu, X, ChevronDown, Search, User, Sun } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { useCategories } from "@/hooks/useCategories"
import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Input } from "@/components/ui/input"
import { Category } from "@/types/category"
import { formatKz } from "@/util/formatCurrency"

const staticNavigation = [
  { name: "Home", href: "/" },
  { name: "Sobre nós", href: "/sobre-nos" },
  { name: "Notícias", href: "/noticias" },
  { name: "Contacto", href: "/contacto" },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { itemCount } = useCart()
  const { data } = useCategories()
  const categoriesList: Category[] = data?.categories ?? []

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const params = new URLSearchParams()
      params.set("nameProduto", searchQuery)
      router.push(`/pesquisar?${params.toString()}`)
    }
  }
  

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>Envio grátis em encomendas acima de {formatKz(50000)}</div>
          <div className="flex gap-6 text-xs">
            <Link href="/help" className="hover:text-gray-300 transition">
              Ajuda
            </Link>
            <Link href="/track" className="hover:text-gray-300 transition">
              Nif: 5002859068
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navigation Row */}
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              width={200}
              height={200}
              alt="Logo"
              src="/assets/logo2.png"
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center gap-1">
            {staticNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                {item.name}
              </Link>
            ))}

            {/* Categories from hook */}
            {categoriesList.length > 0 && (
              <div className="relative group ml-2">
                <button
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1.5",
                    "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  Produtos
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-0 w-56 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 z-10">
                  {categoriesList.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categoria/${category.slug}`}
                      className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border-b border-border last:border-b-0"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm mx-4">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Pesquisar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 h-9"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Pesquisar"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <button className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors" aria-label="Pesquisar">
                  <Search className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full">
                <form onSubmit={handleSearch} className="pt-4">
                  <div className="relative w-full">
                    <Input
                      type="text"
                      placeholder="Pesquisar produtos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="pl-4 pr-10 h-10"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </SheetContent>
            </Sheet>

            {/* Account Link */}
            <Link
              href="/conta"
              className="hidden sm:p-2.5 hidden sm:flex text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              aria-label="Minha conta"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link
              href="/carrinho"
              className="relative p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              aria-label="Carrinho"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <button className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors" aria-label="Toggle theme">
              <Sun className="w-5 h-5" />
            </button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <button className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors" aria-label="Menu">
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 max-w-[90vw] flex flex-col">
                <div className="mt-6 flex flex-col gap-1 flex-1 overflow-y-auto">
                  {staticNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-lg text-sm font-medium transition-all",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}

                  {/* Mobile Categories */}
                  {categoriesList.length > 0 && (
                    <div>
                      <button
                        onClick={() =>
                          setActiveCategory(
                            activeCategory === "products" ? null : "products"
                          )
                        }
                        className="w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg flex items-center justify-between transition-colors"
                      >
                        Produtos
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform",
                            activeCategory === "products" && "rotate-180"
                          )}
                        />
                      </button>

                      {activeCategory === "products" && (
                        <div className="mt-1 space-y-1 pl-2">
                          {categoriesList.map((category) => (
                            <Link
                              key={category.id}
                              href={`/categoria/${category.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="hidden lg:block flex-1">
          <NavigationMenu className="w-full justify-start">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/produtos" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-400 transition">
                  Todos os produtos
                </NavigationMenuLink>
              </NavigationMenuItem>

              {categoriesList?.length > 0 ? (
                categoriesList.map((category) => (
                  <NavigationMenuItem key={category.id}>
                    <NavigationMenuTrigger className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-800">
                      {category.name}
                    </NavigationMenuTrigger>
                    {category.subCategories && category.subCategories.length > 0 && (
                      <NavigationMenuContent>
                        <div className="grid gap-4 p-6 md:w-[500px] lg:w-[700px]">
                          <div className={`grid grid-cols-2 gap-4 md:grid-cols-${category.subCategories.length}`}>
                            {category.subCategories.map((subCategory) => (
                              <Link
                                key={subCategory.id}
                                href={`/filtrar?categoria=${category.slug}&subcategoria=${subCategory.slug}`}
                                className="group"
                              >
                                <div className="overflow-hidden rounded-lg bg-gray-100 mb-2 h-32">
                                  {subCategory.image?.url ? (
                                    <Image
                                      src={subCategory.image.url}
                                      alt={subCategory.name}
                                      width={200}
                                      height={200}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                      No Image
                                    </div>
                                  )}
                                </div>
                                <h4 className="font-medium text-sm text-gray-500 group-hover:text-green-700 transition">
                                  {subCategory.name}
                                </h4>
                                {subCategory.description && (
                                  <p className="text-xs text-gray-400 mt-1">
                                    {subCategory.description}
                                  </p>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    )}
                  </NavigationMenuItem>
                ))
              ) : (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/products" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                      Products
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                      Sale
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  )
}
