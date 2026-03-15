import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-24 sm:pb-16 sm:px-6">
        <Breadcrumb items={breadcrumbItems} className="pt-6 pb-4" />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            {product.images.length > 0 ? (
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[var(--card)]">
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].altText ?? product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                {product.discountLabel && (
                  <span className="absolute right-3 top-3 rounded-md bg-[var(--primary)] px-2 py-1 text-xs font-medium text-white">
                    {product.discountLabel}
                  </span>
                )}
              </div>
            ) : (
              <div className="aspect-square w-full rounded-xl bg-[var(--card)]" />
            )}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.slice(1, 5).map((img, i) => (
                  <div
                    key={i}
                    className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-white"
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
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
              {product.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xl font-semibold text-[var(--foreground)]">
                {product.pricePrefix ? `${product.pricePrefix} ${product.price}` : product.price}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-[var(--muted)] line-through">
                  {product.compareAtPrice}
                </span>
              )}
              {product.discountLabel && (
                <span className="text-sm font-medium text-[var(--primary)]">
                  {product.discountLabel}
                </span>
              )}
            </div>
            {product.description && (
              <div className="mt-4 text-[var(--muted)]">
                <p className="text-sm leading-relaxed">{product.description}</p>
              </div>
            )}

            <div className="mt-6">
              <AddToCartButton productId={product.id} variantId={product.variantId} />
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
              <span>Dermatologically tested</span>
              <span>•</span>
              <span>38+ years trust</span>
              <span>•</span>
              <span>Made in India</span>
            </div>

            {product.benefits && product.benefits.length > 0 && (
              <section className="mt-8">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">Benefits</h2>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--muted)]">
                  {product.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </section>
            )}

            {product.usageInstructions && product.usageInstructions.length > 0 && (
              <section className="mt-8">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">
                  How to use
                </h2>
                <ol className="mt-2 list-inside list-decimal space-y-1 text-sm text-[var(--muted)]">
                  {product.usageInstructions.map((u, i) => (
                    <li key={i}>{u}</li>
                  ))}
                </ol>
              </section>
            )}

            {product.faqs && product.faqs.length > 0 && (
              <section className="mt-8">
                <ProductFaq faqs={product.faqs} />
              </section>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              You may also like
            </h2>
            <div className="mt-4">
              <ProductGrid products={related} />
            </div>
          </section>
        )}

        <TrustCallout />
      </main>

      {/* Sticky ATC for mobile */}
      <ProductStickyBar
        title={product.title}
        price={product.pricePrefix ? `${product.pricePrefix} ${product.price}` : product.price}
        productId={product.id}
        variantId={product.variantId}
      />

      <Footer />
    </div>
  );
}
