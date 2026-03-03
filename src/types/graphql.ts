import { Category } from './category';

export type CategoriesResponse = {
  categories: Category[];
};

export interface ProductDetailResponse {
  product: Product;
}


export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  shortDescription: string;
  promoPrice?: number;
  stock: number;
  images: Array<{
    url: string;
    fileName: string;
  }>;
  isActive: boolean;
  sku: string;
  thumbnail: {
    url: string;
    fileName: string;
    mimeType: string;
  };
  subCategory: {
    id: string;
    name: string;
    slug: string;
    category: {
      id: string;
      slug: string;
      name: string;
    };
  };
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  endCursor?: string;
  startCursor?: string;
}

export interface ProductsConnection {
  pageInfo: PageInfo;
  aggregate: {
    count: number;
  };
}

export interface AllProductsResponse {
  products: Product[];
  productsConnection: ProductsConnection;
}

export interface ProductDetailResponse {
  product: Product;
}
