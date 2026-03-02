// hooks/useProducts.ts
import { getProductsSearch } from "@/services/searchProduct.service"; 
import { useQuery } from "@tanstack/react-query";

export function useProductsSearch(params: {
  nameProduto?: string;
}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProductsSearch(params),
  });
}