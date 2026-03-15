"use client";

import { useState } from "react";
import { addToCart, setCartIdCookie, isCartConfigured, redirectToCheckout } from "@/lib/shopify/cart";

export interface AddToCartButtonProps {
  productId: string;
  variantId: string | null | undefined;
}

export function AddToCartButton({ productId, variantId }: AddToCartButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleAdd = async () => {
    if (!variantId || !isCartConfigured()) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const { cartId, checkoutUrl } = await addToCart(variantId, 1);
      setCartIdCookie(cartId);
      setStatus("done");
      const goToCheckout = false;
      if (goToCheckout && checkoutUrl) redirectToCheckout(checkoutUrl);
    } catch {
      setStatus("error");
    }
  };

  const disabled = !variantId || !isCartConfigured() || status === "loading";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={handleAdd}
        disabled={disabled}
        className="btn-primary w-full sm:w-auto disabled:opacity-40 disabled:hover:transform-none disabled:hover:shadow-none"
      >
        {status === "loading" ? (
          <>
            <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            Adding…
          </>
        ) : status === "done" ? (
          <>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Added to Cart
          </>
        ) : (
          <>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add to Cart
          </>
        )}
      </button>
      {status === "done" && (
        <a
          href="/cart"
          className="group/link inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--primary)] transition-all duration-300 hover:gap-2.5"
        >
          View cart
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      )}
      {status === "error" && !isCartConfigured() && (
        <span className="text-[12px] text-[var(--muted)]">Configure Shopify to enable cart</span>
      )}
    </div>
  );
}
