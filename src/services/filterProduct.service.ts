import { AllProductsResponse } from "@/types/graphql";

// services/product.service.ts
export async function getProductsFilter(params: {
  nameProduto?: string;
  categoria?: string;
  subcategoria?: string;
}): Promise<AllProductsResponse> {
  const query = new URLSearchParams(params as Record<string, string>);
  const res = await fetch(`/api/filter?${query.toString()}`);

  if (!res.ok) throw new Error('Erro ao filtrar produtos');
  return res.json();
}

