
"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type DashboardMotionProps = {
  children: ReactNode;
};

export default function DashboardMotion({
  children,
}: DashboardMotionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 12, scale: 0.995 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex min-h-0 min-w-0 flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
