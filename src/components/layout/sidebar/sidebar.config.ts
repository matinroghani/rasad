import type { Transition, Variants } from "motion/react";

export type SidebarColorKey =
  | "green"
  | "blue"
  | "red"
  | "purple"
  | "teal"
  | "sky"
  | "orange";

type SidebarColorStyle = {
  accent: string;
  light: string;
  soft: string;
  hoverBg: string;
};

export const sidebarColorStyles: Record<
  SidebarColorKey,
  SidebarColorStyle
> = {
  green: {
    accent: "var(--accent-green)",
    light: "var(--accent-green-light)",
    soft: "var(--green-soft)",
    hoverBg: "rgb(34 197 94 / 8%)",
  },
  blue: {
    accent: "var(--accent-blue)",
    light: "var(--accent-blue-neon)",
    soft: "var(--blue-soft)",
    hoverBg: "rgb(59 130 246 / 8%)",
  },
  red: {
    accent: "var(--accent-red)",
    light: "var(--accent-red-neon)",
    soft: "var(--red-soft)",
    hoverBg: "rgb(239 68 68 / 7%)",
  },
  purple: {
    accent: "var(--accent-purple)",
    light: "var(--accent-purple-neon)",
    soft: "var(--purple-soft)",
    hoverBg: "rgb(168 85 247 / 8%)",
  },
  teal: {
    accent: "var(--accent-teal)",
    light: "var(--accent-teal-neon)",
    soft: "var(--teal-soft)",
    hoverBg: "rgb(20 184 166 / 8%)",
  },
  sky: {
    accent: "var(--accent-sky)",
    light: "var(--accent-sky-neon)",
    soft: "var(--sky-soft)",
    hoverBg: "rgb(14 165 233 / 8%)",
  },
  orange: {
    accent: "var(--accent-orange)",
    light: "var(--accent-orange-neon)",
    soft: "var(--orange-soft)",
    hoverBg: "rgb(249 115 22 / 8%)",
  },
};

export const SIDEBAR_EASE = [0.16, 1, 0.3, 1] as const;

export const underlineVariants: Variants = {
  rest: {
    scaleX: 0,
    opacity: 0,
    backgroundPosition: "0% 0%",
  },
  hover: {
    scaleX: 1,
    opacity: 1,
    backgroundPosition: "-200% 0%",
  },
  active: {
    scaleX: 1,
    opacity: 1,
    backgroundPosition: "-200% 0%",
  },
};

export const iconVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    rotate: 0,
  },
  hover: {
    y: -3,
    scale: 1.08,
    rotate: -6,
  },
  active: {
    y: 0,
    scale: 1,
    rotate: 0,
  },
};

export const sidebarItemTransition: Transition = {
  duration: 0.3,
  ease: SIDEBAR_EASE,
};

export const sidebarUnderlineTransition: Transition = {
  ...sidebarItemTransition,
  backgroundPosition: {
    duration: 3,
    ease: "linear",
    repeat: Infinity,
  },
};

export const SIDEBAR_ITEM_STAGGER = 0.045;
export const SIDEBAR_ITEM_ANIMATION_DURATION = 0.35;
export const SIDEBAR_SCROLL_STEP = 180;
