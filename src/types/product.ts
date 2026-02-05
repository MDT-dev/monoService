export type ProductThumbnail = {
  url: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  thumbnail: ProductThumbnail;
};
