import Link from "next/link";

const heroStats = [
  { value: "38+",   label: "Years of Trust" },
  { value: "1000+", label: "Doctors Trust Us" },
  { value: "50+",   label: "Countries Served" },
];

const floatingPills = [
  { label: "Body Care",    style: { top: "6%",  left: "-6%" } },
  { label: "Pain Relief",  style: { top: "28%", right: "-12%" } },
  { label: "Pet Care",     style: { bottom: "28%", right: "-8%" } },
  { label: "Baby Care",    style: { bottom: "6%", left: "4%" } },
  { label: "Hair Care",    style: { top: "60%", left: "-14%" } },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden gradient-hero">

      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -right-48 -top-48 h-[700px] w-[700px] rounded-full border border-[var(--primary)]/[0.04]" />
        <div className="absolute -right-28 -top-28 h-[540px] w-[540px] rounded-full border border-[var(--primary)]/[0.06]" />
        <div className="absolute -bottom-48 -left-48 h-[520px] w-[520px] rounded-full border border-[var(--accent)]/[0.06]" />
        <div className="absolute right-1/4 top-1/4 h-80 w-80 rounded-full bg-[var(--primary-subtle)] opacity-40 blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full bg-[var(--accent-light)] opacity-30 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-white/30 blur-[120px]" />
      </div>

      <div className="container relative py-24 lg:py-36">
        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* Left: Content */}
          <div>
            {/* Badge */}
            <div className="badge-gold mb-10 animate-fade-up">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse-dot" />
              Est. 1986 — Pharmaceutical Excellence
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up delay-100 font-display text-[3.25rem] font-bold leading-[1.06] tracking-tight text-[var(--foreground)] sm:text-[4rem] lg:text-[4.75rem]">
              Trusted<br />
              <span className="relative">
                <em className="text-[var(--primary)] not-italic">Healthcare</em>
                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-[var(--accent)] via-[var(--accent)] to-transparent rounded-full opacity-60" />
              </span><br />
              for Every Home.
            </h1>

            {/* Subheading */}
            <p className="animate-fade-up delay-200 mt-8 max-w-lg text-lg leading-[1.8] text-[var(--muted)] sm:text-xl">
              Science-backed medicines, personal care, pet wellness, and pain
              relief — from a pharma company with decades of proven results.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up delay-300 mt-12 flex flex-wrap gap-5">
              <Link href="/collections/bestsellers" className="btn-primary">
                Shop Bestsellers
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/collections" className="btn-outline">
                Explore Categories
              </Link>
            </div>

            {/* Stats row */}
            <div className="animate-fade-up delay-500 mt-16 flex flex-wrap items-center gap-12">
              {heroStats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-12">
                  <div>
                    <div className="font-display text-[2.5rem] font-bold text-[var(--primary)] sm:text-5xl leading-none">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--muted)]">
                      {stat.label}
                    </div>
                  </div>
                  {i < heroStats.length - 1 && (
                    <div className="h-12 w-px bg-gradient-to-b from-transparent via-[var(--border)] to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual orb */}
          <div className="relative hidden lg:flex items-center justify-center animate-fade-in delay-400">
            <div className="relative h-[480px] w-[480px]">

              {/* Outer glow */}
              <div className="absolute inset-[-40px] rounded-full bg-[var(--primary)]/[0.03] blur-2xl animate-breathe" />

              {/* Spinning outer ring */}
              <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-[var(--primary)]/[0.12] animate-spin-slow" />

              {/* Static middle ring */}
              <div className="absolute inset-10 rounded-full border border-[var(--primary)]/[0.1]" />

              {/* Inner glow ring */}
              <div className="absolute inset-20 rounded-full border border-[var(--primary)]/[0.15] bg-gradient-to-br from-[var(--primary-subtle)] via-white to-[var(--accent-light)]/30" />

              {/* Core wordmark */}
              <div className="absolute inset-20 flex flex-col items-center justify-center rounded-full">
                <span className="font-display text-6xl font-bold text-[var(--primary)] leading-none">PIL</span>
                <span className="mt-1.5 text-[10px] font-semibold tracking-[0.5em] text-[var(--primary)]/40 uppercase">
                  India
                </span>
                <div className="mt-3 h-px w-12 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
                <span className="mt-2.5 text-[9px] font-medium tracking-[0.25em] text-[var(--muted-light)] uppercase">Est. 1986</span>
              </div>

              {/* Floating category pills */}
              {floatingPills.map((pill, i) => (
                <div
                  key={pill.label}
                  style={{ ...pill.style, animationDelay: `${i * 0.8}s` }}
                  className="absolute rounded-full border border-[var(--border)] bg-white/90 px-4 py-2 text-[11px] font-semibold tracking-wide text-[var(--foreground-secondary)] shadow-[var(--shadow-md)] backdrop-blur-sm animate-float"
                >
                  {pill.label}
                </div>
              ))}

              {/* Accent dots */}
              <div className="absolute -right-1 top-1/3 h-4 w-4 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] shadow-[var(--shadow-gold)]" />
              <div className="absolute -left-1 bottom-1/3 h-3 w-3 rounded-full bg-[var(--primary-light)] shadow-[var(--shadow-primary)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40 animate-fade-in delay-800">
        <span className="text-[9px] font-semibold tracking-[0.3em] text-[var(--muted)] uppercase">
          Scroll
        </span>
        <div className="h-14 w-px bg-gradient-to-b from-[var(--muted)] to-transparent" />
      </div>
    </section>
  );
}
