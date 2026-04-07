"use client"

import { useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import { useProductsFilter } from "@/hooks/useFilterProduct"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

interface SuggestedProductsCarouselProps {
  categoria: string
  subcategoria: string
  currentProductId: string
}

export function SuggestedProductsCarousel({
  categoria,
  subcategoria,
  currentProductId,
}: SuggestedProductsCarouselProps) {
  const { data } = useProductsFilter({ categoria, subcategoria })
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Filter out the current product from suggestions
  const suggestedProducts = useMemo(() => {
    return (data?.products ?? []).filter((product) => product.id !== currentProductId)
  }, [data, currentProductId])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (suggestedProducts.length === 0) {
    return null
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold text-foreground">Produtos Sugeridos</h3>
      </div>

      <div className="relative group">
        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {suggestedProducts.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-full sm:w-80 snap-start"
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 -translate-x-12"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 translate-x-12"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-gray-800" />
        </button>
      </div>
    </div>
  )
}
