/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { useAllProducts } from '@/hooks/useProducts';
import { ProductFilters } from '@/services/product.service';
import { createFilterUrl, updateParam } from '@/lib/pagination';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { ProductCard } from '../product-card';

const ITEMS_PER_PAGE = 9;

export function ProdutosGrid() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [localSearch, setLocalSearch] = useState(searchParams.get('search') || '');
    const [selectedMaxPrice, setSelectedMaxPrice] = useState(
        searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : 0
    );

    // Extract current params from URL
    const currentParams = useMemo((): ProductFilters => {
        const orderByParam = searchParams.get('orderBy');
        const validOrderBy = ['createdAt_ASC', 'price_ASC', 'price_DESC', 'name_ASC', 'name_DESC'] as const;
        const isValidOrderBy = orderByParam && validOrderBy.includes(orderByParam as any);

        return {
            search: searchParams.get('search') || undefined,
            category: searchParams.get('category') || undefined,
            maxPrice: searchParams.get('maxPrice')
                ? parseInt(searchParams.get('maxPrice')!)
                : undefined,
            orderBy: isValidOrderBy
                ? (orderByParam as 'createdAt_ASC' | 'price_ASC' | 'price_DESC' | 'name_ASC' | 'name_DESC')
                : 'createdAt_ASC',
            page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
            pageSize: ITEMS_PER_PAGE,
        };
    }, [searchParams]);

    // Fetch products
    const { data, isLoading, error } = useAllProducts(currentParams);

    const allProducts = useMemo(() => data?.products ?? [], [data]);
    const totalCount = useMemo(() => data?.productsConnection?.aggregate?.count ?? 0, [data]);

    // Calculate max price from all products
    const maxPrice = useMemo(() => {
        if (!allProducts.length) return 1000;
        return Math.max(...allProducts.map((p) => p.price));
    }, [allProducts]);

    const effectiveMaxPrice = selectedMaxPrice || maxPrice;

    const handleSearch = useCallback(() => {
        const updated = updateParam(currentParams, 'search', localSearch || undefined);
        const queryString = createFilterUrl(updated);
        router.push(`/produtos${queryString}`);
    }, [currentParams, localSearch, router]);

    const handlePriceChange = (value: number) => {
        setSelectedMaxPrice(value);
        const updated = updateParam(currentParams, 'maxPrice', value || undefined);
        const queryString = createFilterUrl(updated);
        router.push(`/produtos${queryString}`);
    };

    const handleSortChange = (sortBy: string) => {
        const updated = updateParam(currentParams, 'orderBy', sortBy as any);
        const queryString = createFilterUrl(updated);
        router.push(`/produtos${queryString}`);
    };

    const handlePageChange = (newPage: number) => {
        // const skip = (newPage - 1) * ITEMS_PER_PAGE;
        const queryString = createFilterUrl({
            ...currentParams,
            page: newPage,
        });

        router.push(`/produtos${queryString}`);
    };

    const clearFilters = () => {
        setLocalSearch('');
        setSelectedMaxPrice(0);
        router.push('/produtos');
    };

    const hasActiveFilters =
        currentParams.search ||
        currentParams.maxPrice ||
        currentParams.orderBy !== 'createdAt_ASC';

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return (
        <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Nossos produtos</h1>
                    <p className="text-lg text-muted-foreground">Explore nosso catálogo de produtos</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-foreground">Filtros</h2>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-accent hover:text-accent/80 text-sm flex items-center gap-1"
                                    >
                                        <X className="w-4 h-4" />
                                        Limpar
                                    </button>
                                )}
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <label className="text-sm font-semibold text-foreground mb-2 block">
                                    Pesquisar
                                </label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            type="search"
                                            placeholder="Buscar produtos..."
                                            value={localSearch}
                                            onChange={(e) => setLocalSearch(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                            className="pl-10"
                                        />
                                    </div>
                                    <Button onClick={handleSearch} className="bg-accent hover:bg-accent/90">
                                        OK
                                    </Button>
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="text-sm font-semibold text-foreground mb-3 block">
                                    Intervalo de Preço
                                </label>
                                <div className="space-y-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max={maxPrice}
                                        value={effectiveMaxPrice}
                                        onChange={(e) => handlePriceChange(Number(e.target.value))}
                                        className="w-full"
                                    />
                                    <div className="flex items-center justify-between text-sm text-muted-foreground" suppressHydrationWarning>
                                        <span>Kz 0</span>
                                        <span>Kz {effectiveMaxPrice.toLocaleString('pt-AO')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Sort */}
                            <div>
                                <label className="text-sm font-semibold text-foreground mb-3 block">
                                    Ordenar por
                                </label>
                                <select
                                    value={currentParams.orderBy || 'createdAt_ASC'}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm font-medium"
                                >
                                    <option value="createdAt_ASC">Mais Recente</option>
                                    <option value="price_ASC">Preço: Menor para Maior</option>
                                    <option value="price_DESC">Preço: Maior para Menor</option>
                                    <option value="name_ASC">Nome: A-Z</option>
                                    <option value="name_DESC">Nome: Z-A</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-16">
                                <p className="text-lg text-muted-foreground">Carregando produtos...</p>
                            </div>
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center py-16">
                                <p className="text-lg text-muted-foreground mb-4">Erro ao carregar produtos</p>
                                <Button onClick={clearFilters} className="bg-accent hover:bg-accent/90">
                                    Tentar novamente
                                </Button>
                            </div>
                        ) : allProducts.length > 0 ? (
                            <>
                                <div className="mb-6 text-sm text-muted-foreground font-medium">
                                    Mostrando {allProducts.length} de {totalCount} produtos
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                     {allProducts.map((product) => (
                                        <ProductCard key={product.id} {...product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-8">
                                        <Pagination>
                                            <PaginationContent>
                                                <PaginationItem>
                                                    <PaginationPrevious
                                                        onClick={() => {
                                                            if ((currentParams.page || 1) > 1) {
                                                                handlePageChange((currentParams.page || 1) - 1);
                                                            }
                                                        }}
                                                        className={`cursor-pointer ${(currentParams.page || 1) === 1 ? "pointer-events-none opacity-50" : ""
                                                            }`}
                                                    />
                                                </PaginationItem>

                                                {Array.from({ length: totalPages }).map((_, i) => {
                                                    const page = i + 1;
                                                    const currentPage = currentParams.page || 1;

                                                    // Show first page, current page range, and last page
                                                    if (
                                                        page === 1 ||
                                                        page === totalPages ||
                                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                                    ) {
                                                        return (
                                                            <PaginationItem key={page}>
                                                                <PaginationLink
                                                                    onClick={() => handlePageChange(page)}
                                                                    isActive={page === currentPage}
                                                                    className="cursor-pointer"
                                                                >
                                                                    {page}
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        );
                                                    }

                                                    // Show ellipsis for skipped pages
                                                    if (page === 2 && currentPage > 3) {
                                                        return (
                                                            <PaginationItem key="ellipsis-start">
                                                                <PaginationEllipsis />
                                                            </PaginationItem>
                                                        );
                                                    }

                                                    if (page === totalPages - 1 && currentPage < totalPages - 2) {
                                                        return (
                                                            <PaginationItem key="ellipsis-end">
                                                                <PaginationEllipsis />
                                                            </PaginationItem>
                                                        );
                                                    }

                                                    return null;
                                                })}

                                                <PaginationItem>

                                                    <PaginationNext
                                                        onClick={() => {
                                                            if ((currentParams.page || 1) < totalPages) {
                                                                handlePageChange((currentParams.page || 1) + 1);
                                                            }
                                                        }}
                                                        className={`cursor-pointer ${(currentParams.page || 1) === totalPages ? "pointer-events-none opacity-50" : ""
                                                            }`}
                                                    />
                                                </PaginationItem>
                                            </PaginationContent>
                                        </Pagination>
                                    </div>
                                )}
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
    );
}
