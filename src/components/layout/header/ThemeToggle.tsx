
"use client";

import dynamic from "next/dynamic";

function ThemeToggleFallback() {
  return (
    <button
      type="button"
      title="تغییر تم"
      aria-label="تغییر تم"
      disabled
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-[11px] border border-white/18 bg-white/8 p-2.5 text-white/80 opacity-50"
    >
      <span className="size-[17px]" aria-hidden="true" />
    </button>
  );
}

const ThemeToggle = dynamic(
  () => import("./ThemeToggleClient"),
  {
    ssr: false,
    loading: () => <ThemeToggleFallback />,
  },
);

export default ThemeToggle;
