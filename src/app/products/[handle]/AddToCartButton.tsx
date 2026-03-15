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
      // Optional: redirect to checkout. Set to false to stay on page and show "Added".
      const goToCheckout = false;
      if (goToCheckout && checkoutUrl) redirectToCheckout(checkoutUrl);
    } catch {
      setStatus("error");
    }
  };

  const disabled = !variantId || !isCartConfigured() || status === "loading";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleAdd}
        disabled={disabled}
        className="w-full rounded-lg bg-[var(--primary)] px-6 py-3 text-base font-medium text-white transition hover:opacity-90 disabled:opacity-50 sm:w-auto"
      >
        {status === "loading" ? "Adding…" : status === "done" ? "Added" : "Add to cart"}
      </button>
      {status === "done" && (
        <a
          href="/cart"
          className="text-sm font-medium text-[var(--primary)] underline"
        >
          View cart
        </a>
      )}
      {status === "error" && !isCartConfigured() && (
        <span className="text-sm text-[var(--muted)]">Configure Shopify to enable cart</span>
      )}
    </div>
  );
}
