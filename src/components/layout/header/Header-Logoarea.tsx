import TypingEffect from "@/components/ui/TypingEffect";

export default function HeaderLogoarea() {
  return (
    <div className="flex w-full min-w-0 items-center gap-3 sm:gap-4">
      {/* Logo */}
      <div
        aria-label="Rasad logo"
        className={[
          "relative flex size-10 shrink-0 items-center justify-center",
          "overflow-hidden rounded-[var(--radius-md)]",
          "border border-[var(--header-border-subtle)]",
          "bg-[var(--header-surface-tint)] text-[var(--accent-green-glow)]",
          "text-xl font-black tracking-tight sm:size-12 sm:text-2xl",
          "shadow-[var(--header-inset-highlight)]",
          "transition-[background-color,border-color] duration-200",
          "hover:border-[var(--accent-green-light)]/50",
          "hover:bg-[var(--header-surface-tint-hover)]",
        ].join(" ")}
      >
        R
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-1 w-4 rounded-tl-full bg-[var(--accent-green-neon)]"
        />
      </div>

      {/* Brand information */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
        {/* Brand name */}
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          <span
            className={[
              "shrink-0 text-xl font-black leading-tight tracking-tight",
              "text-[var(--accent-green-glow)] sm:text-2xl",
            ].join(" ")}
          >
            رصد
          </span>

          <span
            aria-hidden="true"
            className="hidden h-4 w-px bg-[var(--header-divider)] sm:block"
          />

          <span className="min-w-0 text-xs font-medium leading-5 text-[#e6dfd3] sm:text-sm">
            رایا سنجش دانا
          </span>
        </div>

        {/* Typing effect */}
        <div className="flex h-5 min-w-0 items-center overflow-hidden text-[var(--font-size-xs)] font-medium leading-5 text-[#c0b5a2] sm:text-[var(--font-size-sm)]">
          <TypingEffect />
        </div>
      </div>
    </div>
  );
}