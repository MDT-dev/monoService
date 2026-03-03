/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Utilitários para gerenciar URL params de paginação e filtros
 */

export interface URLParamsConfig {
  search?: string;
  category?: string;
  maxPrice?: number;
  orderBy?: string;
  page?: number;
  pageSize?: number;
}

/**
 * Cria uma string de query params a partir de um objeto
 */
export function createQueryString(params: URLParamsConfig): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}

/**
 * Cria a URL com os params de filtro
 */
export function createFilterUrl(params: URLParamsConfig): string {
  const queryString = createQueryString(params);
  return queryString ? `?${queryString}` : '';
}

/**
 * Extrai params da URL
 */
export function extractParamsFromUrl(searchParams: URLSearchParams): URLParamsConfig {
  return {
    search: searchParams.get('search') || undefined,
    category: searchParams.get('category') || undefined,
    maxPrice: searchParams.get('maxPrice')
      ? parseInt(searchParams.get('maxPrice')!)
      : undefined,
    orderBy: searchParams.get('orderBy') || undefined,
    page: searchParams.get('page')
      ? parseInt(searchParams.get('page')!)
      : undefined,
    pageSize: searchParams.get('pageSize')
      ? parseInt(searchParams.get('pageSize')!)
      : undefined,
  };
}

/**
 * Atualiza um param específico mantendo os outros
 */
export function updateParam(
  current: URLParamsConfig,
  key: keyof URLParamsConfig,
  value: any
): URLParamsConfig {
  return {
    ...current,
    [key]: value === undefined || value === null ? undefined : value,
    page: key === 'search' || key === 'category' || key === 'maxPrice' ? 1 : current.page,
  };
}
