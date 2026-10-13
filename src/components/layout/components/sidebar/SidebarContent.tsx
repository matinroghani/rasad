"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/data/constants/SidebarItems/sidebarItems";

const MotionLink = motion.create(Link);

const EASE = [0.16, 1, 0.3, 1] as const;

type ColorKey = "green" | "blue" | "red" | "purple" | "teal" | "sky" | "orange";

type ColorStyle = {
  accent: string;
  light: string;
  soft: string;
};

const colorStyles: Record<ColorKey, ColorStyle> = {
  green: {
    accent: "var(--accent-green)",
    light: "var(--accent-green-light)",
    soft: "var(--green-soft)",
  },
  blue: {
    accent: "var(--accent-blue)",
    light: "var(--accent-blue-neon)",
    soft: "var(--blue-soft)",
  },
  red: {
    accent: "var(--accent-red)",
    light: "var(--accent-red-neon)",
    soft: "var(--red-soft)",
  },
  purple: {
    accent: "var(--accent-purple)",
    light: "var(--accent-purple-neon)",
    soft: "var(--purple-soft)",
  },
  teal: {
    accent: "var(--accent-teal)",
    light: "var(--accent-teal-neon)",
    soft: "var(--teal-soft)",
  },
  sky: {
    accent: "var(--accent-sky)",
    light: "var(--accent-sky-neon)",
    soft: "var(--sky-soft)",
  },
  orange: {
    accent: "var(--accent-orange)",
    light: "var(--accent-orange-neon)",
    soft: "var(--orange-soft)",
  },
};

const underlineVariants = {
  rest: { scaleX: 0, opacity: 0, backgroundPosition: "0% 0%" },
  hover: { scaleX: 1, opacity: 1, backgroundPosition: "-200% 0%" },
  active: { scaleX: 1, opacity: 1, backgroundPosition: "-200% 0%" },
};

const iconVariants = {
  rest: { y: 0, scale: 1, rotate: 0 },
  hover: { y: -3, scale: 1.08, rotate: -6 },
  active: { y: 0, scale: 1, rotate: 0 },
};

const itemTransition = {
  duration: 0.3,
  ease: EASE,
};

const underlineTransition = {
  ...itemTransition,
  backgroundPosition: {
    duration: 3,
    ease: "linear" as const,
    repeat: Infinity,
  },
};

type SidebarContentProps = {
  onNavigate?: () => void;
};

export default function SidebarContent({ onNavigate }: SidebarContentProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const transition = shouldReduceMotion ? { duration: 0 } : itemTransition;
  const underlineAnim = shouldReduceMotion
    ? { duration: 0 }
    : underlineTransition;

  return (
    <nav
      aria-label="منوی اصلی"
      className="touch-pan-y overflow-y-auto overscroll-contain p-3 sm:p-3.5 scrollbar-hidden [&::-webkit-scrollbar]:hidden fade-y h-full"
    >
      <ul className="flex flex-col gap-2.5">
        {sidebarItems.map((item, index) => {
          const Icon = item.Icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const colors = colorStyles[item.color as ColorKey] ?? colorStyles.green;

          const itemStyle = {
            "--item-accent": colors.accent,
            "--item-light": colors.light,
            "--item-soft": colors.soft,
            "--item-gradient": `linear-gradient(135deg, ${colors.accent}, ${colors.light})`,
          } as CSSProperties;

          return (
            <motion.li
              key={item.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.35,
                      delay: index * 0.045,
                      ease: EASE,
                    }
              }
            >
              <MotionLink
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={onNavigate}
                initial="rest"
                animate={isActive ? "active" : "rest"}
                whileHover={
                  shouldReduceMotion ? undefined : isActive ? "active" : "hover"
                }
                style={{
                  ...itemStyle,
                  background: isActive
                    ? "var(--item-gradient)"
                    : "var(--panel-bg)",
                  borderColor: isActive
                    ? "var(--item-accent)"
                    : "var(--panel-border)",
                  color: isActive ? "var(--text-inverse)" : "var(--text-main)",
                  boxShadow: isActive ? "var(--shadow-md)" : "none",
                }}
                className={[
                  "group relative isolate flex w-full min-w-0",
                  "flex-col items-center gap-2.5 overflow-hidden",
                  "rounded-lg border-[1.5px] px-3.5 py-4",
                  "text-center shadow-(--shadow-sm)",
                  "transition-[background,border-color,box-shadow,transform] duration-300",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-(--focus-ring-color,var(--accent-green))",
                  "focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg-main)",
                  "hover:-translate-y-1 hover:shadow-(--shadow-md)",
                ].join(" ")}
              >
                <motion.span
                  aria-hidden="true"
                  variants={underlineVariants}
                  transition={underlineAnim}
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-0.75 origin-right bg-size-[200%_100%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, var(--item-accent), var(--item-light), var(--item-accent))",
                  }}
                />

                <motion.span
                  variants={iconVariants}
                  transition={transition}
                  className="relative flex size-11.5 shrink-0 items-center justify-center rounded-[13px] border text-xl text-white"
                  style={{
                    background: isActive
                      ? "rgb(255 255 255 / 22%)"
                      : "var(--item-gradient)",
                    borderColor: isActive
                      ? "rgb(255 255 255 / 20%)"
                      : "transparent",
                    boxShadow: isActive
                      ? "0 0 0 4px rgb(255 255 255 / 20%), var(--shadow-sm)"
                      : "0 4px 12px rgb(0 0 0 / 10%), 0 0 0 4px var(--item-soft)",
                  }}
                >
                  <Icon aria-hidden="true" weight="duotone" />
                </motion.span>

                <span className="relative z-10 flex w-full min-w-0 flex-col items-center gap-0.5">
                  <span
                    className="block max-w-full wrap-break-word text-[13.5px] font-semibold leading-6 transition-colors duration-300"
                    style={{
                      color: isActive
                        ? "var(--text-inverse)"
                        : "var(--text-main)",
                    }}
                  >
                    {item.title}
                  </span>

                  <span
                    className="block max-w-full wrap-break-word text-[11px] leading-5 transition-colors duration-300"
                    style={{
                      color: isActive
                        ? "rgb(255 255 255 / 88%)"
                        : "var(--text-muted)",
                    }}
                  >
                    {item.description}
                  </span>
                </span>
              </MotionLink>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}