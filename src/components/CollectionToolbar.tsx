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
      className={`flex flex-col gap-4 border-b border-[var(--border)] pb-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <p className="text-sm text-[var(--muted)]">
        {productCount} {productCount === 1 ? "product" : "products"}
      </p>
      <div className="flex items-center gap-2">
        <label htmlFor="collection-sort" className="text-sm font-medium text-[var(--foreground)]">
          Sort by
        </label>
        <select
          id="collection-sort"
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
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
