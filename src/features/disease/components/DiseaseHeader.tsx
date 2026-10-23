import { Activity, Stethoscope } from "lucide-react";

export default function DiseaseHeader() {
  return (
    <header className="relative isolate overflow-hidden rounded-[var(--radius-xl)] border border-[var(--panel-border)] bg-[var(--panel-bg)] px-5 py-6 shadow-[var(--shadow-sm)] sm:px-7 sm:py-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-12 -top-20 -z-10 size-56 rounded-full bg-[var(--green-soft)] opacity-70 blur-3xl"
      />

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--panel-border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-bold text-[var(--accent-green)]">
            <Activity size={15} />
            پایش هوشمند سلامت دام
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text-main)] sm:text-[var(--font-size-4xl)]">
            بیماری‌یابی هوشمند
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
            نمای یکپارچه ماژول‌های تشخیصی، شاخص‌های درمان
            و پوشش تصویری گله؛ با قابلیت توسعه برای اتصال
            به سرویس‌های هوش مصنوعی.
          </p>
        </div>

        <div className="flex w-fit shrink-0 items-center gap-3 rounded-2xl border border-[var(--panel-border)] bg-[var(--surface)] px-4 py-3">
          <span className="flex size-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--green-soft)] text-[var(--accent-green)]">
            <Stethoscope size={22} strokeWidth={1.7} />
          </span>

          <div>
            <p className="text-xs text-[var(--text-muted)]">
              وضعیت ماژول‌ها
            </p>
            <p className="mt-1 text-sm font-extrabold text-[var(--text-main)]">
              آماده اتصال
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}