"use client";

import { useState } from "react";
import SidebarContent from "./SidebarContent";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
        aria-expanded={isOpen}
        aria-controls="dashboard-sidebar"
        onClick={() => setIsOpen((prev) => !prev)}
        className={[
          "group fixed left-4 top-4 z-50 md:hidden",
          "flex size-12 items-center justify-center",
          "overflow-hidden rounded-xl border",
          "border-(--accent-green)",
          "bg-(--surface-dark) text-(--text-inverse)",
          "shadow-(--shadow-md)",
          "transition-all duration-300 ease-out",
          "hover:border-(--accent-green-light)",
          "hover:bg-(--accent-green-hover)",
          "hover:shadow-(--shadow-glow)",
          "active:scale-90 active:bg-(--accent-green-hover)",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-(--focus-ring)",
          "focus-visible:ring-offset-2",
          "focus-visible:ring-offset-(--bg-main)",
          isOpen
            ? "border-(--accent-green-light) bg-(--accent-green-hover)"
            : "",
        ].join(" ")}
      >
        {/* Subtle background glow */}
        <span
          aria-hidden="true"
          className={[
            "absolute inset-0 rounded-xl",
            "bg-(--accent-green)",
            "opacity-0 transition-opacity duration-300",
            "group-hover:opacity-[0.06]",
            isOpen ? "opacity-[0.08]" : "",
          ].join(" ")}
        />

        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={[
            "relative size-6",
            "transition-transform duration-300 ease-out",
            isOpen ? "rotate-90" : "rotate-0",
          ].join(" ")}
          aria-hidden="true"
        >
          {isOpen ? (
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          )}
        </svg>
      </button>

      {/* Backdrop Control */}

      <div
        aria-hidden="true"
        onClick={close}
        className={[
          "fixed inset-0 z-30 md:hidden",
          "bg-(--overlay-bg, rgb(0 0 0 / 30%))",
          "transition-opacity duration-300 ease-out",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* Sidebar */}
      <aside
        id="dashboard-sidebar"
        aria-label="Dashboard Sidebar"
        aria-hidden={!isOpen ? undefined : undefined}
        className={[
          "fixed inset-y-0 right-0 z-40 flex flex-col",
          "w-[min(260px,88vw)]",
          "border-l border-(--panel-border) bg-(--bg-main)",
          "will-change-transform transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
          "md:sticky md:top-0 md:z-10 md:translate-x-0",
          "md:h-full md:max-h-full md:w-65 md:shrink-0",
          "md:rounded-lg md:border md:transition-none",
          "overflow-hidden",
        ].join(" ")}
      >
        <SidebarContent onNavigate={close} />
      </aside>
    </>
  );
}
