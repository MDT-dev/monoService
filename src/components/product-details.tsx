"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Share2, Heart, Truck, Clock, ShoppingCart, Check, AlertCircle } from "lucide-react"
import { formatKz } from "@/util/formatCurrency"
import { useCart } from "@/lib/cart-context"
import { useProductDetail } from "@/hooks/useProducts"
import { SuggestedProductsCarousel } from "./product_zone/suggested-products-carousel"
import Script from "next/script"

interface ProductPageProps {
  params: {
    slug: string
  }
}
const priceValidUntil = new Date(
  Date.now() + 30 * 24 * 60 * 60 * 1000
)
  .toISOString()
  .split("T")[0]

export function ProductDetails({ params }: ProductPageProps) {
  const { slug } = params
  const { addToCart } = useCart()
  const { data, isLoading, error, refetch } = useProductDetail(slug)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState<"description" | "delivery" | "details">("description")
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const product = data?.product

  const discount = product?.promoPrice ? Math.round(((product.promoPrice - product.price) / product.promoPrice) * 100) : 0
  const categoria = product?.subCategory?.category?.slug || ""
  const subcategoria = product?.subCategory?.slug || ""
  // Use product images if available, otherwise create 4 placeholders
  const imagesToDisplay = product?.images && product.images.length > 0
    ? product.images
    : [...Array(4)].map(() => ({ url: product?.thumbnail?.url || "", fileName: "" }))

  const handleAddToCart = () => {
    if (!product) return

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.thumbnail?.url || "",
      category: product.subCategory?.category?.name,
      quantity,
    })
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  const handleShare = () => {
    if (!product) return

    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription || "Confira este produto!",
        url: typeof window !== "undefined" ? `${window.location.origin}/produto/${slug}` : "",
      }).catch(() => {
        const url = typeof window !== "undefined" ? `${window.location.origin}/produto/${slug}` : ""
        navigator.clipboard.writeText(url)
      })
    } else {
      const url = typeof window !== "undefined" ? `${window.location.origin}/produto/${slug}` : ""
      navigator.clipboard.writeText(url)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-2 border-green-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-light">Carregando produto...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
          <div className="space-y-2">
            <p className="text-xl font-semibold text-gray-900">Produto não encontrado</p>
            <p className="text-gray-600 font-light">Desculpe, este produto não está disponível no momento.</p>
          </div>
          <button
            onClick={() => refetch()}
            className="px-8 py-3 bg-green-800 hover:bg-green-900 text-white font-medium rounded-lg transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }
  // Generate JSON-LD structured data
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "website",
    "name": product.name,
    "image": product.thumbnail?.url,
    "description": product.shortDescription || product.name,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Milones Lda"
    },
    "offers": {
      "@type": "Offer",
      "url": typeof window !== "undefined" ? `${window.location.origin}/produto/${slug}` : "",
      "priceCurrency": "AOA",
      "price": product.price,
      "priceValidUntil": priceValidUntil,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.isActive ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Milones Lda"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.5,
      "ratingCount": 128
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
      {/* Header with back button */}
      <Script
        id="product-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="/produtos" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            ← Voltar
          </a>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-2 rounded-full transition-all ${isWishlisted ? "bg-red-50" : "hover:bg-gray-100"}`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </button>
            <button onClick={handleShare} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="aspect-square relative">

                <Image
                  width={400}
                  height={400}
                  src={imagesToDisplay[selectedImage]?.url || product.thumbnail.url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                    -{discount}%
                  </div>
                )}
              </div>
            </div>

            {/* Image thumbnails placeholder - enhance with multiple images if available */}
            <div className={`grid gap-3 ${imagesToDisplay.length > 4 ? 'grid-cols-5' : 'grid-cols-4'}`}>
              {imagesToDisplay.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? "border-green-800" : "border-gray-200"
                    }`}
                >
                  <Image
                    width={120}
                    height={120}
                    src={image.url}
                    alt={image.fileName || `View ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            {/* Category & Title */}
            <div className="space-y-4">
              <p className="text-xs font-semibold text-green-800 uppercase tracking-widest">
                {product.subCategory?.category?.name}
              </p>
              <h1 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Price Section */}
            <div className="space-y-3 pb-8 border-b border-gray-200">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-light text-gray-900">{formatKz(product.price)}</span>
                {product.promoPrice && (
                  <span className="text-xl text-gray-400 line-through font-light">
                    {formatKz(product.promoPrice)}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p className="text-sm text-green-700 font-medium">
                  Economize {formatKz(product.promoPrice! - product.price)}
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              <p className={`font-medium ${product.isActive ? "text-green-900" : "text-red-900"}`}>
                {product.isActive ? "Em estoque" : "Fora de estoque"}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-900">Quantidade</label>
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-3 hover:bg-gray-50 text-gray-600 font-medium transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-3 text-gray-900 font-semibold min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-5 py-3 hover:bg-gray-50 text-gray-600 font-medium transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-3 pt-4">
              {showSuccess ? (
                <div className="w-full bg-green-800 text-white font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-3">
                  <Check className="w-5 h-5" />
                  Adicionado ao carrinho!
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={!product.isActive}
                  className="w-full bg-green-800 hover:bg-green-900 disabled:bg-gray-300 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-3 text-lg"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Adicionar ao Carrinho
                </button>
              )}
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-green-800" />
                  <span className="font-medium text-gray-900">Entrega Rápida</span>
                </div>
                <p className="text-sm text-gray-600 ml-8">2-3 dias úteis</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-800" />
                  <span className="font-medium text-gray-900">Processamento</span>
                </div>
                <p className="text-sm text-gray-600 ml-8">24 horas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-20 space-y-12">
          <div className="border-b border-gray-200">
            <div className="flex gap-8 overflow-x-auto">
              {(["description", "delivery", "details"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
                      ? "border-green-800 text-green-900"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {tab === "description" && "Descrição"}
                  {tab === "delivery" && "Entrega"}
                  {tab === "details" && "Detalhes"}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-3xl">
            {activeTab === "description" && (
              <div className="space-y-6">
                {product.description?.html ? (
                  <div
                    className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: product.description.html
                        .replace(/<li><div>/g, "<li>")
                        .replace(/<\/div><\/li>/g, "</li>"),
                    }}
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed text-lg">{product.shortDescription}</p>
                )}
              </div>
            )}

            {activeTab === "delivery" && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-4">
                  <div className="flex items-start gap-4">
                    <Truck className="w-6 h-6 text-green-800 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Entrega Rápida</h3>
                      <p className="text-gray-600">Entregamos em 2-3 dias úteis para a maioria das localidades.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-4">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-green-800 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Processamento</h3>
                      <p className="text-gray-600">Seu pedido é processado em até 24 horas após confirmação.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                  <h3 className="font-semibold text-gray-900 mb-3">Políticas de Devolução</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Devoluções gratuitas em até 30 dias. O produto deve estar em perfeitas condições, com embalagem original e acessórios.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-4">
                {[
                  { label: "Categoria", value: product.subCategory?.category?.name },
                  { label: "Subcategoria", value: product.subCategory?.name },
                  { label: "Disponibilidade", value: product.isActive ? "Em estoque" : "Indisponível" },
                  { label: "Código do Produto", value: product.id },
                  { label: "Garantia", value: "12 meses" },
                ].map((detail, idx) => (
                  <div key={idx} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0">
                    <span className="text-gray-600 font-medium">{detail.label}</span>
                    <span className="text-gray-900 font-semibold">{detail.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Suggested Products */}
        {categoria && subcategoria && (
          <div className="mt-24 pt-20 border-t border-gray-200">
            <SuggestedProductsCarousel
              categoria={categoria}
              subcategoria={subcategoria}
              currentProductId={product.id}
            />
          </div>
        )}
      </div>
    </div>
  )
}