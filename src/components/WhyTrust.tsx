const points = [
  {
    title: "Pharma Legacy",
    desc: "38+ years as a trusted pharmaceutical manufacturer with a proven track record across India and beyond.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "State-of-Art R&D",
    desc: "Our in-house research and development center drives constant innovation in healthcare formulations.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Research-Backed",
    desc: "Every product formula is grounded in science — tested, validated, and proven to deliver measurable results.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Affordable Wellness",
    desc: "Premium-quality healthcare made accessible — because good health shouldn't come at a premium price.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Global Reach",
    desc: "Exported to 50+ countries worldwide — trusted by families and healthcare professionals internationally.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function WhyTrust() {
  return (
    <section className="relative overflow-hidden section-py bg-[var(--dark)]">

      {/* Background watermark */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
        aria-hidden
      >
        <span className="font-display text-[28vw] font-bold text-white opacity-[0.025] leading-none">
          38
        </span>
      </div>

      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full border border-white/4" aria-hidden />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full border border-white/4" aria-hidden />

      <div className="container relative">

        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="badge-dark mb-6 inline-flex">
            Why Choose PIL
          </div>
          <h2 className="section-heading-dark text-balance">
            Backed by Science.<br />
            <em className="text-[var(--accent)] not-italic">Proven by Decades.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl section-sub-dark">
            From our state-of-the-art R&D center to your home — every PIL product
            carries the weight of 38+ years of pharmaceutical expertise.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {points.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl border border-[var(--dark-border)] bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:border-white/15 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)] text-white shadow-[0_4px_16px_var(--primary-glow)]">
                {p.icon}
              </div>
              {/* Title */}
              <h3 className="font-semibold text-[var(--dark-text)]">{p.title}</h3>
              {/* Description */}
              <p className="mt-2 text-sm leading-relaxed text-[var(--dark-muted)]">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom pill row */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          {["ISO Certified", "GMP Compliant", "FSSAI Approved", "Export Quality", "Cruelty-Free"].map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-[var(--dark-muted)]"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
