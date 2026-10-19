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
import Aurora from "@/components/shadcn/Aurora";
import Silk from "@/components/shadcn/Silk";

interface HerdUploadProps {
  isLoading: boolean;
  onUpload: (files: File[]) => void;
  onAddManual: () => void;
}

const MAX_FILES = 20;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function HerdUpload({
  isLoading,
  onUpload,
  onAddManual,
}: HerdUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");

  function handleFiles(files: File[]) {
    if (!files.length || isLoading) return;

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (!imageFiles.length) {
      setFileError("لطفاً حداقل یک فایل تصویری انتخاب کنید.");
      return;
    }

    if (imageFiles.length > MAX_FILES) {
      setFileError(`حداکثر ${MAX_FILES} تصویر را می‌توانید انتخاب کنید.`);
      return;
    }

    const oversizedFile = imageFiles.find((file) => file.size > MAX_FILE_SIZE);

    if (oversizedFile) {
      setFileError(`حجم فایل «${oversizedFile.name}» بیشتر از ۱۰ مگابایت است.`);
      return;
    }

    setFileError("");
    setSelectedFiles(imageFiles);
    onUpload(imageFiles);
  }

  function clearSelection() {
    if (isLoading) return;

    setSelectedFiles([]);
    setFileError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <section
      aria-labelledby="herd-upload-title"
      onDragEnter={(event) => {
        event.preventDefault();

        if (!isLoading) {
          setIsDragging(true);
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();

        if (!isLoading) {
          event.dataTransfer.dropEffect = "copy";
        }
      }}
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
        "relative isolate overflow-hidden rounded-[var(--radius-xl)] border",
        "bg-[var(--panel-bg)] transition-[background-color,border-color,box-shadow] duration-200",
        isDragging
          ? "border-[var(--accent-green)] bg-[var(--green-soft)] shadow-[var(--shadow-glow)]"
          : "border-[var(--panel-border)] shadow-[var(--shadow-sm)]",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <Silk
          color="#397D43"
          sheenColor="#FFFFFF"
          speed={3}
          scale={1.3}
          rotation={0}
          sheen={1.2}
          depth={1}
          glow={0.8}
          noiseIntensity={0.8}
          mouseInteraction={false}
          clickRipple={false}
          intro
          ripple={0.8}
          wave={0.9}
          variation={0.3}
          interactionStrength={0.8}
          fade={0}
          lightMode
        />
      </div>

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute -end-[4rem] -top-[6rem]",
          "z-0 aspect-square w-[40%] max-w-64 rounded-full",
          "bg-[var(--green-soft)] opacity-70 blur-3xl",
        ].join(" ")}
      />

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute -bottom-[7rem] -start-[4rem]",
          "z-0 aspect-square w-[40%] max-w-64 rounded-full",
          "bg-[var(--surface-warm)] blur-3xl",
        ].join(" ")}
      />

      <div className="relative bg-[var(--green-soft)] z-10 grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,16.25rem)] lg:items-center lg:gap-8 lg:p-8">
        <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-start">
          <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <span className="inline-flex items-center gap-[0.375em] rounded-full border border-[var(--border)] bg-[var(--green-soft)] px-3 py-1.5 text-[var(--font-size-xs)] font-bold text-[var(--accent-green)]">
              <Microchip className="size-[1.15em]" />
              تشخیص هویت هوشمند
            </span>

            <span className="inline-flex items-center gap-[0.375em] text-[var(--font-size-xs)] text-[var(--text-light)]">
              <ShieldCheck className="size-[1.15em]" />
              آماده‌ی اتصال به مدل تشخیص
            </span>
          </div>

          <h2
            id="herd-upload-title"
            className="mt-4 text-xl font-extrabold leading-9 text-[var(--text-main)] sm:text-2xl"
          >
            تصاویر گله را وارد کنید
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
            با انتخاب تصاویر دام‌ها، فرایند ثبت و شناسایی آن‌ها را آغاز کنید. در
            نسخه‌ی متصل به مدل، تصاویر تکراری باید به پروفایل دام موجود مرتبط
            شوند؛ نه اینکه پروفایل جدید بسازند.
          </p>

          <div className="mt-5 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => inputRef.current?.click()}
              className={[
                "inline-flex min-h-[2.75rem] w-full items-center justify-center gap-2 sm:w-auto",
                "rounded-[var(--radius-sm)] bg-[var(--accent-green)] px-5 py-3",
                "text-sm font-bold text-[var(--text-inverse)] shadow-[var(--shadow-sm)]",
                "transition-[background-color,box-shadow,transform] duration-200",
                "hover:bg-[var(--accent-green-hover)] hover:shadow-[var(--shadow-md)]",
                "active:scale-[0.98] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                "disabled:cursor-not-allowed disabled:opacity-60",
              ].join(" ")}
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
              className={[
                "inline-flex min-h-[2.75rem] w-full items-center justify-center gap-2 sm:w-auto",
                "rounded-[var(--radius-sm)] border border-[var(--border)]",
                "bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--text-main)]",
                "transition-[background-color,border-color,color] duration-200",
                "hover:border-[var(--border-hover)] hover:bg-[var(--green-soft)]",
                "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                "disabled:cursor-not-allowed disabled:opacity-60",
              ].join(" ")}
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

          <div className="mt-5 flex w-full flex-col items-center justify-center gap-y-2 text-[var(--font-size-xs)] text-[var(--text-light)] sm:w-auto sm:flex-row sm:flex-wrap sm:justify-start sm:gap-x-5">
            <span className="inline-flex items-center gap-[0.375em]">
              <CheckCircle2 className="size-[1.15em] text-[var(--success)]" />
              انتخاب چند تصویر
            </span>

            <span className="inline-flex items-center gap-[0.375em]">
              <CheckCircle2 className="size-[1.15em] text-[var(--success)]" />
              پشتیبانی از فرمت‌های تصویری
            </span>

            <span>حداکثر ۲۰ فایل، هر فایل تا ۱۰ مگابایت</span>
          </div>

          {fileError && (
            <p
              role="alert"
              className="mt-3 w-full text-center text-sm font-medium text-[var(--danger)] sm:text-start"
            >
              {fileError}
            </p>
          )}

          {selectedFiles.length > 0 && (
            <div className="mx-auto mt-4 flex w-full max-w-xl items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--panel-border)] bg-[var(--surface)] p-3 lg:mx-0">
              <span className="flex aspect-square w-full max-w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--green-soft)] text-[var(--accent-green)]">
                <FileImage className="size-[55%]" />
              </span>

              <div className="min-w-0 flex-1 text-start">
                <p className="text-sm font-bold text-[var(--text-main)]">
                  {selectedFiles.length.toLocaleString("fa-IR")} تصویر
                  انتخاب‌شده
                </p>

                <p className="mt-1 truncate text-xs text-[var(--text-muted)]">
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
                className={[
                  "flex aspect-square w-full max-w-8 shrink-0 items-center justify-center",
                  "rounded-[var(--radius-sm)] text-[var(--text-muted)]",
                  "transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--text-main)]",
                  "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                  "disabled:cursor-not-allowed disabled:opacity-40",
                ].join(" ")}
              >
                <X className="size-[55%]" />
              </button>
            </div>
          )}
        </div>

        <div
          className={[
            "flex min-h-44 flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed px-5 py-6 text-center",
            "transition-[background-color,border-color] duration-200",
            isDragging
              ? "border-[var(--accent-green)] bg-[var(--green-soft)]"
              : "border-[var(--border-hover)] bg-[var(--surface-warm)]",
          ].join(" ")}
        >
          <div className="relative flex aspect-square w-full max-w-17 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--surface)] text-[var(--accent-green)] shadow-[var(--shadow-sm)]">
            <CloudUpload className="size-[45%]" strokeWidth={1.6} />

            <span className="absolute -inset-e-1 -top-1 aspect-square w-[24%] rounded-full border-[3px] border-[var(--surface)] bg-[var(--accent-green-light)]" />
          </div>

          <p className="mt-4 text-sm font-bold text-[var(--text-main)]">
            {isDragging ? "فایل‌ها را رها کنید" : "تصاویر را اینجا رها کنید"}
          </p>

          <p className="mt-1.5 text-xs leading-6 text-[var(--text-muted)]">
            یا از دکمه‌ی انتخاب تصاویر استفاده کنید
          </p>
        </div>
      </div>
    </section>
  );
}