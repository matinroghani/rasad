"use client";

import { Microscope } from "lucide-react";

import type { DiseaseModule } from "../types";

import DiagnosticModuleCard from "./DiagnosticModuleCard";

interface DiagnosticModulesProps {
  modules: readonly DiseaseModule[];
  onSelect: (module: DiseaseModule) => void;
}

export default function DiagnosticModules({
  modules,
  onSelect,
}: DiagnosticModulesProps) {
  return (
    <section
      aria-labelledby="diagnostic-modules-title"
      className="min-w-0 space-y-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--green-soft)] text-[var(--accent-green)]">
              <Microscope size={21} strokeWidth={1.7} />
            </span>

            <div>
              <h2
                id="diagnostic-modules-title"
                className="text-lg font-extrabold text-[var(--text-main)] sm:text-xl"
              >
                ماژول‌های تشخیصی
              </h2>

              <p className="mt-1 text-xs text-[var(--text-muted)]">
                زیرساخت‌های آماده برای توسعه و اتصال به مدل‌های تشخیصی
              </p>
            </div>
          </div>
        </div>

        <span className="w-fit rounded-full border border-[var(--panel-border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--text-muted)]">
          {modules.length.toLocaleString("fa-IR")} ماژول
        </span>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <DiagnosticModuleCard
            key={module.id}
            module={module}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}