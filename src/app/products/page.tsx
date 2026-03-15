import { Suspense } from "react";
import { getAllProducts } from "@/lib/shopify";
import { ProductsClientShell } from "./ProductsClientShell";

export const metadata = {
  title: "All Products | PIL India",
  description: "Browse the complete PIL range — skincare, haircare, pain relief, pet care, medicines and more. Science-backed healthcare from PIL.",
};

export const revalidate = 60;

export default async function ProductsPage() {
  const products = await getAllProducts(250);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main>
        {/* Page header */}
        <div className="border-b border-[var(--border)] bg-white">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
            <p className="section-label mb-4">Browse</p>
            <h1 className="font-display text-[2rem] font-bold tracking-tight text-[var(--foreground)] sm:text-[2.5rem]">
              All Products
            </h1>
            <div className="mt-4 separator-gold" />
            <p className="mt-4 text-[13px] text-[var(--muted)]">
              {products.length} product{products.length !== 1 ? "s" : ""} · Science-backed healthcare from PIL
            </p>
          </div>
        </div>

        <Suspense fallback={
          <div className="mx-auto max-w-7xl px-5 py-24 text-center text-[var(--muted)]">
            Loading products…
          </div>
        }>
          <ProductsClientShell products={products} />
        </Suspense>
      </main>
    </div>
  );
}
