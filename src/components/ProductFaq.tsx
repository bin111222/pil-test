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
      <h3 className="text-lg font-semibold text-[var(--foreground)]">FAQs</h3>
      <ul className="mt-4 space-y-2 border border-[var(--border)] rounded-xl overflow-hidden">
        {faqs.map((faq, i) => (
          <li key={i} className="border-b border-[var(--border)] last:border-b-0">
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between gap-2 bg-[var(--card)] px-4 py-3 text-left text-sm font-medium text-[var(--foreground)] hover:bg-white"
              aria-expanded={openIndex === i}
            >
              {faq.question}
              <span className="flex-shrink-0 text-[var(--muted)]" aria-hidden>
                {openIndex === i ? "−" : "+"}
              </span>
            </button>
            {openIndex === i && (
              <div className="border-t border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--muted)]">
                {faq.answer}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
