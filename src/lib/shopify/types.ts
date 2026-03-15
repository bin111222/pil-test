/** Shapes used by our UI; can be populated from Shopify or mock data */
export interface ProductCardData {
  id: string;
  title: string;
  handle: string;
  price: string;
  compareAtPrice?: string;
  discountLabel?: string;
  pricePrefix?: string;
  imageSrc?: string | null;
  imageAlt?: string;
  /** Shopify productType field – used for client-side filtering */
  productType?: string;
  /** Shopify tags – used for collection filtering */
  tags?: string[];
}

export interface CategoryTileData {
  id: string;
  name: string;
  handle: string;
  description?: string;
  imageSrc?: string | null;
  imageAlt?: string;
}

export interface CollectionPageData {
  id: string;
  title: string;
  handle: string;
  description?: string;
  imageSrc?: string | null;
  imageAlt?: string;
  products: ProductCardData[];
}

export interface ProductDetailData {
  id: string;
  handle: string;
  title: string;
  description?: string;
  price: string;
  compareAtPrice?: string;
  discountLabel?: string;
  pricePrefix?: string;
  /** First variant id for add-to-cart */
  variantId?: string | null;
  images: Array<{ url: string; altText?: string }>;
  benefits?: string[];
  usageInstructions?: string[];
  faqs?: Array<{ question: string; answer: string }>;
}
