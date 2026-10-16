"use client";

import { herdFilters } from "@/data/constants/herdPage/herdFilters.config";
import type { HerdFilter } from "@/types/herd/herd";
import { Check, Filter } from "lucide-react";

interface HerdFiltersProps {
  value: HerdFilter;
  onChange: (filter: HerdFilter) => void;
}

export default function HerdFilters({
  value,
  onChange,
}: HerdFiltersProps) {
  return (
    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)]">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--green-soft)] text-[var(--accent-green)]">
          <Filter size={16} />
        </span>

        فیلتر نمایش
      </div>

      <div
        className="flex min-w-0 flex-wrap items-center gap-2"
        role="group"
        aria-label="فیلتر دام‌ها"
      >
        {herdFilters.map((filter) => {
          const active = filter.value === value;

          return (
            <button
              key={filter.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(filter.value)}
              className={[
                "inline-flex min-h-10 max-w-full items-center justify-center gap-1.5",
                "rounded-[var(--radius-sm)] border px-3.5 py-2",
                "text-xs font-semibold transition-[background-color,border-color,color,box-shadow] duration-200 sm:text-[var(--font-size-md)]",
                "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                active
                  ? "border-[var(--accent-green)] bg-[var(--accent-green)] text-[var(--text-inverse)] shadow-[var(--shadow-sm)]"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:bg-[var(--green-soft)] hover:text-[var(--accent-green-hover)]",
              ].join(" ")}
            >
              {active && <Check size={14} strokeWidth={2.5} />}
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}