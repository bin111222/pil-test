"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { ProductCardData } from "@/lib/shopify/types";
import { ProductCard } from "@/components/ui/ProductCard";

const CATEGORY_FILTERS = [
  { label: "All",           value: "all" },
  { label: "Skin Care",     value: "skin-care",        tag: "skin-care" },
  { label: "Hair Care",     value: "hair-care",        tag: "hair-care" },
  { label: "Body Care",     value: "body-care",        tag: "body-care" },
  { label: "Oral Care",     value: "oral-care",        tag: "oral-care" },
  { label: "Foot Care",     value: "foot-care",        tag: "foot-care" },
  { label: "Pain Relief",   value: "pain-managment",   tag: "pain-managment" },
  { label: "Pet Care",      value: "pet-care",         tag: "pet-care" },
  { label: "Medicines",     value: "medicines",        tag: "medicines" },
];

const SORT_OPTIONS = [
  { label: "Name A–Z",      value: "title-asc" },
  { label: "Name Z–A",      value: "title-desc" },
  { label: "Price: Low–High", value: "price-asc" },
  { label: "Price: High–Low", value: "price-desc" },
];

function parsePrice(str: string): number {
  const m = str.replace(/,/g, "").match(/[\d.]+/);
  return m ? parseFloat(m[0]) : 0;
}

function productMatchesCategory(p: ProductCardData, cat: string): boolean {
  if (cat === "all") return true;
  return (p.tags ?? []).includes(cat);
}

export function ProductsClientShell({ products }: { products: ProductCardData[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch]                 = useState("");
  const [sort, setSort]                     = useState("title-asc");

  const filtered = useMemo(() => {
    let result = products.filter((p) => productMatchesCategory(p, activeCategory));

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.productType ?? "").toLowerCase().includes(q)
      );
    }

    result = [...result].sort((a, b) => {
      if (sort === "title-asc")   return a.title.localeCompare(b.title);
      if (sort === "title-desc")  return b.title.localeCompare(a.title);
      if (sort === "price-asc")   return parsePrice(a.price) - parsePrice(b.price);
      if (sort === "price-desc")  return parsePrice(b.price) - parsePrice(a.price);
      return 0;
    });

    return result;
  }, [products, activeCategory, search, sort]);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-10">

      {/* Filter + sort bar */}
      <div className="sticky top-[72px] z-20 -mx-5 sm:-mx-8 lg:-mx-10 glass border-b border-[var(--border)] px-5 sm:px-8 lg:px-10 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex-none rounded-full px-5 py-2 text-[11px] font-semibold tracking-[0.08em] uppercase transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat.value
                    ? "bg-[var(--primary)] text-white shadow-[var(--shadow-primary)]"
                    : "bg-white border border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)]/30 hover:text-[var(--primary)]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search + Sort */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--muted-light)]"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-40 rounded-full border border-[var(--border)] bg-white pl-9 pr-4 text-[12px] text-[var(--foreground)] placeholder:text-[var(--muted-light)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)]/30 sm:w-52"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-9 appearance-none rounded-full border border-[var(--border)] bg-white px-4 pr-8 text-[12px] font-medium text-[var(--muted)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)]/30"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='none' stroke='%236B7C74' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="mt-8 text-[12px] tracking-wide text-[var(--muted)]">
        {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "all" && (
          <> in <span className="font-semibold text-[var(--foreground)]">
            {CATEGORY_FILTERS.find((c) => c.value === activeCategory)?.label}
          </span></>
        )}
        {search && <> matching &ldquo;<span className="font-semibold text-[var(--foreground)]">{search}</span>&rdquo;</>}
      </p>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              discountLabel={product.discountLabel}
              pricePrefix={product.pricePrefix}
              imageSrc={product.imageSrc}
              imageAlt={product.imageAlt}
              href={`/products/${product.handle}`}
            />
          ))}
        </div>
      ) : (
        <div className="mt-24 flex flex-col items-center gap-5 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary-subtle)]">
            <svg className="h-7 w-7 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <p className="text-[15px] font-medium text-[var(--foreground)]">No products found</p>
            <p className="mt-1.5 text-sm text-[var(--muted)]">Try a different filter or search term.</p>
          </div>
          <button
            onClick={() => { setActiveCategory("all"); setSearch(""); }}
            className="btn-outline text-[12px]"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Collection shortcuts */}
      {activeCategory === "all" && !search && (
        <div className="mt-24 border-t border-[var(--border)] pt-12">
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--muted-light)]">
            Shop by Collection
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {CATEGORY_FILTERS.filter((c) => c.value !== "all").map((cat) => {
              const count = products.filter((p) => (p.tags ?? []).includes(cat.value)).length;
              if (!count) return null;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className="group rounded-2xl border border-[var(--border)] bg-white px-5 py-3 text-left transition-all duration-300 hover:border-[var(--primary)]/20 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5"
                  style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
                >
                  <span className="block text-[13px] font-semibold text-[var(--foreground)] tracking-tight group-hover:text-[var(--primary)] transition-colors duration-300">{cat.label}</span>
                  <span className="block text-[11px] text-[var(--muted-light)] mt-0.5">{count} products</span>
                </button>
              );
            })}
          </div>
          <p className="mt-8 text-[13px] text-[var(--muted)]">
            Or browse by collection page:{" "}
            <Link href="/collections" className="group/link inline-flex items-center gap-1 font-semibold text-[var(--primary)] transition-all duration-300 hover:gap-2">
              View all collections
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
