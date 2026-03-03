"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Heart, Share2, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { formatKz } from "@/util/formatCurrency"
import { ProductDetailsModal } from "./product-details-modal"
import { Badge } from "./ui/badge"
import { Product } from "@/types/graphql"

export const ProductCard: React.FC<Product> = ({
  id,
  name,
  price,
  promoPrice,
  shortDescription,
  thumbnail,
  isActive,
  subCategory,
}) => {
  const { addToCart } = useCart()
  const [showSuccess, setShowSuccess] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const discount = promoPrice ? Math.round(((promoPrice - price) / promoPrice) * 100) : 0

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      quantity: 1,
      image: thumbnail.url,
      category: subCategory?.category?.name,
    })
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <>
      {/* Minimalist Card */}
      <div className="group bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100">

        {/* Image Container */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            width={250}
            height={250}
            src={thumbnail.url}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Quick Action Buttons - Top Right */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="bg-white p-2 rounded-full hover:bg-gray-100 shadow-sm transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart
                className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`}
              />
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-white p-2 rounded-full hover:bg-gray-100 shadow-sm transition-colors"
              aria-label="View details"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2.5 py-1 rounded text-xs font-semibold">
              -{discount}%
            </div>
          )}

          {/* Stock Status Overlay */}
          {!isActive && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-sm font-medium">Fora de Estoque</span>
            </div>
          )}

          {/* Success Toast */}
          {showSuccess && (
            <div className="absolute inset-0 bg-green-500/90 flex items-center justify-center">
              <span className="text-white font-medium">Adicionado!</span>
            </div>
          )}
        </div>

        {/* Content - Minimalist Clean */}
        <div className="p-4 space-y-3">

          {/* Category */}
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
            {subCategory?.category?.name || "Produto"} <Badge className="text-[9px] normal-case ">{subCategory?.name}</Badge>
          </p>

          {/* Product Name */}
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
            {name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-gray-600 line-clamp-1">
            {shortDescription}
          </p>

          {/* Price Section */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-lg font-bold text-gray-900">
              {formatKz(price)}
            </span>
            {promoPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatKz(promoPrice)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className={`text-xs font-medium ${isActive ? "text-green-600" : "text-red-600"}`}>
              {isActive ? "Em estoque" : "Indisponível"}
            </span>
            <span className="text-xs text-gray-500">Entrega rápida</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 text-sm font-medium text-gray-700 hover:text-gray-900 py-2 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
            >
              Detalhes
            </button>
            <button
              onClick={handleAddToCart}
              disabled={!isActive}
              className="flex-1 bg-green-800 hover:bg-green-950 text-white text-sm font-medium py-2 rounded flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Comprar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        productId={id}
      />
    </>
  )
}
