export interface TrustBadgeProps {
  value: string;
  label: string;
  /** Optional icon name or element for future use */
  icon?: React.ReactNode;
  className?: string;
}

export function TrustBadge({ value, label, icon, className = "" }: TrustBadgeProps) {
  return (
    <div
      className={`text-center ${className}`}
      role="listitem"
    >
      {icon && <div className="mb-2 flex justify-center">{icon}</div>}
      <div className="text-base font-semibold text-[var(--primary)] sm:text-lg">
        {value}
      </div>
      <div className="mt-0.5 text-sm text-[var(--muted)]">{label}</div>
    </div>
  );
}
