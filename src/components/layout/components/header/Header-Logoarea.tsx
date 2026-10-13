
import TypingEffect from "@/components/ui/TypingEffect";

export default function HeaderLogoarea() {
  return (
    <div className="flex items-center gap-3 whitespace-nowrap">
      {/* Logo */}
      <div
        aria-label="Rasad logo"
        className={[
          "flex size-12 shrink-0 items-center justify-center",
          "rounded-xl border border-white/20",
          "bg-white/[0.06] text-white/90",
          "text-2xl font-bold tracking-tight",
          "transition-transform duration-300 ease-(--ease-spring)",
          "hover:scale-[1.03]",
        ].join(" ")}
      >
        R
      </div>

      {/* Brand Information */}
      <div className="flex min-w-0 flex-col items-start gap-2">
        {/* Brand Name */}
        <div className="flex items-center gap-2">
          <span
            className={[
              "bg-[linear-gradient(90deg,#d9f0d9,#b5e3b5,#8fd18f,#6fbf73,#8fd18f,#b5e3b5)]",
              "bg-size-[300%_100%] bg-clip-text text-transparent",
              "animate-[gradient-flow_5s_ease_infinite]",
              "text-2xl font-black leading-none",
            ].join(" ")}
          >
            رصد
          </span>

          <span
            aria-hidden="true"
            className="text-sm font-light text-(--text-light)/70"
          >
            |
          </span>

          <span className="text-sm font-semibold leading-none tracking-tight ">
            رایا سنجش دانا
          </span>
        </div>

        {/* Typing Effect */}
        <div className="text-xs font-medium leading-5 ">
          <TypingEffect />
        </div>
      </div>
    </div>
  );
}
