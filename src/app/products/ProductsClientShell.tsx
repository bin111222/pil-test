"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { ProductCardData } from "@/lib/shopify/types";
import { ProductCard } from "@/components/ui/ProductCard";

// ─── Category filter config ───────────────────────────────────────────────────

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

// ─── helpers ─────────────────────────────────────────────────────────────────

function parsePrice(str: string): number {
  const m = str.replace(/,/g, "").match(/[\d.]+/);
  return m ? parseFloat(m[0]) : 0;
}

function productMatchesCategory(p: ProductCardData, cat: string): boolean {
  if (cat === "all") return true;
  return (p.tags ?? []).includes(cat);
}

// ─── component ───────────────────────────────────────────────────────────────

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
    <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">

      {/* ── Filter + sort bar ───────────────────────────────────────────── */}
      <div className="sticky top-[72px] z-20 -mx-4 sm:-mx-6 lg:-mx-8 bg-[var(--background)]/95 backdrop-blur border-b border-[var(--border)] px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          {/* Category tabs – horizontally scrollable */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-0.5">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex-none rounded-full px-4 py-1.5 text-xs font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat.value
                    ? "bg-[var(--primary)] text-white shadow-sm"
                    : "bg-white border border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search + Sort */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search */}
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--muted)]"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-36 rounded-full border border-[var(--border)] bg-white pl-8 pr-3 text-xs text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-0 sm:w-48"
              />
            </div>
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-8 rounded-full border border-[var(--border)] bg-white px-3 text-xs text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Results count ───────────────────────────────────────────────── */}
      <p className="mt-6 text-xs text-[var(--muted)]">
        {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "all" && (
          <> in <span className="font-medium text-[var(--foreground)]">
            {CATEGORY_FILTERS.find((c) => c.value === activeCategory)?.label}
          </span></>
        )}
        {search && <> matching &ldquo;<span className="font-medium text-[var(--foreground)]">{search}</span>&rdquo;</>}
      </p>

      {/* ── Product grid ────────────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
        <div className="mt-20 flex flex-col items-center gap-4 text-center">
          <div className="h-16 w-16 rounded-full bg-[var(--primary-subtle)] flex items-center justify-center">
            <svg className="h-7 w-7 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-[var(--foreground)]">No products found</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Try a different filter or search term.</p>
          </div>
          <button
            onClick={() => { setActiveCategory("all"); setSearch(""); }}
            className="rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)]"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* ── Collection shortcuts ─────────────────────────────────────────── */}
      {activeCategory === "all" && !search && (
        <div className="mt-16 border-t border-[var(--border)] pt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--muted)]">
            Shop by Collection
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {CATEGORY_FILTERS.filter((c) => c.value !== "all").map((cat) => {
              const count = products.filter((p) => (p.tags ?? []).includes(cat.value)).length;
              if (!count) return null;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className="rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-left transition hover:border-[var(--primary)] hover:shadow-sm"
                >
                  <span className="block text-sm font-medium text-[var(--foreground)]">{cat.label}</span>
                  <span className="block text-xs text-[var(--muted)]">{count} products</span>
                </button>
              );
            })}
          </div>
          <p className="mt-6 text-sm text-[var(--muted)]">
            Or browse by collection page:{" "}
            <Link href="/collections" className="text-[var(--primary)] hover:underline">
              View all collections →
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
