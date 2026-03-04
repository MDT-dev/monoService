"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { X, Share2, Heart, Truck, Clock, ShoppingCart, Check, AlertCircle } from "lucide-react"
import { formatKz } from "@/util/formatCurrency"
import { useCart } from "@/lib/cart-context"
import { useProductDetail } from "@/hooks/useProducts"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Product } from "@/types/graphql"

interface ProductDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  productId: string
}

// Shared loading state component
const LoadingContent = () => (
  <>
    <div className="flex items-center justify-between mb-6">
      <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
    </div>
    <div className="grid sm:grid-cols-2 gap-6">
      <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="space-y-4">
        <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  </>
)

// Shared error state component
interface ErrorContentProps {
  error: unknown
  refetch: () => void
}

const ErrorContent = ({ error, refetch }: ErrorContentProps) => (
  <div className="flex flex-col items-center justify-center py-8 space-y-4">
    <AlertCircle className="w-12 h-12 text-red-500" />
    <p className="text-gray-600 text-center">
      {typeof error === "string" ? error : "Não conseguimos carregar o produto. Tente novamente."}
    </p>
    <button
      onClick={() => refetch()}
      className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-950 transition-colors"
    >
      Tentar novamente
    </button>
  </div>
)

// Shared product content component
interface ProductContentProps {
  product: Product
  quantity: number
  setQuantity: (qty: number) => void
  isWishlisted: boolean
  setIsWishlisted: (state: boolean) => void
  activeTab: "description" | "delivery" | "details"
  setActiveTab: (tab: "description" | "delivery" | "details") => void
  showSuccess: boolean
  handleAddToCart: () => void
  handleShare: () => void
}

