export interface TrustBadgeProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export function TrustBadge({ value, label, icon, className = "" }: TrustBadgeProps) {
  return (
    <div
      className={`group flex flex-col items-center text-center ${className}`}
      role="listitem"
    >
      {icon && (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-subtle)] transition-all duration-300 group-hover:shadow-[var(--shadow-md)]">
          {icon}
        </div>
      )}
      <div className="text-sm font-bold text-[var(--primary)] sm:text-base tracking-tight">
        {value}
      </div>
      <div className="mt-1 text-[12px] text-[var(--muted)]">{label}</div>
    </div>
  );
}
