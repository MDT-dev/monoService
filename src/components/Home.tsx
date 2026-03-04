"use client";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { PromoCarousel } from "@/components/promo-carousel";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroCarousel from "@/components/carousel/CaroulseHero";
import NewsPreviewSection from "@/components/news/news-preview-section";
import CTASectionAlternative from "@/components/cta-section";
import { useAllProducts } from "@/hooks/useProducts";
import { ErrorState } from "@/components/error-state";
import { SkeletonSection } from "@/components/product-skeleton";

export function Home() {
  const { data, error, isLoading, refetch } = useAllProducts()

  const products = data?.products ?? []

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <HeroCarousel />
        <SkeletonSection />
        <NewsPreviewSection />
        <PromoCarousel />
        <CTASectionAlternative />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <HeroCarousel />
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ErrorState
              title="Erro ao carregar produtos"
              message="Não conseguimos carregar os produtos no momento. Por favor, tente novamente."
              onRetry={() => refetch()}
              showRetryButton={true}
            />
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <HeroCarousel />

      {/* Featured Products Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore os nossos melhores produtos a venda
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/produtos">
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent/5 bg-transparent"
              >
                Nossos produtos
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
