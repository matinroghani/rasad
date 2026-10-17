"use client";

import { useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ScanSearch } from "lucide-react";

interface HerdScanModalProps {
  isOpen: boolean;
  files: File[];
  currentIndex: number;
  progress: number;
}

export default function HerdScanModal({
  isOpen,
  files,
  currentIndex,
  progress,
}: HerdScanModalProps) {
  const shouldReduceMotion = useReducedMotion();

  const currentFile = files[currentIndex];
  const totalFiles = files.length;
  const isSingleImage = totalFiles === 1;

  const completedCount = Math.min(
    totalFiles,
    Math.max(0, Math.floor(progress * totalFiles)),
  );

  const setImageRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (!node || !currentFile) return;

      const url = URL.createObjectURL(currentFile);
      node.src = url;

      return () => {
        URL.revokeObjectURL(url);
      };
    },
    [currentFile],
  );

  return (
    <AnimatePresence>
      {isOpen && currentFile && (
        <motion.div
          key="herd-scan-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="herd-scan-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[var(--surface-dark)]/75 p-4 backdrop-blur-md sm:p-6"
        >
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: 24, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            className="relative my-auto w-full max-w-xl overflow-hidden rounded-[var(--radius-xl)] border border-[var(--panel-border)] bg-[var(--surface)] shadow-[var(--shadow-md)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-[var(--panel-border)] px-5 py-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--green-soft)] text-[var(--accent-green)]">
                  <ScanSearch size={22} />
                </span>

                <div className="min-w-0">
                  <h2
                    id="herd-scan-title"
                    className="text-base font-extrabold text-[var(--text-main)] sm:text-lg"
                  >
                    در حال اسکن تصاویر
                  </h2>

                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {isSingleImage
                      ? "تصویر در حال بررسی و پردازش است"
                      : `تصویر ${Math.min(
                          currentIndex + 1,
                          totalFiles,
                        ).toLocaleString("fa-IR")} از ${totalFiles.toLocaleString("fa-IR")}`}
                  </p>
                </div>
              </div>

              <span
                className="flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--panel-border)] bg-[var(--surface-warm)] px-2.5 py-1.5 text-xs font-bold text-[var(--accent-green)]"
                aria-live="polite"
              >
                <span className="size-1.5 animate-pulse rounded-full bg-[var(--accent-green)]" />
                در حال پردازش
              </span>
            </div>

            {/* Scanner */}
            <div className="p-4 sm:p-6">
              <div className="relative isolate aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--panel-border)] bg-[var(--surface-dark)]">
                <img
                  key={`${currentFile.name}-${currentIndex}`}
                  ref={setImageRef}
                  alt={`پیش‌نمایش ${currentFile.name}`}
                  className="size-full object-contain"
                />

                {/* Scanning line */}
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 z-10 h-1/3"
                  initial={{ top: "-35%" }}
                  animate={{ top: ["-35%", "100%"] }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 1.8,
                          ease: "linear",
                          repeat: Infinity,
                          repeatType: "loop",
                        }
                  }
                >
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--accent-green-neon),transparent)] opacity-25" />

                  <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[var(--accent-green-neon)] shadow-[0_0_12px_var(--accent-green),0_0_28px_var(--accent-green-glow)]" />

                  <div className="absolute inset-x-0 top-1/2 h-8 -translate-y-1/2 bg-[var(--accent-green-neon)] opacity-10 blur-md" />
                </motion.div>

                {/* Scanner frame */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-3 z-20 rounded-lg border border-[var(--accent-green-light)]/40"
                >
                  <span className="absolute -start-px -top-px size-5 border-s-2 border-t-2 border-[var(--accent-green-neon)]" />

                  <span className="absolute -end-px -top-px size-5 border-e-2 border-t-2 border-[var(--accent-green-neon)]" />

                  <span className="absolute -bottom-px -start-px size-5 border-b-2 border-s-2 border-[var(--accent-green-neon)]" />

                  <span className="absolute -bottom-px -end-px size-5 border-b-2 border-e-2 border-[var(--accent-green-neon)]" />
                </div>

                {/* Image information */}
                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[var(--surface-dark)]/90 to-transparent px-4 pb-4 pt-10">
                  <p className="truncate text-xs font-medium text-[var(--text-inverse)]">
                    {currentFile.name}
                  </p>

                  <p className="mt-1 text-[10px] text-[var(--text-inverse)]/70">
                    تصویر{" "}
                    {Math.min(
                      currentIndex + 1,
                      totalFiles,
                    ).toLocaleString("fa-IR")}{" "}
                    از {totalFiles.toLocaleString("fa-IR")}
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-[var(--text-muted)]">
                    پیشرفت پردازش تصاویر
                  </span>

                  <span className="text-sm font-extrabold tabular-nums text-[var(--accent-green)]">
                    {Math.round(progress * 100).toLocaleString("fa-IR")}٪
                  </span>
                </div>

                <div
                  className="h-2 overflow-hidden rounded-full bg-[var(--bg-secondary)]"
                  role="progressbar"
                  aria-label="پیشرفت پردازش تصاویر"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress * 100)}
                >
                  <motion.div
                    className="h-full rounded-full bg-[var(--accent-green)]"
                    animate={{
                      width: `${Math.max(
                        0,
                        Math.min(100, progress * 100),
                      )}%`,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                  <span className="text-[var(--text-muted)]">
                    {completedCount.toLocaleString("fa-IR")} تصویر پردازش‌شده
                  </span>

                  <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--accent-green)]">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--accent-green)] opacity-40" />
                      <span className="relative inline-flex size-2 rounded-full bg-[var(--accent-green)]" />
                    </span>
                    لطفاً منتظر بمانید
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[var(--panel-border)] bg-[var(--surface-warm)] px-5 py-3.5 sm:px-6">
              <p className="text-center text-xs leading-6 text-[var(--text-muted)]">
                تا پایان پردازش، پنجره را نبندید و تصاویر را مجدداً ارسال نکنید.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
