"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { ProductCard } from "@/components/product-card";
import { PromoCarousel } from "@/components/promo-carousel";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image1 from "../../public/m1.jpg";
import Image2 from "../../public/m2.jpg";
import Image3 from "../../public/m3.jpg";
import Image4 from "../../public/m4.jpg";
// import ProductList from "@/components/ProductList"
import HeroCarousel from "@/components/carousel/CaroulseHero";
import NewsPreviewSection from "@/components/news/news-preview-section";
import CTASectionAlternative from "@/components/cta-section";

// Featured products mock data
const featuredProducts = [
  {
    id: "1",
    name: "Professional Service Package",
    category: "Services",
    price: 299.99,
    originalPrice: 399.99,
    image: Image1,
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
  {
    id: "2",
    name: "Premium Business Solution",
    category: "Solutions",
    price: 599.99,
    originalPrice: 799.99,
    image: Image2,
    rating: 4.9,
    reviews: 89,
    inStock: true,
  },
  {
    id: "3",
    name: "Enterprise Package",
    category: "Enterprise",
    price: 1299.99,
    image: Image3,
    rating: 5,
    reviews: 56,
    inStock: true,
  },
  {
    id: "4",
    name: "Starter Bundle",
    category: "Bundles",
    price: 149.99,
    originalPrice: 199.99,
    image: Image4,
    rating: 4.7,
    reviews: 203,
    inStock: true,
  },
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <HeroCarousel />

      {/* <ProductList/> */}

      {/* Featured Products Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t("hero.featured")}
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore our best-selling products
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/produtos">
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent/5 bg-transparent"
              >
                {t("products.title")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <NewsPreviewSection />

      {/* Promotional Carousel */}
      <PromoCarousel />

      <CTASectionAlternative />
    </div>
  );
}
