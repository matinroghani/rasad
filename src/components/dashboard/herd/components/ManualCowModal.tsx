"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type FormEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  LoaderCircle,
  Mars,
  Venus,
  X,
} from "lucide-react";
import type { CowGender } from "@/types/herd/herd";

export interface ManualCowFormValues {
  earTag: string;
  gender: CowGender;
  ageMonths: number | null;
}

interface ManualCowModalProps {
  isOpen: boolean;
  isSubmitting: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (values: ManualCowFormValues) => Promise<boolean>;
}

const inputClassName = [
  "w-full min-h-12 rounded-[var(--radius-md)] border",
  "border-[var(--panel-border)] bg-[var(--surface)] px-3.5 py-3",
  "text-sm text-[var(--text-main)] placeholder:text-[var(--text-light)]",
  "transition-[border-color,box-shadow] duration-200",
  "hover:border-[var(--panel-border-hover)]",
  "focus:border-[var(--accent-green)] focus:outline-none",
  "focus-visible:shadow-[var(--focus-ring)]",
  "disabled:cursor-not-allowed disabled:opacity-60",
].join(" ");

export default function ManualCowModal({
  isOpen,
  isSubmitting,
  error,
  onClose,
  onSubmit,
}: ManualCowModalProps) {
  const [earTag, setEarTag] = useState("");
  const [gender, setGender] = useState<CowGender>("female");
  const [ageMonths, setAgeMonths] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isErrorDismissed, setIsErrorDismissed] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setEarTag("");
      setGender("female");
      setAgeMonths("");
      setValidationError("");
      setIsErrorDismissed(false);
    }
  }

  const earTagRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleClose = useCallback(() => {
    if (isSubmitting) return;
    onClose();
  }, [isSubmitting, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const frame = requestAnimationFrame(() => {
      earTagRef.current?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    const normalizedTag = earTag.trim();

    if (!normalizedTag) {
      setValidationError("وارد کردن شماره گوش الزامی است.");
      earTagRef.current?.focus();
      return;
    }

    const normalizedAge = ageMonths.trim();
    let parsedAge: number | null = null;

    if (normalizedAge) {
      parsedAge = Number(normalizedAge);

      if (!Number.isInteger(parsedAge) || parsedAge < 0 || parsedAge > 1200) {
        setValidationError("سن باید عدد صحیحی بین صفر تا ۱۲۰۰ ماه باشد.");
        return;
      }
    }

    setValidationError("");
    setIsErrorDismissed(false);

    const succeeded = await onSubmit({
      earTag: normalizedTag,
      gender,
      ageMonths: parsedAge,
    });

    if (succeeded) {
      setEarTag("");
      setGender("female");
      setAgeMonths("");
      setValidationError("");
      setSubmitError(null);
      onClose();
    }
  }

  const modalTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };

  const displayError = validationError || (isErrorDismissed ? null : error);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[var(--surface-dark)]/45 p-3 backdrop-blur-[5px] sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={modalTransition}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleClose();
            }
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="manual-cow-title"
            aria-describedby="manual-cow-description"
            initial={
              shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 10, scale: 0.99 }
            }
            transition={modalTransition}
            className={[
              "relative my-auto w-full max-w-xl overflow-hidden",
              "rounded-[var(--radius-xl)] border border-[var(--panel-border)]",
              "bg-[var(--surface)] shadow-[var(--shadow-md)]",
            ].join(" ")}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[var(--accent-green)]"
            />

            <header className="flex items-start justify-between gap-4 border-b border-[var(--panel-border)] px-5 py-5 sm:px-7 sm:py-6">
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--green-soft)] text-[var(--accent-green)]">
                  <ClipboardList size={23} strokeWidth={1.8} />
                </span>

                <div className="min-w-0">
                  <h2
                    id="manual-cow-title"
                    className="text-lg font-extrabold text-[var(--text-main)] sm:text-xl"
                  >
                    ثبت دستی دام
                  </h2>

                  <p
                    id="manual-cow-description"
                    className="mt-1.5 text-xs leading-6 text-[var(--text-muted)] sm:text-sm"
                  >
                    اطلاعات اولیه دام را وارد کنید تا پروفایل آن ثبت شود.
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="بستن پنجره"
                disabled={isSubmitting}
                onClick={handleClose}
                className={[
                  "flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)]",
                  "text-[var(--text-muted)] transition-colors",
                  "hover:bg-[var(--bg-secondary)] hover:text-[var(--text-main)]",
                  "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                  "disabled:cursor-not-allowed disabled:opacity-40",
                ].join(" ")}
              >
                <X size={19} />
              </button>
            </header>

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-6 px-5 py-6 sm:px-7">
                <div className="space-y-2">
                  <label
                    htmlFor="manual-cow-ear-tag"
                    className="block text-sm font-bold text-[var(--text-main)]"
                  >
                    شماره گوش
                    <span className="ms-1 text-[var(--danger)]">*</span>
                  </label>

                  <input
                    ref={earTagRef}
                    id="manual-cow-ear-tag"
                    name="earTag"
                    type="text"
                    dir="auto"
                    autoComplete="off"
                    spellCheck={false}
                    required
                    maxLength={100}
                    disabled={isSubmitting}
                    value={earTag}
                    onChange={(event) => {
                      setEarTag(event.target.value);
                      setValidationError("");
                      setIsErrorDismissed(true);
                    }}
                    placeholder="مثلاً IR-27235"
                    aria-invalid={Boolean(
                      validationError || (!isErrorDismissed && error),
                    )}
                    aria-describedby={
                      validationError
                        ? "manual-cow-validation-error"
                        : "manual-cow-ear-hint"
                    }
                    className={inputClassName}
                  />

                  <p
                    id="manual-cow-ear-hint"
                    className="text-xs leading-6 text-[var(--text-light)]"
                  >
                    شماره گوش باید شناسه‌ای باشد که در سامانه برای این دام
                    استفاده می‌کنید.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="block text-sm font-bold text-[var(--text-main)]">
                    جنسیت
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      aria-pressed={gender === "female"}
                      onClick={() => setGender("female")}
                      className={[
                        "flex min-h-14 items-center gap-3 rounded-[var(--radius-md)] border px-4 py-3",
                        "transition-[border-color,background-color,color] duration-200",
                        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                        gender === "female"
                          ? "border-[var(--accent-green)] bg-[var(--green-soft)] text-[var(--accent-green)]"
                          : "border-[var(--panel-border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--panel-border-hover)]",
                      ].join(" ")}
                    >
                      <Venus size={19} />
                      <span className="text-sm font-bold">ماده</span>
                      {gender === "female" && (
                        <CheckCircle2 className="ms-auto size-4" />
                      )}
                    </button>

                    <button
                      type="button"
                      disabled={isSubmitting}
                      aria-pressed={gender === "male"}
                      onClick={() => setGender("male")}
                      className={[
                        "flex min-h-14 items-center gap-3 rounded-[var(--radius-md)] border px-4 py-3",
                        "transition-[border-color,background-color,color] duration-200",
                        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                        gender === "male"
                          ? "border-[var(--accent-green)] bg-[var(--green-soft)] text-[var(--accent-green)]"
                          : "border-[var(--panel-border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--panel-border-hover)]",
                      ].join(" ")}
                    >
                      <Mars size={19} />
                      <span className="text-sm font-bold">نر</span>
                      {gender === "male" && (
                        <CheckCircle2 className="ms-auto size-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="manual-cow-age"
                    className="block text-sm font-bold text-[var(--text-main)]"
                  >
                    سن دام
                    <span className="ms-1 text-xs font-normal text-[var(--text-light)]">
                      (اختیاری)
                    </span>
                  </label>

                  <div className="relative">
                    <input
                      id="manual-cow-age"
                      name="ageMonths"
                      type="number"
                      min={0}
                      max={1200}
                      step={1}
                      inputMode="numeric"
                      disabled={isSubmitting}
                      value={ageMonths}
                      onChange={(event) => {
                        setAgeMonths(event.target.value);
                        setValidationError("");
                        setIsErrorDismissed(true);
                      }}
                      placeholder="مثلاً ۳۶"
                      className={`${inputClassName} pe-14`}
                    />

                    <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-xs text-[var(--text-light)]">
                      ماه
                    </span>
                  </div>

                  <p className="text-xs leading-6 text-[var(--text-light)]">
                    سن را به ماه وارد کنید؛ در صورت نامشخص بودن خالی بگذارید.
                  </p>
                </div>

                {displayError && (
                  <div
                    id={
                      validationError
                        ? "manual-cow-validation-error"
                        : "manual-cow-submit-error"
                    }
                    role="alert"
                    className="flex items-start gap-2.5 rounded-[var(--radius-md)] border border-[var(--danger)]/25 bg-[var(--danger)]/5 p-3.5 text-sm leading-6 text-[var(--danger)]"
                  >
                    <AlertCircle className="mt-0.5 size-4 shrink-0" />
                    <span>{displayError}</span>
                  </div>
                )}
              </div>

              <footer className="flex flex-col-reverse gap-3 border-t border-[var(--panel-border)] bg-[var(--surface-warm)] px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleClose}
                  className={[
                    "inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)]",
                    "border border-[var(--panel-border)] bg-[var(--surface)] px-5",
                    "text-sm font-semibold text-[var(--text-main)] transition-colors",
                    "hover:bg-[var(--bg-secondary)]",
                    "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                  ].join(" ")}
                >
                  انصراف
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={[
                    "inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-md)]",
                    "bg-[var(--accent-green)] px-6 text-sm font-bold text-[var(--text-inverse)]",
                    "shadow-[var(--shadow-sm)] transition-[background-color,box-shadow,transform] duration-200",
                    "hover:bg-[var(--accent-green-hover)] hover:shadow-[var(--shadow-md)]",
                    "active:scale-[0.98]",
                    "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                    "disabled:cursor-not-allowed disabled:opacity-60",
                  ].join(" ")}
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle size={17} className="animate-spin" />
                      در حال ثبت...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={17} />
                      ثبت دام
                    </>
                  )}
                </button>
              </footer>
            </form>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
