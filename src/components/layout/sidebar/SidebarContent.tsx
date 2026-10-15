"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaretDownIcon } from "@phosphor-icons/react";

import { sidebarItems } from "@/data/constants/sidebar/sidebarItems";

import {
  SIDEBAR_EASE,
  SIDEBAR_ITEM_ANIMATION_DURATION,
  SIDEBAR_ITEM_STAGGER,
  SIDEBAR_SCROLL_STEP,
  iconVariants,
  sidebarColorStyles,
  sidebarItemTransition,
  sidebarUnderlineTransition,
  underlineVariants,
  type SidebarColorKey,
} from "../../../data/constants/sidebar/sidebar.config";

import useSidebarScrollIndicator from "./hooks/useSidebarScrollIndicator";

const MotionLink = motion.create(Link);

type SidebarContentProps = {
  onNavigate?: () => void;
};

export default function SidebarContent({
  onNavigate,
}: SidebarContentProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const { navRef, canScrollDown } = useSidebarScrollIndicator();

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : sidebarItemTransition;

  const underlineAnim = shouldReduceMotion
    ? { duration: 0 }
    : sidebarUnderlineTransition;

  return (
    <div className="relative min-h-0 flex-1 overflow-hidden">
      <nav
        ref={navRef}
        aria-label="منوی اصلی"
        className={[
          "h-full min-h-0 min-w-0",
          "overflow-x-hidden overflow-y-auto overscroll-contain",
          "touch-pan-y p-3 pb-16 sm:p-3.5 sm:pb-16",
          "scrollbar-hidden [&::-webkit-scrollbar]:hidden",
          "fade-y",
        ].join(" ")}
      >
        <ul className="flex flex-col gap-2.5">
          {sidebarItems.map((item, index) => {
            const Icon = item.Icon;

            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            const colors =
              sidebarColorStyles[item.color as SidebarColorKey] ??
              sidebarColorStyles.green;

            const itemStyle = {
              "--item-accent": colors.accent,
              "--item-light": colors.light,
              "--item-soft": colors.soft,
              "--item-hover-bg": colors.hoverBg,
              "--item-gradient": `linear-gradient(135deg, ${colors.accent}, ${colors.light})`,
            } as CSSProperties;

            return (
              <motion.li
                key={item.id}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 8 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: SIDEBAR_ITEM_ANIMATION_DURATION,
                        delay: index * SIDEBAR_ITEM_STAGGER,
                        ease: SIDEBAR_EASE,
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
                    shouldReduceMotion
                      ? undefined
                      : isActive
                        ? "active"
                        : "hover"
                  }
                  style={{
                    ...itemStyle,
                    background: isActive
                      ? "var(--item-gradient)"
                      : "var(--panel-bg)",
                    borderColor: isActive
                      ? "var(--item-accent)"
                      : "var(--panel-border)",
                    color: isActive
                      ? "var(--text-inverse)"
                      : "var(--text-main)",
                    boxShadow: isActive ? "var(--shadow-md)" : "none",
                  }}
                  className={[
                    "group relative isolate flex w-full min-w-0",
                    "flex-col items-center gap-2.5 overflow-hidden",
                    "rounded-lg border-[1.5px] px-3.5 py-4",
                    "text-center shadow-(--shadow-sm)",
                    "transition-[border-color,box-shadow] duration-300",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-(--focus-ring-color,var(--accent-green))",
                    "focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg-main)",
                    "hover:-translate-y-1 hover:shadow-(--shadow-md)",
                  ].join(" ")}
                >
                  
                  {/* Hover background */}
                  <motion.span
                    aria-hidden="true"
                    variants={{
                      rest: { opacity: 0 },
                      hover: { opacity: 1 },
                      active: { opacity: 0 },
                    }}
                    transition={transition}
                    className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit]"
                    style={{
                      backgroundColor: "var(--item-hover-bg)",
                    }}
                  />

                  {/* Animated underline */}
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

                  {/* Icon */}
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

                  {/* Title and description */}
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

      {canScrollDown && (
        <motion.button
          type="button"
          aria-label="اسکرول به پایین سایدبار"
          onClick={() => {
            navRef.current?.scrollBy({
              top: SIDEBAR_SCROLL_STEP,
              behavior: shouldReduceMotion ? "auto" : "smooth",
            });
          }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
          className={[
            "absolute inset-x-0 bottom-0 z-20",
            "flex flex-col items-center justify-center",
            "gap-0 py-2",
            "bg-linear-to-b from-transparent via-(--bg-main) to-(--bg-main)",
            "text-(--accent-green)",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-inset focus-visible:ring-(--accent-green)",
          ].join(" ")}
        >
          <motion.span
            aria-hidden="true"
            animate={shouldReduceMotion ? undefined : { y: [0, 3, 0] }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            className="flex flex-col items-center -space-y-2"
          >
            <CaretDownIcon weight="bold" className="size-5 opacity-100" />
            <CaretDownIcon weight="bold" className="size-5 opacity-60" />
            <CaretDownIcon weight="bold" className="size-5 opacity-25" />
          </motion.span>
        </motion.button>
      )}
    </div>
  );
}
