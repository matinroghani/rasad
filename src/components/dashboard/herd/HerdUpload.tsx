"use client";

import { useRef, useState } from "react";
import {
  Camera,
  CheckCircle2,
  CloudUpload,
  FileImage,
  Keyboard,
  LoaderCircle,
  Microchip,
  ShieldCheck,
  X,
} from "lucide-react";

interface HerdUploadProps {
  isLoading: boolean;
  onUpload: (files: File[]) => void;
  onAddManual: () => void;
}

export default function HerdUpload({
  isLoading,
  onUpload,
  onAddManual,
}: HerdUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  function handleFiles(files: File[]) {
    if (!files.length || isLoading) return;

    setSelectedFiles(files);
    onUpload(files);
  }

  function clearSelection() {
    setSelectedFiles([]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <section
      aria-labelledby="herd-upload-title"
      onDragEnter={(event) => {
        event.preventDefault();
        if (!isLoading) setIsDragging(true);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setIsDragging(false);
        }
      }}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        handleFiles(Array.from(event.dataTransfer.files));
      }}
      className={[
        "relative isolate overflow-hidden rounded-[1.625rem] border bg-white",
        "transition duration-200",
        isDragging
          ? "border-[#65a86b] bg-[#f0f8ed] ring-4 ring-[#65a86b]/10"
          : "border-[#e1e9dc] shadow-sm",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-[4rem] -top-[6rem] -z-10 aspect-square w-[40%] max-w-64 rounded-full bg-[#edf6e8]/80 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[7rem] -start-[4rem] -z-10 aspect-square w-[40%] max-w-64 rounded-full bg-[#f2f7eb] blur-3xl"
      />

      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,16.25rem)] lg:items-center lg:gap-8 lg:p-8">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-[0.375em] rounded-full border border-[#dce9d5] bg-[#f2f8ee] px-3 py-1.5 text-[0.6875rem] font-bold text-[#56865a]">
              <Microchip className="size-[1.15em]" />
              تشخیص هویت هوشمند
            </span>

            <span className="inline-flex items-center gap-[0.375em] text-[0.6875rem] text-[#899587]">
              <ShieldCheck className="size-[1.15em]" />
              آماده‌ی اتصال به مدل تشخیص
            </span>
          </div>

          <h2
            id="herd-upload-title"
            className="mt-4 text-xl font-extrabold leading-9 text-[#293b2d] sm:text-2xl"
          >
            تصاویر گله را وارد کنید
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-[#788574]">
            با انتخاب تصاویر دام‌ها، فرایند ثبت و شناسایی آن‌ها را آغاز کنید.
            در نسخه‌ی متصل به مدل، تصاویر تکراری باید به پروفایل دام موجود
            مرتبط شوند؛ نه اینکه پروفایل جدید بسازند.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => inputRef.current?.click()}
              className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-xl bg-[#4f8c55] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#417b48] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <LoaderCircle className="size-[1.15em] animate-spin" />
              ) : (
                <Camera className="size-[1.15em]" />
              )}
              {isLoading ? "در حال پردازش..." : "انتخاب تصاویر"}
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={onAddManual}
              className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-xl border border-[#dce5d7] bg-white/80 px-4 py-3 text-sm font-semibold text-[#435544] transition hover:border-[#b8cfb0] hover:bg-[#f7faf4] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Keyboard className="size-[1.15em]" />
              ثبت دستی بدون عکس
            </button>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              disabled={isLoading}
              className="sr-only"
              onChange={(event) => {
                handleFiles(Array.from(event.target.files ?? []));
                event.target.value = "";
              }}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.6875rem] text-[#8b9686]">
            <span className="inline-flex items-center gap-[0.375em]">
              <CheckCircle2 className="size-[1.15em] text-[#77a879]" />
              انتخاب چند تصویر
            </span>
            <span className="inline-flex items-center gap-[0.375em]">
              <CheckCircle2 className="size-[1.15em] text-[#77a879]" />
              پشتیبانی از فرمت‌های تصویری
            </span>
            <span>حداکثر ۲۰ فایل، هر فایل تا ۱۰ مگابایت</span>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-4 flex max-w-xl items-center gap-3 rounded-xl border border-[#dfe9d8] bg-white/90 p-3">
              <span className="flex aspect-square w-full max-w-[2.25rem] shrink-0 items-center justify-center rounded-lg bg-[#edf6e9] text-[#568b59]">
                <FileImage className="size-[55%]" />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-[#344936]">
                  {selectedFiles.length.toLocaleString("fa-IR")} تصویر انتخاب‌شده
                </p>
                <p className="mt-1 truncate text-xs text-[#8a9585]">
                  {selectedFiles.length === 1
                    ? selectedFiles[0].name
                    : `${selectedFiles[0].name} و ${selectedFiles.length - 1} فایل دیگر`}
                </p>
              </div>

              <button
                type="button"
                aria-label="پاک کردن انتخاب تصاویر"
                disabled={isLoading}
                onClick={clearSelection}
                className="flex aspect-square w-full max-w-8 shrink-0 items-center justify-center rounded-lg text-[#879282] transition hover:bg-[#f3f6ef] hover:text-[#354736] disabled:opacity-40"
              >
                <X className="size-[55%]" />
              </button>
            </div>
          )}
        </div>

        <div
          className={[
            "flex min-h-[11rem] flex-col items-center justify-center rounded-[1.375rem] border border-dashed px-5 py-6 text-center transition",
            isDragging
              ? "border-[#69a86b] bg-white/80"
              : "border-[#d4e2cd] bg-[#f7faf4]/90",
          ].join(" ")}
        >
          <div className="relative flex aspect-square w-full max-w-[4.25rem] items-center justify-center rounded-[1.375rem] bg-white text-[#5b9961] shadow-sm">
            <CloudUpload className="size-[45%]" strokeWidth={1.6} />
            <span className="absolute -end-1 -top-1 aspect-square w-[24%] rounded-full border-[3px] border-white bg-[#8fbe76]" />
          </div>

          <p className="mt-4 text-sm font-bold text-[#405542]">
            {isDragging ? "فایل‌ها را رها کنید" : "تصاویر را اینجا رها کنید"}
          </p>

          <p className="mt-1.5 text-xs leading-6 text-[#899587]">
            یا از دکمه‌ی انتخاب تصاویر استفاده کنید
          </p>
        </div>
      </div>
    </section>
  );
}