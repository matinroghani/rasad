
"use client";

import HerdFilters from "@/components/dashboard/herd/HerdFilters";
import HerdStats from "@/components/dashboard/herd/HerdStats";
import HerdTable from "@/components/dashboard/herd/HerdTable";
import HerdUpload from "@/components/dashboard/herd/HerdUpload";
import { useHerd } from "@/features/herd/useHerd";
import {
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  Leaf,
  LoaderCircle,
} from "lucide-react";

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

  const isLoading = status === "loading";

  return (
    <main className="min-w-0 space-y-6 pb-8 sm:space-y-7">
      {/* Page heading */}
      <header className="relative overflow-hidden rounded-[26px] border border-[#e1e9dc] bg-gradient-to-l from-[#f0f6eb] via-[#f8faf5] to-white px-5 py-6 sm:px-7 sm:py-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-10 -top-20 size-52 rounded-full bg-[#dcebd3]/60 blur-3xl"
        />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#dce8d5] bg-white/80 px-3 py-1.5 text-[11px] font-bold text-[#628263]">
              <Leaf size={14} />
              مدیریت هوشمند دامداری
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-[#293b2d] sm:text-[30px]">
              پایش گله
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-7 text-[#788574]">
              مدیریت اطلاعات دام‌ها، بررسی وضعیت سلامت و پایش تولید روزانه
              در یک نمای یکپارچه.
            </p>
          </div>

          <div className="flex w-fit shrink-0 items-center gap-3 rounded-2xl border border-[#e1e9dc] bg-white/90 px-4 py-3 shadow-[0_3px_12px_rgba(39,62,37,0.035)]">
            <span className="flex size-11 items-center justify-center rounded-[14px] bg-[#edf5e9] text-[#568b59]">
              <ClipboardList size={21} strokeWidth={1.7} />
            </span>

            <div>
              <p className="text-[11px] text-[#8a9585]">
                دام‌های ثبت‌شده
              </p>
              <p className="mt-1 text-lg font-extrabold tabular-nums text-[#354936]">
                {stats.totalCows.toLocaleString("fa-IR")}
                <span className="ms-1.5 text-xs font-medium text-[#84917f]">
                  رأس
                </span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Statistics */}
      <HerdStats stats={stats} />

      {/* Image upload */}
      <HerdUpload
        isLoading={isLoading}
        onUpload={uploadImages}
        onAddManual={addManualCow}
      />

      {/* Operation feedback */}
      {isLoading && (
        <div
          role="status"
          className="flex items-center gap-3 rounded-2xl border border-[#dce7d5] bg-[#f4f8f0] px-4 py-3.5"
        >
          <LoaderCircle
            size={19}
            className="shrink-0 animate-spin text-[#5c965f]"
          />
          <div>
            <p className="text-sm font-bold text-[#436b47]">
              تصاویر در حال پردازش هستند
            </p>
            <p className="mt-1 text-xs leading-5 text-[#82927d]">
              تا پایان عملیات، از ارسال مجدد تصاویر خودداری کنید.
            </p>
          </div>
        </div>
      )}

      {status === "error" && error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-[#f0d8d4] bg-[#fff5f3] p-4"
        >
          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0 text-[#c26056]"
          />
          <div>
            <p className="text-sm font-bold text-[#a64e46]">
              عملیات انجام نشد
            </p>
            <p className="mt-1 text-sm leading-6 text-[#a96b64]">
              {error}
            </p>
          </div>
        </div>
      )}

      {status === "success" && (
        <div
          role="status"
          className="flex items-center gap-3 rounded-2xl border border-[#d7e8d2] bg-[#f2f8ef] px-4 py-3.5"
        >
          <CheckCircle2
            size={19}
            className="shrink-0 text-[#5b965f]"
          />
          <p className="text-sm font-semibold text-[#4b7950]">
            عملیات با موفقیت انجام شد.
          </p>
        </div>
      )}

      {/* Herd table */}
      <section className="min-w-0 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-[#edf5e9] text-[#5b8d5d]">
                <ClipboardList size={18} />
              </span>
              <h2 className="text-lg font-extrabold text-[#334735] sm:text-xl">
                جدول پایش گله
              </h2>
            </div>

            <p className="mt-2 text-xs leading-6 text-[#84907f] sm:text-sm">
              اطلاعات ثبت‌شده و شاخص‌های هر دام را بررسی کنید.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl border border-[#e3e9de] bg-white px-3.5 py-2.5">
            <span className="size-2 rounded-full bg-[#79ad72]" />
            <span className="text-xs text-[#7e8a79]">
              تعداد نتایج:
            </span>
            <span className="text-sm font-extrabold tabular-nums text-[#3d6241]">
              {filteredCows.length.toLocaleString("fa-IR")}
            </span>
          </div>
        </div>

        <div className="rounded-[22px] border border-[#e4e9df] bg-[#fbfcf9] p-3 sm:p-4">
          <HerdFilters value={filter} onChange={setFilter} />
        </div>

        <HerdTable cows={filteredCows} />

        <p className="px-1 text-[11px] leading-6 text-[#99a292]">
          اطلاعات نمایش‌داده‌شده بر اساس داده‌های در دسترس فعلی است.
          تحلیل و تشخیص سلامت دام به نتیجه‌ی معتبر سرویس مربوطه نیاز دارد.
        </p>
      </section>
    </main>
  );
}
