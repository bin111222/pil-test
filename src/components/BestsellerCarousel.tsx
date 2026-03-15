"use client";

import { useRef } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ui";
import type { ProductCardData } from "@/lib/shopify";

export interface BestsellerCarouselProps {
  products: ProductCardData[];
}

export function BestsellerCarousel({ products }: BestsellerCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="section-py bg-white">
      <div className="container">

        {/* Header row */}
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="section-label mb-3">Our Bestsellers</p>
            <h2 className="section-heading">
              Customer
              <em className="not-italic text-[var(--primary)]"> Favourites</em>
            </h2>
            <p className="mt-3 section-sub">
              Body Care · Personal Care · Baby Care · Pet Care · Pain Management · Hair Care
            </p>
          </div>

          {/* Nav arrows */}
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--foreground)] transition-all duration-200 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-md active:scale-95"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--foreground)] transition-all duration-200 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-md active:scale-95"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* View all link */}
        <div className="mt-4">
          <Link
            href="/collections/bestsellers"
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)] transition-opacity hover:opacity-75"
          >
            View all bestsellers
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Scroll track */}
        <div
          ref={scrollRef}
          className="mt-8 -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 scroll-smooth [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((p) => (
            <div
              key={p.id}
              className="w-[240px] flex-none sm:w-[260px] [scroll-snap-align:start]"
            >
              <ProductCard
                title={p.title}
                price={p.price}
                compareAtPrice={p.compareAtPrice}
                discountLabel={p.discountLabel}
                href={`/products/${p.handle}`}
                pricePrefix={p.pricePrefix}
                imageSrc={p.imageSrc}
                imageAlt={p.imageAlt}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
