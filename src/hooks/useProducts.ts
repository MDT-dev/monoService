import { useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  getProductDetail,
} from "@/services/product.service";



export function useAllProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
}

export function useProductDetail(productId: string | null) {
  return useQuery({
    queryKey: ["products",productId],
    queryFn: () => getProductDetail(productId),
    enabled:!!productId
  });
}
