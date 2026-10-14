"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Moon, FileSpreadsheet, CircleHelp } from "lucide-react";

import LiveClock from "@/components/ui/LiveClock";
import TopBarButton from "@/components/ui/TopBarButton";
import SearchInput from "./header/HeaderSearch";

export default function HeaderActions() {
  const [search, setSearch] = useState("");
  const reduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  };

  const itemTransition = {
    duration: reduceMotion ? 0 : 0.35,
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
            delayChildren: reduceMotion ? 0 : 0.15,
            staggerChildren: reduceMotion ? 0 : 0.07,
          },
        },
      }}
      className="flex w-full min-w-0 items-center gap-2 lg:w-auto lg:justify-end lg:gap-2.5"
    >
      {/* Clock: desktop only */}
      <motion.div
        variants={itemVariants}
        transition={itemTransition}
        className="hidden shrink-0 lg:block"
      >
        <LiveClock />
      </motion.div>

      {/* Search */}
      <motion.div
        variants={itemVariants}
        transition={itemTransition}
        className="min-w-0 flex-1 lg:w-56 lg:flex-none xl:w-64"
      >
        <SearchInput
          placeholder="جستجوی شماره گوش..."
          value={search}
          onChange={setSearch}
        />
      </motion.div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <motion.div variants={itemVariants} transition={itemTransition}>
          <TopBarButton
            icon={<Moon size={16} />}
            title="تغییر تم"
          />
        </motion.div>

        <motion.div variants={itemVariants} transition={itemTransition}>
          <TopBarButton
            icon={<FileSpreadsheet size={16} />}
            title="خروجی Excel"
          />
        </motion.div>

        <motion.div variants={itemVariants} transition={itemTransition}>
          <TopBarButton
            icon={<CircleHelp size={16} />}
            title="راهنما"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
