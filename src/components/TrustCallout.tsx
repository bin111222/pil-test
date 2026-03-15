import { TrustBadge } from "@/components/ui";

const TRUST_ITEMS = [
  { value: "38+ years", label: "Pharma Company" },
  { value: "In-house R&D", label: "Quality manufacturing" },
  { value: "1000+ doctors", label: "Trust us" },
];

export function TrustCallout() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--card)] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mb-4 text-center text-sm font-medium text-[var(--muted)]">
          Why shop with PIL
        </p>
        <div className="grid grid-cols-3 gap-4 text-center">
          {TRUST_ITEMS.map((item) => (
            <TrustBadge key={item.label} value={item.value} label={item.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
