import { shopifyFetch, isShopifyConfigured } from "./client";
import { COLLECTIONS_FOR_HOMEPAGE, COLLECTION_PRODUCTS, COLLECTION_PAGE, PRODUCT_BY_HANDLE, ALL_PRODUCTS } from "./queries";
import type { ProductCardData, CategoryTileData, CollectionPageData, ProductDetailData, NavCollection } from "./types";

/** Shopify API response shapes (minimal) */
interface CollectionsResponse {
  collections: {
    edges: Array<{
      node: {
        id: string;
        handle: string;
        title: string;
        description: string;
        image?: { url: string; altText?: string } | null;
      };
    }>;
  };
}

interface CollectionProductsResponse {
  collection: {
    id: string;
    title: string;
    handle: string;
    products: {
      edges: Array<{
        node: {
          id: string;
          handle: string;
          title: string;
          priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
          compareAtPriceRange: { minVariantPrice: { amount: string } };
          images: { edges: Array<{ node: { url: string; altText?: string } }> };
        };
      }>;
    };
  } | null;
}

function formatPrice(amount: string, currencyCode: string): string {
  const n = parseFloat(amount);
  if (currencyCode === "INR") return `₹ ${n.toFixed(2)}`;
  return `${currencyCode} ${n.toFixed(2)}`;
}

function discountPercent(price: number, compareAt: number): string | undefined {
  if (compareAt <= 0 || price >= compareAt) return undefined;
  const pct = Math.round(((compareAt - price) / compareAt) * 100);
  return pct > 0 ? `${pct}% off` : undefined;
}

/** Canonical product categories – matches product filters and nav. Homepage always shows these; Shopify fills in images/descriptions when available. */
const HOMEPAGE_CATEGORIES: Omit<CategoryTileData, "id">[] = [
  { name: "Skin Care",     handle: "skin-care",               description: "Face wash, soaps, sunscreen & moisturizers" },
  { name: "Hair Care",     handle: "hair-care",               description: "Shampoo, serum & scalp care" },
  { name: "Body Care",     handle: "body-care",               description: "Soaps, creams & body care" },
  { name: "Oral Care",     handle: "oral-care",               description: "Mouth gel & oral hygiene" },
  { name: "Foot Care",     handle: "foot-care",               description: "Foot cream & foot care" },
  { name: "Pain Relief",   handle: "pain-managment",          description: "Roll on, spray & gel" },
  { name: "Pet Care",      handle: "pet-care",                description: "Pet shampoo, soap & grooming" },
  { name: "Medicines",     handle: "medicines",               description: "Cough, cold & wellness" },
];

/** Fetch collections for homepage category grid. Uses canonical product categories; Shopify data (when available) only enriches with images/descriptions. */
export async function getHomepageCollections(): Promise<CategoryTileData[]> {
  const fallback: CategoryTileData[] = HOMEPAGE_CATEGORIES.map((cat, i) => ({
    id: `cat-${cat.handle}`,
    ...cat,
    imageSrc: null,
    imageAlt: undefined,
  }));

  if (!isShopifyConfigured()) return fallback;

  try {
    const data = await shopifyFetch<CollectionsResponse>(COLLECTIONS_FOR_HOMEPAGE, { first: 50 });
    const edges = data.collections?.edges ?? [];
    const byHandle = new Map(
      edges.map(({ node }) => [node.handle.toLowerCase(), node])
    );

    return HOMEPAGE_CATEGORIES.map((cat, i) => {
      const shopify = byHandle.get(cat.handle.toLowerCase());
      if (shopify) {
        return {
          id: shopify.id,
          name: cat.name,
          handle: cat.handle,
          description: shopify.description?.slice(0, 80) ?? cat.description,
          imageSrc: shopify.image?.url ?? null,
          imageAlt: shopify.image?.altText ?? undefined,
        };
      }
      return {
        id: `cat-${cat.handle}`,
        ...cat,
        imageSrc: null,
        imageAlt: undefined,
      };
    });
  } catch {
    return fallback;
  }
}

/** Fetch collections for header/footer nav. Returns minimal { id, title, handle } list. */
export async function getAllCollectionsForNav(): Promise<NavCollection[]> {
  const categories = await getHomepageCollections();
  return categories.map((c) => ({
    id: c.id,
    title: c.name,
    handle: c.handle,
  }));
}

