"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { ProductCard } from "@/components/product-card"
import { PromoCarousel } from "@/components/promo-carousel"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image1 from "../../public/m1.jpg"
import Image2 from "../../public/m2.jpg"
import Image3 from "../../public/m3.jpg"
import Image4 from "../../public/m4.jpg"

// Featured products mock data
const featuredProducts = [
    {
        id: "1",
        name: "Professional Service Package",
        category: "Services",
        price: 299.99,
        originalPrice: 399.99,
        image: Image1, rating: 4.8,
        reviews: 124,
        inStock: true,
    },
    {
        id: "2",
        name: "Premium Business Solution",
        category: "Solutions",
        price: 599.99,
        originalPrice: 799.99,
        image: Image2, rating: 4.9,
        reviews: 89,
        inStock: true,
    },
    {
        id: "3",
        name: "Enterprise Package",
        category: "Enterprise",
        price: 1299.99,
        image: Image3, rating: 5,
        reviews: 56,
        inStock: true,
    },
    {
        id: "4",
        name: "Starter Bundle",
        category: "Bundles",
        price: 149.99,
        originalPrice: 199.99,
        image: Image4, rating: 4.7,
        reviews: 203,
        inStock: true,
    },
]

export default function HomePage() {
    const { t } = useLanguage()



    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-accent/10 via-primary/5 to-background py-24 lg:py-40 overflow-hidden">
                <div className="absolute inset-0 bg-grid-small-black/[0.03] dark:bg-grid-small-white/[0.03]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
                            {t("hero.title")}
                        </h1>
                        <p className="text-xl lg:text-2xl font-medium text-primary mb-4">{t("hero.subtitle")}</p>
                        <p className="text-lg text-muted-foreground mb-10 text-pretty leading-relaxed">{t("hero.description")}</p>
                        <Link href="/produtos">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-lg h-auto py-4 shadow-lg hover:shadow-xl transition-all">
                                {t("hero.shopNow")}
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Promotional Carousel */}
            <PromoCarousel />

            {/* Featured Products Section */}
            <section className="py-16 lg:py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-foreground mb-4">{t("hero.featured")}</h2>
                        <p className="text-lg text-muted-foreground">Explore our best-selling products</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/produtos">
                            <Button variant="outline" className="border-accent text-accent hover:bg-accent/5 bg-transparent">
                                {t("products.title")}
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Value Proposition Section */}
            <section className="py-16 lg:py-24 bg-muted">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="border-0 shadow-none bg-background">
                            <CardContent className="p-6 text-center">
                                <div className="text-4xl font-bold text-accent mb-4">✓</div>
                                <h3 className="text-xl font-bold text-foreground mb-2">Quality Assured</h3>
                                <p className="text-muted-foreground">All products meet the highest standards</p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-none bg-background">
                            <CardContent className="p-6 text-center">
                                <div className="text-4xl font-bold text-accent mb-4">🚚</div>
                                <h3 className="text-xl font-bold text-foreground mb-2">Fast Shipping</h3>
                                <p className="text-muted-foreground">Quick delivery to your doorstep</p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-none bg-background">
                            <CardContent className="p-6 text-center">
                                <div className="text-4xl font-bold text-accent mb-4">💬</div>
                                <h3 className="text-xl font-bold text-foreground mb-2">24/7 Support</h3>
                                <p className="text-muted-foreground">Dedicated customer service team</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 lg:py-24 bg-background">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4">Stay Updated</h2>
                    <p className="text-muted-foreground mb-8">Subscribe to get special offers and updates</p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded border border-border bg-background text-foreground"
                        />
                        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6">Subscribe</Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