const ProductContent = ({
  product,
  quantity,
  setQuantity,
  isWishlisted,
  setIsWishlisted,
  activeTab,
  setActiveTab,
  showSuccess,
  handleAddToCart,
  handleShare,
}: ProductContentProps) => {
  const discount = product?.promoPrice ? Math.round(((product.promoPrice - product.price) / product.promoPrice) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Product Image & Main Info */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Image */}
        <div className="relative bg-gray-50 rounded-lg overflow-hidden aspect-square">
          <Image
            width={400}
            height={400}
            src={product.thumbnail.url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
              -{discount}%
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          {/* Category & Name */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
              {product.subCategory?.category?.name || "Produto"}
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {product.name}
            </h1>
          </div>

          {/* Price */}
          <div className="space-y-2 pb-4 border-b border-gray-100">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                {formatKz(product.price)}
              </span>
              {product.promoPrice && (
                <span className="text-sm sm:text-base text-gray-400 line-through">
                  {formatKz(product.promoPrice)}
                </span>
              )}
            </div>
            {discount > 0 && (
              <p className="text-sm text-red-600 font-medium">
                Economize {formatKz(product.promoPrice! - product.price)}
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div className="space-y-3">
            <div className={`text-sm font-medium ${product.isActive ? "text-green-800" : "text-red-800"}`}>
              {product.isActive ? "✓ Em estoque" : "✗ Fora de estoque"}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 font-medium">Quantidade:</span>
              <div className="flex items-center border border-gray-200 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-50 text-gray-600 font-medium transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-2 text-gray-900 font-medium min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-50 text-gray-600 font-medium transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4">
            {showSuccess ? (
              <div className="w-full bg-green-800 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Adicionado ao carrinho!
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={!product.isActive}
                className="w-full bg-green-800 hover:bg-green-950 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Adicionar ao Carrinho
              </button>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex-1 py-2 rounded-lg border font-medium transition-colors flex items-center justify-center gap-2 ${isWishlisted
                  ? "bg-red-50 border-red-200 text-red-600"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                <span className="hidden sm:inline">
                  {isWishlisted ? "Salvo" : "Salvar"}
                </span>
              </button>
              <button
                onClick={handleShare}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                <span className="hidden sm:inline">Partilhar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-100">
        <div className="flex gap-6 sm:gap-8">
          {(["description", "delivery", "details"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 sm:py-4 text-sm sm:text-base font-medium border-b-2 transition-colors ${activeTab === tab
                ? "border-green-800 text-green-950"
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
      <div className="space-y-4">
        {activeTab === "description" && (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {product.shortDescription}
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-900">
                Este é um excelente produto com ótima qualidade. Procure nossas seções para mais informações detalhadas.
              </p>
            </div>
          </div>
        )}

        {activeTab === "delivery" && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-green-800" />
                  <span className="font-medium text-gray-900">Entrega Rápida</span>
                </div>
                <p className="text-sm text-gray-600 ml-8">
                  Entrega em 2-3 dias úteis
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-800" />
                  <span className="font-medium text-gray-900">Processamento</span>
                </div>
                <p className="text-sm text-gray-600 ml-8">
                  Processado em 24 horas
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium text-gray-900">Políticas de Devolução</p>
              <p className="text-sm text-gray-600">
                Devoluções gratuitas em até 30 dias. Produto deve estar em perfeitas condições.
              </p>
            </div>
          </div>
        )}

        {activeTab === "details" && (
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Categoria</span>
              <span className="font-medium text-gray-900">{product.subCategory?.category?.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Disponibilidade</span>
              <span className={`font-medium ${product.isActive ? "text-green-800" : "text-red-600"}`}>
                {product.isActive ? "Em estoque" : "Indisponível"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Código do Produto</span>
              <span className="font-mono text-sm text-gray-900">{product.id}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 text-sm">Garantia</span>
              <span className="font-medium text-gray-900">12 meses</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  isOpen,
  onClose,
  productId,
}) => {
  const { addToCart } = useCart()
  const { data, isLoading, error, refetch } = useProductDetail(isOpen ? productId : null)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState<"description" | "delivery" | "details">("description")
  const [showSuccess, setShowSuccess] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const product = data?.product

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!isOpen || !productId) return null

  const handleCloseModal = () => {
    setQuantity(1)
    setShowSuccess(false)
    setActiveTab("description")
    onClose()
  }

  // Loading state
  if (isLoading) {
    if (isMobile) {
      return (
        <Drawer open={isOpen} onOpenChange={handleCloseModal}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Carregando...</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-8 space-y-4">
              <LoadingContent />
            </div>
          </DrawerContent>
        </Drawer>
      )
    }

    return (
      <Dialog open={isOpen} onOpenChange={handleCloseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Carregando...</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <LoadingContent />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Error state
  if (error && !isLoading) {
    if (isMobile) {
      return (
        <Drawer open={isOpen} onOpenChange={handleCloseModal}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Erro</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-8">
              <ErrorContent error={error} refetch={refetch} />
            </div>
          </DrawerContent>
        </Drawer>
      )
    }

    return (
      <Dialog open={isOpen} onOpenChange={handleCloseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Erro</DialogTitle>
          </DialogHeader>
          <ErrorContent error={error} refetch={refetch} />
        </DialogContent>
      </Dialog>
    )
  }

  if (!product || !isOpen) return null

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
        url: typeof window !== "undefined" ? `https://www.milones.ao/produtos?search=${product.name}&orderBy=createdAt_ASC&page=1&pageSize=9` : "",
      }).catch(() => {
        const url = typeof window !== "undefined" ? `https://www.milones.ao/produtos?search=${product.name}&orderBy=createdAt_ASC&page=1&pageSize=9` : ""
        navigator.clipboard.writeText(url)
      })
    } else {
      const url = typeof window !== "undefined" ? `https://www.milones.ao/produtos?search=${product.name}&orderBy=createdAt_ASC&page=1&pageSize=9` : ""
      navigator.clipboard.writeText(url)
    }
  }

  // Render Drawer for mobile
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={handleCloseModal}>
        <DrawerContent>
          <DrawerHeader className="border-b border-gray-100">
            <DrawerTitle>Detalhes do Produto</DrawerTitle>
            <DrawerClose className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded transition-colors" aria-label="Close drawer">
              <X className="w-6 h-6 text-gray-600" />
            </DrawerClose>
          </DrawerHeader>
          <div className="px-4 pb-8 overflow-y-auto max-h-[85vh]">
            <ProductContent
              product={product}
              quantity={quantity}
              setQuantity={setQuantity}
              isWishlisted={isWishlisted}
              setIsWishlisted={setIsWishlisted}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              showSuccess={showSuccess}
              handleAddToCart={handleAddToCart}
              handleShare={handleShare}
            />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  // Render Dialog for desktop
  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-gray-100 pb-6">
          <DialogTitle>Detalhes do Produto</DialogTitle>
          <DialogClose className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded transition-colors" aria-label="Close modal">
            <X className="w-6 h-6 text-gray-600" />
          </DialogClose>
        </DialogHeader>
        <div className="px-2">
          <ProductContent
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            isWishlisted={isWishlisted}
            setIsWishlisted={setIsWishlisted}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            showSuccess={showSuccess}
            handleAddToCart={handleAddToCart}
            handleShare={handleShare}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
