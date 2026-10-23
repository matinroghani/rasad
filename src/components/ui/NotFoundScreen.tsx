"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, House, SearchX, ScanSearch } from "lucide-react";

interface NotFoundScreenProps {
  homeHref?: string;
}

export default function NotFoundScreen({
  homeHref = "/",
}: NotFoundScreenProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      dir="rtl"
      className="relative mx-auto flex min-h-[70vh] w-full max-w-5xl items-center justify-center px-4 py-10 sm:px-6 sm:py-14"
    >
      {/* Ambient green glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-20 top-0 size-64 rounded-full bg-[var(--accent-green)] opacity-[0.07] blur-3xl" />
        <div className="absolute -bottom-10 left-0 size-56 rounded-full bg-[var(--accent-green-light)] opacity-[0.08] blur-3xl" />
      </div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full"
      >
        <div className="relative grid overflow-hidden rounded-[var(--radius-xl)] border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-[var(--shadow-md)] md:grid-cols-[1.05fr_0.95fr]">
          {/* Subtle top accent */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-l from-[var(--accent-green)] via-[var(--accent-green-light)] to-transparent"
          />

          {/* Error content */}
          <div className="flex flex-col justify-center px-6 py-9 sm:px-9 sm:py-12 lg:px-11">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--panel-border)] bg-[var(--green-soft)] px-3 py-1.5 text-[var(--accent-green)]">
              <SearchX size={15} strokeWidth={2} />

              <span className="text-xs font-bold">خطای مسیریابی</span>
            </div>

            <h1 className="mt-6 text-2xl font-black leading-relaxed text-[var(--text-main)] sm:text-3xl">
              این مسیر در سامانه رسد وجود ندارد
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-8 text-[var(--text-muted)]">
              صفحه‌ای که به دنبال آن هستید پیدا نشد. ممکن است آدرس اشتباه باشد
              یا صفحه جابه‌جا شده باشد. می‌توانید به داشبورد بازگردید یا صفحه
              قبلی را دوباره بررسی کنید.
            </p>

            {/* Status details */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--panel-border)] bg-[var(--surface-warm)] px-3 py-2 text-xs text-[var(--text-muted)]">
                <span className="size-1.5 rounded-full bg-[var(--accent-green)]" />
                سامانه رسد
              </span>

              <span className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--panel-border)] bg-[var(--surface-warm)] px-3 py-2 font-mono text-xs text-[var(--text-muted)]">
                HTTP 404
              </span>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => window.location.assign(homeHref)}
                className="group inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--accent-green)] px-5 py-3 text-sm font-bold text-[var(--text-inverse)] shadow-[var(--shadow-sm)] transition-all duration-200 hover:bg-[var(--accent-green-hover)] hover:shadow-[var(--shadow-md)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <House size={17} strokeWidth={2} />

                <span>بازگشت به داشبورد</span>

                <ArrowLeft
                  size={16}
                  className="transition-transform duration-200 group-hover:-translate-x-1"
                />
              </button>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--panel-border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--text-main)] transition-colors duration-200 hover:border-[var(--panel-border-hover)] hover:bg-[var(--surface-warm)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <ArrowLeft size={16} className="rotate-180" />
                بازگشت به صفحه قبل
              </button>
            </div>
          </div>

          {/* Visual panel */}
          <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden border-t border-[var(--panel-border)] bg-[var(--bg-secondary)] px-6 py-12 md:min-h-full md:border-r md:border-t-0">
            {/* Technical grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(var(--panel-border-hover) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />

            {/* Decorative rings */}
            <div
              aria-hidden="true"
              className="absolute size-64 rounded-full border border-dashed border-[var(--panel-border-hover)] sm:size-72"
            />

            <div
              aria-hidden="true"
              className="absolute size-48 rounded-full border border-[var(--panel-border)] sm:size-56"
            />

            <div
              aria-hidden="true"
              className="absolute size-36 rounded-full bg-[var(--accent-green)] opacity-[0.08] blur-2xl sm:size-44"
            />

            {/* Corner indicators */}
            <span
              aria-hidden="true"
              className="absolute right-5 top-5 size-2 rounded-full bg-[var(--accent-green)] opacity-70"
            />

            <span
              aria-hidden="true"
              className="absolute bottom-5 left-5 size-2 rounded-full bg-[var(--accent-green-light)]"
            />

            {/* 404 composition */}
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] text-[var(--accent-green)] shadow-[var(--shadow-sm)]">
                <ScanSearch size={27} strokeWidth={1.6} />
              </div>

              <span className="bg-gradient-to-b from-[var(--text-main)] via-[var(--accent-green)] to-[var(--accent-green-light)] bg-clip-text text-8xl font-black leading-none tracking-[-0.08em] text-transparent tabular-nums sm:text-9xl">
                404
              </span>

              <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--panel-border)] bg-[var(--panel-bg)] px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)] shadow-[var(--shadow-sm)]">
                <span className="size-1.5 rounded-full bg-[var(--accent-green)]" />
                PAGE NOT FOUND
              </span>

              <p className="mt-4 max-w-xs text-xs leading-6 text-[var(--text-muted)]">
                مسیر درخواستی در نقشه صفحات سامانه ثبت نشده است.
              </p>
            </div>
          </div>
        </div>

        {/* Brand footer */}
        <div className="mt-5 flex flex-col items-center justify-center gap-1.5 text-center">
          <span className="text-sm font-bold text-[var(--text-main)]">رسد</span>

          <span className="text-xs text-[var(--text-muted)]">
            سامانه هوشمند پایش هویت و سلامت دام
          </span>
        </div>
      </motion.div>
    </section>
  );
}
