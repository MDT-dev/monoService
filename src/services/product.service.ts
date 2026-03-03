import { AllProductsResponse, ProductDetailResponse } from "@/types/graphql";

export interface ProductFilters {
  search?: string;
  category?: string;
  maxPrice?: number;
  orderBy?: "createdAt_ASC" | "price_ASC" | "price_DESC" | "name_ASC"| "name_DESC";
  page?: number;
  pageSize?: number;
}

export async function getAllProducts(
  filters?: ProductFilters,
): Promise<AllProductsResponse> {
  const params = new URLSearchParams();

  if (filters?.search) params.append("search", filters.search);
  if (filters?.category) params.append("category", filters.category);
  if (filters?.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
  if (filters?.orderBy) params.append("orderBy", filters.orderBy);

  // Handle pagination
  if (filters?.page && filters?.pageSize) {
    const skip = (filters.page - 1) * filters.pageSize;
    params.append("skip", skip.toString());
    params.append("first", filters.pageSize.toString());
  } else if (filters?.pageSize) {
    params.append("first", filters.pageSize.toString());
  } else {
    params.append("first", "12");
  }

  const query = params.toString();
  const url = `/api/all-products${query ? `?${query}` : ""}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return res.json();
}

export async function getProductDetail(
  productId: string | null,
): Promise<ProductDetailResponse> {
  const res = await fetch(`/api/products/${productId}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar os detalhes do produto");
  }

  return res.json();
}
