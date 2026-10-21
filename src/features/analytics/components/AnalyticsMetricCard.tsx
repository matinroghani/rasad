import type { LucideIcon } from "lucide-react";

interface AnalyticsMetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

export default function AnalyticsMetricCard({
  title,
  value,
  description,
  icon: Icon,
}: AnalyticsMetricCardProps) {
  return (
    <article className="flex min-w-0 items-center gap-3 rounded-2xl border border-[var(--panel-border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--panel-border-hover)] sm:p-5">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--green-soft)] text-[var(--accent-green)]">
        <Icon size={21} strokeWidth={1.8} />
      </div>

      <div className="min-w-0">
        <p className="text-xs leading-6 text-[var(--text-muted)]">
          {title}
        </p>

        <p className="truncate text-xl font-bold tabular-nums text-[var(--text-main)]">
          {value}
        </p>

        <p className="mt-1 text-[11px] leading-5 text-[var(--text-muted)]">
          {description}
        </p>
      </div>
    </article>
  );
}