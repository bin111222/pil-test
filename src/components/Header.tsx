"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavCollection } from "@/lib/shopify";

function buildMegaNav(collections: NavCollection[]) {
  const collectionLinks = collections.map((c) => ({
    label: c.title,
    href: `/collections/${c.handle}`,
  }));
  return [
    {
      label: "Products",
      href: "/products",
      groups: [
        {
          heading: "Shop by Category",
          links: [
            { label: "All Products", href: "/products" },
            ...collectionLinks,
            { label: "All Collections", href: "/collections" },
          ],
        },
      ],
    },
    { label: "About", href: "/pages/about-us", groups: [] },
  ];
}

export function Header({ collections = [] }: { collections?: NavCollection[] }) {
  const MEGA_NAV = useMemo(() => buildMegaNav(collections), [collections]);
  const [scrolled, setScrolled]       = useState(false);
  const [megaOpen, setMegaOpen]       = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const pathname                      = usePathname();
  const closeTimer                    = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMegaOpen(null); setMobileOpen(false); }, [pathname]);

  function openMega(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(label);
  }
  function schedulClose() {
    closeTimer.current = setTimeout(() => setMegaOpen(null), 120);
  }

  const activeItem = MEGA_NAV.find((n) => n.label === megaOpen);

  return (
    <div className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className={`overflow-hidden bg-[var(--dark)] transition-all duration-700 ease-[var(--ease-out-expo)] ${scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"}`}>
        <div className="flex items-center justify-center gap-6 py-2.5">
          <p className="text-[10px] font-medium tracking-[0.2em] text-white/60 uppercase">
            Free delivery on orders above ₹499
          </p>
          <span className="h-3 w-px bg-white/15" />
          <p className="text-[10px] font-medium tracking-[0.2em] text-[var(--accent)]/70 uppercase">
            38+ years of pharmaceutical trust
          </p>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`transition-all duration-500 ease-[var(--ease-out-expo)] ${
          scrolled
            ? "glass border-b border-[var(--border)] shadow-[0_1px_24px_rgba(0,0,0,0.06)]"
            : "bg-[var(--background)]/95 border-b border-transparent"
        }`}
        onMouseLeave={schedulClose}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3.5 select-none">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)] transition-all duration-300 group-hover:shadow-[var(--shadow-primary)]">
              <span className="text-[10px] font-black tracking-[0.2em] text-white">PIL</span>
              <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[var(--accent)]" />
            </div>
            <div className="leading-none">
              <span className="block font-display text-lg font-semibold text-[var(--foreground)] tracking-tight">PIL India</span>
              <span className="block text-[8px] font-semibold tracking-[0.3em] text-[var(--muted-light)] uppercase mt-0.5">Est. 1986</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" onMouseLeave={schedulClose}>
            {MEGA_NAV.map((item) => (
              <div key={item.label} className="relative">
                <Link
                  href={item.href}
                  onMouseEnter={() => item.groups.length ? openMega(item.label) : setMegaOpen(null)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 ${
                    pathname.startsWith(item.href) && item.href !== "/"
                      ? "text-[var(--primary)] bg-[var(--primary-subtle)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-tinted)]"
                  }`}
                >
                  {item.label}
                  {item.groups.length > 0 && (
                    <svg className={`h-3 w-3 transition-transform duration-300 ${megaOpen === item.label ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="https://pilindia.shipdelight.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--muted)] transition-all duration-300 hover:bg-[var(--primary-subtle)] hover:text-[var(--primary)]"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414A1 1 0 0121 11.414V16a1 1 0 01-1 1h-1" />
              </svg>
              Track
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden rounded-full p-2.5 text-[var(--muted)] transition-all duration-300 hover:bg-[var(--surface-tinted)] hover:text-[var(--foreground)]"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            <Link
              href="/cart"
              className="group/cart inline-flex items-center gap-2.5 rounded-full bg-[var(--primary)] px-6 py-3 text-[12px] font-semibold tracking-[0.1em] uppercase text-white transition-all duration-300 hover:bg-[var(--primary-hover)] hover:shadow-[var(--shadow-primary)] hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <svg className="h-4 w-4 transition-transform duration-300 group-hover/cart:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="hidden sm:inline">Cart</span>
            </Link>
          </div>
        </div>

        {/* Mega menu dropdown */}
        {megaOpen && activeItem && activeItem.groups.length > 0 && (
          <div
            className="absolute left-0 right-0 border-t border-[var(--border)] bg-white/98 shadow-[var(--shadow-xl)] backdrop-blur-sm animate-fade-in"
            style={{ animationDuration: '0.2s' }}
            onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
            onMouseLeave={schedulClose}
          >
            <div className="mx-auto max-w-7xl px-8 py-8 lg:px-10">
              <div className="grid grid-cols-3 gap-10">
                {activeItem.groups.map((group) => (
                  <div key={group.heading}>
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted-light)]">
                      {group.heading}
                    </p>
                    <ul className="space-y-1">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="group/link flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--foreground-secondary)] transition-all duration-200 hover:bg-[var(--primary-subtle)] hover:text-[var(--primary)] hover:pl-4"
                          >
                            <span className="h-1 w-1 rounded-full bg-[var(--primary)] opacity-0 transition-opacity duration-200 group-hover/link:opacity-100" />
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-b border-[var(--border)] bg-white/98 shadow-[var(--shadow-lg)] backdrop-blur-xl animate-fade-in" style={{ animationDuration: '0.2s' }}>
          <nav className="px-5 py-6 space-y-1">
            <Link href="/products" className="block rounded-xl px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition-all duration-200 hover:bg-[var(--primary-subtle)] hover:text-[var(--primary)]">
              All Products
            </Link>
            {collections.map((c) => (
              <Link key={c.id} href={`/collections/${c.handle}`} className="block rounded-xl px-4 py-2.5 text-sm text-[var(--muted)] transition-all duration-200 hover:bg-[var(--primary-subtle)] hover:text-[var(--primary)]">
                {c.title}
              </Link>
            ))}
            <Link href="/collections" className="block rounded-xl px-4 py-2.5 text-sm text-[var(--muted)] transition-all duration-200 hover:bg-[var(--primary-subtle)] hover:text-[var(--primary)]">All Collections</Link>
            <div className="my-4 h-px bg-[var(--border)]" />
            <Link href="https://pilindia.shipdelight.in/" target="_blank" className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-[var(--muted)] transition-all duration-200 hover:bg-[var(--surface-tinted)]">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414A1 1 0 0121 11.414V16a1 1 0 01-1 1h-1" />
              </svg>
              Track Order
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