/** Fetch bestseller products. Tries "bestsellers" collection first, falls back to top products from all-products. */
export async function getBestsellerProducts(): Promise<ProductCardData[]> {
  // Curated bestseller picks from the real PIL product range
  const mock: ProductCardData[] = [
    MOCK_ALL_PRODUCTS[0],  // AcneGuard Face wash Gel
    MOCK_ALL_PRODUCTS[4],  // AcneGuard Gold Soap
    MOCK_ALL_PRODUCTS[5],  // Dermacare AcneGuard Soap
    MOCK_ALL_PRODUCTS[25], // Orthodex Roll On
    MOCK_ALL_PRODUCTS[19], // Kerotop Shampoo
    MOCK_ALL_PRODUCTS[32], // Tick & Flea Ultra Dog Shampoo
    MOCK_ALL_PRODUCTS[34], // Dermopil Pet Anti-Itch Shampoo
    MOCK_ALL_PRODUCTS[37], // Neem Plus Pet Shampoo
  ];

  if (!isShopifyConfigured()) return mock;

  // Try a "bestsellers" manual collection first; if empty/missing, pull first 8 products
  try {
    const data = await shopifyFetch<CollectionProductsResponse>(COLLECTION_PRODUCTS, {
      handle: "bestsellers",
      first: 20,
    });
    const edges = data.collection?.products?.edges ?? [];
    if (edges.length > 0) {
      return edges.map(({ node }) => {
        const price     = parseFloat(node.priceRange.minVariantPrice.amount);
        const compareAt = parseFloat(node.compareAtPriceRange.minVariantPrice.amount);
        const cc        = node.priceRange.minVariantPrice.currencyCode;
        const image     = node.images?.edges?.[0]?.node;
        return {
          id: node.id, title: node.title, handle: node.handle,
          price: formatPrice(node.priceRange.minVariantPrice.amount, cc),
          compareAtPrice: compareAt > 0 ? formatPrice(node.compareAtPriceRange.minVariantPrice.amount, cc) : undefined,
          discountLabel: discountPercent(price, compareAt),
          imageSrc: image?.url ?? null,
          imageAlt: image?.altText ?? undefined,
        };
      });
    }
  } catch { /* fall through */ }

  // Fallback: first 8 products from the full catalog
  try {
    const all = await getAllProducts(8);
    return all.length > 0 ? all : mock;
  } catch {
    return mock;
  }
}

/** Shopify sort keys for collection products */
export type CollectionSortKey =
  | "BEST_SELLING"
  | "CREATED"
  | "PRICE"
  | "RELEVANCE"
  | "TITLE";

interface CollectionPageResponse {
  collection: {
    id: string;
    title: string;
    handle: string;
    description: string;
    image?: { url: string; altText?: string } | null;
    products: {
      edges: Array<{
        node: {
          id: string;
          handle: string;
          title: string;
          priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
          compareAtPriceRange: { minVariantPrice: { amount: string } };
          images: { edges: Array<{ node: { url: string; altText?: string } }> };
        };
      }>;
    };
  } | null;
}

const MOCK_COLLECTION_PRODUCTS: ProductCardData[] = [
  { id: "mock-1", title: "AcneGuard Face wash Gel", handle: "acneguard-face-wash-gel", price: "₹ 172.90", compareAtPrice: "₹ 182.00", discountLabel: "5% off" },
  { id: "mock-2", title: "AcneGuard Gold Soap", handle: "acneguard-gold-soap", price: "₹ 180.00", compareAtPrice: "₹ 194.78", discountLabel: "7% off" },
  { id: "mock-3", title: "Dermacare AcneGuard Soap", handle: "dermacare-acneguard-soap", price: "₹ 110.00", compareAtPrice: "₹ 126.26", discountLabel: "12% off" },
  { id: "mock-4", title: "Orthodex Roll On", handle: "orthodex-roll-on", price: "₹ 125.00", compareAtPrice: "₹ 145.31", discountLabel: "13% off" },
  { id: "mock-5", title: "Kerotop Shampoo", handle: "kerotop-shampoo", price: "₹ 440.00", compareAtPrice: "₹ 538.34", discountLabel: "18% off" },
  { id: "mock-6", title: "Neem Plus Pet Shampoo", handle: "neem-plus-pet-shampoo", price: "₹ 199.00", pricePrefix: "From", compareAtPrice: "₹ 293.64", discountLabel: "32% off" },
];

