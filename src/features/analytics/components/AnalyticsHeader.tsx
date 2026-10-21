"use client";

import { Activity, ArrowDownToLine } from "lucide-react";

interface AnalyticsHeaderProps {
  onExport: () => void;
}

export default function AnalyticsHeader({
  onExport,
}: AnalyticsHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl border border-[var(--panel-border)] bg-[var(--green-soft)] text-[var(--accent-green)]">
          <Activity size={22} />
        </div>

        <div>
          <h1 className="text-lg font-bold text-[var(--text-main)]">
            تحلیل پیشرفته گله
          </h1>

          <p className="mt-1 text-xs leading-6 text-[var(--text-muted)]">
            گزارش شاخص‌های ثبت‌شده و عملکرد دام‌ها
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onExport}
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[var(--panel-border)] bg-[var(--surface)] px-4 text-xs font-semibold text-[var(--text-main)] transition-colors hover:border-[var(--panel-border-hover)] hover:bg-[var(--surface-warm)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
      >
        <ArrowDownToLine size={16} />
        خروجی CSV
      </button>
    </header>
  );
}