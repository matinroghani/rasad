"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Moon, Sun, FileSpreadsheet, CircleHelp } from "lucide-react";
import { useTheme } from "next-themes";

import LiveClock from "@/components/ui/LiveClock";
import TopBarButton from "@/components/ui/TopBarButton";
import SearchInput from "./header/HeaderSearch";
import ThemeToggle from "./ThemeToggle";

export default function HeaderActions() {
  const [search, setSearch] = useState("");
  const reduceMotion = useReducedMotion();

  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
  };

  const itemTransition = {
    duration: reduceMotion ? 0 : 0.3,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: reduceMotion ? 0 : 0.08,
            staggerChildren: reduceMotion ? 0 : 0.05,
          },
        },
      }}
      className={[
        "flex w-full min-w-0 items-center gap-2",
        "lg:w-auto lg:justify-end lg:gap-3",
      ].join(" ")}
    >
      {/* Clock */}
      <motion.div
        variants={itemVariants}
        transition={itemTransition}
        className={[
          "hidden shrink-0 items-center",
          "rounded-[var(--radius-md)]",
          "border border-white/10 bg-white/[0.05]",
          "px-3 py-2.5 text-white/85",
          "lg:flex",
        ].join(" ")}
      >
        <LiveClock />
      </motion.div>

      {/* Search */}
      <motion.div
        variants={itemVariants}
        transition={itemTransition}
        className="min-w-0 flex-1 lg:w-64 lg:flex-none xl:w-72"
      >
        <SearchInput
          placeholder="جستجوی شماره گوش..."
          value={search}
          onChange={setSearch}
        />
      </motion.div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1.5 border-r border-white/10 pr-2 sm:gap-2 sm:pr-3">
        {/* Theme Toggle */}
        <motion.div variants={itemVariants} transition={itemTransition}>
          <ThemeToggle />
        </motion.div>

        {/* Excel Export */}
        <motion.div variants={itemVariants} transition={itemTransition}>
          <TopBarButton
            icon={<FileSpreadsheet size={17} strokeWidth={1.8} />}
            title="خروجی Excel"
          />
        </motion.div>

        {/* Help */}
        <motion.div variants={itemVariants} transition={itemTransition}>
          <TopBarButton
            icon={<CircleHelp size={17} strokeWidth={1.8} />}
            title="راهنما"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
