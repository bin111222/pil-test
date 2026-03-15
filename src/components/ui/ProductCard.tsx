import Image from "next/image";
import Link from "next/link";

export interface ProductCardProps {
  title: string;
  price: string;
  compareAtPrice?: string;
  discountLabel?: string;
  href: string;
  imageSrc?: string | null;
  imageAlt?: string;
  pricePrefix?: string;
}

export function ProductCard({
  title,
  price,
  compareAtPrice,
  discountLabel,
  href,
  imageSrc,
  imageAlt,
  pricePrefix,
}: ProductCardProps) {
  const displayPrice = pricePrefix ? `${pricePrefix} ${price}` : price;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-[var(--border)] shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lg)] hover:border-[var(--primary)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
    >
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-[var(--surface-tinted)]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-subtle)] to-[var(--surface-tinted)]" />
        )}

        {/* Discount badge */}
        {discountLabel && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--primary)] px-2.5 py-1 text-[11px] font-bold tracking-wide text-white">
            {discountLabel}
          </span>
        )}

        {/* Hover CTA bar */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-1.5 bg-[var(--primary)] py-2.5 transition-transform duration-300 group-hover:translate-y-0">
          <span className="text-xs font-semibold tracking-widest text-white uppercase">
            View Product
          </span>
          <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-sm font-medium leading-snug text-[var(--foreground)] line-clamp-2 transition-colors duration-200 group-hover:text-[var(--primary)]">
          {title}
        </h3>
        <div className="mt-auto flex flex-wrap items-baseline gap-2">
          <span className="font-bold text-[var(--foreground)]">{displayPrice}</span>
          {compareAtPrice && (
            <span className="text-xs text-[var(--muted)] line-through">{compareAtPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
