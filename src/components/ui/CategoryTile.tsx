import Image from "next/image";
import Link from "next/link";

export interface CategoryTileProps {
  name: string;
  description?: string;
  href: string;
  imageSrc?: string | null;
  imageAlt?: string;
  featured?: boolean;
}

export function CategoryTile({
  name,
  description,
  href,
  imageSrc,
  imageAlt,
  featured = false,
}: CategoryTileProps) {
  return (
    <Link
      href={href}
      className={`group relative flex overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 ${
        featured ? "aspect-[16/9] sm:col-span-2" : "aspect-[4/3]"
      }`}
    >
      {/* Background */}
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt ?? name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.08]"
        />
      ) : (
        <div className="absolute inset-0 gradient-primary" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-card-overlay" />

      {/* Hover tint */}
      <div className="absolute inset-0 bg-[var(--primary)]/0 transition-colors duration-700 group-hover:bg-[var(--primary)]/[0.12]" />

      {/* Arrow chip — top right */}
      <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/20 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:bg-white group-hover:shadow-[var(--shadow-lg)] group-hover:scale-105">
        <svg
          className="h-4 w-4 text-white transition-all duration-500 group-hover:text-[var(--primary)] group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
        <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/50 mb-2">
          Explore
        </p>
        <h3 className="font-display text-xl font-semibold text-white sm:text-2xl tracking-tight">
          {name}
        </h3>
        {description && (
          <p className="mt-2 max-w-xs text-sm text-white/60 line-clamp-1 translate-y-3 opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
