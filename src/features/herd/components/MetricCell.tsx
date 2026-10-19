
import type { ReactNode } from "react";

interface MetricCellProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}

export default function MetricCell({
  icon,
  label,
  value,
}: MetricCellProps) {
  return (
    <div className="rounded-[var(--radius-sm)] bg-[var(--bg-secondary)] p-3">
      <p className="flex items-center gap-[0.375em] text-[0.6875rem] text-[var(--text-muted)]">
        {icon}
        <span className="truncate">{label}</span>
      </p>

      <p className="mt-2 text-xs font-bold text-[var(--text-main)]">
        {value}
      </p>
    </div>
  );
}
