"use client";

import { CART_CREATE, CART_LINES_ADD, CART_QUERY } from "./cart-queries";

const CART_ID_COOKIE = "pil_cart_id";
const CART_ID_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function getStorefrontUrl(): string {
  const url = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL;
  if (!url) throw new Error("NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL is not set");
  return url;
}

function getStorefrontToken(): string {
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!token) throw new Error("NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is not set");
  return token;
}

export function isCartConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL &&
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
  );
}

async function storefrontFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(getStorefrontUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": getStorefrontToken(),
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0]?.message ?? "GraphQL error");
  return json.data as T;
}

export function getCartIdFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${CART_ID_COOKIE}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

export function setCartIdCookie(cartId: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${CART_ID_COOKIE}=${encodeURIComponent(cartId)}; path=/; max-age=${CART_ID_MAX_AGE}; SameSite=Lax`;
}

/** Create a new cart with one line. Returns { cartId, checkoutUrl }. */
export async function createCart(variantId: string, quantity = 1): Promise<{ cartId: string; checkoutUrl: string }> {
  const data = await storefrontFetch<{
    cartCreate: {
      cart: { id: string, checkoutUrl: string } | null,
      userErrors: Array<{ message: string, field: string[] }>
    }
  }>(CART_CREATE, {
    lines: [{ merchandiseId: variantId, quantity }],
  });
  const { cart, userErrors } = data.cartCreate;
  if (userErrors?.length) throw new Error(userErrors[0].message);
  if (!cart?.id) throw new Error("Failed to create cart");
  return { cartId: cart.id, checkoutUrl: cart.checkoutUrl };
}

/** Add a line to an existing cart. Returns { cartId, checkoutUrl }. */
export async function addCartLines(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<{ cartId: string; checkoutUrl: string }> {
  const data = await storefrontFetch<{
    cartLinesAdd: {
      cart: { id: string, checkoutUrl: string } | null,
      userErrors: Array<{ message: string, field: string[] }>
    }
  }>(CART_LINES_ADD, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });
  const { cart, userErrors } = data.cartLinesAdd;
  if (userErrors?.length) throw new Error(userErrors[0].message);
  if (!cart?.id) throw new Error("Failed to add to cart");
  return { cartId: cart.id, checkoutUrl: cart.checkoutUrl };
}

/** Add to cart: use existing cart id or create new cart. Returns { cartId, checkoutUrl }. */
export async function addToCart(
  variantId: string,
  quantity = 1
): Promise<{ cartId: string; checkoutUrl: string }> {
  const existingId = getCartIdFromCookie();
  if (existingId) {
    try {
      return await addCartLines(existingId, variantId, quantity);
    } catch {
      // Cart may be invalid; create new one
    }
  }
  const result = await createCart(variantId, quantity);
  setCartIdCookie(result.cartId);
  return result;
}

export interface CartLine {
  id: string;
  quantity: number;
  title: string;
  productTitle: string;
}

export interface CartData {
  id: string;
  checkoutUrl: string;
  lines: CartLine[];
}

/** Get cart by id. Returns null if not found or invalid. */
export async function getCart(cartId: string): Promise<CartData | null> {
  try {
    const data = await storefrontFetch<{
      cart: {
        id: string,
        checkoutUrl: string,
        lines: { edges: Array<{ node: { id: string, quantity: number, merchandise: { id: string, title: string, product: { title: string } } } }> }
      } | null
    }>(CART_QUERY, { cartId });
    const cart = data.cart;
    if (!cart) return null;
    const lines: CartLine[] = cart.lines.edges.map(({ node }) => ({
      id: node.id,
      quantity: node.quantity,
      title: node.merchandise.title,
      productTitle: node.merchandise.product.title,
    }));
    return {
      id: cart.id,
      checkoutUrl: cart.checkoutUrl,
      lines,
    };
  } catch {
    return null;
  }
}

/** Redirect to Shopify checkout. Call after adding to cart or from cart page. */
export function redirectToCheckout(checkoutUrl: string): void {
  if (typeof window !== "undefined" && checkoutUrl) {
    window.location.href = checkoutUrl;
  }
}
