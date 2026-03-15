import { CategoryTile } from "@/components/ui";
import type { CategoryTileData } from "@/lib/shopify";

export interface CategoryGridProps {
  categories: CategoryTileData[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  if (!categories.length) return null;

  return (
    <section className="section-py gradient-subtle">
      <div className="container">

        {/* Section header */}
        <div className="mb-16 flex flex-col items-center text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <p className="section-label mb-4">Our Collections</p>
            <h2 className="section-heading">
              Find Your
              <em className="not-italic text-[var(--primary)]"> Care</em>
            </h2>
            <div className="mt-4 separator-gold mx-auto sm:mx-0" />
          </div>
          <p className="mt-6 max-w-xs section-sub sm:mt-0 sm:text-right">
            Trusted products across every health and wellness category.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {categories.map((cat, i) => (
            <CategoryTile
              key={cat.id}
              name={cat.name}
              description={cat.description}
              href={`/collections/${cat.handle}`}
              imageSrc={cat.imageSrc}
              imageAlt={cat.imageAlt}
              featured={i === 0 && categories.length >= 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
