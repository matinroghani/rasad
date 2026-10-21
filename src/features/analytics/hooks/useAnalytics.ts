
"use client";

import { useMemo } from "react";

import { useAppSelector } from "@/store/hooks";

import {
  selectAnalyticsCows,
  selectHasSuccessfulHerdUpload,
} from "@/features/herd/store/herdSelectors";

import {
  getAnalyticsStats,
  getDimDistribution,
  getDimMilkChart,
  getMilkRanking,
} from "../utils";

export function useAnalytics() {
  const cows = useAppSelector(selectAnalyticsCows);

  const hasSuccessfulUpload = useAppSelector(
    selectHasSuccessfulHerdUpload,
  );

  const stats = useMemo(
    () => getAnalyticsStats(cows),
    [cows],
  );

  const dimDistribution = useMemo(
    () => getDimDistribution(cows),
    [cows],
  );

  const milkRanking = useMemo(
    () => getMilkRanking(cows),
    [cows],
  );

  const dimMilkChart = useMemo(
    () => getDimMilkChart(cows),
    [cows],
  );

  return {
    cows,
    hasSuccessfulUpload,
    stats,
    dimDistribution,
    milkRanking,
    dimMilkChart,
  };
}
