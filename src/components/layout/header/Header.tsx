"use client";

import { motion, useReducedMotion } from "motion/react";

import HeaderActions from "./Header-Actions";
import HeaderLogoarea from "./Header-Logoarea";

export default function Header() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={[
        "relative z-10 mb-4 flex w-full min-w-0 flex-col gap-4",
        "overflow-hidden rounded-[var(--radius-xl)]",
        "border border-white/10",
        "bg-[var(--surface-dark)]",
        "px-3 py-3.5 sm:px-5 sm:py-4 xl:px-6",
        "text-[var(--text-inverse)]",
        "shadow-[var(--shadow-md)]",
        "lg:flex-row lg:items-center lg:justify-between lg:gap-6",
      ].join(" ")}
    >
      {/* Decorative accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-1 bg-[var(--accent-green-light)]"
      />

      {/* Brand */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.4,
          delay: reduceMotion ? 0 : 0.08,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="flex w-full min-w-0 lg:flex-1"
      >
        <HeaderLogoarea />
      </motion.div>

      {/* Toolbar */}
      <div className="w-full min-w-0 lg:w-auto lg:flex-none">
        <HeaderActions />
      </div>
    </motion.header>
  );
}
