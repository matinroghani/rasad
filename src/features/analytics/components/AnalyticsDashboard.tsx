"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { useAnalytics } from "../hooks/useAnalytics";
import {
  downloadAnalyticsCsv,
  formatNumber,
} from "../utils";

import AnalyticsEmptyState from "./AnalyticsEmptyState";
import AnalyticsHeader from "./AnalyticsHeader";
import AnalyticsMetrics from "./AnalyticsMetrics";
import DimDistributionTable from "./DimDistributionTable";
import DimMilkChart from "./DimMilkChart";
import MilkRankingTable from "./MilkRankingTable";

const sectionMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const sectionTransition = {
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1] as const,
};

const sectionDelays = {
  header: 0.06,
  metrics: 0.1,
  chart: 0.14,
  distribution: 0.18,
  ranking: 0.22,
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  reducedMotion: boolean | null;
}

function AnimatedSection({
  children,
  delay = 0,
  reducedMotion,
}: AnimatedSectionProps) {
  return (
    <motion.div
      variants={sectionMotion}
      initial={reducedMotion ? false : "hidden"}
      animate="visible"
      transition={{
        ...sectionTransition,
        duration: reducedMotion ? 0 : sectionTransition.duration,
        delay: reducedMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function AnalyticsDashboard() {
  const {
    cows,
    hasSuccessfulUpload,
    stats,
    dimDistribution,
    milkRanking,
    dimMilkChart,
  } = useAnalytics();

  const shouldReduceMotion = useReducedMotion();

  const isEmpty = !hasSuccessfulUpload || cows.length === 0;

  const initialAnimation = shouldReduceMotion
    ? false
    : sectionMotion.hidden;

  const milkFormat = (value: number | null) =>
    value === null ? "—" : formatNumber(value);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isEmpty ? (
        <motion.div
          key="analytics-empty"
          variants={sectionMotion}
          initial={initialAnimation}
          animate="visible"
          exit="exit"
          transition={{
            ...sectionTransition,
            duration: shouldReduceMotion ? 0 : sectionTransition.duration,
          }}
          className="min-w-0"
          dir="rtl"
        >
          <AnalyticsEmptyState />
        </motion.div>
      ) : (
        <motion.main
          key="analytics-dashboard"
          variants={sectionMotion}
          initial={initialAnimation}
          animate="visible"
          exit="exit"
          transition={{
            ...sectionTransition,
            duration: shouldReduceMotion ? 0 : sectionTransition.duration,
          }}
          className="flex min-w-0 flex-col gap-5 pb-8 sm:gap-6"
          dir="rtl"
        >
          <AnimatedSection
            delay={sectionDelays.header}
            reducedMotion={shouldReduceMotion}
          >
            <AnalyticsHeader
              onExport={() => downloadAnalyticsCsv(cows)}
            />
          </AnimatedSection>

          <AnimatedSection
            delay={sectionDelays.metrics}
            reducedMotion={shouldReduceMotion}
          >
            <AnalyticsMetrics
              totalCows={formatNumber(stats.totalCows)}
              averageMilk={milkFormat(stats.averageMilk)}
              maxMilk={milkFormat(stats.maxMilk)}
              milkRecords={formatNumber(stats.milkRecords)}
              milkDescription={
                stats.milkRecords > 0
                  ? `بر اساس ${formatNumber(stats.milkRecords)} رکورد شیر`
                  : "اطلاعات تولید شیر ثبت نشده"
              }
            />
          </AnimatedSection>

          <AnimatedSection
            delay={sectionDelays.chart}
            reducedMotion={shouldReduceMotion}
          >
            <DimMilkChart data={dimMilkChart} />
          </AnimatedSection>

          <AnimatedSection
            delay={sectionDelays.distribution}
            reducedMotion={shouldReduceMotion}
          >
            <DimDistributionTable
              data={dimDistribution}
              formatMilk={milkFormat}
            />
          </AnimatedSection>

          <AnimatedSection
            delay={sectionDelays.ranking}
            reducedMotion={shouldReduceMotion}
          >
            <MilkRankingTable data={milkRanking} />
          </AnimatedSection>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
