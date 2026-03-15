const SHOPIFY_STOREFRONT_URL =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL ?? "";
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "";

/** True if we have at least the Storefront API URL. Token is optional (tokenless access works for products, collections, cart). */
export function isShopifyConfigured(): boolean {
  return Boolean(SHOPIFY_STOREFRONT_URL);
}

/** True if we have a token (needed for cart mutations and some features). */
export function hasStorefrontToken(): boolean {
  return Boolean(SHOPIFY_STOREFRONT_ACCESS_TOKEN);
}

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    headers["X-Shopify-Storefront-Access-Token"] = SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  }

  const res = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? "GraphQL error");
  }
  return json.data as T;
}
