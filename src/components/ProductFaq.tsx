"use client";

import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProductFaqProps {
  faqs: FaqItem[];
  className?: string;
}

export function ProductFaq({ faqs, className = "" }: ProductFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-[var(--foreground)] tracking-tight">FAQs</h3>
      <div className="mt-2 h-px w-8 bg-[var(--accent)]" />
      <ul className="mt-5 space-y-2">
        {faqs.map((faq, i) => (
          <li key={i} className="rounded-xl border border-[var(--border)] overflow-hidden transition-all duration-300 hover:border-[var(--primary)]/[0.15]">
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-[14px] font-medium text-[var(--foreground)] transition-colors duration-200 hover:bg-[var(--surface-tinted)]"
              aria-expanded={openIndex === i}
            >
              {faq.question}
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--surface-tinted)] text-[var(--muted)] transition-all duration-300" aria-hidden>
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-[var(--ease-out-expo)] ${
                openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-[var(--border-subtle)] px-5 py-4 text-[14px] leading-[1.75] text-[var(--muted)]">
                  {faq.answer}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
