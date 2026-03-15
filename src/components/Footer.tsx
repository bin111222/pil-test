import Link from "next/link";
import type { NavCollection } from "@/lib/shopify";

const customerHelp = [
  { label: "Track Order",       href: "https://pilindia.shipdelight.in/" },
  { label: "Return & Exchange", href: "https://pilindia.shipdelight.in/find-orders" },
  { label: "Contact Us",        href: "/pages/contact" },
];

const company = [
  { label: "About Us",   href: "/pages/about-us" },
  { label: "Contact Us", href: "/pages/contact" },
];

const certBadges = ["ISO Certified", "GMP Compliant", "FSSAI Approved"];

export function Footer({ collections = [] }: { collections?: NavCollection[] }) {
  return (
    <footer className="relative bg-[var(--dark)] text-[var(--dark-text)] overflow-hidden">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[var(--primary)]/[0.04] blur-[120px]" />
        <div className="absolute left-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-[var(--accent)]/[0.03] blur-[100px]" />
      </div>

      {/* Newsletter bar */}
      <div className="relative border-b border-white/[0.06]">
        <div className="container py-16">
          <div className="flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-center">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.25em] text-[var(--accent)]/60 uppercase mb-3">Newsletter</p>
              <h3 className="font-display text-[1.75rem] font-bold text-white tracking-tight">Stay Informed</h3>
              <p className="mt-2 text-sm text-white/35 leading-relaxed">
                Health tips, new arrivals, and exclusive offers — delivered to your inbox.
              </p>
            </div>
            <form
              className="flex w-full max-w-md gap-3"
              action="#"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-white/[0.08] bg-white/[0.05] px-6 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-[var(--primary-light)] focus:bg-white/[0.08] focus:ring-2 focus:ring-[var(--primary-light)]/20"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-[var(--primary)] px-7 py-3.5 text-[12px] font-semibold tracking-[0.1em] uppercase text-white transition-all duration-300 hover:bg-[var(--primary-light)] hover:shadow-[0_4px_24px_var(--primary-glow)] active:scale-[0.97]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container relative py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3.5">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)] shadow-[var(--shadow-primary)]">
                <span className="text-[10px] font-black tracking-[0.2em] text-white">PIL</span>
              </div>
              <span className="font-display text-lg font-semibold text-white tracking-tight">
                PIL India
              </span>
            </div>

            <p className="mt-6 max-w-xs text-sm leading-[1.8] text-white/30">
              Trusted Healthcare for Every Home. Science-backed medicines,
              personal care, pet wellness, and pain relief from a pharma company
              with 38+ years of trust.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2.5">
              <span className="text-[11px] font-medium tracking-wide text-white/30">Est. 1986</span>
              <span className="h-3.5 w-px bg-white/[0.1]" />
              <span className="text-[11px] font-semibold tracking-wide gradient-gold-text">Pharmaceutical Excellence</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {certBadges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.1em] text-white/25 uppercase transition-all duration-300 hover:border-white/[0.12] hover:text-white/40"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Categories */}
          {collections.length > 0 && (
            <div>
              <h4 className="mb-6 text-[10px] font-semibold tracking-[0.2em] uppercase text-white/25">
                Categories
              </h4>
              <ul className="space-y-3.5">
                {collections.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/collections/${c.handle}`}
                      className="text-sm text-white/40 transition-all duration-300 hover:text-white hover:pl-1"
                    >
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Customer Help */}
          <div>
            <h4 className="mb-6 text-[10px] font-semibold tracking-[0.2em] uppercase text-white/25">
              Customer Help
            </h4>
            <ul className="space-y-3.5">
              {customerHelp.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/40 transition-all duration-300 hover:text-white hover:pl-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-6 text-[10px] font-semibold tracking-[0.2em] uppercase text-white/25">
              Company
            </h4>
            <ul className="space-y-3.5">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/40 transition-all duration-300 hover:text-white hover:pl-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/[0.05]">
        <div className="container py-7">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-[11px] tracking-wide text-white/20">
              © {new Date().getFullYear()} PIL India. All rights reserved.
            </p>
            <p className="text-[11px] tracking-wide text-white/15 italic">
              Because you deserve care you can trust.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
