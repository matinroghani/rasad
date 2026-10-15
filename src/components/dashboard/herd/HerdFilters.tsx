
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
      <div className="flex items-center gap-2 text-sm font-semibold text-[#687765]">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#edf5e9] text-[#5c8f5c]">
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
                "inline-flex min-h-10 max-w-full items-center justify-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition duration-150 sm:text-[13px]",
                active
                  ? "border-[#4f8c55] bg-[#4f8c55] text-white shadow-[0_3px_9px_rgba(79,140,85,0.15)]"
                  : "border-[#e2e8dd] bg-white text-[#6c7969] hover:border-[#bfd3b7] hover:bg-[#f7faf4] hover:text-[#3e6743]",
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
