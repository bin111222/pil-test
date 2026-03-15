const points = [
  {
    title: "Pharma Legacy",
    desc: "38+ years as a trusted pharmaceutical manufacturer with a proven track record across India and beyond.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "State-of-Art R&D",
    desc: "Our in-house research and development center drives constant innovation in healthcare formulations.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Research-Backed",
    desc: "Every product formula is grounded in science — tested, validated, and proven to deliver measurable results.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Affordable Wellness",
    desc: "Premium-quality healthcare made accessible — because good health shouldn't come at a premium price.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Global Reach",
    desc: "Exported to 50+ countries worldwide — trusted by families and healthcare professionals internationally.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function WhyTrust() {
  return (
    <section className="relative overflow-hidden section-py gradient-dark">

      {/* Background watermark */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
        aria-hidden
      >
        <span className="font-display text-[30vw] font-bold text-white opacity-[0.015] leading-none tracking-tighter">
          38
        </span>
      </div>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/[0.03]" aria-hidden />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full border border-white/[0.03]" aria-hidden />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-[var(--primary)]/[0.06] blur-[120px]" aria-hidden />

      <div className="container relative">

        {/* Section header */}
        <div className="mb-20 text-center">
          <div className="badge-dark mb-8 inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse-dot" />
            Why Choose PIL
          </div>
          <h2 className="section-heading-dark text-balance">
            Backed by Science.<br />
            <em className="not-italic gradient-gold-text">Proven by Decades.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl section-sub-dark">
            From our state-of-the-art R&D center to your home — every PIL product
            carries the weight of 38+ years of pharmaceutical expertise.
          </p>
          <div className="mx-auto mt-6 separator-gold" />
        </div>

        {/* Cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {points.map((p) => (
            <div
              key={p.title}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-7 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.07] hover:border-white/[0.12] hover:-translate-y-2"
              style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Icon */}
              <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-light)] text-white shadow-[0_4px_20px_var(--primary-glow)] ring-1 ring-white/10 transition-all duration-300 group-hover:shadow-[0_6px_28px_var(--primary-glow)]">
                {p.icon}
              </div>
              {/* Title */}
              <h3 className="relative text-[15px] font-semibold text-[var(--dark-text)] tracking-wide">{p.title}</h3>
              {/* Description */}
              <p className="relative mt-3 text-sm leading-[1.7] text-[var(--dark-muted)]">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom pill row */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-3">
          {["ISO Certified", "GMP Compliant", "FSSAI Approved", "Export Quality", "Cruelty-Free"].map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2 text-[10px] font-semibold tracking-[0.15em] text-white/30 uppercase transition-all duration-300 hover:border-white/[0.15] hover:text-white/50"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
