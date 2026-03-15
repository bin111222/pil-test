import { ProductCard } from "@/components/ui";
import type { ProductCardData } from "@/lib/shopify";

export interface ProductGridProps {
  products: ProductCardData[];
  className?: string;
}

export function ProductGrid({ products, className = "" }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={`rounded-xl border border-[var(--border)] bg-[var(--card)] py-16 text-center ${className}`}>
        <p className="text-[var(--muted)]">No products in this collection yet.</p>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
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
