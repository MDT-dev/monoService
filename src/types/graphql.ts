import { Category } from './category';
import { AllProducts, Product } from './product';

export type AllProductsResponse = {
  products: AllProducts[];
};

export type CategoriesResponse = {
  categories: Category[];
};

export interface ProductDetailResponse {
  product: Product;
}