"use client";

export interface StickyAddToCartProps {
  title: string;
  price: string;
  onAddToCart: () => void;
  className?: string;
}

export function StickyAddToCart({
  title,
  price,
  onAddToCart,
  className = "",
}: StickyAddToCartProps) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border)] bg-white/95 px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] backdrop-blur sm:hidden ${className}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-[var(--foreground)]">{title}</p>
          <p className="text-sm font-semibold text-[var(--primary)]">{price}</p>
        </div>
        <button
          type="button"
          onClick={onAddToCart}
          className="flex-shrink-0 rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
