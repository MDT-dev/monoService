export type ProductThumbnail = {
  url: string;
};

export type category = {
  id: string;
  name: string;
};
export type subCategory = {
  id: string;
  name: string;
  category: category;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  promoPrice: number;
  shortDescription: string;
  thumbnail: ProductThumbnail;
  stock: number;
  isActive: boolean;
  sku: string;
  subCategory: subCategory;
};

export interface AllProducts {
  id: string;
  name: string;
  slug: string;
  price: number;
  promoPrice: number;

  shortDescription: string;
  stock: number;
  isActive: boolean;
  sku: string;
  images: {
    url: string;
    fileName: string;
  };
  thumbnail: {
    url: string;
    fileName: string;
    mimeType: string;
  };
  subCategory: {
    name: string;
    id: string;
    slug: string;
    category: {
      id: string;
      slug: string;
      name: string;
    };
  };
}