/** Handles that represent our product categories – collection pages for these show products filtered by tag (same as main products list). */
const CATEGORY_HANDLES = new Set(HOMEPAGE_CATEGORIES.map((c) => c.handle.toLowerCase()));

function parsePriceFromDisplay(str: string): number {
  const m = str.replace(/,/g, "").match(/[\d.]+/);
  return m ? parseFloat(m[0]) : 0;
}

function sortProducts(products: ProductCardData[], sortKey?: CollectionSortKey): ProductCardData[] {
  if (!sortKey || sortKey === "RELEVANCE" || sortKey === "BEST_SELLING" || sortKey === "CREATED") {
    return [...products];
  }
  const sorted = [...products];
  if (sortKey === "TITLE") {
    sorted.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));
  } else if (sortKey === "PRICE") {
    sorted.sort((a, b) => parsePriceFromDisplay(a.price) - parsePriceFromDisplay(b.price));
  }
  return sorted;
}

/** Fetch collection by handle for collection page. For canonical category handles, products are filtered by tag (matching main products list); otherwise uses Shopify collection. */
export async function getCollectionPageData(
  handle: string,
  sortKey?: CollectionSortKey,
  first = 24
): Promise<CollectionPageData | null> {
  const handleLower = handle.toLowerCase();
  const isCategory = CATEGORY_HANDLES.has(handleLower);
  const meta = HOMEPAGE_CATEGORIES.find((c) => c.handle.toLowerCase() === handleLower);

  if (isCategory && meta) {
    const allProducts = await getAllProducts(250);
    const filtered = allProducts.filter((p) => (p.tags ?? []).includes(handleLower));
    const sorted = sortProducts(filtered, sortKey);
    const products = sorted.slice(0, first);

    return {
      id: `cat-${meta.handle}`,
      title: meta.name,
      handle: meta.handle,
      description: meta.description,
      imageSrc: null,
      imageAlt: undefined,
      products,
    };
  }

  const mockTitle = handle.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const mock: CollectionPageData = {
    id: `mock-${handle}`,
    title: mockTitle,
    handle,
    description: `Shop our ${mockTitle} range. Trusted healthcare from PIL.`,
    products: MOCK_COLLECTION_PRODUCTS,
  };

  if (!isShopifyConfigured()) return mock;

  try {
    const data = await shopifyFetch<CollectionPageResponse>(COLLECTION_PAGE, {
      handle,
      first,
    });
    const col = data.collection;
    if (!col) return mock;

    const products: ProductCardData[] = col.products.edges.map(({ node }) => {
      const price = parseFloat(node.priceRange.minVariantPrice.amount);
      const compareAt = parseFloat(node.compareAtPriceRange.minVariantPrice.amount);
      const currencyCode = node.priceRange.minVariantPrice.currencyCode;
      const priceStr = formatPrice(node.priceRange.minVariantPrice.amount, currencyCode);
      const compareAtStr = compareAt > 0 ? formatPrice(node.compareAtPriceRange.minVariantPrice.amount, currencyCode) : undefined;
      const discountLabel = discountPercent(price, compareAt);
      const image = node.images?.edges?.[0]?.node;

      return {
        id: node.id,
        title: node.title,
        handle: node.handle,
        price: priceStr,
        compareAtPrice: compareAtStr,
        discountLabel,
        imageSrc: image?.url ?? null,
        imageAlt: image?.altText ?? undefined,
      };
    });

    return {
      id: col.id,
      title: col.title,
      handle: col.handle,
      description: col.description ?? undefined,
      imageSrc: col.image?.url ?? null,
      imageAlt: col.image?.altText ?? undefined,
      products,
    };
  } catch {
    return mock;
  }
}

