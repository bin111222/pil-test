import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHomepageCollections } from "@/lib/shopify";

export default async function CollectionsIndexPage() {
  const categories = await getHomepageCollections();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
          Collections
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          Shop by category
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/collections/${cat.handle}`}
              className="rounded-xl border border-[var(--border)] bg-white p-6 transition hover:border-[var(--primary)] hover:shadow-md"
            >
              <span className="font-medium text-[var(--foreground)]">{cat.name}</span>
              {cat.description && (
                <p className="mt-1 text-sm text-[var(--muted)]">{cat.description}</p>
              )}
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
