"use client";

import { motion, useReducedMotion } from "motion/react";

import HeaderActions from "./Header-Actions";
import HeaderLogoarea from "./Header-Logoarea";

export default function Header() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -14 }}
      animate={{
        opacity: 1,
        y: 0,
        backgroundPosition: reduceMotion
          ? "50% 50%"
          : ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        opacity: { duration: 0.45, ease: "easeOut" },
        y: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        backgroundPosition: {
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
        },
      }}
      style={{ backgroundSize: "320% 320%" }}
      className={[
        "relative z-10 mb-2 flex w-full min-w-0 flex-col gap-3",
        "overflow-hidden rounded-2xl px-3 py-3",
        "text-(--text-inverse)",
        "bg-[linear-gradient(120deg,var(--surface-dark),var(--accent-green-hover),var(--accent-green),var(--accent-green-light),var(--accent-green),var(--accent-green-hover))]",
        "shadow-[0_8px_26px_rgba(60,90,60,0.2),inset_0_1px_0_rgba(255,255,255,0.12)]",
        "sm:px-4 sm:py-3.5",
        "lg:flex-row lg:items-center lg:justify-between lg:gap-4",
        "xl:px-6 xl:py-4",
      ].join(" ")}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.45,
          delay: reduceMotion ? 0 : 0.12,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="flex w-full min-w-0 justify-center lg:w-auto lg:flex-1 lg:justify-start"
      >
        <HeaderLogoarea />
      </motion.div>

      <div className="w-full min-w-0 lg:w-auto lg:flex-none">
        <HeaderActions />
      </div>
    </motion.header>
  );
}
