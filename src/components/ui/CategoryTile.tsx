import Image from "next/image";
import Link from "next/link";

export interface CategoryTileProps {
  name: string;
  description?: string;
  href: string;
  imageSrc?: string | null;
  imageAlt?: string;
  /** Optional: make a tile span 2 columns */
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
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
      ) : (
        <div className="absolute inset-0 gradient-primary" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-card-overlay" />

      {/* Hover tint */}
      <div className="absolute inset-0 bg-[var(--primary)]/0 transition-colors duration-500 group-hover:bg-[var(--primary)]/15" />

      {/* Arrow chip — top right */}
      <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-1 ring-white/20 transition-all duration-300 group-hover:bg-white group-hover:shadow-lg">
        <svg
          className="h-4 w-4 text-white transition-colors duration-300 group-hover:text-[var(--primary)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-1">
          Explore
        </p>
        <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
          {name}
        </h3>
        {description && (
          <p className="mt-1 max-w-xs text-sm text-white/70 line-clamp-1 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
