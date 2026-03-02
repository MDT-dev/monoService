import { AllProductsResponse } from "@/types/graphql";

// services/product.service.ts
export async function getProductsSearch(params: {
  nameProduto?: string;
}): Promise<AllProductsResponse> {
  const query = new URLSearchParams(params as Record<string, string>);
  const res = await fetch(`/api/search?${query.toString()}`);

  if (!res.ok) throw new Error('Erro ao pesquisar produtos');
  return res.json();
}

