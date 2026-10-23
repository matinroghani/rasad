"use client";

import { useEffect } from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  CheckCircle2,
  Cpu,
  X,
} from "lucide-react";

import type {
  DiseaseModuleDialogProps,
} from "../types";

import {
  getIntegrationStatusPresentation,
} from "../utils";

export default function DiseaseModuleDialog({
  module,
  onClose,
}: DiseaseModuleDialogProps) {
  const shouldReduceMotion = useReducedMotion();

  const status = module
    ? getIntegrationStatusPresentation(
        module.integrationStatus,
      )
    : null;

  useEffect(() => {
    if (!module) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [module, onClose]);

  return (
    <AnimatePresence>
      {module && status && (
        <motion.div
          key={module.id}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[var(--surface-dark)]/70 p-4 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.2,
          }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="disease-module-dialog-title"
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: 20, scale: 0.98 }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={
              shouldReduceMotion
                ? undefined
                : { opacity: 0, y: 10, scale: 0.98 }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.25,
            }}
            className="my-auto w-full max-w-lg overflow-hidden rounded-[var(--radius-xl)] border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-[var(--shadow-md)]"
          >
            <header className="flex items-start justify-between gap-4 border-b border-[var(--panel-border)] p-5 sm:p-6">
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--panel-border)] bg-[var(--green-soft)] text-[var(--accent-green)]">
                  <module.icon
                    size={23}
                    strokeWidth={1.7}
                  />
                </span>

                <div className="min-w-0">
                  <span
                    className={[
                      "inline-flex items-center gap-1.5 rounded-full border px-2 py-1",
                      "text-[var(--font-size-xs)] font-semibold",
                      status.className,
                    ].join(" ")}
                  >
                    <CheckCircle2
                      size={12}
                      className={status.iconClassName}
                    />

                    {status.label}
                  </span>

                  <h2
                    id="disease-module-dialog-title"
                    className="mt-2 text-lg font-extrabold text-[var(--text-main)]"
                  >
                    {module.title}
                  </h2>

                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {module.subtitle}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="بستن پنجره"
                className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[var(--panel-border)] bg-[var(--surface)] text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--text-main)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
              >
                <X size={17} />
              </button>
            </header>

            <div className="space-y-5 p-5 sm:p-6">
              <div>
                <h3 className="text-sm font-bold text-[var(--text-main)]">
                  درباره ماژول
                </h3>

                <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                  {module.purpose}
                </p>
              </div>

              <div className="rounded-[var(--radius-md)] border border-[var(--panel-border)] bg-[var(--surface-warm)] p-4">
                <div className="flex items-center gap-2">
                  <Cpu
                    size={17}
                    className="text-[var(--accent-green)]"
                  />

                  <h3 className="text-sm font-bold text-[var(--text-main)]">
                    پیش‌نیازهای اتصال
                  </h3>
                </div>

                <ul className="mt-3 space-y-2.5">
                  {module.requirements.map(
                    (requirement) => (
                      <li
                        key={requirement}
                        className="flex items-start gap-2 text-xs leading-6 text-[var(--text-muted)]"
                      >
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--accent-green-light)]" />

                        <span>{requirement}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              {module.integrationStatus !== "connected" && (
                <div className="rounded-[var(--radius-md)] border border-[var(--panel-border)] bg-[var(--green-soft)] p-3.5">
                  <p className="text-xs leading-6 text-[var(--text-muted)]">
                    {module.integrationStatus === "unavailable"
                      ? "این ماژول در حال حاضر در دسترس نیست."
                      : "این ماژول هنوز به سرویس تشخیصی متصل نشده است و نتیجه‌ی تشخیصی تولید نمی‌کند."}
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={onClose}
                className="flex min-h-11 w-full items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent-green)] px-4 py-3 text-sm font-bold text-[var(--text-inverse)] transition-colors hover:bg-[var(--accent-green-hover)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
              >
                متوجه شدم
              </button>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}