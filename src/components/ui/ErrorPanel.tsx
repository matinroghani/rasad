"use client";

import { motion, useReducedMotion } from "motion/react";
import { AlertCircle, ArrowRight, Bug, Home, RefreshCw } from "lucide-react";

interface ErrorPanelProps {
  errorName: string;
  errorMessage: string;
  errorStack?: string;
  digest?: string;
  showTechnicalDetails?: boolean;
  onRetry: () => void;
  homeHref?: string;
}

export default function ErrorPanel({
  errorName,
  errorMessage,
  errorStack,
  digest,
  showTechnicalDetails = false,
  onRetry,
  homeHref = "/",
}: ErrorPanelProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      dir="rtl"
      className="mx-auto flex w-full max-w-5xl items-center justify-center px-4 py-8 sm:px-6 lg:py-12"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.3,
          ease: "easeOut",
        }}
        className="w-full max-w-2xl overflow-hidden rounded-[var(--radius-xl)] border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-[var(--shadow-md)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-[var(--panel-border)] px-5 py-4 sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--green-soft)] text-[var(--accent-green)]">
              <AlertCircle size={21} strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <h1 className="text-sm font-bold text-[var(--text-main)]">
                خطا در سامانه
              </h1>

              <p className="mt-1 text-xs text-[var(--text-muted)]">
                رسد | رایا سنجش دانا
              </p>
            </div>
          </div>

          <span className="shrink-0 rounded-full border border-[var(--panel-border)] bg-[var(--surface-warm)] px-3 py-1.5 text-xs text-[var(--text-muted)]">
            خطای برنامه
          </span>
        </div>

        {/* Main content */}
        <div className="px-5 py-8 sm:px-7 sm:py-10">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:gap-6">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--panel-border)] bg-[var(--surface-warm)] text-[var(--accent-green)]">
              <Bug size={27} strokeWidth={1.7} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[var(--accent-green)]">
                اجرای درخواست با مشکل مواجه شد
              </p>

              <h2 className="mt-2 text-xl font-extrabold leading-9 text-[var(--text-main)] sm:text-2xl">
                متأسفانه خطایی رخ داده است.
              </h2>

              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                در پردازش درخواست مشکلی پیش آمده است. می‌توانید دوباره تلاش
                کنید. اگر مشکل ادامه داشت، شناسه پیگیری را برای بررسی نگه دارید.
              </p>
            </div>
          </div>

          {/* Technical details: development only */}
          {showTechnicalDetails && (
            <div className="mt-7 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--panel-border)]">
              <div className="flex items-center gap-2 border-b border-[var(--panel-border)] bg-[var(--surface-warm)] px-4 py-3">
                <Bug size={15} className="text-[var(--accent-green)]" />

                <h3 className="text-xs font-bold text-[var(--text-main)]">
                  جزئیات فنی خطا
                </h3>

                <span className="mr-auto rounded-md bg-[var(--green-soft)] px-2 py-1 text-[10px] font-semibold text-[var(--accent-green)]">
                  Development
                </span>
              </div>

              <div className="space-y-4 p-4">
                <div>
                  <p className="mb-2 text-xs text-[var(--text-muted)]">
                    نوع خطا
                  </p>

                  <p
                    dir="ltr"
                    className="break-words text-left font-mono text-xs font-semibold text-[var(--text-main)]"
                  >
                    {errorName}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs text-[var(--text-muted)]">
                    پیام خطا
                  </p>

                  <pre
                    dir="ltr"
                    className="max-h-56 overflow-auto whitespace-pre-wrap break-words rounded-[var(--radius-md)] border border-[var(--panel-border)] bg-[var(--bg-main)] p-3 text-left font-mono text-xs leading-6 text-[var(--text-main)]"
                  >
                    {errorMessage || "No error message available"}
                  </pre>
                </div>

                {errorStack && (
                  <details className="group">
                    <summary className="cursor-pointer text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)]">
                      مشاهده Stack Trace
                    </summary>

                    <pre
                      dir="ltr"
                      className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-[var(--radius-md)] border border-[var(--panel-border)] bg-[var(--bg-main)] p-3 text-left font-mono text-[11px] leading-5 text-[var(--text-muted)]"
                    >
                      {errorStack}
                    </pre>
                  </details>
                )}

                {digest && (
                  <div>
                    <p className="mb-2 text-xs text-[var(--text-muted)]">
                      شناسه خطا
                    </p>

                    <p
                      dir="ltr"
                      className="break-all text-left font-mono text-xs text-[var(--text-main)]"
                    >
                      {digest}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Production error reference */}
          {!showTechnicalDetails && digest && (
            <div className="mt-6 rounded-[var(--radius-md)] border border-[var(--panel-border)] bg-[var(--surface-warm)] px-4 py-3">
              <p className="text-xs text-[var(--text-muted)]">
                شناسه پیگیری خطا
              </p>

              <p
                dir="ltr"
                className="mt-2 break-all text-left font-mono text-xs text-[var(--text-main)]"
              >
                {digest}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--accent-green)] px-5 py-3 text-sm font-bold text-[var(--text-inverse)] transition-colors hover:bg-[var(--accent-green-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            >
              <RefreshCw size={16} />
              تلاش مجدد
            </button>

            <button
              type="button"
              onClick={() => {
                window.location.assign(homeHref);
              }}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--panel-border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--text-main)] transition-colors hover:border-[var(--panel-border-hover)] hover:bg-[var(--surface-warm)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            >
              <Home size={16} />
              بازگشت به داشبورد
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--panel-border)] bg-[var(--surface-warm)] px-5 py-3.5 sm:px-7">
          <p className="text-xs leading-6 text-[var(--text-muted)]">
            در صورت تکرار خطا، جزئیات آن را برای بررسی فنی ثبت کنید.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
