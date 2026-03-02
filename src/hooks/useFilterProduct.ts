// hooks/useProducts.ts
import { getProductsFilter } from "@/services/filterProduct.service";
import { useQuery } from "@tanstack/react-query";


export function useProductsFilter(params: {
  categoria?: string;
  subcategoria?: string;
}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProductsFilter(params),
  });
}