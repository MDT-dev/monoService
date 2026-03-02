"use client"
import { useState, useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import {
    useAllProducts
} from "@/hooks/useProducts"
import { useCategories } from "@/hooks/useCategories"
import { formatKz } from "@/util/formatCurrency"

type SortType = "newest" | "price-asc" | "price-desc" | "rating"

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All Categories")
    const [selectedMaxPrice, setSelectedMaxPrice] = useState(0)
    const [sortBy, setSortBy] = useState<SortType>("newest")

    const { data } = useAllProducts()
    const { data: dataCategories } = useCategories()
    const allProducts = useMemo(() => data?.products ?? [], [data])
    const maxPrice = useMemo(() => {
        if (!allProducts.length) return 0
        return Math.max(...allProducts.map((p) => p.price))
    }, [allProducts])
    const effectiveMaxPrice = selectedMaxPrice || maxPrice
    const allCategories = useMemo(() => dataCategories?.categories ?? [], [dataCategories])


    // Filtrar e ordenar produtos
    const filteredProducts = useMemo(() => {
        const filtered = allProducts.filter((product) => {
            const categorySlug = product.subCategory?.category?.slug ?? ""

            const matchesSearch =
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                categorySlug.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesCategory =
                selectedCategory === "All Categories" ||
                categorySlug === selectedCategory

            const matchesPrice = product.price <= effectiveMaxPrice

            return matchesSearch && matchesCategory && matchesPrice
        })

        // Ordenar
        switch (sortBy) {
            case "price-asc":
                filtered.sort((a, b) => a.price - b.price)
                break
            case "price-desc":
                filtered.sort((a, b) => b.price - a.price)
                break
            //   case "rating":
            //     filtered.sort((a, b) => b.rating - a.rating)
            // break
            default:
                break
        }

        return filtered
    }, [searchQuery, selectedCategory, effectiveMaxPrice, sortBy, allProducts])

    const clearFilters = () => {
        setSearchQuery("")
        setSelectedCategory("All Categories")
        setSelectedMaxPrice(0)
        setSortBy("newest")
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Nossos produtos</h1>
                    <p className="text-lg text-muted-foreground">Explore nosso catálogo de produtos</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-foreground">Filtros</h2>
                                {(searchQuery || selectedCategory !== "All Categories" || sortBy !== "newest") && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-accent hover:text-accent/80 text-sm flex items-center gap-1"
                                    >
                                        <X className="w-4 h-4" />
                                        Limpar
                                    </button>
                                )}
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <label className="text-sm font-semibold text-foreground mb-2 block">Pesquisar</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Buscar produtos..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="mb-6">
                                <label className="text-sm font-semibold text-foreground mb-3 block">Categorias</label>
                                <div className="space-y-2">
                                    {allCategories.map((cat) => (
                                        <button
                                            key={cat.slug}
                                            onClick={() => setSelectedCategory(cat.slug)}
                                            className={`w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${selectedCategory === cat.slug
                                                ? "bg-gradient-to-r from-accent to-orange-600 text-accent-foreground shadow-md"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                                }`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="text-sm font-semibold text-foreground mb-3 block">Intervalo de Preço</label>
                                <div className="space-y-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max={maxPrice}
                                        value={effectiveMaxPrice}
                                        onChange={(e) => setSelectedMaxPrice(Number(e.target.value))}
                                        className="w-full"
                                    />
                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <span>{formatKz(0)}</span>
                                        <span>{formatKz(effectiveMaxPrice)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Sort */}
                            <div>
                                <label className="text-sm font-semibold text-foreground mb-3 block">Ordenar por</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortType)}
                                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm font-medium"
                                >
                                    <option value="newest">Mais Recente</option>
                                    <option value="price-asc">Preço: Menor para Maior</option>
                                    <option value="price-desc">Preço: Maior para Menor</option>
                                    <option value="rating">Melhor Avaliado</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <>
                                <div className="mb-6 text-sm text-muted-foreground font-medium">
                                    Mostrando {filteredProducts.length} produtos
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProducts.map((product) => (
                                        <ProductCard key={product.id} {...product} />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16">
                                <p className="text-lg text-muted-foreground mb-4">Nenhum produto encontrado</p>
                                <Button onClick={clearFilters} className="bg-accent hover:bg-accent/90">
                                    Limpar filtros
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
