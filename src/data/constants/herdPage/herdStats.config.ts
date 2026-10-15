
import type { HerdOverviewStats } from "@/types/herd/herd";
import {
  Activity,
  Camera,
  HeartPulse,
  Milk,
  Stethoscope,
  Users,
} from "lucide-react";

export const herdGaugeConfig = (
  stats: HerdOverviewStats,
) => {
  const hasCows = stats.totalCows > 0;

  return [
    {
      label: "سلامت گله",
      value: hasCows ? stats.healthRate : 0,
      detail: "درصد دام‌های سالم",
      color: "#579967",
      icon: HeartPulse,
      tone: "bg-[#eaf5e9] text-[#43834f]",
    },
    {
      label: "پوشش تصویری",
      value: hasCows ? stats.photoCoverage : 0,
      detail: "دام‌های دارای تصویر",
      color: "#4b91c5",
      icon: Camera,
      tone: "bg-[#e9f3fb] text-[#397dad]",
    },
    {
      label: "پوشش درمان",
      value: hasCows ? stats.treatmentCoverage : 0,
      detail: "دام‌های دارای سابقه درمان",
      color: "#d59a45",
      icon: Stethoscope,
      tone: "bg-[#fbf1df] text-[#b47b29]",
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
    tone: "bg-[#eaf5e9] text-[#4b9258]",
    accent: "bg-[#6fbf73]",
  },
  {
    label: "مجموع شیر روزانه",
    value: formatNumber(stats.totalMilk),
    unit: "لیتر",
    icon: Milk,
    tone: "bg-[#eaf3fb] text-[#4288ba]",
    accent: "bg-[#69a8d5]",
  },
  {
    label: "دارای سابقه درمان",
    value: formatNumber(stats.treatedCows),
    unit: "رأس",
    icon: Activity,
    tone: "bg-[#fff2df] text-[#bc8435]",
    accent: "bg-[#e3ad60]",
  },
  {
    label: "تصاویر ثبت‌شده",
    value: formatNumber(stats.imageCount),
    unit: "تصویر",
    icon: Camera,
    tone: "bg-[#f0ebfa] text-[#8970bc]",
    accent: "bg-[#a18ad0]",
  },
];
