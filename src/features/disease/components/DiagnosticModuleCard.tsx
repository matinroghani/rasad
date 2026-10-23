"use client";

import {
  ArrowUpLeft,
  CheckCircle2,
} from "lucide-react";

import type {
  DiseaseModule,
} from "../types";

import {
  getIntegrationStatusPresentation,
} from "../utils";

interface DiagnosticModuleCardProps {
  module: DiseaseModule;
  onSelect: (module: DiseaseModule) => void;
}

export default function DiagnosticModuleCard({
  module,
  onSelect,
}: DiagnosticModuleCardProps) {
  const Icon = module.icon;

  const status = getIntegrationStatusPresentation(
    module.integrationStatus,
  );

  return (
    <button
      type="button"
      onClick={() => onSelect(module)}
      aria-label={`مشاهده جزئیات ماژول ${module.title}`}
      className={[
        "group relative flex h-full min-w-0 flex-col overflow-hidden",
        "rounded-[var(--radius-lg)] border border-[var(--panel-border)]",
        "bg-[var(--panel-bg)] p-4 text-start shadow-[var(--shadow-sm)]",
        "transition-[border-color,box-shadow,transform] duration-200",
        "hover:-translate-y-1 hover:border-[var(--panel-border-hover)] hover:shadow-[var(--shadow-md)]",
        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
        "sm:p-5",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--panel-border)] bg-[var(--green-soft)] text-[var(--accent-green)] transition-colors group-hover:bg-[var(--accent-green)] group-hover:text-[var(--text-inverse)]">
          <Icon size={23} strokeWidth={1.7} />
        </span>

        <span
          className={[
            "inline-flex max-w-full items-center gap-1 rounded-full border px-2 py-1",
            "text-[var(--font-size-xs)] font-semibold",
            status.className,
          ].join(" ")}
        >
          <CheckCircle2
            size={12}
            className={[
              "shrink-0",
              status.iconClassName,
            ].join(" ")}
          />

          {status.label}
        </span>
      </div>

      <h3 className="mt-5 text-base font-extrabold text-[var(--text-main)]">
        {module.title}
      </h3>

      <p className="mt-1.5 text-xs font-semibold text-[var(--accent-green)]">
        {module.subtitle}
      </p>

      <p className="mt-3 flex-1 text-xs leading-7 text-[var(--text-muted)]">
        {module.description}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-[var(--panel-border)] pt-4">
        <span className="text-xs font-bold text-[var(--text-main)]">
          مشاهده جزئیات
        </span>

        <span className="flex size-8 items-center justify-center rounded-xl bg-[var(--surface-warm)] text-[var(--text-muted)] transition-[background-color,color] group-hover:bg-[var(--green-soft)] group-hover:text-[var(--accent-green)]">
          <ArrowUpLeft size={17} />
        </span>
      </div>
    </button>
  );
}