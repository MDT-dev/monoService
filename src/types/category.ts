export type ProductThumbnail = {
  url: string;
};

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  image?: {
    url: string;
    fileName: string;
    mimeType: string;
  };
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  subCategories?: SubCategory[];
}