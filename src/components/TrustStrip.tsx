const stats = [
  {
    value: "38+",
    label: "Years of Pharma Excellence",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    value: "1000+",
    label: "Doctors Trust Our Products",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    value: "50+",
    label: "Countries Worldwide",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: "100%",
    label: "In-House R&D",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
];

export function TrustStrip() {
  return (
    <section className="relative overflow-hidden bg-[var(--dark)] py-16 sm:py-20" role="region" aria-label="Trust indicators">
      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-[var(--primary)]/[0.06] blur-[80px]" />
        <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-[var(--accent)]/[0.04] blur-[80px]" />
      </div>

      <div className="container relative">
        <div className="grid grid-cols-2 gap-y-12 gap-x-6 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`group flex flex-col items-center text-center ${
                i < stats.length - 1 ? "md:border-r md:border-white/[0.06]" : ""
              } px-4`}
            >
              {/* Icon */}
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-[var(--accent)] ring-1 ring-white/[0.08] transition-all duration-500 group-hover:bg-white/[0.1] group-hover:ring-white/[0.15]">
                {stat.icon}
              </div>
              {/* Value */}
              <div className="font-display text-[2.5rem] font-bold text-white sm:text-5xl leading-none tracking-tight">
                {stat.value}
              </div>
              {/* Label */}
              <div className="mt-3 max-w-[140px] text-[11px] font-medium leading-relaxed tracking-[0.12em] text-white/40 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
