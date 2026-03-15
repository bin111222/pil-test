import Link from "next/link";
import { getHomepageCollections } from "@/lib/shopify";

export default async function CollectionsIndexPage() {
  const categories = await getHomepageCollections();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="mb-12">
          <p className="section-label mb-4">Browse</p>
          <h1 className="font-display text-[2rem] font-bold tracking-tight text-[var(--foreground)] sm:text-[2.5rem]">
            Collections
          </h1>
          <div className="mt-4 separator-gold" />
          <p className="mt-4 text-base text-[var(--muted)] leading-relaxed">
            Shop by category
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/collections/${cat.handle}`}
              className="group rounded-2xl border border-[var(--border)] bg-white p-7 transition-all duration-500 hover:border-[var(--primary)]/[0.15] hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
              style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-semibold text-[var(--foreground)] tracking-tight group-hover:text-[var(--primary)] transition-colors duration-300">{cat.name}</span>
                <svg className="h-4 w-4 text-[var(--muted-light)] transition-all duration-300 group-hover:text-[var(--primary)] group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              {cat.description && (
                <p className="mt-2.5 text-sm text-[var(--muted)] leading-relaxed">{cat.description}</p>
              )}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
