"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MEGA_NAV = [
  {
    label: "Products",
    href: "/products",
    groups: [
      {
        heading: "Personal Care",
        links: [
          { label: "All Products",  href: "/products" },
          { label: "Skin Care",     href: "/collections/skin-care" },
          { label: "Hair Care",     href: "/collections/hair-care" },
          { label: "Body Care",     href: "/collections/body-care" },
          { label: "Oral Care",     href: "/collections/oral-care" },
          { label: "Foot Care",     href: "/collections/foot-care" },
        ],
      },
      {
        heading: "Medicines",
        links: [
          { label: "Cough & Cold",      href: "/collections/cough-cold" },
          { label: "Cardiac & Diabetic",href: "/collections/cardiac-diabetic-care" },
          { label: "Health & Wellness", href: "/collections/health-wellness" },
          { label: "Gastro Range",      href: "/collections/gastrointestinal-health" },
        ],
      },
      {
        heading: "More",
        links: [
          { label: "Pain Relief",   href: "/collections/pain-managment" },
          { label: "Pet Care",      href: "/collections/pet-care" },
          { label: "Combo Kits",    href: "/collections/combos" },
          { label: "All Collections", href: "/collections" },
        ],
      },
    ],
  },
  { label: "About",    href: "/pages/about-us", groups: [] },
];

export function Header() {
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

  // Close mega-menu on route change
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
      <div className={`overflow-hidden bg-[var(--primary)] transition-all duration-500 ${scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"}`}>
        <p className="py-2 text-center text-[11px] font-medium tracking-widest text-white/85 uppercase">
          Free delivery on orders above ₹499 &nbsp;·&nbsp; 38+ years of pharmaceutical trust
        </p>
      </div>

      {/* Main header */}
      <header
        className={`transition-all duration-300 ${scrolled ? "glass border-b border-white/20 shadow-[0_2px_24px_rgba(0,0,0,0.07)]" : "bg-[var(--background)]"}`}
        onMouseLeave={schedulClose}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 select-none">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] shadow-sm transition-transform duration-200 group-hover:scale-105">
              <span className="text-[11px] font-black tracking-widest text-white">PIL</span>
            </div>
            <div className="leading-none">
              <span className="block font-display text-[17px] font-semibold text-[var(--foreground)] tracking-tight">PIL India</span>
              <span className="block text-[9px] font-medium tracking-[0.22em] text-[var(--muted)] uppercase mt-0.5">Est. 1986</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium" onMouseLeave={schedulClose}>
            {MEGA_NAV.map((item) => (
              <div key={item.label} className="relative">
                <Link
                  href={item.href}
                  onMouseEnter={() => item.groups.length ? openMega(item.label) : setMegaOpen(null)}
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 transition-colors duration-150 ${
                    pathname.startsWith(item.href) && item.href !== "/"
                      ? "text-[var(--primary)] bg-[var(--primary-subtle)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]"
                  }`}
                >
                  {item.label}
                  {item.groups.length > 0 && (
                    <svg className={`h-3 w-3 transition-transform ${megaOpen === item.label ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="https://pilindia.shipdelight.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-[var(--muted)] transition-all hover:bg-[var(--primary-subtle)] hover:text-[var(--primary)]"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414A1 1 0 0121 11.414V16a1 1 0 01-1 1h-1" />
              </svg>
              Track
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden rounded-lg p-2 text-[var(--muted)] hover:bg-[var(--border)]"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            <Link
              href="/cart"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[var(--primary-hover)] hover:shadow-md active:scale-[0.97]"
              style={{ boxShadow: "0 2px 12px var(--primary-glow)" }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="hidden sm:inline">Cart</span>
            </Link>
          </div>
        </div>

        {/* Mega menu dropdown */}
        {megaOpen && activeItem && activeItem.groups.length > 0 && (
          <div
            className="absolute left-0 right-0 border-t border-[var(--border)] bg-white shadow-xl"
            onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
            onMouseLeave={schedulClose}
          >
            <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
              <div className="grid grid-cols-3 gap-8">
                {activeItem.groups.map((group) => (
                  <div key={group.heading}>
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted)]">
                      {group.heading}
                    </p>
                    <ul className="space-y-1.5">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="block rounded-md px-2 py-1.5 text-sm text-[var(--foreground)] transition hover:bg-[var(--primary-subtle)] hover:text-[var(--primary)]"
                          >
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
        <div className="md:hidden border-b border-[var(--border)] bg-white shadow-lg">
          <nav className="px-4 py-4 space-y-1">
            <Link href="/products" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--primary-subtle)]">
              All Products
            </Link>
            <Link href="/collections/skin-care" className="block rounded-lg px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--primary-subtle)]">Skin Care</Link>
            <Link href="/collections/hair-care" className="block rounded-lg px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--primary-subtle)]">Hair Care</Link>
            <Link href="/collections/pain-managment" className="block rounded-lg px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--primary-subtle)]">Pain Relief</Link>
            <Link href="/collections/pet-care" className="block rounded-lg px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--primary-subtle)]">Pet Care</Link>
            <Link href="/collections/medicines" className="block rounded-lg px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--primary-subtle)]">Medicines</Link>
            <Link href="/collections" className="block rounded-lg px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--primary-subtle)]">All Collections</Link>
            <hr className="my-2 border-[var(--border)]" />
            <Link href="https://pilindia.shipdelight.in/" target="_blank" className="block rounded-lg px-3 py-2 text-sm text-[var(--muted)]">Track Order</Link>
          </nav>
        </div>
      )}
    </div>
  );
}
