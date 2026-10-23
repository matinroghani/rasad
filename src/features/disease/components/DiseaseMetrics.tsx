import {
  Camera,
  Pill,
} from "lucide-react";

import MetricCard from "@/components/ui/MetricCard";

import type {
  DiseaseOverviewStats,
} from "../types";
import { formatNumber } from "../utils";


interface DiseaseMetricsProps {
  stats: DiseaseOverviewStats;
}

export default function DiseaseMetrics({
  stats,
}: DiseaseMetricsProps) {
  return (
    <section
      aria-label="شاخص‌های بیماری و سلامت گله"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
    >
      <MetricCard
        title="دام دارای درمان"
        value={formatNumber(stats.treatedCows)}
        description="تعداد دام‌های دارای سابقه درمان ثبت‌شده"
        icon={Pill}
        unit="رأس"
        variant="default"
      />

      <MetricCard
        title="دام دارای تصویر"
        value={formatNumber(stats.photographedCows)}
        description="تعداد دام‌های دارای تصویر در پایش گله"
        icon={Camera}
        unit="رأس"
        variant="accent"
      />
    </section>
  );
}