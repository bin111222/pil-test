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
      className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-[var(--border)] transition-all duration-500 hover:-translate-y-2 hover:border-[var(--primary)]/[0.15] hover:shadow-[var(--shadow-xl)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
      style={{ boxShadow: 'var(--shadow-sm)', transitionTimingFunction: 'var(--ease-out-expo)' }}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--surface-tinted)]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-subtle)] via-[var(--surface-tinted)] to-[var(--accent-light)]/20" />
        )}

        {/* Discount badge */}
        {discountLabel && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--primary)] px-3 py-1.5 text-[10px] font-bold tracking-[0.1em] uppercase text-white shadow-[var(--shadow-md)]">
            {discountLabel}
          </span>
        )}

        {/* Hover CTA bar */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-[var(--primary)]/95 py-3 backdrop-blur-sm transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0">
          <span className="text-[10px] font-semibold tracking-[0.2em] text-white uppercase">
            View Product
          </span>
          <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <h3 className="text-[13px] font-medium leading-snug text-[var(--foreground-secondary)] line-clamp-2 transition-colors duration-300 group-hover:text-[var(--primary)]">
          {title}
        </h3>
        <div className="mt-auto flex flex-wrap items-baseline gap-2.5">
          <span className="text-base font-bold text-[var(--foreground)] tracking-tight">{displayPrice}</span>
          {compareAtPrice && (
            <span className="text-xs text-[var(--muted-light)] line-through">{compareAtPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
