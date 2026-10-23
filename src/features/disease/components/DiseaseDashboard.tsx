"use client";

import {
  useCallback,
  useState,
} from "react";

import {
  AlertCircle,
  RotateCw,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import LoadingScreen from "@/components/ui/LoadingScreen";

import type {
  DiseaseModule,
} from "../types";

import { useDisease } from "../hooks/useDisease";

import DiseaseHeader from "./DiseaseHeader";
import DiseaseMetrics from "./DiseaseMetrics";
import DiagnosticModules from "./DiagnosticModules";
import DiseaseIntegrationNotice from "./DiseaseIntegrationNotice";
import DiseaseModuleDialog from "./DiseaseModuleDialog";

export default function DiseaseDashboard() {
  const {
    stats,
    modules,
    isLoading,
    error,
    retry,
  } = useDisease();

  const [selectedModule, setSelectedModule] =
    useState<DiseaseModule | null>(null);

  const shouldReduceMotion = useReducedMotion();

  const closeModuleDialog = useCallback(() => {
    setSelectedModule(null);
  }, []);

  return (
    <>
      <motion.main
        dir="rtl"
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, y: 18 }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.42,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
        className="min-w-0 space-y-6 pb-8 sm:space-y-7"
      >
        <DiseaseHeader />

        <DiseaseMetrics stats={stats} />

        {isLoading ? (
          <LoadingScreen
            label="در حال دریافت ماژول‌های تشخیصی..."
          />
        ) : error ? (
          <section
            role="alert"
            className="flex min-h-64 flex-col items-center justify-center rounded-[var(--radius-lg)] border border-[var(--panel-border)] bg-[var(--panel-bg)] px-5 py-10 text-center"
          >
            <span className="flex size-12 items-center justify-center rounded-2xl bg-[var(--tone-treatment-bg)] text-[var(--tone-treatment-fg)]">
              <AlertCircle size={25} />
            </span>

            <h2 className="mt-4 text-base font-extrabold text-[var(--text-main)]">
              دریافت ماژول‌های بیماری ناموفق بود
            </h2>

            <p className="mt-2 max-w-lg break-words text-xs leading-7 text-[var(--text-muted)]">
              {error}
            </p>

            <button
              type="button"
              onClick={retry}
              className={[
                "mt-5 inline-flex min-h-11 items-center justify-center gap-2",
                "rounded-[var(--radius-md)] bg-[var(--accent-green)] px-5 py-3",
                "text-sm font-bold text-[var(--text-inverse)]",
                "transition-colors hover:bg-[var(--accent-green-hover)]",
                "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
              ].join(" ")}
            >
              <RotateCw size={16} />
              تلاش مجدد
            </button>
          </section>
        ) : (
          <DiagnosticModules
            modules={modules}
            onSelect={setSelectedModule}
          />
        )}

        <DiseaseIntegrationNotice />
      </motion.main>

      <DiseaseModuleDialog
        module={selectedModule}
        onClose={closeModuleDialog}
      />
    </>
  );
}
