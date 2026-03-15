import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <Breadcrumb items={breadcrumbItems} className="pt-6 pb-4" />

        <div className="pb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
            {data.title}
          </h1>
          {data.description && (
            <p className="mt-2 max-w-2xl text-[var(--muted)]">{data.description}</p>
          )}
        </div>

        <Suspense
          fallback={
            <div className="flex items-center gap-2 border-b border-[var(--border)] pb-4">
              <span className="text-sm text-[var(--muted)]">Loading…</span>
            </div>
          }
        >
          <CollectionToolbar
            collectionHandle={data.handle}
            productCount={data.products.length}
          />
        </Suspense>

        <div className="mt-8">
          <ProductGrid products={data.products} />
        </div>

        <TrustCallout />
      </main>
      <Footer />
    </div>
  );
}
