import TypingEffect from "@/components/ui/TypingEffect";

export default function HeaderLogoarea() {
  return (
    <div className="flex w-full min-w-0 items-center justify-start gap-2 sm:gap-3">
      {/* Logo */}
      <div
        aria-label="Rasad logo"
        className={[
          "flex size-9 shrink-0 items-center justify-center sm:size-11 xl:size-12",
          "rounded-md border border-white/20",
          "bg-white/6 text-white/90",
          "text-lg font-bold tracking-tight sm:text-xl xl:text-2xl",
          "transition-transform duration-300 ease-(--ease-spring)",
          "hover:scale-[1.03]",
        ].join(" ")}
      >
        R
      </div>

      {/* Brand Information */}
      <div className="flex min-w-0 flex-col items-start gap-1 sm:gap-2">
        {/* Brand Name */}
        <div className="flex min-w-0 max-w-full items-center justify-start gap-1.5 sm:gap-2">
          <span
            className={[
              "shrink-0 bg-[linear-gradient(90deg,#d9f0d9,#b5e3b5,#8fd18f,#6fbf73,#8fd18f,#b5e3b5)]",
              "bg-size-[300%_100%] bg-clip-text text-transparent",
              "animate-[gradient-flow_5s_ease_infinite]",
              "text-lg font-black leading-none sm:text-xl xl:text-2xl",
            ].join(" ")}
          >
            رصد
          </span>

          <span
            aria-hidden="true"
            className="shrink-0 text-xs font-light text-(--text-light)/70 sm:text-sm"
          >
            |
          </span>

          <span className="min-w-0 truncate text-xs font-semibold leading-tight tracking-tight sm:text-sm">
            رایا سنجش دانا
          </span>
        </div>

        {/* Typing Effect */}
        <div className="h-5 w-full min-w-0 overflow-hidden text-[10px] font-medium leading-5 sm:text-xs">
          <div className="flex h-full min-w-0 items-center justify-start">
            <TypingEffect />
          </div>
        </div>
      </div>
    </div>
  );
}
