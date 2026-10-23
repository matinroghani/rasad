interface LoadingScreenProps {
  label?: string;
}

export default function LoadingScreen({
  label = "در حال بارگذاری اطلاعات...",
}: LoadingScreenProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="relative flex min-h-[40vh] w-full items-center justify-center overflow-hidden px-4 py-10"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-green)] opacity-[0.05] blur-3xl" />
      </div>

      {/* Loading panel */}
      <div className="relative flex w-full max-w-sm flex-col items-center overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] px-7 py-9 shadow-[var(--shadow-sm)] sm:px-10 sm:py-10">
        {/* Top accent */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-l from-transparent via-[var(--accent-green)] to-transparent opacity-80"
        />

        {/* Loader illustration */}
        <div className="relative flex size-20 items-center justify-center">
          {/* Outer decorative ring */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl border border-dashed border-[var(--panel-border-hover)] motion-safe:animate-[spin_14s_linear_infinite] motion-reduce:animate-none"
          />

          {/* Soft center */}
          <span
            aria-hidden="true"
            className="absolute inset-2 rounded-xl border border-[var(--panel-border)] bg-[var(--green-soft)]"
          />

          {/* Spinner */}
          <span
            aria-hidden="true"
            className="relative size-8 rounded-full border-[3px] border-[var(--panel-border)] border-t-[var(--accent-green)] motion-safe:animate-spin motion-reduce:animate-none"
          />
        </div>

        {/* Loading label */}
        <div className="mt-6 flex flex-col items-center gap-3 text-center">
          <p className="text-sm font-bold leading-6 text-[var(--text-main)] sm:text-base">
            {label}
          </p>

          {/* Status indicator */}
          <span className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-[var(--accent-green)] motion-safe:animate-pulse motion-reduce:animate-none"
            />
            لطفاً کمی صبر کنید
          </span>
        </div>

        {/* Decorative progress track */}
        <div
          aria-hidden="true"
          className="mt-7 h-1 w-full overflow-hidden rounded-full bg-[var(--green-soft)]"
        >
          <div className="h-full w-1/3 rounded-full bg-[var(--accent-green)] opacity-80 motion-safe:animate-[loading-progress_1.6s_ease-in-out_infinite] motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
}