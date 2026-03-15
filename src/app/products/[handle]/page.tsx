import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProductGrid } from "@/components/ProductGrid";
import { TrustCallout } from "@/components/TrustCallout";
import { ProductStickyBar } from "@/components/ProductStickyBar";
import { ProductFaq } from "@/components/ProductFaq";
import { getProductByHandle, getRelatedProducts } from "@/lib/shopify";
import { AddToCartButton } from "./AddToCartButton";

export interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const [product, related] = await Promise.all([
    getProductByHandle(handle),
    getRelatedProducts(handle, 4),
  ]);

  if (!product) notFound();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: product.title },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="mx-auto max-w-7xl px-5 pb-28 sm:pb-20 sm:px-8 lg:px-10">
        <Breadcrumb items={breadcrumbItems} className="pt-8 pb-6" />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            {product.images.length > 0 ? (
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[var(--surface-tinted)] ring-1 ring-[var(--border)]">
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].altText ?? product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                {product.discountLabel && (
                  <span className="absolute right-4 top-4 rounded-full bg-[var(--primary)] px-3.5 py-1.5 text-[10px] font-bold tracking-[0.1em] uppercase text-white shadow-[var(--shadow-md)]">
                    {product.discountLabel}
                  </span>
                )}
              </div>
            ) : (
              <div className="aspect-square w-full rounded-2xl bg-[var(--surface-tinted)] ring-1 ring-[var(--border)]" />
            )}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.slice(1, 5).map((img, i) => (
                  <div
                    key={i}
                    className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-[var(--border)] transition-all duration-300 hover:ring-[var(--primary)]/30 hover:shadow-[var(--shadow-md)]"
                  >
                    <Image
                      src={img.url}
                      alt={img.altText ?? `${product.title} ${i + 2}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="font-display text-[1.75rem] font-bold tracking-tight text-[var(--foreground)] sm:text-[2rem] leading-[1.15]">
              {product.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-2xl font-bold text-[var(--foreground)] tracking-tight">
                {product.pricePrefix ? `${product.pricePrefix} ${product.price}` : product.price}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-[var(--muted-light)] line-through">
                  {product.compareAtPrice}
                </span>
              )}
              {product.discountLabel && (
                <span className="rounded-full bg-[var(--primary-subtle)] px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--primary)]">
                  {product.discountLabel}
                </span>
              )}
            </div>

            {product.description && (
              <div className="mt-6">
                <p className="text-[15px] leading-[1.8] text-[var(--muted)]">{product.description}</p>
              </div>
            )}

            <div className="mt-8">
              <AddToCartButton productId={product.id} variantId={product.variantId} />
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap gap-3">
              {["Dermatologically tested", "38+ years trust", "Made in India"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-tinted)] px-4 py-2 text-[11px] font-medium tracking-wide text-[var(--muted)]">
                  <svg className="h-3 w-3 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>

            {product.benefits && product.benefits.length > 0 && (
              <section className="mt-10">
                <h2 className="text-lg font-semibold text-[var(--foreground)] tracking-tight">Benefits</h2>
                <div className="mt-2 h-px w-8 bg-[var(--accent)]" />
                <ul className="mt-4 space-y-2.5">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed text-[var(--muted)]">
                      <svg className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {product.usageInstructions && product.usageInstructions.length > 0 && (
              <section className="mt-10">
                <h2 className="text-lg font-semibold text-[var(--foreground)] tracking-tight">
                  How to use
                </h2>
                <div className="mt-2 h-px w-8 bg-[var(--accent)]" />
                <ol className="mt-4 space-y-2.5">
                  {product.usageInstructions.map((u, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed text-[var(--muted)]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--primary-subtle)] text-[10px] font-bold text-[var(--primary)]">
                        {i + 1}
                      </span>
                      {u}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {product.faqs && product.faqs.length > 0 && (
              <section className="mt-10">
                <ProductFaq faqs={product.faqs} />
              </section>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <div className="mb-8">
              <p className="section-label mb-3">Recommended</p>
              <h2 className="font-display text-2xl font-bold text-[var(--foreground)] tracking-tight">
                You may also like
              </h2>
              <div className="mt-3 separator-gold" />
            </div>
            <ProductGrid products={related} />
          </section>
        )}

        <TrustCallout />
      </main>

      <ProductStickyBar
        title={product.title}
        price={product.pricePrefix ? `${product.pricePrefix} ${product.price}` : product.price}
        productId={product.id}
        variantId={product.variantId}
      />
    </div>
  );
}