interface ProductByHandleResponse {
  product: {
    id: string;
    handle: string;
    title: string;
    description: string;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    compareAtPriceRange: { minVariantPrice: { amount: string } };
    variants: { edges: Array<{ node: { id: string } }> };
    images: { edges: Array<{ node: { url: string; altText?: string } }> };
  } | null;
}

/** Fetch single product for PDP. Returns null if not found; mock when Shopify not configured. */
export async function getProductByHandle(handle: string): Promise<ProductDetailData | null> {
  const mock: ProductDetailData = {
    id: `mock-${handle}`,
    handle,
    title: handle.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    description: "Trusted healthcare from PIL. Science-backed, dermatologically tested.",
    price: "₹ 199.00",
    compareAtPrice: "₹ 250.00",
    discountLabel: "20% off",
    images: [],
    benefits: [
      "Dermatologically tested",
      "Suitable for all skin types",
      "No parabens",
      "Made in India",
    ],
    usageInstructions: [
      "Apply to clean, dry skin.",
      "Use as directed on the pack or by your healthcare provider.",
      "Store in a cool, dry place.",
    ],
    faqs: [
      { question: "Is this product safe for sensitive skin?", answer: "Our products are dermatologically tested and formulated to be gentle. If you have specific concerns, we recommend a patch test." },
      { question: "Where is this product manufactured?", answer: "PIL products are manufactured in India in our state-of-the-art facilities." },
      { question: "How do I track my order?", answer: "You can track your order using the link in your confirmation email or via the Track Order link in the header." },
    ],
  };

  if (!isShopifyConfigured()) return mock;

  try {
    const data = await shopifyFetch<ProductByHandleResponse>(PRODUCT_BY_HANDLE, { handle });
    const p = data.product;
    if (!p) return null;

    const price = parseFloat(p.priceRange.minVariantPrice.amount);
    const compareAt = parseFloat(p.compareAtPriceRange.minVariantPrice.amount);
    const currencyCode = p.priceRange.minVariantPrice.currencyCode;
    const priceStr = formatPrice(p.priceRange.minVariantPrice.amount, currencyCode);
    const compareAtStr = compareAt > 0 ? formatPrice(p.compareAtPriceRange.minVariantPrice.amount, currencyCode) : undefined;
    const discountLabel = discountPercent(price, compareAt);

    const variantId = p.variants?.edges?.[0]?.node?.id ?? null;

    return {
      id: p.id,
      handle: p.handle,
      title: p.title,
      description: p.description ?? undefined,
      price: priceStr,
      compareAtPrice: compareAtStr,
      discountLabel,
      variantId,
      images: p.images.edges.map((e) => ({ url: e.node.url, altText: e.node.altText })),
      benefits: mock.benefits,
      usageInstructions: mock.usageInstructions,
      faqs: mock.faqs,
    };
  } catch {
    return mock;
  }
}


/** Related products for PDP (e.g. from same collection or bestsellers). Mock when Shopify not configured. */
export async function getRelatedProducts(
  currentHandle: string,
  limit = 4
): Promise<ProductCardData[]> {
  const all = [...MOCK_COLLECTION_PRODUCTS];
  const filtered = all.filter((p) => p.handle !== currentHandle).slice(0, limit);
  if (!isShopifyConfigured()) return filtered;
  try {
    const data = await getAllProducts(24);
    if (!data.length) return filtered;
    const related = data.filter((p) => p.handle !== currentHandle).slice(0, limit);
    return related.length > 0 ? related : filtered;
  } catch {
    return filtered;
  }
}

// ── All Products ─────────────────────────────────────────────────────────────

interface AllProductsResponse {
  products: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    edges: Array<{
      node: {
        id: string;
        handle: string;
        title: string;
        productType: string;
        tags: string[];
        priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
        compareAtPriceRange: { minVariantPrice: { amount: string } };
        images: { edges: Array<{ node: { url: string; altText?: string } }> };
      };
    }>;
  };
}

