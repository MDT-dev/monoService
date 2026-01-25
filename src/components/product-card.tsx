"use client"

import type React from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import Image, { StaticImageData } from "next/image"

interface ProductCardProps {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  image: StaticImageData
  rating: number
  reviews: number
  inStock: boolean
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  category,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  inStock,
}) => {
  const { addToCart } = useCart()
  const [showSuccess, setShowSuccess] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      quantity: 1,
      image: image ,
      category,
    })
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full group border-0 bg-card">
      {/* Product Image Container */}
      <div className="relative bg-muted overflow-hidden aspect-square">
        <Image
       
          src={image }
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            -{discount}%
          </div>
        )}

        {/* Stock Status */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Fora de Estoque</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute top-4 left-4 rounded-full p-2.5 shadow-lg transition-all duration-300 ${isWishlisted ? "bg-primary text-primary-foreground" : "bg-white/95 dark:bg-gray-800/95 hover:bg-white dark:hover:bg-gray-700 text-foreground"
            }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Success Indicator */}
        {showSuccess && (
          <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center rounded-lg">
            <span className="text-white font-bold text-lg">Adicionado ao Carrinho!</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <CardContent className="flex-1 p-5">
        <p className="text-xs text-primary uppercase tracking-widest font-bold mb-2">{category}</p>
        <Link href={`/produto/${id}`}>
          <h3 className="font-bold text-foreground line-clamp-2 hover:text-primary transition-colors text-lg mb-3">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-lg">
                {i < Math.round(rating) ? "★" : "☆"}
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-medium">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">{price.toFixed(2)}AOA</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">{originalPrice.toFixed(2)}AOA</span>
          )}
        </div>
      </CardContent>

      {/* Add to Cart Button */}
      <CardFooter className="p-5 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {inStock ? "Adicionar ao Carrinho" : "Indisponível"}
        </Button>
      </CardFooter>
    </Card>
  )
}
