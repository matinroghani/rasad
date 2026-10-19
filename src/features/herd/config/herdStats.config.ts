import {
  Activity,
  Camera,
  HeartPulse,
  Milk,
  Stethoscope,
  Users,
} from "lucide-react";
import { HerdOverviewStats } from "../types";

export const herdGaugeConfig = (
  stats: HerdOverviewStats,
) => {
  const hasCows = stats.totalCows > 0;

  return [
    {
      label: "سلامت گله",
      value: hasCows ? stats.healthRate : 0,
      detail: "درصد دام‌های سالم",
      color: "var(--gauge-health)",
      icon: HeartPulse,
      tone: "bg-[var(--tone-health-bg)] text-[var(--tone-health-fg)]",
    },
    {
      label: "پوشش تصویری",
      value: hasCows ? stats.photoCoverage : 0,
      detail: "دام‌های دارای تصویر",
      color: "var(--gauge-coverage)",
      icon: Camera,
      tone: "bg-[var(--tone-coverage-bg)] text-[var(--tone-coverage-fg)]",
    },
    {
      label: "پوشش درمان",
      value: hasCows ? stats.treatmentCoverage : 0,
      detail: "دام‌های دارای سابقه درمان",
      color: "var(--gauge-treatment)",
      icon: Stethoscope,
      tone: "bg-[var(--tone-treatment-bg)] text-[var(--tone-treatment-fg)]",
    },
  ];
};

export const herdMetricsConfig = (
  stats: HerdOverviewStats,
  formatNumber: (value: number) => string,
) => [
  {
    label: "کل دام‌های ثبت‌شده",
    value: formatNumber(stats.totalCows),
    unit: "رأس",
    icon: Users,
    tone: "bg-[var(--tone-cows-bg)] text-[var(--tone-cows-fg)]",
    accent: "bg-[var(--accent-cows)]",
  },
  {
    label: "مجموع شیر روزانه",
    value: formatNumber(stats.totalMilk),
    unit: "لیتر",
    icon: Milk,
    tone: "bg-[var(--tone-milk-bg)] text-[var(--tone-milk-fg)]",
    accent: "bg-[var(--accent-milk)]",
  },
  {
    label: "دارای سابقه درمان",
    value: formatNumber(stats.treatedCows),
    unit: "رأس",
    icon: Activity,
    tone: "bg-[var(--tone-treated-bg)] text-[var(--tone-treated-fg)]",
    accent: "bg-[var(--accent-treated)]",
  },
  {
    label: "تصاویر ثبت‌شده",
    value: formatNumber(stats.imageCount),
    unit: "تصویر",
    icon: Camera,
    tone: "bg-[var(--tone-images-bg)] text-[var(--tone-images-fg)]",
    accent: "bg-[var(--accent-images)]",
  },
];