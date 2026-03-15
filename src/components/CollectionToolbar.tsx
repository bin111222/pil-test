"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const SORT_OPTIONS = [
  { value: "RELEVANCE", label: "Relevance" },
  { value: "BEST_SELLING", label: "Best selling" },
  { value: "CREATED", label: "Newest" },
  { value: "PRICE", label: "Price: low to high" },
  { value: "TITLE", label: "Alphabetical" },
] as const;

export interface CollectionToolbarProps {
  collectionHandle: string;
  productCount: number;
  className?: string;
}

export function CollectionToolbar({
  collectionHandle,
  productCount,
  className = "",
}: CollectionToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = (searchParams.get("sort") as string) || "RELEVANCE";

  const onSortChange = (value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value === "RELEVANCE") next.delete("sort");
    else next.set("sort", value);
    router.push(`/collections/${collectionHandle}?${next.toString()}`);
  };

  return (
    <div
      className={`flex flex-col gap-4 border-b border-[var(--border)] pb-5 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <p className="text-[13px] text-[var(--muted)]">
        {productCount} {productCount === 1 ? "product" : "products"}
      </p>
      <div className="flex items-center gap-3">
        <label htmlFor="collection-sort" className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[var(--muted-light)]">
          Sort by
        </label>
        <select
          id="collection-sort"
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none rounded-full border border-[var(--border)] bg-white px-5 py-2.5 pr-10 text-[13px] font-medium text-[var(--foreground)] transition-all duration-200 focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/10 hover:border-[var(--primary)]/30"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%236B7C74' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
