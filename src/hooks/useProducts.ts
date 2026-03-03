/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllProducts, getProductDetail, ProductFilters } from '@/services/product.service';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

/**
 * Hook para buscar todos os produtos com filtros e paginação
 * Usa URL params automaticamente
 */
export function useAllProducts(filters?: ProductFilters) {
  const searchParams = useSearchParams();

  // Merge URL params com filters passados como argumento
  const mergedFilters = useMemo(() => {
    const urlFilters: ProductFilters = {
      search: searchParams.get('search') || filters?.search,
      category: searchParams.get('category') || filters?.category,
      maxPrice: searchParams.get('maxPrice')
        ? parseInt(searchParams.get('maxPrice')!)
        : filters?.maxPrice,
      orderBy: (searchParams.get('orderBy') as any) || filters?.orderBy,
      page: searchParams.get('page')
        ? parseInt(searchParams.get('page')!)
        : filters?.page,
      pageSize: searchParams.get('pageSize')
        ? parseInt(searchParams.get('pageSize')!)
        : filters?.pageSize || 12,
  
    };

    // Remove undefined values
    Object.keys(urlFilters).forEach((key) => {
      if (urlFilters[key as keyof ProductFilters] === undefined) {
        delete urlFilters[key as keyof ProductFilters];
      }
    });

    return urlFilters;
  }, [searchParams, filters]);

  return useQuery({
    queryKey: ['products', mergedFilters],
    queryFn: () => getAllProducts(mergedFilters),
  });
}

/**
 * Hook para buscar detalhes de um produto
 */
export function useProductDetail(productId: string | null) {
  return useQuery({
    queryKey: ['products', productId],
    queryFn: () => getProductDetail(productId),
    enabled: !!productId,
  });
}
