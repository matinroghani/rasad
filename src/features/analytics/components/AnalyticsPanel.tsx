import type { ReactNode } from "react";
import { ChartColumn } from "lucide-react";

interface AnalyticsPanelProps {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}

export default function AnalyticsPanel({
  title,
  description,
  children,
  action,
}: AnalyticsPanelProps) {
  return (
    <section className="min-w-0 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-4 shadow-[var(--shadow-sm)] sm:p-5">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-bold text-[var(--text-main)]">
            <ChartColumn
              size={18}
              className="text-[var(--accent-green)]"
            />
            {title}
          </h2>

          {description && (
            <p className="mt-1.5 text-xs leading-6 text-[var(--text-muted)]">
              {description}
            </p>
          )}
        </div>

        {action}
      </div>

      {children}
    </section>
  );
}