import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CollectionToolbar } from "@/components/CollectionToolbar";
import { ProductGrid } from "@/components/ProductGrid";
import { TrustCallout } from "@/components/TrustCallout";
import {
  getCollectionPageData,
  type CollectionSortKey,
} from "@/lib/shopify";

const VALID_SORT_KEYS: CollectionSortKey[] = [
  "RELEVANCE",
  "BEST_SELLING",
  "CREATED",
  "PRICE",
  "TITLE",
];

function isValidSort(s: string | null): s is CollectionSortKey {
  return s != null && VALID_SORT_KEYS.includes(s as CollectionSortKey);
}

export interface CollectionPageProps {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ sort?: string }>;
}

export default async function CollectionPage({
  params,
  searchParams,
}: CollectionPageProps) {
  const { handle } = await params;
  const { sort } = await searchParams;
  const rawSort = sort ?? null;
  const sortKey: CollectionSortKey | undefined = isValidSort(rawSort) ? rawSort : undefined;

  const data = await getCollectionPageData(handle, sortKey);
  if (!data) notFound();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: data.title },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        <Breadcrumb items={breadcrumbItems} className="pt-8 pb-6" />

        <div className="pb-10">
          <h1 className="font-display text-[2rem] font-bold tracking-tight text-[var(--foreground)] sm:text-[2.5rem] leading-[1.1]">
            {data.title}
          </h1>
          {data.description && (
            <p className="mt-3 max-w-2xl text-base text-[var(--muted)] leading-relaxed">{data.description}</p>
          )}
          <div className="mt-4 separator-gold" />
        </div>

        <Suspense
          fallback={
            <div className="flex items-center gap-2 border-b border-[var(--border)] pb-5">
              <span className="text-[13px] text-[var(--muted)]">Loading…</span>
            </div>
          }
        >
          <CollectionToolbar
            collectionHandle={data.handle}
            productCount={data.products.length}
          />
        </Suspense>

        <div className="mt-10">
          <ProductGrid products={data.products} />
        </div>

        <TrustCallout />
      </main>
    </div>
  );
}
