import { ChartNoAxesCombined, ImagePlus, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AnalyticsEmptyState() {
  return (
    <section
      aria-labelledby="analytics-title"
      className="flex min-w-0 flex-col gap-5"
      dir="rtl"
    >
      {/* Page heading */}
      <header className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-xl border border-[var(--panel-border)] bg-[var(--green-soft)] text-[var(--accent-green)]">
            <ChartNoAxesCombined size={21} />
          </span>

          <div className="min-w-0">
            <h1
              id="analytics-title"
              className="text-lg font-bold text-[var(--text-main)]"
            >
              تحلیل پیشرفته گله
            </h1>

            <p className="mt-1 text-sm text-[var(--text-muted)]">
              بررسی شاخص‌ها و وضعیت گله بر اساس داده‌های ثبت‌شده
            </p>
          </div>
        </div>
      </header>

      {/* Empty state */}
      <div className="relative flex min-h-[360px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[var(--panel-border-hover)] bg-[var(--surface-warm)] px-5 py-12 text-center sm:min-h-[420px] sm:px-10">
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--green-soft)] to-transparent"
        />

        <div className="relative flex size-20 items-center justify-center rounded-2xl border border-[var(--panel-border)] bg-[var(--surface)] text-[var(--accent-green)] shadow-[var(--shadow-sm)]">
          <ChartNoAxesCombined size={36} strokeWidth={1.5} />

          <span className="absolute -bottom-2 -left-2 flex size-8 items-center justify-center rounded-xl border border-[var(--panel-border)] bg-[var(--surface)] text-[var(--accent-green)]">
            <ImagePlus size={16} />
          </span>
        </div>

        <h2 className="relative mt-7 text-base font-bold text-[var(--text-main)] sm:text-lg">
          هنوز داده‌ای برای تحلیل ثبت نشده است
        </h2>

        <p className="relative mt-3 max-w-md text-sm leading-7 text-[var(--text-muted)]">
          برای مشاهده گزارش‌های گله، ابتدا تصاویر دام‌ها را از صفحه پایش گله
          بارگذاری کنید. پس از ثبت و پردازش داده‌ها، شاخص‌های قابل محاسبه در این
          بخش نمایش داده خواهند شد.
        </p>

        <div className="relative mt-6 flex max-w-full items-center gap-2 rounded-xl border border-[var(--panel-border)] bg-[var(--surface)] px-3.5 py-3 text-right">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[var(--green-soft)] text-[var(--accent-green)]">
            <ArrowUpRight size={17} />
          </span>

          <p className="text-xs leading-6 text-[var(--text-muted)]">
            <span className="font-semibold text-[var(--text-main)]">
              شروع کار:{" "}
            </span>
            ابتدا به صفحه{" "}
            <Link
              href="/herd"
              className="font-bold text-[var(--accent-green)] hover:underline"
            >
              پایش گله
            </Link>{" "}
            بروید و تصاویر دام‌ها را ثبت کنید.
          </p>
        </div>
      </div>
    </section>
  );
}
