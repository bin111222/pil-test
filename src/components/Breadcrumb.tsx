import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`text-[13px] ${className}`}>
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[var(--muted-light)]">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-x-2.5">
            {i > 0 && (
              <svg className="h-3 w-3 text-[var(--border)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors duration-200 hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-[var(--foreground)]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
