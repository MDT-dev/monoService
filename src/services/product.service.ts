import { ProductsResponse } from '@/types/graphql';

export async function getProducts(): Promise<ProductsResponse> {
  const res = await fetch('/api/products');

  if (!res.ok) {
    throw new Error('Erro ao buscar produtos');
  }

  return res.json();
}
