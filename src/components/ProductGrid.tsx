import { ProductCard } from "@/components/ui";
import type { ProductCardData } from "@/lib/shopify";

export interface ProductGridProps {
  products: ProductCardData[];
  className?: string;
}

export function ProductGrid({ products, className = "" }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={`rounded-2xl border border-[var(--border)] bg-[var(--surface-tinted)] py-20 text-center ${className}`}>
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-subtle)]">
            <svg className="h-5 w-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p className="text-sm text-[var(--muted)]">No products in this collection yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
      role="list"
    >
      {products.map((p) => (
        <ProductCard
          key={p.id}
          title={p.title}
          price={p.price}
          compareAtPrice={p.compareAtPrice}
          discountLabel={p.discountLabel}
          href={`/products/${p.handle}`}
          pricePrefix={p.pricePrefix}
          imageSrc={p.imageSrc}
          imageAlt={p.imageAlt}
        />
      ))}
    </div>
  );
}
