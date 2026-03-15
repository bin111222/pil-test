"use client";

import { useState } from "react";
import { StickyAddToCart } from "./StickyAddToCart";
import { addToCart, setCartIdCookie, isCartConfigured } from "@/lib/shopify/cart";

export interface ProductStickyBarProps {
  title: string;
  price: string;
  productId: string;
  variantId: string | null | undefined;
}

export function ProductStickyBar({ title, price, productId, variantId }: ProductStickyBarProps) {
  const [loading, setLoading] = useState(false);

  const onAddToCart = async () => {
    if (!variantId || !isCartConfigured()) return;
    setLoading(true);
    try {
      const { cartId } = await addToCart(variantId, 1);
      setCartIdCookie(cartId);
      window.location.href = "/cart";
    } finally {
      setLoading(false);
    }
  };

  return (
    <StickyAddToCart
      title={title}
      price={price}
      onAddToCart={onAddToCart}
    />
  );
}
