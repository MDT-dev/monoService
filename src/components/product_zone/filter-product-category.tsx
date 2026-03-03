"use client"
import { useMemo } from "react"
import { ProductCard } from "@/components/product-card"

import { useSearchParams } from "next/navigation"
import { useProductsFilter } from "@/hooks/useFilterProduct"
import { Button } from "@/components/ui/button"


export function ProductsFilter() {

    const searchParams = useSearchParams()
    const categoria = searchParams.get("categoria") ?? ""
    const subcategoria = searchParams.get("subcategoria") ?? ""

    const { data } = useProductsFilter({ categoria, subcategoria })

    const allProducts = useMemo(() => data?.products ?? [], [data])

    const clearFilters = () => {

    }
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Nossos produtos</h1>
                    <p className="text-lg text-muted-foreground">Explore nosso catálogo de produtos</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    <div className="flex-1">
                        {allProducts.length > 0 ? (
                            <>
                                <div className="mb-6 text-sm text-muted-foreground font-medium">
                                    Mostrando {allProducts.length} produtos
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {allProducts.map((product) => (
                                        <ProductCard key={product.id} {...product} />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16">
                                <p className="text-lg text-muted-foreground mb-4">Nenhum produto encontrado</p>
                                <Button onClick={clearFilters} className="bg-accent hover:bg-accent/90">
                                    Limpar filtros
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