/** Representative mock products covering all PIL categories (sourced from CSV data) */
const MOCK_ALL_PRODUCTS: ProductCardData[] = [
  // Skin Care – Face Wash
  { id: "m-1",  title: "AcneGuard Face wash Gel",            handle: "acneguard-face-wash-gel",            price: "₹ 172.90", compareAtPrice: "₹ 182.00", discountLabel: "5% off",  productType: "Face Wash Gel",      tags: ["facewash-gel","skin-care","personal-care"] },
  { id: "m-2",  title: "AcneGuard Gold Foaming Face Wash Gel",handle: "acneguard-gold-foaming-face-wash-gel",price: "₹ 576.05", compareAtPrice: "₹ 606.37", discountLabel: "5% off",  productType: "Face Wash Gel",      tags: ["facewash-gel","skin-care","personal-care"] },
  { id: "m-3",  title: "Neem Plus Face Wash Gel",             handle: "neem-plus-face-wash-gel",            price: "₹ 130.63", compareAtPrice: "₹ 137.50", discountLabel: "4% off",  productType: "Face Wash Gel",      tags: ["facewash-gel","skin-care","personal-care"] },
  // Soaps
  { id: "m-4",  title: "Acne Derma Soap",                     handle: "acne-derma-soap",                    price: "₹ 110.00", compareAtPrice: "₹ 132.00", discountLabel: "16% off", productType: "Soap",               tags: ["soaps","body-care","personal-care"] },
  { id: "m-5",  title: "AcneGuard Gold Soap",                 handle: "acneguard-gold-soap",                price: "₹ 180.00", compareAtPrice: "₹ 194.78", discountLabel: "7% off",  productType: "Soap",               tags: ["soaps","body-care","personal-care"] },
  { id: "m-6",  title: "Dermacare AcneGuard Soap",            handle: "dermacare-acneguard-soap",           price: "₹ 110.00", compareAtPrice: "₹ 126.26", discountLabel: "12% off", productType: "Soap",               tags: ["soaps","body-care","personal-care"] },
  { id: "m-7",  title: "Prickly Heat Soap",                   handle: "prickly-heat-soap",                  price: "₹ 80.00",  compareAtPrice: "₹ 90.00",  discountLabel: "11% off", productType: "Soap",               tags: ["soaps","body-care","personal-care"] },
  { id: "m-8",  title: "Dermacare Neem And Aloevera Soap",    handle: "dermacare-neem-and-aloevera-soap",   price: "₹ 75.00",  compareAtPrice: "₹ 90.00",  discountLabel: "16% off", productType: "Soap",               tags: ["soaps","body-care","personal-care"] },
  // Creams & Lotions
  { id: "m-9",  title: "Scarnil Cream",                       handle: "scarnil-cream",                      price: "₹ 150.00", compareAtPrice: "₹ 175.00", discountLabel: "14% off", productType: "Cream",              tags: ["cream","body-care","personal-care"] },
  { id: "m-10", title: "UV Soft Cream",                       handle: "uv-soft-cream",                      price: "₹ 220.00", compareAtPrice: "₹ 260.00", discountLabel: "15% off", productType: "Sunscreen",          tags: ["sunscreen","skin-care","personal-care"] },
  { id: "m-11", title: "Napy Soft Cream",                     handle: "napy-soft-cream",                    price: "₹ 130.00",                                                        productType: "Cream",              tags: ["cream","body-care","personal-care"] },
  { id: "m-12", title: "Heel N Foot Cream",                   handle: "heel-n-foot-cream",                  price: "₹ 160.00", compareAtPrice: "₹ 190.00", discountLabel: "15% off", productType: "Foot Cream",         tags: ["foot-cream","foot-care","personal-care"] },
  { id: "m-13", title: "Dermamoist Moisturising Lotion",      handle: "dermamoist-moisturising-lotion",     price: "₹ 280.00", compareAtPrice: "₹ 320.00", discountLabel: "12% off", productType: "Moisturizer / Lotion",tags: ["moisturizers","skin-care","personal-care"] },
  { id: "m-14", title: "Hydil Lotion",                        handle: "hydil-lotion",                       price: "₹ 240.00",                                                        productType: "Moisturizer / Lotion",tags: ["moisturizers","skin-care","personal-care"] },
  { id: "m-15", title: "Seboclear Lotion",                    handle: "seboclear-lotion",                   price: "₹ 310.00",                                                        productType: "Moisturizer / Lotion",tags: ["moisturizers","skin-care","personal-care"] },
  { id: "m-16", title: "Femipil Lotion",                      handle: "femipil-lotion",                     price: "₹ 180.00",                                                        productType: "Feminine Hygiene",   tags: ["feminine-hygeine","feminine-care","personal-care"] },
  { id: "m-17", title: "Myconorm Dusting Powder",             handle: "myconorm-dusting-powder",            price: "₹ 120.00", compareAtPrice: "₹ 140.00", discountLabel: "14% off", productType: "Powder",             tags: ["powder","skin-care","personal-care"] },
  // Hair Care
  { id: "m-18", title: "Dancure Shampoo",                     handle: "dancure-shampoo",                    price: "₹ 380.00", compareAtPrice: "₹ 450.00", discountLabel: "15% off", productType: "Shampoo",            tags: ["shampoo","hair-care","personal-care"] },
  { id: "m-19", title: "Head Lice Shampoo",                   handle: "head-lice-shampoo",                  price: "₹ 175.00", compareAtPrice: "₹ 210.00", discountLabel: "16% off", productType: "Shampoo",            tags: ["shampoo","hair-care","personal-care"] },
  { id: "m-20", title: "Kerotop Shampoo",                     handle: "kerotop-shampoo",                    price: "₹ 440.00", compareAtPrice: "₹ 538.34", discountLabel: "18% off", productType: "Shampoo",            tags: ["shampoo","hair-care","personal-care"] },
  { id: "m-21", title: "Kerotop Serum - 50ml",                handle: "kerotop-serum-50ml",                 price: "₹ 499.00", compareAtPrice: "₹ 590.00", discountLabel: "15% off", productType: "Hair Serum",         tags: ["serum","hair-care","personal-care"] },
  { id: "m-22", title: "Kerotop Serum - 100ml",               handle: "kerotop-serum-100ml",                price: "₹ 890.00", compareAtPrice: "₹ 999.00", discountLabel: "10% off", productType: "Hair Serum",         tags: ["serum","hair-care","personal-care"] },
  // Oral Care
  { id: "m-23", title: "Neem Plus Herbal Dental Gel",          handle: "neem-plus-herbal-dental-gel",        price: "₹ 95.00",  compareAtPrice: "₹ 110.00", discountLabel: "13% off", productType: "Mouth Gel",          tags: ["mouth-gel","oral-care","personal-care"] },
  { id: "m-24", title: "Ulsor Mouth Gel",                      handle: "ulsor-mouth-gel",                    price: "₹ 140.00",                                                        productType: "Mouth Gel",          tags: ["mouth-gel","oral-care","personal-care"] },
  { id: "m-25", title: "Sensopil Gel",                         handle: "sensopil-gel",                       price: "₹ 120.00",                                                        productType: "Mouth Gel",          tags: ["mouth-gel","oral-care","personal-care"] },
  // Pain Management – Orthodex
  { id: "m-26", title: "Orthodex Roll On",                     handle: "orthodex-roll-on",                   price: "₹ 125.00", compareAtPrice: "₹ 145.31", discountLabel: "13% off", productType: "Pain Relief Roll-On",tags: ["roll-on","pain-managment"] },
  { id: "m-27", title: "Orthodex Pain Relief Spray",           handle: "orthodex-pain-relief-spray",         price: "₹ 150.00", compareAtPrice: "₹ 175.00", discountLabel: "14% off", productType: "Pain Relief Spray",  tags: ["spray","pain-managment"] },
  { id: "m-28", title: "Orthodex Gel",                         handle: "orthodex-gel",                       price: "₹ 160.00", compareAtPrice: "₹ 195.00", discountLabel: "17% off", productType: "Pain Relief Gel",    tags: ["gel","pain-managment"] },
  // Nasal
  { id: "m-29", title: "Nasopil Paediatric Nasal Drops",       handle: "nasopil-paediatric-nasal-drops",     price: "₹ 85.00",                                                         productType: "Nasal Drops",        tags: ["nasal-drops","cough-cold","medicines"] },
  { id: "m-30", title: "Nasopil Adult Nasal Drops",            handle: "nasopil-adult-nasal-drops",          price: "₹ 95.00",                                                         productType: "Nasal Drops",        tags: ["nasal-drops","cough-cold","medicines"] },
  { id: "m-31", title: "Nasopil Oxy Decongestant & Adult Nasal Spray", handle: "nasopil-oxy-decongestant-adult-nasal-spray", price: "₹ 120.00", productType: "Nasal Spray", tags: ["nasal-spray","cough-cold","medicines"] },
  // Pet Care
  { id: "m-32", title: "Dog Groom Soap",                       handle: "dog-groom-soap",                     price: "₹ 110.00", compareAtPrice: "₹ 130.00", discountLabel: "15% off", productType: "Pet Soap",           tags: ["pet-soaps","pet-grooming","pet-care"] },
  { id: "m-33", title: "Tick & Flea Ultra Dog Shampoo",        handle: "tick-flea-ultra-dog-shampoo",        price: "₹ 275.00", compareAtPrice: "₹ 325.69", discountLabel: "15% off", productType: "Pet Shampoo",        tags: ["pet-shampoo","pet-grooming","pet-care"] },
  { id: "m-34", title: "Sebopil Anti-Seborrhoeic Shampoo",     handle: "sebopil-anti-seborrhoeic-shampoo",   price: "₹ 280.00", compareAtPrice: "₹ 340.00", discountLabel: "17% off", productType: "Pet Shampoo",        tags: ["pet-shampoo","pet-grooming","pet-care"] },
  { id: "m-35", title: "Dermopil Pet Anti-Itch Shampoo",       handle: "dermopil-pet-anti-itch-shampoo",     price: "₹ 225.00", compareAtPrice: "₹ 280.00", discountLabel: "19% off", productType: "Pet Shampoo",        tags: ["pet-shampoo","pet-grooming","pet-care"] },
  { id: "m-36", title: "Tick & Flea Medicated Dog Shampoo",    handle: "tick-flea-medicated-dog-shampoo",    price: "₹ 250.00", compareAtPrice: "₹ 300.00", discountLabel: "16% off", productType: "Pet Shampoo",        tags: ["pet-shampoo","pet-grooming","pet-care"] },
  { id: "m-37", title: "Myconorm Pet Anti-Dandruff Shampoo",   handle: "myconorm-pet-anti-dandruff-shampoo", price: "₹ 250.00", compareAtPrice: "₹ 290.00", discountLabel: "13% off", productType: "Pet Shampoo",        tags: ["pet-shampoo","pet-grooming","pet-care"] },
  { id: "m-38", title: "Neem Plus Pet Shampoo",                handle: "neem-plus-pet-shampoo",              price: "₹ 199.00", compareAtPrice: "₹ 293.64", discountLabel: "32% off", productType: "Pet Shampoo",        tags: ["pet-shampoo","pet-grooming","pet-care"] },
  { id: "m-39", title: "PET SHIELD MEDICATED DOG SHAMPOO",     handle: "pet-shield-medicated-dog-shampoo",   price: "₹ 299.00",                                                        productType: "Pet Shampoo",        tags: ["pet-shampoo","pet-grooming","pet-care"] },
  { id: "m-40", title: "Pet Grow Syrup",                       handle: "pet-grow-syrup",                     price: "₹ 180.00",                                                        productType: "Pet Syrup",          tags: ["pet-syrups","pet-health-supplement","pet-care"] },
  { id: "m-41", title: "Calpil Pet Syrup",                     handle: "calpil-pet-syrup",                   price: "₹ 160.00",                                                        productType: "Pet Syrup",          tags: ["pet-syrups","pet-health-supplement","pet-care"] },
  { id: "m-42", title: "Smart Pet Syrup",                      handle: "smart-pet-syrup",                    price: "₹ 195.00",                                                        productType: "Pet Syrup",          tags: ["pet-syrups","pet-health-supplement","pet-care"] },
  { id: "m-43", title: "Womipil Pet Tablets",                  handle: "womipil-pet-tablets",                price: "₹ 140.00",                                                        productType: "Pet Tablet",         tags: ["pet-tablets","pet-health-supplement","pet-care"] },
  { id: "m-44", title: "Pil Pet Dentagel",                     handle: "pil-pet-dentagel",                   price: "₹ 120.00",                                                        productType: "Pet Dental Gel",     tags: ["pet-toothpaste","pet-oral-care","pet-care"] },
  { id: "m-45", title: "Tick And Flea Repellent Spray",        handle: "tick-and-flea-repellent-spray",      price: "₹ 220.00", compareAtPrice: "₹ 260.00", discountLabel: "15% off", productType: "Pet Spray",          tags: ["pet-spray","pet-health-wellness","pet-care"] },
  { id: "m-46", title: "Pil Waxotic Regular Pet Ear Cleanser", handle: "pil-waxotic-regular-pet-ear-cleanser",price: "₹ 180.00",                                                       productType: "Pet Ear Cleanser",   tags: ["pet-ear-cleansers","pet-health-wellness","pet-care"] },
  { id: "m-47", title: "Otipil Pet Ear Drops",                 handle: "otipil-pet-ear-drops",               price: "₹ 150.00",                                                        productType: "Pet Ear Drops",      tags: ["pet-ear-drops","pet-health-wellness","pet-care"] },
  { id: "m-48", title: "PETCARE ANTI-TICK POWDER",             handle: "petcare-anti-tick-powder",           price: "₹ 95.00",                                                         productType: "Pet Powder",         tags: ["pet-powder","pet-health-wellness","pet-care"] },
  { id: "m-49", title: "Myconorm Pet Powder",                  handle: "myconorm-pet-powder",                price: "₹ 110.00",                                                        productType: "Pet Powder",         tags: ["pet-powder","pet-health-wellness","pet-care"] },
  // Combo Kits
  { id: "m-50", title: "Tick n Flea Combo Kit",                handle: "tick-n-flea-combo-kit",              price: "₹ 450.00", compareAtPrice: "₹ 550.00", discountLabel: "18% off", productType: "Combo Kit",          tags: ["combos","pet-care"] },
  { id: "m-51", title: "Pet Grooming Kit",                     handle: "pet-grooming-kit",                   price: "₹ 399.00", compareAtPrice: "₹ 499.00", discountLabel: "20% off", productType: "Combo Kit",          tags: ["combos","pet-care"] },
];

