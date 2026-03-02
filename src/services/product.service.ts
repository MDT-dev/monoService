import { AllProductsResponse, ProductDetailResponse} from '@/types/graphql';

export async function getAllProducts(): Promise<AllProductsResponse> {
  const res = await fetch('/api/all-products');

  if (!res.ok) {
    throw new Error('Erro ao buscar produtos');
  }

  return res.json();
}

export async function getProductDetail(productId: string | null): Promise<ProductDetailResponse> {
  const res = await fetch( `/api/products/${productId}`)

  if (!res.ok) {
    throw new Error('Erro ao buscar o detalhes do produtos');
  }

  return res.json();
}
