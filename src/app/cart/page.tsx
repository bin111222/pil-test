"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCartIdFromCookie,
  getCart,
  redirectToCheckout,
  isCartConfigured,
  type CartData,
} from "@/lib/shopify/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartData | null | "loading">("loading");

  useEffect(() => {
    const cartId = getCartIdFromCookie();
    if (!cartId || !isCartConfigured()) {
      setCart(null);
      return;
    }
    getCart(cartId).then(setCart);
  }, []);

  const handleCheckout = () => {
    if (cart && cart !== "loading" && cart.lines.length > 0 && cart.checkoutUrl) {
      redirectToCheckout(cart.checkoutUrl);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <p className="section-label mb-4">Shopping</p>
        <h1 className="font-display text-[2rem] font-bold tracking-tight text-[var(--foreground)]">Your Cart</h1>
        <div className="mt-3 separator-gold" />

        {cart === "loading" && (
          <div className="mt-12 flex items-center justify-center gap-3 text-[var(--muted)]">
            <div className="h-4 w-4 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
            <span className="text-sm">Loading cart…</span>
          </div>
        )}

        {cart === null && (
          <div className="mt-12 rounded-2xl border border-[var(--border)] bg-white p-12 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--surface-tinted)]">
              <svg className="h-7 w-7 text-[var(--muted-light)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-[15px] font-medium text-[var(--foreground)]">Your cart is empty</p>
            {!isCartConfigured() && (
              <p className="mt-2 text-sm text-[var(--muted)]">
                Set up Shopify Storefront API to enable cart and checkout.
              </p>
            )}
            <Link
              href="/"
              className="btn-primary mt-8 inline-flex"
            >
              Continue Shopping
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}

        {cart && cart !== "loading" && cart.lines.length === 0 && (
          <div className="mt-12 rounded-2xl border border-[var(--border)] bg-white p-12 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--surface-tinted)]">
              <svg className="h-7 w-7 text-[var(--muted-light)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-[15px] font-medium text-[var(--foreground)]">Your cart is empty</p>
            <Link
              href="/"
              className="btn-primary mt-8 inline-flex"
            >
              Continue Shopping
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}

        {cart && cart !== "loading" && cart.lines.length > 0 && (
          <>
            <ul className="mt-10 divide-y divide-[var(--border)]">
              {cart.lines.map((line) => (
                <li
                  key={line.id}
                  className="flex items-center justify-between gap-4 py-5"
                >
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-[var(--foreground)] truncate">
                      {line.productTitle}
                      {line.title !== "Default Title" ? ` — ${line.title}` : ""}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[var(--surface-tinted)] px-3.5 py-1.5 text-[12px] font-medium text-[var(--muted)]">
                    Qty {line.quantity}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/"
                className="group/link inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--primary)] transition-all duration-300 hover:gap-3"
              >
                <svg className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Continue shopping
              </Link>
              <button
                type="button"
                onClick={handleCheckout}
                className="btn-primary"
              >
                Proceed to Checkout
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
            <p className="mt-5 text-[11px] tracking-wide text-[var(--muted-light)]">
              You will be redirected to Shopify to complete payment securely.
            </p>
          </>
        )}
      </main>
    </div>
  );
}
