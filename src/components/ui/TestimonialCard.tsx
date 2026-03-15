"use client";

export interface TestimonialCardProps {
  title: string;
  quote: string;
  author: string;
  category?: string;
  rating?: number;
  className?: string;
}

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? "text-[var(--accent)]" : "text-[var(--border)]"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialCard({
  title,
  quote,
  author,
  category,
  rating = 5,
  className = "",
}: TestimonialCardProps) {
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <blockquote
      className={`group flex flex-col rounded-2xl border border-[var(--border)] bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[var(--primary)]/[0.12] ${className}`}
      style={{ boxShadow: 'var(--shadow-sm)', transitionTimingFunction: 'var(--ease-out-expo)' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-xl)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)'; }}
    >
      {/* Stars */}
      <StarRating rating={rating} />

      {/* Large quote mark */}
      <div className="my-4 font-display text-5xl leading-none text-[var(--primary)]/[0.1] select-none">
        &ldquo;
      </div>

      {/* Title */}
      <h3 className="text-[15px] font-semibold text-[var(--foreground)] leading-snug tracking-tight">{title}</h3>

      {/* Quote */}
      <p className="mt-3 flex-1 text-sm leading-[1.75] text-[var(--muted)] line-clamp-4">
        {quote}
      </p>

      {/* Author */}
      <footer className="mt-6 flex items-center gap-3.5 border-t border-[var(--border-subtle)] pt-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary-subtle)] to-[var(--accent-light)]/30 text-[11px] font-bold tracking-wide text-[var(--primary)]">
          {initials}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-[var(--foreground)] truncate">{author}</div>
          {category && (
            <div className="text-[11px] text-[var(--muted-light)] truncate mt-0.5">{category}</div>
          )}
        </div>
        <div className="ml-auto">
          <span className="rounded-full bg-[var(--primary-subtle)] px-3 py-1 text-[9px] font-bold tracking-[0.15em] text-[var(--primary)] uppercase">
            Verified
          </span>
        </div>
      </footer>
    </blockquote>
  );
}
