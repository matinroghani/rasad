import type { Cow } from "@/features/herd/types";

export interface AnalyticsApiResponse {
  data: Cow[];
  total: number;
}

export interface DimDistributionItem {
  label: string;
  count: number;
  percentage: number;
  averageMilk: number | null;
}

export interface DimMilkChartItem {
  dim: string;
  cows: number;
  averageMilk: number | null;
}