"use client"
import { useState, useMemo } from "react"
import { useLanguage } from "@/contexts/language-context"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import m1 from "../../../public/m1.jpg"
import m2 from "../../../public/m2.jpg"
import m3 from "../../../public/m3.jpg"
import m4 from "../../../public/m4.jpg"
import m5 from "../../../public/m5.jpg"
import m6 from "../../../public/m6.jpg"
import m7 from "../../../public/m7.jpg"
import m8 from "../../../public/m8.jpg"
import m9 from "../../../public/m9.jpg"
import m10 from "../../../public/m10.jpg"

// Sample product data
const allProducts = [
    {
        id: "1",
        name: "Professional Service Package",
        category: "Services",
        price: 299.99,
        originalPrice: 399.99,
        image: m1, rating: 4.8,
        reviews: 124,
        inStock: true,
    },
    {
        id: "2",
        name: "Premium Business Solution",
        category: "Solutions",
        price: 599.99,
        originalPrice: 799.99,
        image: m2, rating: 4.9,
        reviews: 89,
        inStock: true,
    },
    {
        id: "3",
        name: "Enterprise Package",
        category: "Enterprise",
        price: 1299.99,
        image: m3, rating: 5,
        reviews: 56,
        inStock: true,
    },
    {
        id: "4",
        name: "Starter Bundle",
        category: "Bundles",
        price: 149.99,
        originalPrice: 199.99,
        image: m4, rating: 4.7,
        reviews: 203,
        inStock: true,
    },
    {
        id: "5",
        name: "Advanced Analytics Tool",
        category: "Tools",
        price: 449.99,
        image: m5, rating: 4.6,
        reviews: 78,
        inStock: true,
    },
    {
        id: "6",
        name: "Marketing Suite",
        category: "Marketing",
        price: 349.99,
        originalPrice: 499.99,
        image: m6, rating: 4.5,
        reviews: 94,
        inStock: false,
    },
    {
        id: "7",
        name: "Developer Tools Kit",
        category: "Tools",
        price: 199.99,
        image: m7, rating: 4.9,
        reviews: 167,
        inStock: true,
    },
    {
        id: "8",
        name: "Compliance Manager",
        category: "Services",
        price: 549.99,
        originalPrice: 699.99,
        image: m8, rating: 4.8,
        reviews: 45,
        inStock: true,
    },
    {
        id: "9",
        name: "Compliance Manager",
        category: "Services",
        price: 549.99,
        originalPrice: 699.99,
        image: m9, rating: 4.8,
        reviews: 45,
        inStock: true,
    },
    {
        id: "10",
        name: "Compliance Manager",
        category: "Services",
        price: 549.99,
        originalPrice: 699.99,
        image: m10, rating: 4.8,
        reviews: 45,
        inStock: true,
    },
]

const categories = ["All Categories", "Services", "Solutions", "Enterprise", "Bundles", "Tools", "Marketing"]

type SortType = "newest" | "price-asc" | "price-desc" | "rating"

export default function ProductsPage() {
    const { t } = useLanguage()
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All Categories")
    const [priceRange, setPriceRange] = useState([0, 2000])
    const [sortBy, setSortBy] = useState<SortType>("newest")

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        const filtered = allProducts.filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

            return matchesSearch && matchesCategory && matchesPrice
        })

        // Sort
        switch (sortBy) {
            case "price-asc":
                filtered.sort((a, b) => a.price - b.price)
                break
            case "price-desc":
                filtered.sort((a, b) => b.price - a.price)
                break
            case "rating":
                filtered.sort((a, b) => b.rating - a.rating)
                break
            default:
                break
        }

        return filtered
    }, [searchQuery, selectedCategory, priceRange, sortBy])

    const clearFilters = () => {
        setSearchQuery("")
        setSelectedCategory("All Categories")
        setPriceRange([0, 2000])
        setSortBy("newest")
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">{t("products.title")}</h1>
                    <p className="text-lg text-muted-foreground">Browse our complete catalog of products</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-foreground">{t("products.filter")}</h2>
                                {(searchQuery || selectedCategory !== "All Categories" || sortBy !== "newest") && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-accent hover:text-accent/80 text-sm flex items-center gap-1"
                                    >
                                        <X className="w-4 h-4" />
                                        Clear
                                    </button>
                                )}
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <label className="text-sm font-semibold text-foreground mb-2 block">Search</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="mb-6">
                                <label className="text-sm font-semibold text-foreground mb-3 block">{t("products.categories")}</label>
                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${selectedCategory === cat
                                                    ? "bg-gradient-to-r from-accent to-orange-600 text-accent-foreground shadow-md"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="text-sm font-semibold text-foreground mb-3 block">Price Range</label>
                                <div className="space-y-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="2000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                                        className="w-full"
                                    />
                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <span>AOA{priceRange[0]}</span>
                                        <span>AOA{priceRange[1]}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Sort */}
                            <div>
                                <label className="text-sm font-semibold text-foreground mb-3 block">{t("products.sort")}</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortType)}
                                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm font-medium"
                                >
                                    <option value="newest">{t("products.sortNewest")}</option>
                                    <option value="price-asc">{t("products.sortPrice")}</option>
                                    <option value="price-desc">{t("products.sortPriceDesc")}</option>
                                    <option value="rating">{t("products.sortRating")}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <>
                                <div className="mb-6 text-sm text-muted-foreground font-medium">
                                    Showing {filteredProducts.length} products
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProducts.map((product) => (
                                        <ProductCard key={product.id} {...product} />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16">
                                <p className="text-lg text-muted-foreground mb-4">{t("products.noResults")}</p>
                                <Button onClick={clearFilters} className="bg-accent hover:bg-accent/90">
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
