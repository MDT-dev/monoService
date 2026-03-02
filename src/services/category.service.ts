import { CategoriesResponse } from '@/types/graphql';

export async function getCategories(): Promise<CategoriesResponse> {
  const res = await fetch('/api/categories');

  if (!res.ok) {
    throw new Error('Erro ao buscar categorias');
  }

  return res.json();
}
