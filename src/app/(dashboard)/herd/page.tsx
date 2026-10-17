"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { toast } from "react-toastify";
import { ClipboardList, Leaf } from "lucide-react";

import HerdFilters from "@/components/dashboard/herd/HerdFilters";
import HerdStats from "@/components/dashboard/herd/HerdStats";
import HerdTable from "@/components/dashboard/herd/HerdTable";
import HerdUpload from "@/components/dashboard/herd/HerdUpload";
import HerdScanModal from "@/components/dashboard/herd/components/HerdScanModal";
import ManualCowModal from "@/components/dashboard/herd/components/ManualCowModal";
import { useHerd } from "@/features/herd/useHerd";

const sectionMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const sectionTransition = {
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function HerdPage() {
  const {
    filteredCows,
    stats,
    filter,
    setFilter,
    status,
    error,
    uploadImages,
    addManualCow,
  } = useHerd();

  const [scanFiles, setScanFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const isLoading = status === "loading";

  const showOverview = stats.totalCows > 0 || status === "success";

  const currentScanIndex =
    scanFiles.length > 0
      ? Math.min(
          scanFiles.length - 1,
          Math.floor(uploadProgress * scanFiles.length),
        )
      : 0;

  const initialAnimation = shouldReduceMotion
    ? false
    : sectionMotion.hidden;

  useEffect(() => {
    if (status === "loading") return;

    if (status === "error" && error) {
      toast.error(`عملیات انجام نشد: ${error}`, {
        toastId: "herd-error",
        autoClose: 5000,
      });

      return;
    }

    if (status === "success") {
      toast.success("عملیات با موفقیت انجام شد.", {
        toastId: "herd-success",
        autoClose: 3500,
      });
    }
  }, [status, error]);

  async function handleUpload(files: File[]) {
    if (!files.length || isLoading) return;

    setScanFiles(files);
    setUploadProgress(0);

    await uploadImages(files, setUploadProgress);

    setScanFiles([]);
    setUploadProgress(0);
  }

  async function handleManualCowSubmit(
    values: Parameters<typeof addManualCow>[0],
  ): Promise<boolean> {
    return addManualCow(values);
  }

  return (
    <>
      <HerdScanModal
        isOpen={isLoading && scanFiles.length > 0}
        files={scanFiles}
        currentIndex={currentScanIndex}
        progress={uploadProgress}
      />

      <ManualCowModal
        isOpen={isManualModalOpen}
        isSubmitting={isLoading}
        error={status === "error" ? error : null}
        onClose={() => {
          if (!isLoading) {
            setIsManualModalOpen(false);
          }
        }}
        onSubmit={handleManualCowSubmit}
      />

      <motion.main
        initial={initialAnimation}
        animate="visible"
        variants={sectionMotion}
        transition={sectionTransition}
        className="min-w-0 space-y-6 pb-8 sm:space-y-7"
      >
        <AnimatePresence initial={false}>
          {showOverview && (
            <motion.header
              key="herd-header"
              variants={sectionMotion}
              initial={initialAnimation}
              animate="visible"
              exit="exit"
              transition={sectionTransition}
              className="relative overflow-hidden rounded-[26px] border border-[var(--panel-border)] bg-[var(--panel-bg)] px-5 py-6 sm:px-7 sm:py-7"
            >
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -end-10 -top-20 size-52 rounded-full bg-[var(--green-soft)] opacity-70 blur-3xl"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.08, 1],
                        opacity: [0.55, 0.8, 0.55],
                      }
                }
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <motion.div
                    initial={initialAnimation}
                    animate="visible"
                    variants={sectionMotion}
                    transition={{ ...sectionTransition, delay: 0.08 }}
                    className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-[11px] font-bold text-[var(--accent-green)]"
                  >
                    <Leaf size={14} />
                    مدیریت هوشمند دامداری
                  </motion.div>

                  <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text-main)] sm:text-[30px]">
                    پایش گله
                  </h1>

                  <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--text-muted)]">
                    مدیریت اطلاعات دام‌ها، بررسی وضعیت سلامت و پایش تولید
                    روزانه در یک نمای یکپارچه.
                  </p>
                </div>

                <motion.div
                  initial={initialAnimation}
                  animate="visible"
                  variants={sectionMotion}
                  transition={{ ...sectionTransition, delay: 0.14 }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -3, transition: { duration: 0.2 } }
                  }
                  className="flex w-fit shrink-0 items-center gap-3 rounded-2xl border border-[var(--panel-border)] bg-[var(--surface)] px-4 py-3 shadow-[var(--shadow-sm)]"
                >
                  <span className="flex size-11 items-center justify-center rounded-[14px] bg-[var(--green-soft)] text-[var(--accent-green)]">
                    <ClipboardList size={21} strokeWidth={1.7} />
                  </span>

                  <div>
                    <p className="text-[11px] text-[var(--text-light)]">
                      دام‌های ثبت‌شده
                    </p>

                    <p className="mt-1 text-lg font-extrabold tabular-nums text-[var(--text-main)]">
                      {stats.totalCows.toLocaleString("fa-IR")}

                      <span className="ms-1.5 text-xs font-medium text-[var(--text-muted)]">
                        رأس
                      </span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.header>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {showOverview && (
            <motion.div
              key="herd-stats"
              initial={initialAnimation}
              animate="visible"
              exit="exit"
              variants={sectionMotion}
              transition={{ ...sectionTransition, delay: 0.06 }}
            >
              <HerdStats stats={stats} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          variants={sectionMotion}
          initial={initialAnimation}
          animate="visible"
          transition={{ ...sectionTransition, delay: 0.1 }}
        >
          <HerdUpload
            isLoading={isLoading}
            onUpload={handleUpload}
            onAddManual={() => setIsManualModalOpen(true)}
          />
        </motion.div>

        <motion.section
          aria-labelledby="herd-table-heading"
          variants={sectionMotion}
          initial={initialAnimation}
          animate="visible"
          transition={{ ...sectionTransition, delay: 0.16 }}
          className="min-w-0 space-y-4"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-xl bg-[var(--green-soft)] text-[var(--accent-green)]">
                  <ClipboardList size={18} />
                </span>

                <h2
                  id="herd-table-heading"
                  className="text-lg font-extrabold text-[var(--text-main)] sm:text-xl"
                >
                  جدول پایش گله
                </h2>
              </div>

              <p className="mt-2 text-xs leading-6 text-[var(--text-muted)] sm:text-sm">
                اطلاعات ثبت‌شده و شاخص‌های هر دام را بررسی کنید.
              </p>
            </div>

            <motion.div
              key={filteredCows.length}
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0.6, scale: 0.97 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.2,
              }}
              aria-live="polite"
              className="flex w-fit items-center gap-2 rounded-xl border border-[var(--panel-border)] bg-[var(--panel-bg)] px-3.5 py-2.5"
            >
              <span className="size-2 rounded-full bg-[var(--accent-green)]" />

              <span className="text-xs text-[var(--text-muted)]">
                تعداد نتایج:
              </span>

              <span className="text-sm font-extrabold tabular-nums text-[var(--text-main)]">
                {filteredCows.length.toLocaleString("fa-IR")}
              </span>
            </motion.div>
          </div>

          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    borderColor: "var(--border)",
                    transition: { duration: 0.2 },
                  }
            }
            className="rounded-[var(--radius-lg)] border border-[var(--panel-border)] bg-[var(--surface-warm)] p-3 sm:p-4"
          >
            <HerdFilters value={filter} onChange={setFilter} />
          </motion.div>

          <HerdTable cows={filteredCows} />

          <p className="px-1 text-[11px] leading-6 text-[var(--text-light)]">
            اطلاعات نمایش‌داده‌شده بر اساس داده‌های در دسترس فعلی است.
            تحلیل و تشخیص سلامت دام به نتیجه‌ی معتبر سرویس مربوطه نیاز دارد.
          </p>
        </motion.section>
      </motion.main>
    </>
  );
}