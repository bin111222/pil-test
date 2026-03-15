import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
      <Header />
      <main>
        {/* Page header */}
        <div className="border-b border-[var(--border)] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
              All Products
            </h1>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {products.length} product{products.length !== 1 ? "s" : ""} · Science-backed healthcare from PIL
            </p>
          </div>
        </div>

        <Suspense fallback={
          <div className="mx-auto max-w-7xl px-4 py-20 text-center text-[var(--muted)]">
            Loading products…
          </div>
        }>
          <ProductsClientShell products={products} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
