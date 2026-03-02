import React from "react"

interface ProductSkeletonProps {
  count?: number
}

const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded-md ${className}`} />
)

const ProductCardSkeleton = () => {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-200">
      {/* Image Skeleton */}
      <Skeleton className="w-full h-48 rounded-t-lg" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title Skeleton */}
        <Skeleton className="h-4 w-3/4" />

        {/* Description Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>

        {/* Price Skeleton */}
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Button Skeleton */}
        <Skeleton className="h-10 w-full rounded-md mt-4" />
      </div>
    </div>
  )
}

export const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}

// Skeleton para seção inteira com header
export const SkeletonSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>

        {/* Products Grid Skeleton */}
        <ProductSkeleton count={4} />
      </div>
    </section>
  )
}