function nodeToProductCard(node: AllProductsResponse["products"]["edges"][0]["node"]): ProductCardData {
  const price     = parseFloat(node.priceRange.minVariantPrice.amount);
  const compareAt = parseFloat(node.compareAtPriceRange.minVariantPrice.amount);
  const cc        = node.priceRange.minVariantPrice.currencyCode;
  const image     = node.images?.edges?.[0]?.node;
  return {
    id:            node.id,
    title:         node.title,
    handle:        node.handle,
    productType:   node.productType,
    tags:          node.tags ?? [],
    price:         formatPrice(node.priceRange.minVariantPrice.amount, cc),
    compareAtPrice: compareAt > 0 ? formatPrice(node.compareAtPriceRange.minVariantPrice.amount, cc) : undefined,
    discountLabel:  discountPercent(price, compareAt),
    imageSrc:      image?.url ?? null,
    imageAlt:      image?.altText ?? undefined,
  };
}

/**
 * Fetch ALL products from Shopify (up to `limit`).
 * Falls back to a representative mock when Shopify is not configured.
 */
export async function getAllProducts(limit = 250): Promise<ProductCardData[]> {
  if (!isShopifyConfigured()) return MOCK_ALL_PRODUCTS.slice(0, limit);

  try {
    const results: ProductCardData[] = [];
    let cursor: string | null = null;
    const pageSize = Math.min(limit, 250);

    // Paginate until we have enough or no more pages
    while (results.length < limit) {
      const variables: Record<string, unknown> = { first: Math.min(pageSize, limit - results.length) };
      if (cursor) variables.after = cursor;

      const data = await shopifyFetch<AllProductsResponse>(ALL_PRODUCTS, variables);
      const page = data.products;
      if (!page?.edges?.length) break;

      page.edges.forEach(({ node }) => results.push(nodeToProductCard(node)));
      if (!page.pageInfo.hasNextPage) break;
      cursor = page.pageInfo.endCursor;
    }

    return results.length > 0 ? results : MOCK_ALL_PRODUCTS.slice(0, limit);
  } catch {
    return MOCK_ALL_PRODUCTS.slice(0, limit);
  }
}
