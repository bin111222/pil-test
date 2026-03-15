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
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border)] bg-white/92 px-5 py-4 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:hidden ${className}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium text-[var(--foreground)]">{title}</p>
          <p className="text-sm font-bold text-[var(--primary)] mt-0.5">{price}</p>
        </div>
        <button
          type="button"
          onClick={onAddToCart}
          className="flex-shrink-0 rounded-full bg-[var(--primary)] px-6 py-3 text-[12px] font-semibold tracking-[0.1em] uppercase text-white transition-all duration-300 hover:bg-[var(--primary-hover)] hover:shadow-[var(--shadow-primary)] active:scale-[0.97]"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
