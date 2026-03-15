import Link from "next/link";

const customerHelp = [
  { label: "Track Order",       href: "https://pilindia.shipdelight.in/" },
  { label: "Return & Exchange", href: "https://pilindia.shipdelight.in/find-orders" },
  { label: "Contact Us",        href: "/pages/contact" },
];

const categories = [
  { label: "Medicines",        href: "/collections/medicines" },
  { label: "Personal Care",    href: "/collections/personal-care" },
  { label: "Pet Care",         href: "/collections/pet-care" },
  { label: "Pain Management",  href: "/collections/pain-managment" },
  { label: "Baby Care",        href: "/collections/baby-care" },
  { label: "Hair Care",        href: "/collections/hair-care" },
];

const company = [
  { label: "About Us",   href: "/pages/about-us" },
  { label: "Contact Us", href: "/pages/contact" },
];

const certBadges = ["ISO Certified", "GMP Compliant", "FSSAI Approved"];

export function Footer() {
  return (
    <footer className="bg-[var(--dark)] text-[var(--dark-text)]">

      {/* ── Newsletter bar ── */}
      <div className="border-b border-[var(--dark-border)]">
        <div className="container py-12">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-display text-2xl font-bold text-white">Stay Informed</h3>
              <p className="mt-1 text-sm text-[var(--dark-muted)]">
                Health tips, new arrivals, and exclusive offers — delivered to your inbox.
              </p>
            </div>
            <form
              className="flex w-full max-w-md gap-2"
              action="#"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-white/10 bg-white/8 px-5 py-3 text-sm text-white placeholder:text-white/35 outline-none ring-0 transition focus:border-[var(--primary-light)] focus:bg-white/12 focus:ring-2 focus:ring-[var(--primary-light)]/30"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[var(--primary-light)] hover:shadow-[0_4px_16px_var(--primary-glow)] active:scale-[0.97]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand column — 2 cols */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] shadow-sm">
                <span className="text-[11px] font-black tracking-widest text-white">PIL</span>
              </div>
              <span className="font-display text-[17px] font-semibold text-white tracking-tight">
                PIL India
              </span>
            </div>

            {/* Tagline */}
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[var(--dark-muted)]">
              Trusted Healthcare for Every Home. Science-backed medicines,
              personal care, pet wellness, and pain relief from a pharma company
              with 38+ years of trust.
            </p>

            {/* Est. pill */}
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 px-4 py-2">
              <span className="text-xs text-[var(--dark-muted)]">Est. 1986</span>
              <span className="h-3 w-px bg-white/15" />
              <span className="text-xs font-medium text-[var(--accent)]">Pharmaceutical Excellence</span>
            </div>

            {/* Cert badges */}
            <div className="mt-5 flex flex-wrap gap-2">
              {certBadges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-[var(--dark-muted)]"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-5 text-[10px] font-semibold tracking-[0.18em] uppercase text-[var(--dark-muted)]">
              Categories
            </h4>
            <ul className="space-y-3">
              {categories.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/55 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Help */}
          <div>
            <h4 className="mb-5 text-[10px] font-semibold tracking-[0.18em] uppercase text-[var(--dark-muted)]">
              Customer Help
            </h4>
            <ul className="space-y-3">
              {customerHelp.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/55 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-5 text-[10px] font-semibold tracking-[0.18em] uppercase text-[var(--dark-muted)]">
              Company
            </h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/55 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[var(--dark-border)]">
        <div className="container py-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} PIL India. All rights reserved.
            </p>
            <p className="text-xs text-white/25">
              Because you deserve care you can trust.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
