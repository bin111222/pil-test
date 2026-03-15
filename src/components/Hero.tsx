import Link from "next/link";

const heroStats = [
  { value: "38+",   label: "Years of Trust" },
  { value: "1000+", label: "Doctors Trust Us" },
  { value: "50+",   label: "Countries Served" },
];

const floatingPills = [
  { label: "Body Care",    style: { top: "8%",  left: "-8%" } },
  { label: "Pain Relief",  style: { top: "30%", right: "-14%" } },
  { label: "Pet Care",     style: { bottom: "30%", right: "-10%" } },
  { label: "Baby Care",    style: { bottom: "8%", left: "2%" } },
  { label: "Hair Care",    style: { top: "62%", left: "-16%" } },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[91vh] items-center overflow-hidden gradient-hero">

      {/* ── Background decorations ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* Outer rings */}
        <div className="absolute -right-40 -top-40 h-[650px] w-[650px] rounded-full border border-[var(--primary)]/6" />
        <div className="absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full border border-[var(--primary)]/8" />
        {/* Bottom left accent */}
        <div className="absolute -bottom-40 -left-40 h-[480px] w-[480px] rounded-full border border-[var(--accent)]/8" />
        {/* Soft blobs */}
        <div className="absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-[var(--primary-subtle)] opacity-50 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 h-56 w-56 rounded-full bg-[var(--accent-light)] opacity-35 blur-3xl" />
      </div>

      <div className="container relative py-20 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* ── Left: Content ── */}
          <div>
            {/* Badge */}
            <div className="badge-primary mb-8 animate-fade-up">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] animate-pulse-dot" />
              38 Years of Pharmaceutical Trust
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up delay-100 font-display text-5xl font-bold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-6xl lg:text-[4.25rem]">
              Trusted<br />
              <em className="text-[var(--primary)] not-italic">Healthcare</em><br />
              for Every Home.
            </h1>

            {/* Subheading */}
            <p className="animate-fade-up delay-200 mt-6 max-w-lg text-lg leading-relaxed text-[var(--muted)]">
              Science-backed medicines, personal care, pet wellness, and pain
              relief — from a pharma company with decades of proven results.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up delay-300 mt-10 flex flex-wrap gap-4">
              <Link href="/collections/bestsellers" className="btn-primary">
                Shop Bestsellers
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/collections" className="btn-outline">
                Explore Categories
              </Link>
            </div>

            {/* Stats row */}
            <div className="animate-fade-up delay-500 mt-14 flex flex-wrap items-center gap-10">
              {heroStats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-10">
                  <div>
                    <div className="font-display text-3xl font-bold text-[var(--primary)] sm:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-0.5 text-xs font-medium tracking-widest uppercase text-[var(--muted)]">
                      {stat.label}
                    </div>
                  </div>
                  {i < heroStats.length - 1 && (
                    <div className="h-10 w-px bg-[var(--border)]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Visual orb ── */}
          <div className="relative hidden lg:flex items-center justify-center animate-fade-in delay-400">
            <div className="relative h-[440px] w-[440px]">

              {/* Spinning outer ring */}
              <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-[var(--primary)]/18 animate-spin-slow" />

              {/* Static middle ring */}
              <div className="absolute inset-10 rounded-full border border-[var(--primary)]/14" />

              {/* Inner glow ring */}
              <div className="absolute inset-20 rounded-full border border-[var(--primary)]/20 bg-gradient-to-br from-[var(--primary-subtle)] via-[var(--surface)] to-[var(--primary-subtle)]" />

              {/* Core wordmark */}
              <div className="absolute inset-20 flex flex-col items-center justify-center rounded-full">
                <span className="font-display text-5xl font-bold text-[var(--primary)] leading-none">PIL</span>
                <span className="mt-1 text-[10px] font-semibold tracking-[0.45em] text-[var(--primary)]/55 uppercase">
                  India
                </span>
                <div className="mt-2 h-px w-10 bg-[var(--accent)]" />
                <span className="mt-2 text-[9px] tracking-wider text-[var(--muted)]">Est. 1986</span>
              </div>

              {/* Floating category pills */}
              {floatingPills.map((pill) => (
                <div
                  key={pill.label}
                  style={pill.style}
                  className="absolute rounded-full border border-[var(--border)] bg-white px-3.5 py-1.5 text-xs font-medium text-[var(--foreground)] shadow-[var(--shadow-md)] animate-float"
                >
                  {pill.label}
                </div>
              ))}

              {/* Gold accent dot */}
              <div className="absolute -right-2 top-1/3 h-4 w-4 rounded-full bg-[var(--accent)] shadow-lg" />
              <div className="absolute -left-2 bottom-1/3 h-3 w-3 rounded-full bg-[var(--primary-light)] shadow-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] font-medium tracking-[0.25em] text-[var(--muted)] uppercase">
          Scroll
        </span>
        <div className="h-12 w-px bg-gradient-to-b from-[var(--muted)] to-transparent" />
      </div>
    </section>
  );
}
