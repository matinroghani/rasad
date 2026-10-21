
import type { Cow } from "@/features/herd/types";

export const DIM_RANGES = [
  { label: "۰–۴۰", min: 0, max: 40 },
  { label: "۴۱–۱۰۰", min: 41, max: 100 },
  { label: "۱۰۱–۲۰۰", min: 101, max: 200 },
  { label: "۲۰۱–۳۰۰", min: 201, max: 300 },
  { label: "۳۰۱+", min: 301, max: Infinity },
] as const;

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 1,
  }).format(value);
}

export function getAnalyticsStats(cows: Cow[]) {
  const milkValues = cows
    .map((cow) => cow.dailyMilk)
    .filter((value): value is number =>
      value !== null &&
      Number.isFinite(value) &&
      value >= 0
    );

  return {
    totalCows: cows.length,
    averageMilk:
      milkValues.length > 0
        ? milkValues.reduce((sum, value) => sum + value, 0) /
          milkValues.length
        : null,
    maxMilk:
      milkValues.length > 0
        ? Math.max(...milkValues)
        : null,
    milkRecords: milkValues.length,
  };
}

export function getDimDistribution(cows: Cow[]) {
  const eligibleCows = cows.filter(
    (cow) =>
      cow.daysInMilk !== null &&
      Number.isFinite(cow.daysInMilk) &&
      cow.daysInMilk >= 0,
  );

  return DIM_RANGES.map((range) => {
    const group = eligibleCows.filter((cow) => {
      const dim = cow.daysInMilk!;

      return dim >= range.min && dim <= range.max;
    });

    const milkValues = group
      .map((cow) => cow.dailyMilk)
      .filter((value): value is number =>
        value !== null &&
        Number.isFinite(value) &&
        value >= 0
      );

    return {
      label: range.label,
      count: group.length,
      percentage:
        eligibleCows.length > 0
          ? (group.length / eligibleCows.length) * 100
          : 0,
      averageMilk:
        milkValues.length > 0
          ? milkValues.reduce((sum, value) => sum + value, 0) /
            milkValues.length
          : null,
    };
  });
}

export function getMilkRanking(cows: Cow[]) {
  return cows
    .filter(
      (cow) =>
        cow.dailyMilk !== null &&
        Number.isFinite(cow.dailyMilk) &&
        cow.dailyMilk >= 0,
    )
    .sort((a, b) => b.dailyMilk! - a.dailyMilk!)
    .slice(0, 10);
}

export function getDimMilkChart(cows: Cow[]) {
  return DIM_RANGES.map((range) => {
    const group = cows.filter((cow) => {
      const dim = cow.daysInMilk;

      return (
        dim !== null &&
        Number.isFinite(dim) &&
        dim >= range.min &&
        dim <= range.max
      );
    });

    const milkValues = group
      .map((cow) => cow.dailyMilk)
      .filter((value): value is number =>
        value !== null &&
        Number.isFinite(value) &&
        value >= 0
      );

    return {
      dim: range.label,
      cows: group.length,
      averageMilk:
        milkValues.length > 0
          ? milkValues.reduce((sum, value) => sum + value, 0) /
            milkValues.length
          : null,
    };
  });
}

export function downloadAnalyticsCsv(cows: Cow[]) {
  const headers = [
    "شناسه",
    "شماره گوش",
    "روزهای شیردهی",
    "شیر روزانه",
    "وضعیت سلامت",
  ];

  const rows = cows.map((cow) => [
    cow.id,
    cow.earTag ?? "",
    cow.daysInMilk ?? "",
    cow.dailyMilk ?? "",
    cow.healthStatus,
  ]);

  const csv = [headers, ...rows]
    .map((row) =>
      row
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(","),
    )
    .join("\r\n");

  const blob = new Blob(["\uFEFF", csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "rasad-analytics.csv";
  link.click();

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}