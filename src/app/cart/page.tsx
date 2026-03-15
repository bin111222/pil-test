"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">Your cart</h1>

        {cart === "loading" && (
          <p className="mt-6 text-[var(--muted)]">Loading cart…</p>
        )}

        {cart === null && (
          <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 text-center">
            <p className="text-[var(--muted)]">Your cart is empty.</p>
            {!isCartConfigured() && (
              <p className="mt-2 text-sm text-[var(--muted)]">
                Set up Shopify Storefront API to enable cart and checkout.
              </p>
            )}
            <Link
              href="/"
              className="mt-4 inline-block font-medium text-[var(--primary)] underline"
            >
              Continue shopping
            </Link>
          </div>
        )}

        {cart && cart !== "loading" && cart.lines.length === 0 && (
          <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 text-center">
            <p className="text-[var(--muted)]">Your cart is empty.</p>
            <Link
              href="/"
              className="mt-4 inline-block font-medium text-[var(--primary)] underline"
            >
              Continue shopping
            </Link>
          </div>
        )}

        {cart && cart !== "loading" && cart.lines.length > 0 && (
          <>
            <ul className="mt-6 space-y-4 border-b border-[var(--border)] pb-6">
              {cart.lines.map((line) => (
                <li
                  key={line.id}
                  className="flex justify-between gap-4 text-sm"
                >
                  <span className="font-medium text-[var(--foreground)]">
                    {line.productTitle}
                    {line.title !== "Default Title" ? ` – ${line.title}` : ""}
                  </span>
                  <span className="text-[var(--muted)]">Qty {line.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/"
                className="text-sm font-medium text-[var(--primary)] underline"
              >
                Continue shopping
              </Link>
              <button
                type="button"
                onClick={handleCheckout}
                className="rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white transition hover:opacity-90"
              >
                Proceed to checkout
              </button>
            </div>
            <p className="mt-4 text-xs text-[var(--muted)]">
              You will be redirected to Shopify to complete payment securely.
            </p>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
